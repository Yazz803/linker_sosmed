/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import NavbarAdmin from "../components/Admin/NavbarAdmin";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import { Form, Input } from "antd";
import PreviewWeb from "../components/Admin/PreviewWeb";
import GetCollection, { updateDataDoc } from "yazz/utils/helpers";

export default function AppearancePage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const dataUsers = GetCollection("users");
  const [form] = Form.useForm();

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);
  return (
    <>
      {currentUser && (
        <>
          <NavbarAdmin />
          {dataUsers.map((document, i) => {
            if (document.data().uid === currentUser.uid) {
              return (
                <div className="px-16" key={i}>
                  <div className="flex">
                    <div className="w-[60%] mt-24">
                      <div className="mr-20">
                        <h2 className="text-xl font-bold">Profile</h2>
                        <div className="bg-white rounded-2xl p-5">
                          <div className="flex gap-4 items-center">
                            <img
                              src={currentUser.photoURL}
                              className="rounded-full w-24"
                              alt="Photo Profile"
                            />
                            <div className="w-full">
                              <button className="w-full mb-3 text-white font-semibold py-4 rounded-3xl bg-blue-700 hover:bg-blue-800 transition-all">
                                Pick an image
                              </button>
                              <button className="w-full border font-semibold py-4 rounded-3xl bg-white hover:bg-gray-200 transition-all">
                                Remove
                              </button>
                            </div>
                          </div>
                          <Form layout="vertical" className="mt-8" form={form}>
                            <Form.Item label="Profile Title">
                              <Input
                                showCount
                                maxLength={30}
                                defaultValue={document.data().username}
                                placeholder="Masukan Profile Title"
                              />
                            </Form.Item>
                            <Form.Item label="Bio">
                              <Input.TextArea
                                showCount
                                maxLength={80}
                                onChange={(e) => {
                                  updateDataDoc("users", document.id, {
                                    bio: e.target.value,
                                  });
                                }}
                                defaultValue={document.data().bio}
                                placeholder="Masukan Bio"
                              />
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <div className="w-[40%] border-l flex items-center justify-center border-gray-300 h-screen sticky top-0">
                      <PreviewWeb />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </>
      )}
    </>
  );
}
