"use server";

import { z } from "zod";
import API from "../../utils/request";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  username: z.string().toLowerCase(),
  birth: z.string(),
  phone_number: z.string().toLowerCase(),
  gender: z.enum(["male", "female"]),
  // .refine(checkEmailExists, "An account with this email does not exist."),
  password: z.string({
    required_error: "Password is required",
  }),
  passwordConfirm: z.string({
    required_error: "Password Confirm is required",
  }),

  // .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

interface SignUpProps {
  email: string;
  username: string;
  birth: string;
  phone_number: string;
  gender: string;
  password: string;
  passwordConfirm: string;
}

export async function signUp(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    birth: formData.get("birth"),
    phone_number: formData.get("phone_number"),
    gender: formData.get("gender"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };
  const result = await formSchema.spa(data); //SafeParse = spa
  if (!result.success) {
    console.log(result.error.flatten()); //flatten 에러를 이쁘게 만들어줌
    return { status: "fail", ...result.error.flatten(), general_error: null };
  } else {
    let redirectPath: string | null = null;
    console.log("resultresult", result);
    try {
      const res = await API.post<SignUpProps>("/users/signup", {
        email: result.data.email,
        username: result.data.username,
        birth: result.data.birth,
        phone_number: result.data.phone_number,
        gender: result.data.gender,
        password: result.data.password,
        passwordConfirm: result.data.passwordConfirm,
      });

      console.log("resres", res);

      return {
        status: "success",
        fieldErrors: {
          email: [],
          username: [],
          birth: [],
          phone_number: [],
          gender: [],
          password: [],
          passwordConfirm: [],
        },
        general_error: null,
      };
    } catch (e: any) {
      return {
        // zod가 애러를 보내는 방식의 오브젝트를 만들어서 리턴.. 마치zod가 한것처럼
        // 그래야 인풋이나 에러낼때 반응이 동일하다!
        status: "fail",
        fieldErrors: {
          email: [],
          username: [],
          birth: [],
          phone_number: [],
          gender: [],
          password: [],
          passwordConfirm: [],
        },
        general_error: e.response.data.message,
      };
      console.log("error!!!!", e);
    } finally {
      // redirectPath && redirect(redirectPath);
    }
    //  if its passed
  }
}
