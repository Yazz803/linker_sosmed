import React, { useState } from "react";

export default function UserButtonLink(props) {
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
        : "#ffffff00",
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
      className="button-fill-rounded-lg mt-5 text-center cursor-pointer"
      style={buttonStyle}
      onMouseEnter={() => handleMouseEnter(props.index)}
      onMouseLeave={() => handleMouseLeave(props.index)}
    >
      <a href={props.document.data().link} target="_blank">
        <button className="text-base py-4 font-semibold">
          {props.document.data().title}
        </button>
      </a>
    </div>
  );
}
