"use client";

import Buttons from "@/components/button";
import TextInput from "@/components/textInput";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";
import { logIn } from "./actions";
import BackgroundImg from "../../../public/assets/pattern.png";
import Logo from "../../../public/assets/logo-dark.png";
import Image from "next/image";

export default function Login() {
  const [state, dispatch] = useFormState(logIn, null);

  return (
    <div
      className="w-full h-[100vh] flex items-center justify-center sm:p-6 p-0 "
      style={{
        backgroundImage: `url('${BackgroundImg.src}')`,
        backgroundSize: "15%",
      }}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-white opacity-60 "></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      &#8203;
      <div
        className="inline-block p-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full opacity-90"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div
          // onClick={() => navigate("/")}
          className="flex items-center w-full gap-2 mb-6 cursor-pointer"
        >
          <div className="flex items-center w-16 h-16 text-white">
            <Image src={Logo} alt="logo" />
          </div>
          <span className="text-2xl font-semibold text-hightColor">
            MiniMate
          </span>
        </div>

        <p className="text-base font-semibold text-ascent-1">
          Log in to your account
        </p>

        <form className=" py-4 flex flex-col gap-5=" action={dispatch}>
          {/* {errMsg?.message && (
            <span
              className={`text-sm ${
                errMsg?.status == "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              } mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )} */}
          <TextInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="email@example.com"
            required
            error={state?.fieldErrors.email}
            styles="w-full"
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            required
            error={state?.fieldErrors.password}
            styles="w-full pr-10"
          />
          <Buttons
            type="submit"
            containerStyles={`inline-flex justify-center rounded-md bg-[#F37125] mt-6 px-8 py-3 text-base font-medium text-white outline-none`}
            title="Login"
          />
        </form>
        <p className="text-sm text-center text-ascent-2">
          {/*  eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?
          <Link
            href="/register"
            className="text-[#F37125] font-semibold ml-2 cursor-pointer"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
