"use server";

export default async function ItemsListServerTest() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return "success";
}
