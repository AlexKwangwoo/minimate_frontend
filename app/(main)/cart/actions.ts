"use server";

import { General_data_type } from "@/type/general_type";
import API from "../../utils/request";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import getSession from "@/lib/session";

export async function getCarts(userId: string) {
  try {
    console.log("res get cart start");

    const res = await API.get(`/carts?user=${userId}`);
    // console.log("res get cart finish", res);

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

export async function getCarts3(userId: string) {
  try {
    console.log("res get cart start33");

    const res = await API.get(`/carts?user=${userId}`);
    // console.log("res get cart finish", res);

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

export async function getCarts2(userId: string) {
  try {
    console.log("res get cart start2222");

    const res = await API.get(`/carts`);
    // console.log("res get cart finish22", res);

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

// async function getProduct2(id: number) {
//   fetch("https://api.com", {
//     next: {
//       revalidate: 60,
//       tags: ["hello"],
//     },
//   });
// }

export const revalidateCartList = async () => {
  "use server";
  // revalidateTag("product-title"); //xxxx 하면 둘다 리프뤠시됨
  //revalidatePath("/products") 도 가능함 그럼 여기이페이지에있는 모든것이 리셋될것임
  revalidateTag("cart-list");
};

export const deleteCart = async (cartId: string) => {
  await API.delete(`/carts/${cartId}`);
  return cartId;
};

// 클라이언트, use server 둘다 사용가능한듯.. 다만 payload내용이 좀 바뀜
export const updateCart = async ({
  cartId,
  cartData,
}: {
  cartId: string;
  cartData: any;
}) => {
  console.log("cartData", cartData);
  const response = await API.patch(`/carts/${cartId}`, cartData);
  return response.data.data;
};

// 클라이언트, use server 둘다 사용가능한듯.. 다만 payload내용이 좀 바뀜
export const createHistory = async (cartId: string) => {
  const { token } = await getSession();
  try {
    console.log("token", token);
    console.log("cartId", cartId);
    const res = await API.post(
      "/histories",
      { cartId },
      {
        headers: {
          Authorization: `Bearer ${token}`, //the token is a variable which holds the token
        },
      }
    );
    console.log("resres", res);

    const me = await API.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`, //the token is a variable which holds the token
      },
    });

    console.log("mememememe", me);

    const session = await getSession();
    // session.id = res.data.user!._id;
    session.user = me.data;
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
