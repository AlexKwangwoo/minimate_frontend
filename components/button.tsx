"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import SingleLoader from "./singleLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  outside_loading?: boolean;
  show_loading?: boolean;
  title: string;
  containerStyles: string;
  iconLeft?: JSX.Element;
  iconStyles?: string;
  iconRight?: JSX.Element;
}

const Buttons = ({
  outside_loading = false,
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

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={pending}
      className={`inline-flex items-center ${containerStyles} `}
    >
      {/* ex) iconLeft={<IoMdSettings/>} */}
      {iconLeft && <div className={`${iconStyles}`}>{iconLeft}</div>}

      {show_loading && (pending || outside_loading) ? (
        <SingleLoader loadingSize={19} extraStyle="mb-[-4px]" />
      ) : (
        title
      )}

      {iconRight && <div className={`${iconStyles}`}>{iconRight}</div>}
    </button>
  );
};
export default Buttons;
