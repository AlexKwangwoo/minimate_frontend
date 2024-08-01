"use server";
import API from "../../../utils/request";
import getSession from "@/lib/session";
import { z } from "zod";

const formSchema = z.object({
  domain: z.string(),
  birth: z.string(),
  gender: z.string(),
  phone_number: z.string(),
});

interface ProfileProps {
  domain: string;
  birth: string;
  gender: string;
  phone_number: string;
}

export async function editProfile(prevState: any, formData: FormData) {
  console.log("formData", formData);
  const data = {
    domain: formData.get("domain"),
    birth: formData.get("birth"),
    gender: formData.get("gender"),
    phone_number: formData.get("phone_number"),
  };
  const result = await formSchema.spa(data); //SafeParse = spa
  console.log("result1111111", result);
  if (!result.success) {
    console.log(result.error.flatten()); //flatten 에러를 이쁘게 만들어줌
    return { status: "fail", ...result.error.flatten(), general_error: null };
  } else {
    const session = await getSession();
    try {
      console.log("result22222", result);
      const res = await API.patch<ProfileProps>(
        "/users/myProfile",
        {
          domain: result.data.domain,
          birth: result.data.birth,
          gender: result.data.gender,
          phone_number: result.data.phone_number,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`, //the token is a variable which holds the token
          },
        }
      );
      console.log("resres", res);
      session.user = res.data;
      await session.save(); //비밀번호와 함친 암호글자로 web 브라우저 cookie에 저장됨!
      // redirectPath = "/";
      return {
        status: "success",
        fieldErrors: {
          domain: [],
          birth: [],
          gender: [],
          phone_number: [],
        },
        general_error: null,
      };
    } catch (e: any) {
      console.log("eee", e.response.data);
      return {
        // zod가 애러를 보내는 방식의 오브젝트를 만들어서 리턴.. 마치zod가 한것처럼
        // 그래야 인풋이나 에러낼때 반응이 동일하다!
        status: "fail",
        fieldErrors: {
          domain: [],
          birth: [],
          gender: [],
          phone_number: [],
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
