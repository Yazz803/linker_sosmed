/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";

export default function PreviewButtonLink(props) {
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
        className="button-fill-rounded-lg mt-2 text-center cursor-pointer animate-scale backdrop-blur-sm"
        style={buttonStyle}
        onMouseEnter={() => handleMouseEnter(props.index)}
        onMouseLeave={() => handleMouseLeave(props.index)}
      >
        {/* <img
          src="/images/loadingscreen.gif"
          className="rounded-full w-6 top-[1px] p-[2px] absolute"
          alt=""
        /> */}
        <button className="text-[9px] py-2 font-semibold">
          {props.document.data().title}
        </button>
        <div className="flex gap-2 absolute top-1 p-[2px] right-0 z-40">
          <div
            // onClick={handleOpenModalShare}
            onClick={(e) => {
              e.preventDefault();
            }}
            className="cursor-pointer flex items-center justify-center h-4 w-4 rounded-full transition-all hover:bg-white"
          >
            <UploadOutlined
              className=" text-xs pl-[1px]"
              style={{ color: props.appearance?.data().button_font_color }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
