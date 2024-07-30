import { Cart_type } from "./../../../type/general_type";
import API from "@/app/utils/request";

export const deleteCart = async (cartId: string) => {
  await API.delete(`/carts/${cartId}`);
  return cartId;
};

export const updateCart = async ({
  cartId,
  cartData,
}: {
  cartId: string;
  cartData: any;
}) => {
  const response = await API.patch(`/carts/${cartId}`, cartData);
  return response.data.data;
};

export const createCart = async ({ cartData }: { cartData: any }) => {
  const response = await API.post("/carts", cartData);
  return response.data.data;
};
