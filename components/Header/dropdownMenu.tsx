"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { logOut } from "./actions";
import LogoutButton from "./logoutButton";

// import AddedPoint from "../Modal/AddedPoint";
// import NoticeModal from "../Modal/NoticeModal";

interface DropdownMenuProps {
  me: any;
  isOpen: boolean;
  toggleDropdown: (data: boolean) => void;
}

const DropdownMenu = ({ me, isOpen, toggleDropdown }: DropdownMenuProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const listItemStyle = "hover:bg-[#f5f5f5]  py-2 px-6 cursor-pointer";

  const handleLogout = () => {
    // dispatch(logoutUser());
    router.push("/");
    window.location.reload();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    isOpen && (
      <div className="absolute right-0 py-2 text-sm bg-white rounded-md shadow-md top-8 z-20">
        <ul className="w-[150px]">
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              router.push("/user/mate");
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

          <li className={listItemStyle} onClick={openModal}>
            My Point
          </li>
          <hr className="border border-[#eee] my-2" />
          <form action={logOut}>
            <LogoutButton listItemStyle={listItemStyle}></LogoutButton>
          </form>
          {/* {modalOpen && (
            <NoticeModal closeModal={closeModal}>
              <AddedPoint closeModal={closeModal} navigate={navigate} me={me} />
            </NoticeModal>
          )} */}
        </ul>
      </div>
    )
  );
};

export default DropdownMenu;
