"use client";

import React, { useState } from "react";
import { TbShoppingCart } from "react-icons/tb";
import { usePathname } from "next/navigation";
import NoticeModal from "../Modal/noticeModal";
import LoginNotice from "../Modal/loginNotice";

export default function HeaderCart() {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  console.log("modalOpen", modalOpen);

  return (
    <button
      onClick={() => {
        // !me ?
        // openModal() : navigate("/cart");
        setModalOpen(true);
      }}
      className={`hover:text-hightColor ${
        pathname === "/cart"
          ? "text-hightColor underline underline-offset-8"
          : "transparent"
      }`}
    >
      <TbShoppingCart />

      {modalOpen && (
        <NoticeModal setModalOpen={setModalOpen}>
          <LoginNotice setModalOpen={setModalOpen} />
        </NoticeModal>
      )}
    </button>
  );
}
