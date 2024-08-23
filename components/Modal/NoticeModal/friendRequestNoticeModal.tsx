"use client";

import React from "react";

interface NoticeModalProps {
  setModalOpen: (data: boolean) => void;
  requestId?: string;
  children: React.ReactNode;
  friendId?: any;
  userHome?: any;
}

const FriendRequestNoticeModal = ({
  setModalOpen,
  children,
  requestId,
  friendId,
  userHome,
}: NoticeModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      {friendId || requestId || userHome ? (
        <div className="bg-white rounded-md shadow-md">{children}</div>
      ) : (
        <div className="bg-white rounded-md shadow-md">{children}</div>
      )}
    </div>
  );
};

export default FriendRequestNoticeModal;
