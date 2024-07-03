"use server";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { tostifySuccess } from "../TostifyAlert/TostifyAlert";

export const logOut = async () => {
  "use server";
  const session = await getSession();
  await session.destroy();

  redirect("/");
};
