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
  const { state } = useAppContext();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const user = getUser("uid", currentUser?.uid);

  useEffect(() => {
    if (!currentUser) router.push("/login");
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
      title: "Edit your title",
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
                                    message: "",
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
                          <>
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
                          </>
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
