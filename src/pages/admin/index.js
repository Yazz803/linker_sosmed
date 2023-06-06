/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import NavbarAdmin from "yazz/components/Admin/NavbarAdmin";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import { Collapse, Form, Input, message } from "antd";
import PreviewWeb from "yazz/components/Admin/PreviewWeb";
import {
  GetSubCollection,
  addDataDoc,
  getUser,
  updateDataDoc,
} from "yazz/utils/helpers";
import { ArrowDownOutlined, PicCenterOutlined } from "@ant-design/icons";
import { serverTimestamp } from "firebase/firestore";
import LoadingPage from "yazz/components/Admin/LoadingPage";
import CardLink from "yazz/components/Admin/CardLink";
import CardHeader from "yazz/components/Admin/CardHeader";
import { useMediaQuery } from "react-responsive";
import ModalShareButton from "yazz/components/Admin/ModalShareButton";
import { useAppContext } from "yazz/context/AppContext";
import Metadata from "yazz/components/Metadata";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import ModalHistoryVisitors from "yazz/components/Modal/ModalHistoryVisitors";
import { PARAMS } from "yazz/constants/constants";
import ModalHistoryLinkClicks from "yazz/components/Modal/ModalHistoryLinkClicks";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "yazz/config/firebase";

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form.validateFields().then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);
  return (
    <button
      type="submit"
      disabled={!submittable}
      className={`bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 rounded-full py-1 px-6 text-base text-white ${
        !submittable && "opacity-50 cursor-not-allowed"
      }`}
    >
      Add
    </button>
  );
};

export default function LinksPage() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const user = getUser("uid", currentUser?.uid);

  // request Permission notification
  useEffect(() => {
    if (user) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
          const messaging = getMessaging(app);
          onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            // ...
          });
          getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR,
          })
            .then((currentToken) => {
              if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
                // console.log({ currentToken });
                updateDataDoc(`users`, user.id, {
                  fcmToken: currentToken,
                });
              } else {
                // Show permission request UI
                console.log(
                  "No registration token available. Request permission to generate one."
                );
                // ...
              }
            })
            .catch((err) => {
              console.log("An error occurred while retrieving token. ", err);
              // ...
            });
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (!currentUser) router.push("/login");
    let foundUser = localStorage.getItem("user_yazz_linker");
    if (!foundUser) router.push("/logout");

    let isTour = localStorage.getItem("is_tour");
    if (!isTour) {
      dispatch({ type: PARAMS.SET_MODAL_TOUR_NAVBAR, value: true });
      localStorage.setItem("is_tour", JSON.parse(true));
    }
  }, [currentUser, router]);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const links = GetSubCollection(`users/${user?.id}/links`, {
    orderBy: ["list_number", "asc"],
  });
  // const getLinkListNumber = GetSubCollection(`users/${user?.id}/links`, {
  //   orderBy: ["list_number", "desc"],
  //   limit: 1,
  // })[0];

  // let lastListNumber = getLinkListNumber?.data().list_number;

  const onSubmit = (values) => {
    if (links.length >= 10)
      return message.warning("Link/Header sudah mencapai batas maksimal");
    let data = {
      link: values.link_url,
      title: values.title_link ? values.title_link : "Edit your title",
      type: "link",
      img: "",
      is_active: true,
      list_number: 0,
      createdAt: serverTimestamp(),
    };
    addDataDoc(`users/${user?.id}/links`, data)
      .then(() => {
        form.resetFields();
        message.success("Berhasil menambahkan link!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickAddHeader = () => {
    if (links.length >= 10)
      return message.warning("Link/Header sudah mencapai batas maksimal");
    let data = {
      link: "",
      title: "Headline Title",
      type: "header",
      img: "",
      is_active: true,
      list_number: 0,
      createdAt: serverTimestamp(),
    };
    addDataDoc(`users/${user?.id}/links`, data)
      .then(() => {
        message.success("Berhasil menambahkan header!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Draggable
  let handleDragBackendDnd = isMobile ? TouchBackend : HTML5Backend;
  const moveCard = (dragIndex, hoverIndex) => {
    console.log({ dragIndex });
    console.log({ hoverIndex });
    const dragCard = links[dragIndex];
    const newLinks = [...links];
    newLinks.splice(dragIndex, 1);
    newLinks.splice(hoverIndex, 0, dragCard);
    newLinks.forEach((link, i) => {
      updateDataDoc(`users/${user?.id}/links`, link.id, {
        list_number: i + 1,
      });
    });
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
          <NavbarAdmin />
          <ModalShareButton show={state.isShowModalShareButton} />
          <ModalHistoryVisitors
            user={user}
            show={state.isShowModalHistoryVisitors}
          />
          <ModalHistoryLinkClicks
            show={state.isShowModalHistoryLinkClicks}
            user={user}
          />
          <div className="lg:px-16">
            <div className="lg:flex">
              <div className="lg:w-[60%] lg:mt-24 pb-36 lg:pt-0 lg:pb-0 pt-36">
                <div className="lg:mr-20">
                  <div className="w-[90%] m-auto">
                    <Collapse>
                      <Collapse.Panel
                        className="font-bold rounded-full shadow-2xl shadow-gray-500/100 text-white bg-gray-600"
                        showArrow={false}
                        header={
                          <div className="flex items-center gap-2 justify-center text-white">
                            <ArrowDownOutlined /> Add Link
                          </div>
                        }
                        key="1"
                      >
                        <div>
                          <p className="text-lg">Enter URL</p>
                          <Form
                            form={form}
                            onFinish={(values) => onSubmit(values)}
                            autoComplete="off"
                            name="validateOnly"
                          >
                            <Form.Item name="title_link">
                              <Input
                                placeholder="Link Title"
                                showCount
                                maxLength={30}
                                bordered={false}
                                // addonBefore={
                                //   <span className="font-bold">https://</span>
                                // }
                                className="bg-gray-200 hover:bg-gray-200 focus:bg-gray-200"
                              />
                            </Form.Item>
                            <div className="flex gap-3 ">
                              <Form.Item
                                name="link_url"
                                className="w-full m-0"
                                rules={[
                                  {
                                    required: true,
                                    message: "",
                                  },
                                  {
                                    type: "url",
                                    message: "e.g: https://yazzlink.vercel.app",
                                  },
                                  {
                                    type: "string",
                                    min: 6,
                                    message: "",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Masukan URL"
                                  bordered={false}
                                  // addonBefore={
                                  //   <span className="font-bold">https://</span>
                                  // }
                                  className="bg-gray-200 hover:bg-gray-200 focus:bg-gray-200"
                                />
                              </Form.Item>
                              <Form.Item>
                                <SubmitButton form={form} />
                              </Form.Item>
                            </div>
                          </Form>
                        </div>
                      </Collapse.Panel>
                    </Collapse>

                    <div
                      onClick={handleClickAddHeader}
                      className="border rounded-full cursor-pointer bg-gray-600 hover:bg-gray-700 transition-all text-white px-4 py-2 absolute mt-5"
                    >
                      <p className="flex items-center gap-2 m-0">
                        <PicCenterOutlined /> Add header
                      </p>
                    </div>

                    <div className="mt-16"></div>

                    <DndProvider backend={handleDragBackendDnd}>
                      <div>
                        {links.map((document, i) => (
                          <div key={i}>
                            {document.data().type == "link" && (
                              <CardLink
                                links={links}
                                document={document}
                                user={user}
                                moveCard={moveCard}
                                index={i}
                                key={i}
                              />
                            )}
                            {document.data().type == "header" && (
                              <CardHeader
                                links={links}
                                document={document}
                                user={user}
                                moveCard={moveCard}
                                index={i}
                                key={i}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </DndProvider>
                  </div>
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
