"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import SingleLoader from "./singleLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  show_loading?: boolean;
  title: string;
  containerStyles: string;
  iconLeft?: JSX.Element;
  iconStyles?: string;
  iconRight?: JSX.Element;
}

const Buttons = ({
  show_loading = false,
  title,
  containerStyles,
  iconLeft,
  iconStyles,
  iconRight,
  type = "button",
  onClick,
}: ButtonProps) => {
  const { pending } = useFormStatus();
  console.log("pending", pending);

  return (
    <button
      onClick={onClick}
      type={type}
      className={`inline-flex items-center ${containerStyles} `}
    >
      {/* ex) iconLeft={<IoMdSettings/>} */}
      {iconLeft && <div className={`${iconStyles}`}>{iconLeft}</div>}

      {show_loading && pending ? (
        <SingleLoader loadingSize={22} extraStyle="mb-[-4px]" />
      ) : (
        title
      )}

      {iconRight && <div className={`${iconStyles}`}>{iconRight}</div>}
    </button>
  );
};
export default Buttons;
