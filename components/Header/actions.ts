"use server";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export const logOut = async () => {
  "use server";
  const session = await getSession();
  await session.destroy();
  redirect("/");
};
