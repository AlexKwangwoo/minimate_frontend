"use server";

import API from "@/app/utils/request";
import getSession from "@/lib/session";

// 클라이언트, use server 둘다 사용가능한듯.. 다만 payload내용이 좀 바뀜
export const updateMe = async (point: number) => {
  const session = await getSession();

  console.log("pointpoint", point);
  try {
    const res = await API.patch(
      `/users/myProfile`,
      {
        point: point,
      },
      {
        headers: {
          Authorization: `Bearer ${session.token}`, //the token is a variable which holds the token
        },
      }
    );
    session.user.point = point;
    await session.save();

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
};
