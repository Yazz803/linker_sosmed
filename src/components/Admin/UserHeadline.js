import React from "react";

export default function UserHeadline(props) {
  return (
    <div
      className="font-semibold backdrop-blur-sm text-base text-center py-4 rounded-md my-7"
      style={{
        color: props.appearance?.data().font_color,
        backgroundColor: `${props.appearance?.data().button_color}10`,
      }}
    >
      {props.document.data().title}
    </div>
  );
}
