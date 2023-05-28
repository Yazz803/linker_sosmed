import { ShareAltOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { PARAMS } from "yazz/constants/constants";
import { useAppContext } from "yazz/context/AppContext";
import { useAuth } from "yazz/context/AuthContext";
import { GetCountVisitors } from "yazz/utils/getCountVisitors";
import { copyToClipboard, getUser } from "yazz/utils/helpers";

export default function ModalShareButton(props) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser?.uid);
  const { dispatch } = useAppContext();
  const handleOnCancel = () => {
    dispatch({ type: PARAMS.SET_MODAL_SHARE_BUTTON, value: false });
  };
  return (
    <Modal
      title={
        <div className="text-center">
          <p className="m-0">{user?.data().username}</p>
          <p className="text-gray-500">
            Get more visitors by sharing your Linker everywhere.
          </p>
        </div>
      }
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
        <div className="flex justify-between items-center pb-5 w-full">
          <span className="flex items-center gap-2 text-lg font-semibold">
            <ShareAltOutlined /> Share this Linker
          </span>
          <div className="text-center">
            <span
              onClick={() => {
                copyToClipboard(
                  `${process.env.NEXT_PUBLIC_SITE_URL}/u/${
                    user?.data().username
                  }`
                );
              }}
              className="cursor-pointer bg-gray-600 text-white border rounded-md px-3 py-2 text-base font-semibold"
            >
              Copy Link
            </span>
          </div>
        </div>
        <p className="border-b font-semibold">
          Total Visitors : {GetCountVisitors()}
        </p>
        <div
          onClick={() => {
            router.push("/admin/account");
            handleOnCancel();
          }}
          className="cursor-pointer text-center font-bold mt-5 bg-gray-700 py-3 rounded-full text-white"
        >
          Change your username
        </div>
      </div>
    </Modal>
  );
}
