/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import NavbarAdmin from "yazz/components/Admin/NavbarAdmin";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import { Alert, ColorPicker, Form, Input, Spin, Upload, message } from "antd";
import PreviewWeb from "yazz/components/Admin/PreviewWeb";
import { getAppearance, getUser, updateDataDoc } from "yazz/utils/helpers";
import LoadingPage from "yazz/components/Admin/LoadingPage";
import { useMediaQuery } from "react-responsive";
import ModalShareButton from "yazz/components/Admin/ModalShareButton";
import { useAppContext } from "yazz/context/AppContext";
import Metadata from "yazz/components/Metadata";
import ImgCrop from "antd-img-crop";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { storage } from "yazz/config/firebase";
import { UploadOutlined } from "@ant-design/icons";
import ModalHistoryVisitors from "yazz/components/Modal/ModalHistoryVisitors";

export default function AppearancePage() {
  const [loadingUploadPP, setLoadingUploadPP] = useState(false);
  const [loadingUploadBg, setLoadingUploadBg] = useState(false);
  const router = useRouter();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) router.push("/login");
    let foundUser = localStorage.getItem("user_yazz_linker");
    if (!foundUser) router.push("/logout");
  }, [currentUser, router]);
  const [form] = Form.useForm();
  const user = getUser("uid", currentUser?.uid);
  const { state } = useAppContext();
  const appearance = getAppearance(user?.id);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleUploadImagePP = async (file, user) => {
    setLoadingUploadPP(true);
    try {
      if (file.size > 2_200_000)
        return message.warning("Size img tidak boleh lebih dari 2MB");
      const storageRef = ref(storage, file.name);
      const snapshot = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);

      if (user.data().img_name) {
        const oldImgRef = ref(storage, user.data().img_name);
        await deleteObject(oldImgRef);
      }

      updateDataDoc(`users`, user.id, {
        photoURL: imageUrl,
        img_name: file.name,
      }).then(() => {
        message.success("Photo Profile has been updated!");
        setLoadingUploadPP(false);
      });
      // console.log({ imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Image upload failed.");
      setLoadingUploadPP(false);
    }
  };

  const handleUploadImageBackground = async (file, user, appearance) => {
    setLoadingUploadBg(true);
    try {
      if (file.size > 4_194_304) {
        setLoadingUploadBg(false);
        return message.warning("Size img tidak boleh lebih dari 4MB");
      }
      const storageRef = ref(storage, file.name);
      const snapshot = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);

      if (appearance.data().img_name) {
        const oldImgRef = ref(storage, appearance.data().img_name);
        await deleteObject(oldImgRef);
      }

      updateDataDoc(`users/${user.id}/appearance_settings`, appearance.id, {
        background_image: imageUrl,
        img_name: file.name,
      }).then(() => {
        message.success("Background Image has been updated!");
        setLoadingUploadBg(false);
      });
      // console.log({ imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Image upload failed.");
      setLoadingUploadBg(false);
    }
  };

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
          <ModalShareButton show={state.isShowModalShareButton} />
          <ModalHistoryVisitors
            user={user}
            show={state.isShowModalHistoryVisitors}
          />
          <NavbarAdmin />
          <div className="lg:px-16 px-5">
            <div className="lg:flex">
              <div className="lg:w-[60%] lg:mt-24 pb-36 lg:pt-0 lg:pb-0 pt-36">
                <div className="lg:mr-20">
                  <h2 className="text-center mb-[-10px] w-36 mx- text-xl font-bold bg-gray-600 text-white shadow-lg shadow-gray-500/50 border-t-4 border-gray-800 p-2 rounded-t-2xl">
                    Profile
                  </h2>
                  <div className="bg-gray-600 text-white rounded-b-2xl rounded-tr-2xl p-5 shadow-lg shadow-gray-500/100">
                    <div className="w-full">
                      <div className="lg:flex gap-10 items-center">
                        <div className="flex flex-col gap-4 items-center lg:w-[30%]">
                          <Spin
                            spinning={loadingUploadPP}
                            delay={500}
                            size="large"
                            wrapperClassName="bg-black rounded-full"
                          >
                            <div className="relative rounded-full border-2 border-slate-500">
                              <a href={user?.data().photoURL} target="_blank">
                                <img
                                  src={user?.data().photoURL}
                                  className="rounded-full w-24 cursor-pointer overflow-hidden transition-all"
                                  alt="Photo Profile"
                                />
                              </a>
                            </div>
                          </Spin>
                          <ImgCrop rotationSlider>
                            <Upload
                              beforeUpload={(file) => {
                                const fileName = `${Date.now()}_${file.name}`;
                                const newFile = new File([file], fileName, {
                                  type: file.type,
                                });
                                handleUploadImagePP(newFile, user);
                                return false;
                              }}
                              showUploadList={false}
                            >
                              <button className="w-full text-white font-semibold px-5 py-2 rounded-3xl bg-slate-800 hover:bg-slate-900 transition-all">
                                Pick an image
                              </button>
                            </Upload>
                          </ImgCrop>
                        </div>
                        <Form
                          layout="vertical"
                          className="mt-8 w-full"
                          form={form}
                        >
                          <Form.Item
                            label={
                              <span className="text-white">Profile Title</span>
                            }
                          >
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
                          <Form.Item
                            label={<span className="text-white">Bio</span>}
                          >
                            <Input.TextArea
                              // showCount
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
                    </div>
                  </div>
                  <Alert
                    message={
                      <span className="font-bold">Costum Appearance</span>
                    }
                    description="Completely customize your Linker profile. Change your
                    background with colors, gradients and images. Choose a
                    button style, change the typeface and more."
                    className="my-5 bg-white"
                  />
                  {appearance && (
                    <>
                      <div>
                        <h2 className="text-center mb-[-10px] w-36 mx- text-xl font-bold bg-gray-600 text-white shadow-lg shadow-gray-500/50 border-t-4 border-gray-800 p-2 rounded-t-2xl mt-5">
                          Background
                        </h2>
                        <div className="bg-gray-600 text-white rounded-b-2xl rounded-tr-2xl p-5 shadow-lg shadow-gray-500/100">
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
                                    background_image: "none",
                                    img_name: "",
                                  }
                                ).then(async () => {
                                  if (
                                    appearance.data().background_image != "none"
                                  ) {
                                    const olgImgBg = ref(
                                      storage,
                                      appearance.data().img_name
                                    );
                                    await deleteObject(olgImgBg);
                                  }
                                })
                              }
                            />
                            <div className="bg-gray-200 w-[50%] rounded-md p-2 text-gray-700">
                              <p className="m-0 text-sm mb-1">Color</p>
                              <p className="uppercase m-0 font-semibold">
                                {appearance.data().background_color}
                              </p>
                            </div>
                          </div>
                          <small className="text-red-500 font-semibold">
                            Mengganti Background Color akan menghapus Background
                            Image!
                          </small>
                          <div className="mt-7 text-white">
                            <h4 className="font-semibold ">
                              Costum Background Image
                            </h4>
                            <Spin
                              spinning={loadingUploadBg}
                              delay={500}
                              size="large"
                            >
                              <ImgCrop
                                rotationSlider
                                aspectSlider
                                aspect={1.5 / 1}
                              >
                                <Upload.Dragger
                                  beforeUpload={(file) => {
                                    const fileName = `${Date.now()}_${
                                      file.name
                                    }`;
                                    const newFile = new File([file], fileName, {
                                      type: file.type,
                                    });
                                    handleUploadImageBackground(
                                      newFile,
                                      user,
                                      appearance
                                    );
                                    return false;
                                  }}
                                  showUploadList={false}
                                >
                                  <p className="text-5xl mb-3">
                                    <UploadOutlined className="text-white" />
                                  </p>
                                  <p className="text-white mb-1 font-semibold">
                                    Click or drag Image to this area to upload
                                  </p>
                                  <p className="text-gray-300">
                                    Maksimal ukuran gambar adalah 4MB
                                  </p>
                                </Upload.Dragger>
                              </ImgCrop>
                            </Spin>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-center mb-[-10px] w-36 mx- text-xl font-bold bg-gray-600 text-white shadow-lg shadow-gray-500/50 border-t-4 border-gray-800 p-2 rounded-t-2xl mt-5">
                          Buttons
                        </h2>
                        <div className="bg-gray-600 text-white rounded-b-2xl rounded-tr-2xl p-5 shadow-lg shadow-gray-500/100">
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
                            <div className="bg-gray-200 w-[50%] rounded-md p-2 text-gray-700">
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
                            <div className="bg-gray-200 w-[50%] rounded-md p-2 text-gray-700">
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
                        <h2 className="text-center mb-[-10px] w-36 mx- text-xl font-bold bg-gray-600 text-white shadow-lg shadow-gray-500/50 border-t-4 border-gray-800 p-2 rounded-t-2xl mt-5">
                          Fonts
                        </h2>
                        <div className="bg-gray-600 text-white rounded-b-2xl rounded-tr-2xl p-5 shadow-lg shadow-gray-500/100">
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
                            <div className="bg-gray-200 w-[50%] rounded-md p-2 text-gray-700">
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
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
