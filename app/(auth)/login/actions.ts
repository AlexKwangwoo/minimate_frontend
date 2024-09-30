"use server";

import { z } from "zod";
import API from "../../utils/request";
import getSession from "@/lib/session";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

interface LoginProps {
  user: any;
  token: string;
}

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data); //SafeParse = spa
  if (!result.success) {
    console.log(result.error.flatten()); //flatten 에러를 이쁘게 만들어줌
    return { status: "fail", ...result.error.flatten(), general_error: null };
  } else {
    let redirectPath: string | null = null;
    try {
      const res = await API.post<LoginProps>("/users/login", {
        email: result.data.email,
        password: result.data.password,
      });

      const session = await getSession();
      session.user = res.data.user;
      session.token = res.data.token;

      await session.save(); //비밀번호와 함친 암호글자로 web 브라우저 cookie에 저장됨!
      // redirectPath = "/";

      // redirect("/"); 할수있는데 login success를 보여주고싶어서 useEffect이용해야함
      return {
        status: "success",
        fieldErrors: {
          password: [],
          email: [],
        },
        general_error: null,
      };
    } catch (e: any) {
      console.log("eee", e.response);
      return {
        // zod가 애러를 보내는 방식의 오브젝트를 만들어서 리턴.. 마치zod가 한것처럼
        // 그래야 인풋이나 에러낼때 반응이 동일하다!
        status: e.response.data.status,
        fieldErrors: {
          password: [],
          email: [],
        },
        general_error: e.response.data.message,
      };
    } finally {
      // redirectPath && redirect(redirectPath);
    }
  }
}
