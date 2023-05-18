/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import NavbarAdmin from "yazz/components/Admin/NavbarAdmin";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import { Alert, ColorPicker, Form, Input } from "antd";
import PreviewWeb from "yazz/components/Admin/PreviewWeb";
import { getAppearance, getUser, updateDataDoc } from "yazz/utils/helpers";
import LoadingPage from "yazz/components/Admin/LoadingPage";
import { useMediaQuery } from "react-responsive";
import ModalShareButton from "yazz/components/Admin/ModalShareButton";
import { useAppContext } from "yazz/context/AppContext";

export default function AppearancePage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);
  const [form] = Form.useForm();
  const user = getUser("uid", currentUser?.uid);
  const { state } = useAppContext();
  const appearance = getAppearance(user?.id);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {user ? (
        <>
          <ModalShareButton show={state.isShowModalShareButton} />
          <NavbarAdmin />
          <div className="lg:px-16 px-5">
            <div className="lg:flex">
              <div className="lg:w-[60%] lg:mt-24 pb-36 lg:pt-0 lg:pb-0 pt-36">
                <div className="lg:mr-20">
                  <h2 className="text-center w-36 mx- text-xl font-bold bg-white shadow-lg shadow-gray-500/100 p-2 rounded-md">
                    Profile
                  </h2>
                  <div className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-500/100">
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
                          defaultValue={user?.data().profile_title}
                          placeholder="Masukan Profile Title"
                          onChange={(e) => {
                            updateDataDoc("users", user?.id, {
                              profile_title: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                      <Form.Item label="Bio">
                        <Input.TextArea
                          showCount
                          maxLength={80}
                          onChange={(e) => {
                            updateDataDoc("users", user?.id, {
                              bio: e.target.value,
                            });
                          }}
                          defaultValue={user?.data().bio}
                          placeholder="Masukan Bio"
                        />
                      </Form.Item>
                    </Form>
                  </div>
                  <Alert
                    message={
                      <span className="font-bold">Costum Appearance</span>
                    }
                    description="Completely customize your Linktree profile. Change your
                    background with colors, gradients and images. Choose a
                    button style, change the typeface and more."
                    className="my-5 bg-white"
                  />
                  {appearance && (
                    <>
                      <div>
                        <h2 className="my-5 pl-6 w-44 mx- text-xl font-bold bg-white shadow-lg shadow-gray-500/100 p-2 rounded-md">
                          Background
                        </h2>
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-500/100">
                          <h4 className="font-semibold ">Color</h4>
                          <div className="flex gap-8">
                            <ColorPicker
                              className="scale-150 ml-2 mt-2"
                              value={appearance.data().background_color}
                              onChange={(value) =>
                                updateDataDoc(
                                  `users/${user.id}/appearance_settings`,
                                  appearance.id,
                                  {
                                    background_color: value.toHexString(),
                                  }
                                )
                              }
                            />
                            <div className="bg-gray-200 w-[50%] rounded-md p-2">
                              <p className="m-0 text-sm mb-1">Color</p>
                              <p className="uppercase m-0 font-semibold">
                                {appearance.data().background_color}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="my-5 pl-6 w-44 text-xl font-bold bg-white shadow-lg shadow-gray-500/100 p-2 rounded-md">
                          Buttons
                        </h2>
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-500/100">
                          <h4 className="font-semibold ">Button Color</h4>
                          <div className="flex gap-8">
                            <ColorPicker
                              className="scale-150 ml-2 mt-2"
                              value={appearance.data().button_color}
                              onChange={(value) =>
                                updateDataDoc(
                                  `users/${user.id}/appearance_settings`,
                                  appearance.id,
                                  {
                                    button_color: value.toHexString(),
                                  }
                                )
                              }
                            />
                            <div className="bg-gray-200 w-[50%] rounded-md p-2">
                              <p className="m-0 text-sm mb-1">Button Color</p>
                              <p className="uppercase m-0 font-semibold">
                                {appearance.data().button_color}
                              </p>
                            </div>
                          </div>
                          <h4 className="font-semibold mt-5">
                            Button Font Color
                          </h4>
                          <div className="flex gap-8">
                            <ColorPicker
                              className="scale-150 ml-2 mt-2"
                              value={appearance.data().button_font_color}
                              onChange={(value) =>
                                updateDataDoc(
                                  `users/${user.id}/appearance_settings`,
                                  appearance.id,
                                  {
                                    button_font_color: value.toHexString(),
                                  }
                                )
                              }
                            />
                            <div className="bg-gray-200 w-[50%] rounded-md p-2">
                              <p className="m-0 text-sm mb-1">
                                Button Font Color
                              </p>
                              <p className="uppercase m-0 font-semibold">
                                {appearance.data().button_font_color}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="my-5 pl-6 w-44 text-xl font-bold bg-white shadow-lg shadow-gray-500/100 p-2 rounded-md">
                          Fonts
                        </h2>
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-500/100">
                          <h4 className="font-semibold ">Font Color</h4>
                          <div className="flex gap-8">
                            <ColorPicker
                              className="scale-150 ml-2 mt-2"
                              value={appearance.data().font_color}
                              onChange={(value) =>
                                updateDataDoc(
                                  `users/${user.id}/appearance_settings`,
                                  appearance.id,
                                  {
                                    font_color: value.toHexString(),
                                  }
                                )
                              }
                            />
                            <div className="bg-gray-200 w-[50%] rounded-md p-2">
                              <p className="m-0 text-sm mb-1">Font Color</p>
                              <p className="uppercase m-0 font-semibold">
                                {appearance.data().font_color}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {!isMobile && (
                <div className="w-[40%] border-l border-r flex items-center shadow-2xl shadow-gray-500/100 justify-center bg-[#ffffff42] backdrop-blur-sm border-gray-300 h-screen sticky top-0">
                  <PreviewWeb />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
