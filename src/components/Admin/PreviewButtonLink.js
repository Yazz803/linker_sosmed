import React, { useState } from "react";

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
    <div
      className="button-fill-rounded-lg mt-2 text-center cursor-pointer backdrop-blur-sm"
      style={buttonStyle}
      onMouseEnter={() => handleMouseEnter(props.index)}
      onMouseLeave={() => handleMouseLeave(props.index)}
    >
      <a href={props.document.data().link} target="_blank">
        <button className="text-[9px] py-2 font-semibold">
          {props.document.data().title}
        </button>
      </a>
    </div>
  );
}
