import React from "react";
import { ShareAltOutlined } from "@ant-design/icons";
import { useAppContext } from "yazz/context/AppContext";
import { PARAMS } from "yazz/constants/constants";

export default function NavbarShareButton() {
  const { dispatch } = useAppContext();
  return (
    <h3
      onClick={() => {
        dispatch({ type: PARAMS.SET_MODAL_SHARE_BUTTON, value: true });
      }}
      className="cursor-pointer flex justify-center items-center gap-2 hover:bg-gray-700 transition-all border font-semibold px-4 py-2 rounded-md m-0"
    >
      <ShareAltOutlined /> Share
    </h3>
  );
}
