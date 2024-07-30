import getSession from "@/lib/session";
import React from "react";
import HeaderCart from "./headerCart";

export default async function HeaderCartWrapper() {
  const { user: me } = await getSession();

  return (
    <div>
      {" "}
      <HeaderCart me={me}></HeaderCart>
    </div>
  );
}
