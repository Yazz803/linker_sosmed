/* eslint-disable no-undef */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import NavbarAdmin from "yazz/components/Admin/NavbarAdmin";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import GetCollection, { getUser, updateDataDoc } from "yazz/utils/helpers";
import LoadingPage from "yazz/components/Admin/LoadingPage";
import { Form, Input, message } from "antd";
import ModalShareButton from "yazz/components/Admin/ModalShareButton";
import { useAppContext } from "yazz/context/AppContext";
import Metadata from "yazz/components/Metadata";
import ModalHistoryVisitors from "yazz/components/Modal/ModalHistoryVisitors";

export default function AccountPage() {
  const { state } = useAppContext();
  const router = useRouter();
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser?.uid);

  useEffect(() => {
    if (!currentUser) router.push("/login");
    let foundUser = localStorage.getItem("user_yazz_linker");
    if (!foundUser) router.push("/logout");
  }, [currentUser, router]);

  const [form] = Form.useForm();
  const users = GetCollection("users");

  const handleSubmit = (values) => {
    let foundUser = users.find(
      (doc) =>
        doc.data().username.toLowerCase() == values.username.toLowerCase()
    );
    let maxLength = 16;
    if (foundUser) {
      message.error("Username sudah ada yang pakai");
    }
    if (maxLength < values.username.length) {
      message.warning("Username terlalu panjang! Maksimal 16 karakter");
    }
    if (!foundUser) {
      updateDataDoc(`users`, user?.id, {
        username: values.username.toLowerCase(),
      });
      message.success("Username berhasil diubah");
    }
  };

  form.setFieldValue("username", user?.data().username);

  return (
    <>
      {user ? (
        <div className="costum__bg__image">
          <Metadata
            title="Yazzlinker"
            canonical={process.env.NEXT_PUBLIC_SITE_URL}
            openGraph={{
              url: process.env.NEXT_PUBLIC_SITE_URL,
              title: "Yazzlinker",
              images: [
                {
                  url: "/images/seoimage.jpg",
                  width: 800,
                  height: 800,
                  alt: "Create your own yazzlinker",
                },
              ],
            }}
            icon="/images/loadingscreen.gif"
          />
          <NavbarAdmin />
          <ModalShareButton show={state.isShowModalShareButton} />
          <ModalHistoryVisitors
            user={user}
            show={state.isShowModalHistoryVisitors}
          />
          <div className="lg:px-96 lg:pt-24 pt-36">
            <div className="bg-white py-4 px-6 rounded-md shadow-lg shadow-gray-500/50">
              <h2 className="text-center text-black text-3xl">My Account</h2>
              <div className="mb-5">
                <p>My information</p>
                <div className="bg-gray-200 rounded-md px-4 py-2">
                  <p className="text-sm m-0 ml-2 font-semibold">Name</p>
                  <div className="border-b-2 ml-2 border-white">
                    <Input
                      value={user.data().name}
                      size="large"
                      bordered={false}
                      onChange={(e) => {
                        updateDataDoc(`users`, user.id, {
                          name: e.target.value,
                        });
                      }}
                      className="px-0"
                      maxLength={20}
                    />
                  </div>
                  <p className="text-sm m-0 ml-2 mt-4 font-semibold">Email</p>
                  <div className="border-b-2 ml-2 border-white">
                    <Input
                      value={currentUser?.email}
                      size="large"
                      bordered={false}
                      className="px-0"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-gray-500 m-0 mt-2 ml-2">
                    Your email can&apos;t be changed as you signed up using your
                    google-oauth2 account.
                  </p>
                </div>
              </div>
              <div>
                <p>Accounts action for {user.data().username}</p>
                <div className="bg-gray-200 rounded-md px-4 py-2">
                  <p className="text-sm m-0 ml-2 font-semibold">Username</p>
                  <Form
                    form={form}
                    onFinish={(values) => handleSubmit(values)}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="username"
                      className=" border-b-2 ml-2 border-white"
                      rules={[
                        {
                          required: true,
                          message: "Masukan username kamu!",
                        },
                        () => ({
                          validator(_, value) {
                            if (!value || value.match(/^[a-zA-Z0-9]+$/)) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Username hanya boleh mengandung huruf dan angka!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        value={user.data().username}
                        size="large"
                        bordered={false}
                        className="px-0"
                        maxLength={16}
                      />
                    </Form.Item>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="mt-1 font-semibold hover:bg-gray-100 transition-all bg-white rounded-md px-2 py-1 border-2 border-gray-300"
                      >
                        Change username
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
