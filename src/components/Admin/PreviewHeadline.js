import React from "react";

export default function PreviewHeadline(props) {
  return (
    <div
      className="font-semibold backdrop-blur-sm py-2 rounded-sm text-[10px] text-center my-3"
      style={{
        color: props.appearance?.data().font_color,
        backgroundColor: `${props.appearance?.data().button_color}10`,
      }}
    >
      {props.document.data().title}
    </div>
  );
}
