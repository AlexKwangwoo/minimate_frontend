"use client";

import React from "react";

interface NoticeModalProps {
  setModalOpen: (data: boolean) => void;
  requestId?: string;
  children: React.ReactNode;
}

const NoticeModal = ({
  setModalOpen,
  children,
  requestId,
}: NoticeModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      {!requestId ? (
        <div className="bg-white p-8 rounded-md shadow-md">{children}</div>
      ) : (
        <div className="rounded-md shadow-md">{children}</div>
      )}
    </div>
  );
};

export default NoticeModal;
