"use client";

import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createRequest } from "../../redux/friendSlice";
// import { fetchOneUser } from "../../redux/userSlice";
import MinniFemale from "../../../public/assets/minimi2.png";
import MinniMale from "../../../public/assets/minimi1.png";
import { MdClose } from "react-icons/md";
import { User_type } from "@/type/general_type";
import Image from "next/image";

const SentBestfriendRequest = ({
  setModalOpen,
  me,
  frined,
}: {
  setModalOpen: (data: boolean) => void;
  me: User_type;
  frined: User_type;
}) => {
  const [requestData, setRequestData] = useState({
    sender: me?._id || "",
    sender_nick_name: "",
    receiver: frined?._id || "",
    receiver_nick_name: "",
    content: "",
  });

  // useEffect(() => {
  //   if (friendId) {
  //     dispatch(fetchOneUser({ userId: frined._id }));
  //   }
  // }, [dispatch,  frined._id]);

  const handleChange = (e: any) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };
  console.log("requestData", requestData);

  const handleRequestSubmit = (e: any) => {
    e.preventDefault();
    // dispatch(createRequest({ requestData }));

    // if (!error) {
    //   closeModal();
    // }
  };

  return (
    <div className="bg-[#e0eeff] p-8 rounded-lg w-[420px]">
      <div className="p-3 bg-white rounded shadow-md">
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-dotted border-[#bbb]">
          <div className="flex items-center">
            <h3 className="mr-2 text-xl font-bold">Send Request</h3>
          </div>
          <MdClose
            className="cursor-pointer"
            onClick={() => {
              setModalOpen(false);
            }}
          />
        </div>
        <form className="flex flex-col" onSubmit={handleRequestSubmit}>
          <div className="text-center text-black">
            <div className="text-[0.8rem] w-full flex items-center justify-center gap-2">
              <div className="w-[8rem] h-[8rem] ">
                <Image
                  width="300"
                  height="200"
                  src={
                    !me?.minime_img
                      ? me?.gender === "male"
                        ? MinniMale
                        : MinniFemale
                      : me?.minime_img
                  }
                  alt={me?.username}
                  className="flex items-center justify-center object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col items-start justify-center w-full">
                <div className="pb-2 text-[0.8rem]  mb-2">
                  <span className="text-[#304fd6]">{me?.username}</span>
                  <span className="mr-1"> asks</span>
                  <span className="text-[#304fd6]">{frined?.username}</span>
                  <span className="mr-1"> for a friend.</span>
                </div>
                <div className="flex items-center w-full ">
                  <span className="mr-1 font-semibold">{me?.username}</span>
                  <span>as</span>
                  <input
                    type="text"
                    name="sender_nick_name"
                    value={requestData?.sender_nick_name}
                    onChange={handleChange}
                    required
                    className="w-full mx-1 border border-[#ddd] rounded px-1"
                  />
                </div>
                <div className="flex items-center w-full my-1 ">
                  <span className="mr-1 font-semibold">
                    {frined?.username}{" "}
                  </span>
                  <span>as</span>
                  <input
                    type="text"
                    name="receiver_nick_name"
                    value={requestData?.receiver_nick_name}
                    onChange={handleChange}
                    required
                    className="w-full mx-1 border border-[#ddd] rounded px-1"
                  />
                </div>
              </div>
            </div>

            <div
              className="border-b-2 border-dotted border-[#bbb] pb-4 my-4 text-[0.8rem]
            w-full flex items-center justify-center gap-2"
            >
              <textarea
                className="w-full h-[100px] mx-1 border border-[#ddd] rounded p-2"
                placeholder="Enter the message"
                name="content"
                value={requestData.content}
                onChange={handleChange}
              />
            </div>
            <div className="text-[0.7rem]">
              If the other person agrees, they will become friends.
            </div>
          </div>
          <div className="flex justify-center w-full gap-4 my-4">
            <div
              className="w-fit py-2 px-4 rounded text-[0.7rem] bg-[#ddd] cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </div>
            <button
              type="submit"
              className="w-fit py-2 px-4 rounded text-[0.7rem] bg-black text-white cursor-pointer"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SentBestfriendRequest;
