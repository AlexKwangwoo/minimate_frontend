"use client";

import React, { useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import Buttons from "../button";

export default function GoToMiniHomeButton({ me }: { me: any }) {
  const popupRef = useRef<any>(null);

  const openPopup = () => {
    if (!popupRef.current || popupRef.current.closed) {
      if (me) {
        // const userDomain = me?.domain;
        // const popupUrl = `http://localhost:3000/${userDomain}/home`;
        // const popupFeatures = 'width=1100,height=600';
        // popupRef.current = window.open(popupUrl, '_blank', popupFeatures);
        const userDomain = me?.domain;
        const popupUrl = `http://localhost:3000/${userDomain}/home`;
        const popupWidth = 1100;
        const popupHeight = 600;

        // 브라우저 창의 위치와 크기 가져오기
        const screenLeft = window.screenLeft;
        const screenTop = window.screenTop;

        const screenWidth = window.innerWidth
          ? window.innerWidth
          : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : window.screen.width;
        // const screenHeight = window.innerHeight
        //   ? window.innerHeight
        //   : document.documentElement.clientHeight
        //   ? document.documentElement.clientHeight
        //   : window.screen.height;

        // 팝업 창을 화면의 가로 중앙과 세로 상단에 위치시키기 위한 좌표 계산
        const left = screenLeft + screenWidth / 2 - popupWidth / 2;
        const top = screenTop + 0; // 세로 상단에 위치

        const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;
        popupRef.current = window.open(popupUrl, "_blank", popupFeatures);
      }
    } else {
      // If the popup is already open, focus on it
      popupRef.current.focus();
    }
  };

  return (
    <div>
      {" "}
      <Buttons
        onClick={openPopup}
        title="Go to MINI HOME"
        iconLeft={<AiOutlineHome />}
        iconStyles="text-xl font-semibold "
        containerStyles="flex items-center gap-2 p-3 md:p-4 text-sm sm:text-md  border border-2 font-semibold  
rounded-xl bg-hightColor border-hightColor text-white shadow-md hover:bg-white hover:text-hightColor"
      />
    </div>
  );
}
