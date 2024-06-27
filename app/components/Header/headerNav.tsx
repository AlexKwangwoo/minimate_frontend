"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Buttons from "../Buttons";
// import {
//   HomeIcon as OutlineHomeIcon,
//   NewspaperIcon as OutlineNewspaperIcon,
//   ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
//   VideoCameraIcon as OutlineVideoCameraIcon,
//   UserIcon as OutlineUserIcon,
// } from "@heroicons/react/24/outline";

const HeaderNav = () => {
  const pathname = usePathname();
  // const location = useLocation();
  // const navigate = useNavigate();

  // console.log("me", me);

  console.log("pathname", pathname);
  return (
    <div className="items-center justify-center hidden md:flex">
      <Link
        href="/"
        className={`text-xl font-semibold px-2 py-1
          hover:text-hightColor ${
            pathname === "/"
              ? "text-hightColor underline underline-offset-8"
              : "transparent"
          }`}
      >
        HOME
      </Link>
      <Link
        href="/shop"
        className={`text-xl font-semibold px-2 py-1
          hover:text-hightColor ${
            pathname === "/shop"
              ? "text-hightColor underline underline-offset-8"
              : "transparent"
          }`}
      >
        SHOP
      </Link>

      {/* <Buttons
        onClick={() => navigate("/")}
        title="HOME"
        containerStyles={`text-xl font-semibold px-2 py-1
          hover:text-hightColor ${
            location.pathname === "/"
              ? "text-hightColor underline underline-offset-8"
              : "transparent"
          }`}
      />
      <Buttons
        onClick={() => navigate("/shop")}
        title="SHOP"
        containerStyles={`text-xl font-semibold px-4 py-1
          hover:text-hightColor ${
            location.pathname === "/shop"
              ? "text-hightColor underline underline-offset-8"
              : "transparent"
          }`}
      />
      {me?.username.toLowerCase().includes("admin") && (
        <Buttons
          onClick={() => navigate("/admin/user")}
          title="Admin"
          containerStyles={`text-xl font-semibold pr-4 pl-2 py-1
            hover:text-hightColor ${
              location.pathname.startsWith("/admin")
                ? "text-hightColor underline underline-offset-8"
                : "transparent "
            }`}
          iconLeft={<IoMdSettings />}
          iconStyles="mr-1"
        />
      )} */}
    </div>
  );
};

export default HeaderNav;
