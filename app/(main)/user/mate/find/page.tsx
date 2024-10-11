import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsers } from "../../redux/userSlice";

// import NoticeModal from "../Modal/NoticeModal";
// import SendRequest from "../Modal/SendRequest";
// import {
//   fetchRequestsByReceiver,
//   fetchRequestsBySender,
// } from "../../redux/friendSlice";
import getSession from "@/lib/session";
import MateHeader from "@/components/Mate/Find/mateHeader";
import {
  getAllUsers,
  getBestFriendRequestsReceivedHistory,
  getBestFriendRequestsSentHistory,
} from "./actions";
import FindTable from "@/components/Mate/Find/findTable";
// import MateSidebar from "./MateSidebar";

export default async function Mate() {
  const { user: me } = await getSession();

  const bestFriendsRequestsReceived =
    await getBestFriendRequestsReceivedHistory(me._id).then(
      (result) => result.data
    );

  const bestFriendsRequestsSent = await getBestFriendRequestsSentHistory(
    me._id
  ).then((result) => result.data);

  const users = await getAllUsers().then((result) => result.data);

  console.log("bestFriendsRequestsReceived", bestFriendsRequestsReceived);
  console.log("bestFriendsRequestsSent", bestFriendsRequestsSent);

  // const dispatch = useDispatch();
  // const [searchTerm, setSearchTerm] = useState("");
  // const [newRequestModal, setNewRequestModal] = useState(false);
  // const [friendId, setFriendId] = useState("");
  // const { friend, send, receive } = useSelector((state) => state.friend);
  // const { user, users } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(fetchAllUsers());
  //   // dispatch(fetchRequestsByReceiver({ userId: me?._id }));
  //   dispatch(fetchRequestsByReceiver({ userId: me?._id }));
  //   dispatch(fetchRequestsBySender({ userId: me?._id }));
  // }, [dispatch, friend]);
  // console.log("send", send);
  // console.log("receive", receive);
  // send.receiver._id.include(me._id) || receive.receiver._id.include(me._id)
  // send.sender._id.include(me._id) || receive.sender._id.include(me._id)
  // const handleSearchChange = (e:any) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleSendRequest = (id) => {
  //   setFriendId(id);
  //   setNewRequestModal(true);
  // };

  // console.log("friendId", friendId);

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-24 lg:pb-16 sm:px-20 md:px-40">
      {/* <MateSidebar /> */}
      <MateHeader />
      <FindTable
        users={users}
        me={me}
        bestFriendsRequestsReceived={bestFriendsRequestsReceived}
        bestFriendsRequestsSent={bestFriendsRequestsSent}
      />
    </div>
  );
}
