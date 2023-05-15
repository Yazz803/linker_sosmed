/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import NavbarAdmin from "../components/Admin/NavbarAdmin";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import { Form, Input } from "antd";
import PreviewWeb from "../components/Admin/PreviewWeb";

export default function AppearancePage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);
  return (
    <>
      {currentUser && (
        <>
          <NavbarAdmin />
          <div className="px-16">
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
                    <Form layout="vertical" className="mt-8">
                      <Form.Item label="Profile Title">
                        <Input
                          showCount
                          maxLength={30}
                          placeholder="Masukan Profile Title"
                        />
                      </Form.Item>
                      <Form.Item label="Bio">
                        <Input.TextArea
                          showCount
                          maxLength={80}
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
        </>
      )}
    </>
  );
}
