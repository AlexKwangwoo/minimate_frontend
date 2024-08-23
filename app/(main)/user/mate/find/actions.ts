"use server";

import { General_data_type } from "@/type/general_type";
import API from "../../../../utils/request";
import getSession from "@/lib/session";

export async function getAllUsers() {
  try {
    const res = await API.get("/users");

    return {
      status: "success",
      data: res.data,
      general_error: null,
    };
  } catch (e: any) {
    console.log("eeee", e);
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

export async function getBestFriendRequestsReceivedHistory(receiverId: string) {
  try {
    const res = await API.get("/friendRequests", {
      params: {
        receiver: receiverId,
      },
    });

    return {
      status: "success",
      data: res.data,
      general_error: null,
    };
  } catch (e: any) {
    console.log("eeee", e);
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

export async function getBestFriendRequestsSentHistory(receiverId: string) {
  try {
    const res = await API.get("/friendRequests", {
      params: {
        sender: receiverId,
      },
    });

    return {
      status: "success",
      data: res.data,
      general_error: null,
    };
  } catch (e: any) {
    console.log("eeee", e);
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

// export const revalidateHistoryList = async () => {
//   "use server";
//   // revalidateTag("product-title"); //xxxx 하면 둘다 리프뤠시됨
//   //revalidatePath("/products") 도 가능함 그럼 여기이페이지에있는 모든것이 리셋될것임
//   revalidateTag("order-history");
// };
