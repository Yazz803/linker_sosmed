import React from "react";

export default function UserHeadline(props) {
  return (
    <div
      className="font-semibold text-base text-center my-7"
      style={{
        color: props.appearance?.data().font_color,
      }}
    >
      {props.document.data().title}
    </div>
  );
}
