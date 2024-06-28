"use client";

import Link from "next/link";
import React from "react";

interface NaviDivProps {
  title: string;
  containerStyles?: string;
  url: string;
  iconLeft?: JSX.Element;
  iconStyles?: string;
  iconRight?: JSX.Element;
}

const NaviDiv = ({
  title,
  containerStyles,
  url,
  iconLeft,
  iconStyles,
  iconRight,
}: NaviDivProps) => {
  return (
    <Link href={url} className={`inline-flex items-center ${containerStyles} `}>
      {/* ex) iconLeft={<IoMdSettings/>} */}
      {iconLeft && <div className={`${iconStyles}`}>{iconLeft}</div>}
      {title}
      {iconRight && <div className={`${iconStyles}`}>{iconRight}</div>}
    </Link>
  );
};
export default NaviDiv;
