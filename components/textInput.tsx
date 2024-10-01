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
      <div
        className="w-full flex flex-col mt-4  rounded-md"
        // has-[:invalid]:bg-gray-200
        // has-[.peer]:border-black
        // has-[.peer]:border-[1px]
      >
        {label && <p className={`text-sm mb-2 ${labelStyles} `}>{label}</p>}

        <div className="relative">
          <input
            ref={ref}
            className={`bg-[#f5f5f5] rounded border border-[#66666690] outline-none text-sm px-4 py-3 placeholder:text-[#666] 
              focus:ring-2 
            focus:ring-[#f47f40]
            focus:ring-offset-2 transition-shadow invalid:focus:bg-gray-200 invalid:focus:ring-red-700
            peer
              ${styles}`}
            type={isPasswordType && showPassword ? "text" : type}
            // name={name}
            // placeholder={placeholder}
            // ref={ref}
            // value={value || ""}
            {...rest}
          />
          {/* <div className="peer-invalid:text-red-100">asdasd</div> */}
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
