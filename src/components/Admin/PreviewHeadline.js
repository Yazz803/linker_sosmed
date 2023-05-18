import React from "react";

export default function PreviewHeadline(props) {
  return (
    <div
      className="font-semibold text-[10px] text-center my-3"
      style={{
        color: props.appearance?.data().font_color,
      }}
    >
      {props.document.data().title}
    </div>
  );
}
