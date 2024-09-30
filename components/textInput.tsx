"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export type Ref = HTMLInputElement;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  styles?: string;
  label?: string;
  labelStyles?: string;
  error?: string[];
}

// interface FinalProps extends Omit<Props,"defaultValue">{

//   defaultValue?: string | null;
// }

const TextInput = React.forwardRef<Ref, Props>(
  ({ styles, label, labelStyles, error, type, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full flex flex-col mt-4">
        {label && <p className={`text-sm mb-2 ${labelStyles}`}>{label}</p>}

        <div className="relative">
          <input
            ref={ref}
            className={`bg-[#f5f5f5] rounded border border-[#66666690] outline-none text-sm px-4 py-3 placeholder:text-[#666] ${styles}`}
            type={isPasswordType && showPassword ? "text" : type}
            // name={name}
            // placeholder={placeholder}
            // ref={ref}
            // value={value || ""}
            {...rest}
          />
          {isPasswordType && (
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
