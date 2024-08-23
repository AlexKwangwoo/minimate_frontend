"use client";

import { Friend_request_type, User_type } from "@/type/general_type";
import Image from "next/image";
import React, { useState } from "react";
import MinniFemale from "../../../public/assets/minimi2.png";
import MinniMale from "../../../public/assets/minimi1.png";
import NoticeModal from "@/components/Modal/NoticeModal/noticeModal";
import SentBestfriendRequest from "@/components/Modal/NoticeModal/sentBestfriendRequest";
import FriendRequestNoticeModal from "@/components/Modal/NoticeModal/friendRequestNoticeModal";

export default function FindTable({
  me,
  users,
  bestFriendsRequestsReceived: receive,
  bestFriendsRequestsSent: send,
}: {
  me: User_type;
  users: [User_type];
  bestFriendsRequestsReceived: [Friend_request_type];
  bestFriendsRequestsSent: [Friend_request_type];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  console.log("bestFriendsRequestsReceived", receive);
  console.log("bestFriendsRequestsSent", send);
  console.log("users", users);
  const [newRequestModal, setNewRequestModal] = useState(false);
  const [friendId, setFriendId] = useState("");
  const [frined, setFriend] = useState<User_type | null>(null);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSendRequest = (friend: User_type) => {
    setFriend(friend);
    setNewRequestModal(true);
  };

  return (
    <div className=" h-[50vh]">
      <div className="flex flex-col items-start w-full">
        <h2 className="mb-2 mr-4 text-xl font-semibold">Find New Mate</h2>
        <input
          type="text"
          placeholder="Search by username, email or domain"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border border-[#bbb] p-2 rounded-lg"
        />
      </div>
      {!searchTerm ? (
        <div className="text-[#bbb] h-full mt-4 flex items-center justify-center shadow-md overflow-y-auto bg-white ">
          Search and find your mates
        </div>
      ) : (
        <div className={`overflow-y-auto h-full bg-white shadow-md mt-4 `}>
          <table className="w-full text-left border-collapse  text-[0.8rem] ">
            <thead className="">
              <tr className="bg-[#eee] border-b border-[#bbb]">
                <th className="p-2 font-normal text-center">#</th>
                <th className="p-2 font-normal">MINIME</th>
                <th className="p-2 font-normal">NAME</th>
                <th className="p-2 font-normal ">EMAIL</th>
                <th className="p-2 font-normal">DOMAIN</th>
                <th className="p-2 font-normal text-center"></th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(
                  (user) =>
                    user.email !== me?.email &&
                    (user.username?.includes(searchTerm) ||
                      user.email?.includes(searchTerm) ||
                      user.domain?.includes(searchTerm))
                )
                .map((user, index) => (
                  <tr key={user._id} className="border-b border-[#bbb]">
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2">
                      <Image
                        src={
                          user.minime_img
                            ? user.minime_img
                            : user.gender === "male"
                            ? MinniMale
                            : MinniFemale
                        }
                        alt={user.username}
                        className="object-contain w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      {user?.domain ||
                        user?.email?.substring(0, user?.email.indexOf("@")) +
                          me?._id.slice(-5)}
                    </td>
                    <td className="p-2 text-center">
                      {user.best_friends?.find((bf) => bf.friend === me._id) ? (
                        <button
                          disabled
                          className=" border rounded-lg p-2 text-[0.7rem]"
                        >
                          Your Mate
                        </button>
                      ) : (
                        <>
                          {send.find((s) => s.receiver?._id === user?._id) ||
                          receive.find((r) => r.sender?._id === user?._id) ? (
                            <button className=" bg-[#ddd] rounded-lg p-2 text-[0.7rem]">
                              Pending
                            </button>
                          ) : (
                            <button
                              className=" bg-black text-white rounded-lg p-2 text-[0.7rem]"
                              onClick={() => handleSendRequest(user)}
                            >
                              Request
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {newRequestModal && (
        <FriendRequestNoticeModal
          friendId={friendId}
          setModalOpen={() => setNewRequestModal(false)}
        >
          <SentBestfriendRequest
            me={me}
            frined={frined}
            setModalOpen={() => setNewRequestModal(false)}
          />
        </FriendRequestNoticeModal>
      )}
    </div>
  );
}
