"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  containerStyles: string;
}

const Buttons = ({
  title,
  containerStyles,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`inline-flex items-center ${containerStyles} `}
    >
      {/* ex) iconLeft={<IoMdSettings/>} */}
      {/* {iconLeft && <div className={`${iconStyles}`}>{iconLeft}</div>} */}

      {title}

      {/* {iconRight && <div className={`${iconStyles}`}>{iconRight}</div>} */}
    </button>
  );
};
export default Buttons;
