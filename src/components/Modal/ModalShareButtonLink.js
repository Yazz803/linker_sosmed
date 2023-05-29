/* eslint-disable @next/next/no-img-element */
import { ShareAltOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { PARAMS } from "yazz/constants/constants";
import { useAppContext } from "yazz/context/AppContext";
import { copyToClipboard } from "yazz/utils/helpers";
import ShareButtonLink from "../ShareButtonLink";
import WhatsappIcon from "../Icon/WhatsappIcon";
import LinkedinIcon from "../Icon/LinkedinIcon";

export default function ModalShareButtonLink(props) {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  let currentUser = state.dataModalShareButtonLink?.user;
  let singleDoc = state.dataModalShareButtonLink?.document;
  const handleOnCancel = () => {
    dispatch({ type: PARAMS.SET_MODAL_SHARE_BUTTON_LINK, value: false });
  };
  return (
    <Modal
      title={<p className="text-center m-0 text-lg">Share this link</p>}
      footer={null}
      open={props.show}
      style={{
        bottom: 0,
      }}
      centered
      onCancel={handleOnCancel}
      keyboard
    >
      <div className="text-base mt-7">
        <ShareButtonLink
          link={`https://wa.me/?text=${singleDoc?.data().link}`}
          icon={<WhatsappIcon />}
        >
          Share via Whatsapp
        </ShareButtonLink>
        <ShareButtonLink
          link={`https://www.linkedin.com/shareArticle?mini=true&url=${
            singleDoc?.data().link
          }&title=Check%20out%20${
            currentUser?.data().username
          }%20on%20Yazz&summary=Check%20out%20${
            currentUser?.data().username
          }%20on%20Yazz&source=${process.env.NEXT_PUBLIC_SITE_URL}/u/${
            currentUser?.data().username
          }`}
          icon={<LinkedinIcon />}
        >
          Share on Linkedin
        </ShareButtonLink>
        <div className="flex justify-between items-center pb-5 border-b w-full p-2">
          <span className="flex items-center gap-2 text-lg font-semibold">
            <ShareAltOutlined /> Share this Link
          </span>
          <div className="text-center">
            <span
              onClick={() => {
                copyToClipboard(singleDoc?.data().link);
              }}
              className="cursor-pointer bg-gray-600 text-white border rounded-md px-3 py-2 text-base font-semibold"
            >
              Copy Link
            </span>
          </div>
        </div>
        <div className="mt-7">
          <h3 className="text-lg mb-0">Create your own linker</h3>
          <p className="m-0 font-semibold text-gray-400 text-sm">
            Hayu buruan cobain!
          </p>
        </div>
        <div
          onClick={() => {
            router.push("/login");
          }}
          className="cursor-pointer text-center font-bold mt-5 bg-gray-700 py-3 rounded-full text-white"
        >
          Sign up for free
        </div>
      </div>
    </Modal>
  );
}
