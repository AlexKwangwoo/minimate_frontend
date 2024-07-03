"use client";

import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { tostifySuccess } from "../TostifyAlert/TostifyAlert";

export default function LogoutButton({
  listItemStyle,
}: {
  listItemStyle: string;
}) {
  const { pending } = useFormStatus();
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (!pending && !first) {
      tostifySuccess("Logged out successfully");
    }
    if (pending === true) {
      setFirst(false);
    }
  }, [first, pending]);

  return (
    <button className={`${listItemStyle} w-full text-left`}>Log Out</button>
  );
}
