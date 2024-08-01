import React from "react";
import Buttons from "../button";

const ConfirmNotice = ({
  setModalOpen,
  title,
  text,
}: {
  setModalOpen: (a: boolean) => void;
  title: string;
  text: string;
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-sm mb-4">{text}</p>

      <div className="w-full flex items-center justify-end">
        <Buttons
          onClick={() => setModalOpen(false)}
          containerStyles="min-w-[80px] flex items-center justify-center px-4 py-3 text-sm border border-2   
            rounded-xl shadow-md border-[#f0f0f0] "
          title="No"
        />
        <Buttons
          onClick={() => window.location.reload()}
          containerStyles="min-w-[80px] flex items-center justify-center px-4 py-3 ml-4 text-sm border border-2   
            rounded-xl bg-black border-black text-white shadow-md"
          title="Yes"
        />
      </div>
    </>
  );
};

export default ConfirmNotice;
