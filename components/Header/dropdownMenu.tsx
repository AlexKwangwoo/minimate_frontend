"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { logOut } from "./actions";
import LogoutButton from "./logoutButton";
import NoticeModal from "../Modal/NoticeModal/noticeModal";
import AddedPoint from "../Modal/NoticeModal/addedPoint";

// import AddedPoint from "../Modal/AddedPoint";
// import NoticeModal from "../Modal/NoticeModal";

interface DropdownMenuProps {
  me: any;
  isOpen: boolean;
  toggleDropdown: (data: boolean) => void;
}

const DropdownMenu = ({ me, isOpen, toggleDropdown }: DropdownMenuProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const listItemStyle = "hover:bg-[#f5f5f5]  py-2 px-6 cursor-pointer";

  const handleLogout = () => {
    // dispatch(logoutUser());
    router.push("/");
    window.location.reload();
  };

  return (
    isOpen && (
      <div className="absolute right-0 py-2 text-sm bg-white rounded-md shadow-md top-8 z-20">
        <ul className="w-[150px]">
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              router.push("/user/mate/find");
            }}
          >
            My Mate
          </li>
          <hr className="border border-[#eee] my-2" />
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              router.push("/user/account");
            }}
          >
            My Account
          </li>
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              router.push("/user/history");
            }}
          >
            My History
          </li>

          <li className={listItemStyle} onClick={() => setModalOpen(true)}>
            My Point
          </li>
          <hr className="border border-[#eee] my-2" />
          <form action={logOut}>
            <LogoutButton listItemStyle={listItemStyle}></LogoutButton>
          </form>
          {modalOpen && (
            <NoticeModal setModalOpen={setModalOpen}>
              <AddedPoint
                setModalOpen={setModalOpen}
                // navigate={navigate}
                me={me}
              />
            </NoticeModal>
          )}
        </ul>
      </div>
    )
  );
};

export default DropdownMenu;
