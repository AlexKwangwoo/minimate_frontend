import React from "react";
import { useRouter, usePathname } from "next/navigation";

// import { useLocation, useNavigate } from "react-router-dom";
const MateHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  // const navigate = useNavigate();
  // const location = useLocation();
  return (
    <div className="w-full pb-8">
      <h1 className="mb-4 text-3xl font-semibold">My Mate</h1>
      <ul className="flex justify-between w-full gap-4">
        <li
          className={`w-full text-[0.7rem] flex gap-4 items-center justify-center border cursor-pointer rounded-lg py-2 ${
            pathname === "/mate/find" ? "font-bold bg-black text-white" : ""
          }`}
          onClick={() => router.push("/mate/find")}
        >
          <span>Find New Mate</span>
        </li>
        <li
          className={`w-full text-[0.7rem] flex gap-4 items-center justify-center border cursor-pointer rounded-lg py-2 ${
            pathname === "/mate/list" ? "font-bold bg-black text-white" : ""
          }`}
          onClick={() => router.push("/mate/list")}
        >
          <span>Mate List</span>
        </li>
        <li
          className={`w-full text-[0.7rem] flex gap-4 items-center justify-center border cursor-pointer rounded-lg py-2 ${
            pathname === "/mate/request" ? "font-bold bg-black text-white" : ""
          }`}
          onClick={() => router.push("/mate/request")}
        >
          <span>My Requests</span>
        </li>
      </ul>
    </div>
  );
};

export default MateHeader;
