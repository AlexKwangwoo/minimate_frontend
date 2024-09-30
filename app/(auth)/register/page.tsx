"use client";

import Buttons from "@/components/button";
import TextInput from "@/components/textInput";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import BackgroundImg from "../../../public/assets/pattern.png";
import LogoDark from "../../../public/assets/logo-dark.png";

import Logo from "../../../public/assets/logo-dark.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  tostifyError,
  tostifySuccess,
} from "@/components/TostifyAlert/TostifyAlert";
import { signUp } from "./actions";

export default function Register() {
  const [state, dispatch] = useFormState(signUp, null);
  const router = useRouter();

  useEffect(() => {
    if (router && state !== null && state?.status === "success") {
      tostifySuccess("Signed Up Successfully!");
      router.push(`/login?email=${state.email}`);
    } else if (router && state !== null && state?.status === "fail") {
      tostifyError(state.general_error);
    }
  }, [router, state]);

  return (
    <div
      className="w-full h-[100vh] flex items-center justify-center sm:p-6 p-0 "
      style={{
        backgroundImage: `url('${BackgroundImg.src}')`,
        backgroundSize: "15%",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-[#fff] opacity-60 "></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      &#8203;
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 opacity-90"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div
          onClick={() => router.push("/")}
          className="w-full flex gap-2 items-center mb-6 cursor-pointer"
        >
          <div className="text-white w-16 h-16 flex items-center">
            <Image src={LogoDark} alt="logo" />
          </div>
          <span className="text-2xl font-semibold text-[#F37125]">
            MiniMate
          </span>
        </div>

        <div className="text-ascent-1 text-base font-semibold">
          Create your account
        </div>
        <form className="py-4 flex flex-col" action={dispatch}>
          {/* {error && (
            <span className="text-sm text-[#f64949fe] mt-0.5">{error}</span>
          )} */}
          <TextInput
            type="text"
            name="username"
            placeholder="Username"
            label="Username"
            required
            error={state?.fieldErrors?.username}
            styles="w-full"
          />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            required
            error={state?.fieldErrors?.email}
            styles="w-full"
          />
          <TextInput
            type="date"
            name="birth"
            placeholder="Date of Birth"
            label="Date of Birth"
            required
            styles="w-full"
          />
          {/* <TextInput
          type='text'
          name='gender'
          placeholder='Gender'
          label='Gender'
          value={formData.gender}
          onChange={handleChange}
          required
          styles='w-full'
        /> */}
          <div className="w-full flex flex-col mt-4">
            <label className="text-sm">Gender</label>
            <div className="mt-2 flex items-center">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  defaultChecked
                  // checked={formData.gender === "male"}
                  // onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  // checked={formData.gender === "female"}
                  // onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
          <TextInput
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            label="Phone Number"
            required
            styles="w-full"
            error={state?.fieldErrors?.phone_number}
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            required
            styles="w-full"
            error={state?.fieldErrors?.password}
          />
          <TextInput
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            label="Confirm Password"
            required
            styles="w-full"
            error={state?.fieldErrors?.password}
          />
          <Buttons
            show_loading
            type="submit"
            containerStyles={`inline-flex justify-center rounded-md bg-[#F37125] mt-6 px-8 py-3 text-base font-medium text-white outline-none`}
            title="Sign up"
          />
        </form>

        <div className="text-ascent-2 text-sm text-center flex justify-center items-center">
          Already has an account?
          <div
            onClick={() => router.push("/login")}
            className="text-[#F37125] font-semibold ml-2 cursor-pointer"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}
