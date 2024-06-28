import React, { useState, useEffect, useRef } from "react";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import HeaderNav from "./headerNav";
import HeaderCart from "./headerCart";

export default function Header() {
  return (
    <>
      <div
        className=" flex items-center justify-between w-full h-full px-10 py-3 header font-work md:py-6 sm:px-20 md:px-40"
        // style={{
        //   backgroundColor: scrollNav
        //     ? "rgba(255, 255, 255, 0.9)"
        //     : "transparent",
        // }}
      >
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center w-12 h-12 md:w-14 md:h-14">
            <Image src={Logo} alt="logo" />
          </div>
          <span className="text-xl font-semibold text-black md:hidden md:text-2xl lg:flex">
            MINIMATE
          </span>
        </Link>

        <div className="items-center hidden gap-4 text-xl md:flex md:text-2xl">
          <HeaderNav />
          <div className="-ml-4">|</div>
          <HeaderCart></HeaderCart>
        </div>
      </div>

      {/* <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center w-12 h-12 md:w-14 md:h-14">
            <Image src={Logo} alt="logo" />
          </div>
          <span className="text-xl font-semibold text-black md:hidden md:text-2xl lg:flex">
            MINIMATE
          </span>
        </Link>

        <div className="items-center hidden gap-4 text-xl md:flex md:text-2xl">
          <HeaderNav me={me} />

          <div className="-ml-4">|</div>

          <button
            onClick={() => {
              !me ? openModal() : navigate("/cart");
            }}
            className={`hover:text-hightColor ${
              location.pathname === "/cart"
                ? "text-hightColor underline underline-offset-8"
                : "transparent"
            }`}
          >
            <TbShoppingCart />
          </button>

          <HeaderDropdown
            dropdownRef={dropdownRef}
            isOpen={dropdownOpen}
            toggleDropdown={setDropdownOpen}
            navigate={navigate}
            dispatch={dispatch}
            me={me}
          />
        </div>

        <div className="flex text-2xl md:hidden">
          <button onClick={toggle} className="">
            <MdMenu className="" />
          </button>
        </div>
      </div>
      <Sidebar isSideOpen={isSideOpen} toggle={toggle} /> */}
    </>
  );
}
