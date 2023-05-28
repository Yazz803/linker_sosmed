/* eslint-disable @next/next/no-img-element */
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Link from "next/link";
import { useAppContext } from "yazz/context/AppContext";
import { PARAMS } from "yazz/constants/constants";

export default function UserButtonLink(props) {
  const { dispatch } = useAppContext();
  const [buttonHover, setButtonHover] = useState(
    Array(props.links.length).fill(false)
  );

  const handleMouseEnter = (index) => {
    setButtonHover((prevButtonHover) => {
      const newButtonHover = [...prevButtonHover];
      newButtonHover[index] = true;
      return newButtonHover;
    });
  };

  const handleMouseLeave = (index) => {
    setButtonHover((prevButtonHover) => {
      const newButtonHover = [...prevButtonHover];
      newButtonHover[index] = false;
      return newButtonHover;
    });
  };

  let buttonStyle = {};
  if (props.appearance?.data().fill) {
    buttonStyle = {
      backgroundColor: !buttonHover[props.index]
        ? props.appearance?.data().button_color
        : "#ffffff15",
      border: `1px solid ${props.appearance?.data().button_color}`,
      color: !buttonHover[props.index]
        ? props.appearance?.data().button_font_color
        : "white",
    };
  } else {
    buttonStyle = {
      backgroundColor: !buttonHover[props.index] ? "" : "#ffffff00",
      border: `1px solid ${props.appearance?.data().button_color}`,
      color: !buttonHover[props.index]
        ? props.appearance?.data().button_font_color
        : "#333333",
    };
  }
  return (
    <Link href={props.document.data().link} target="_blank" passHref>
      <div
        className="button-fill-rounded-lg mt-5 text-center cursor-pointer transition-all animate-scale backdrop-blur-sm"
        style={buttonStyle}
        onMouseEnter={() => handleMouseEnter(props.index)}
        onMouseLeave={() => handleMouseLeave(props.index)}
      >
        {/* <img
          src="/images/loadingscreen.gif"
          className="rounded-full w-14 p-1 absolute"
          alt=""
        /> */}
        <button className="text-base py-4 font-semibold">
          {props.document.data().title}
        </button>
        <div className="flex gap-2 absolute p-1 top-1 right-0 z-40">
          <div
            // onClick={handleOpenModalShare}
            onClick={(e) => {
              e.preventDefault();
              dispatch({
                type: PARAMS.SET_MODAL_SHARE_BUTTON_LINK,
                value: true,
              });
            }}
            className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full transition-all hover:bg-white"
          >
            <UploadOutlined
              className="text-xl pl-[1px]"
              style={{ color: props.appearance?.data().button_font_color }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
