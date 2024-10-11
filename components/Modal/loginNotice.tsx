"use client";

import React from "react";
import Buttons from "../button";
import { useRouter } from "next/navigation";

interface LoginNoticeProps {
  setModalOpen: (data: boolean) => void;
}

const LoginNotice = ({ setModalOpen }: LoginNoticeProps) => {
  const router = useRouter();

  return (
    <div className="text-left text-black">
      <h2 className="text-2xl font-bold mb-4">Login Required</h2>
      <p className="text-sm">In order to open this page, you need to login.</p>
      <p className="text-sm mb-4">Would you like to login now or later?</p>

      <div className="w-full flex items-center justify-end">
        <Buttons
          onClick={(e: any) => {
            e.stopPropagation();
            setModalOpen(false);
          }}
          containerStyles="mr-[10px] min-w-[80px] flex items-center justify-center px-4 py-3 text-sm border border-2   
          rounded-xl shadow-md border-[#f0f0f0] "
          title="Later"
        />
        <Buttons
          onClick={() => router.push("/login", { scroll: false })}
          containerStyles="min-w-[80px] flex items-center justify-center px-4 py-3 text-sm border border-2   
          rounded-xl shadow-md border-[#f0f0f0] "
          title="Login Now"
        />
      </div>
    </div>
  );
};

export default LoginNotice;
