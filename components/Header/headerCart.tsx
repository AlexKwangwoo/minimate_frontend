"use client";

import React, { useState } from "react";
import { TbShoppingCart } from "react-icons/tb";
import { usePathname } from "next/navigation";
import NoticeModal from "../Modal/noticeModal";
import LoginNotice from "../Modal/loginNotice";
import { useRouter } from "next/navigation";

export default function HeaderCart({ me }: { me: any }) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={() => {
        !me ? setModalOpen(true) : router.push("/cart");
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
