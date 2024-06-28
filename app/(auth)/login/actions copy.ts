"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  // .refine(checkEmailExists, "An account with this email does not exist."),
  password: z.string({
    required_error: "Password is required",
  }),
  // .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

interface LoginProps {
  user: any;
  token: string | null;
}

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data); //SafeParse = spa
  if (!result.success) {
    console.log(result.error.flatten()); //flatten 에러를 이쁘게 만들어줌
    return result.error.flatten();
  } else {
    const session = await getSession();
    // //  if its passed
    // const data_result = await fetch("users/login", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: result.data.email,
    //     password: result.data.password,
    //   }),
    // });

    // const res = await data_result.json();
    // console.log("resres", res);

    // if (res.status === "success") {
    //   const session = await getSession();
    //   session.id = res.data.user!._id;
    //   await session.save(); //비밀번호와 함친 암호글자로 web 브라우저 cookie에 저장됨!
    //   redirect("/");
    // } else {
    //   return {
    //     // zod가 애러를 보내는 방식의 오브젝트를 만들어서 리턴.. 마치zod가 한것처럼
    //     // 그래야 인풋이나 에러낼때 반응이 동일하다!
    //     fieldErrors: {
    //       password: ["Wrong password."],
    //       email: [],
    //     },
    //   };
    // }
  }
}
