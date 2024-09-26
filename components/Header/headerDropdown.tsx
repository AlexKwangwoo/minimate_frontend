"use client";

import React, { useEffect, useRef, useState } from "react";
import DropdownMenu from "./dropdownMenu";
import { FaRegCircleUser } from "react-icons/fa6";
import Buttons from "../button";
import { usePathname, useRouter } from "next/navigation";

const HeaderDropdown = ({
  // dispatch,
  // dropdownRef,
  me,
}: {
  me: any;
}) => {
  // const location = useLocation();
  const router = useRouter();
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!dropdownRef.current!.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.body.style.overflow = "auto";
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  // console.log("meme", me);
  return (
    <div ref={dropdownRef}>
      {!me ? (
        <Buttons
          onClick={() => router.push("/login", { scroll: false })}
          title="Log In"
          containerStyles="text-sm font-semibold px-4 py-2 border-2 rounded-xl bg-black text-white hover:bg-white hover:text-black"
        />
      ) : (
        <>
          <div className="relative">
            <FaRegCircleUser
              // className='text-hightColor'

              className={`cursor-pointer ${
                dropdownOpen || pathname.startsWith("/user")
                  ? "text-hightColor"
                  : ""
              }`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            <DropdownMenu
              isOpen={dropdownOpen}
              toggleDropdown={setDropdownOpen}
              // navigate={navigate}
              me={me}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderDropdown;
