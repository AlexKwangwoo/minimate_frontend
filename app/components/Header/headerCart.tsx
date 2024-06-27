"use client";

import React from "react";
import { TbShoppingCart } from "react-icons/tb";
import { usePathname } from "next/navigation";

export default function HeaderCart() {
  const pathname = usePathname();
  return (
    <button
      // onClick={() => {
      //   !me ? openModal() : navigate("/cart");
      // }}
      className={`hover:text-hightColor ${
        pathname === "/cart"
          ? "text-hightColor underline underline-offset-8"
          : "transparent"
      }`}
    >
      <TbShoppingCart />
    </button>
  );
}
