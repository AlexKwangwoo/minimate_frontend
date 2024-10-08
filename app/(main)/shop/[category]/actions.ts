"use server";

import { General_data_type } from "@/type/general_type";
import API from "../../../utils/request";

export async function getCategory() {
  try {
    console.log("res get category start");
    const res = await API.get("/categories");
    console.log("res get category result", res);
    return {
      status: "success",
      data: res.data,
      general_error: null,
    };
  } catch (e: any) {
    return {
      // zod가 애러를 보내는 방식의 오브젝트를 만들어서 리턴.. 마치zod가 한것처럼
      // 그래야 인풋이나 에러낼때 반응이 동일하다!
      status: "fail",
      data: null,
      general_error: e.response.data.message,
    };
  } finally {
  }
}
