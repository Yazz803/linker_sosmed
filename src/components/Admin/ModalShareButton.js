import { Modal } from "antd";
import React from "react";
import { PARAMS } from "yazz/constants/constants";
import { useAppContext } from "yazz/context/AppContext";
import { useAuth } from "yazz/context/AuthContext";
import { copyToClipboard, getUser } from "yazz/utils/helpers";

export default function ModalShareButton(props) {
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser?.uid);
  const { dispatch } = useAppContext();
  const handleOnCancel = () => {
    dispatch({ type: PARAMS.SET_MODAL_SHARE_BUTTON, value: false });
  };
  return (
    <Modal
      title={<p className="text-center m-0">Share Your Linker</p>}
      footer={null}
      centered
      open={props.show}
      onCancel={handleOnCancel}
    >
      <div className="border rounded-md px-3 py-2 text-base">
        {`${process.env.NEXT_PUBLIC_SITE_URL}/u/${user?.data().username}`}
      </div>
      <div className="text-center mt-7">
        <span
          onClick={() => {
            copyToClipboard(
              `${process.env.NEXT_PUBLIC_SITE_URL}/u/${user?.data().username}`
            );
          }}
          className="bg-blue-400 text-white border rounded-md px-3 py-2 text-base font-semibold"
        >
          Copy Link
        </span>
      </div>
    </Modal>
  );
}
