"use client";

import Image from "next/image";
import React, { useState } from "react";
import NoticeModal from "../Modal/NoticeModal/noticeModal";

export default function ProfileImgEditor({ me }: { me: any }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {/* <Image
        src={
          // !me?.minime_img
          //   ? me?.gender === "male"
          //     ? MinniMale
          //     : MinniFemale
          //   : me?.minime_img
        }
        alt="Minime"
        className="w-[15rem] h-[15rem] object-contain cursor-pointer  flex justify-center items-center mx-auto my-4"
        onClick={() => setModalOpen(true)}
      /> */}

      {modalOpen && (
        <NoticeModal setModalOpen={setModalOpen}>
          {/* <UploadProfileImage
            closeModal={() => setOpenProfileImgModal(false)}
            openProfileImgModal={UploadProfileImage}
            me={me}
          /> */}
          <div></div>
        </NoticeModal>
      )}
    </div>
  );
}
