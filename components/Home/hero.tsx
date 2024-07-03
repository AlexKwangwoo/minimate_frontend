import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import NaviDiv from "../naviButton";
import getSession from "@/lib/session";
import Image from "next/image";
import MinniFemale from "../../public/assets/minimi2.png";
import MinniMale from "../../public/assets/minimi1.png";
import GoToMiniHomeButton from "./goToMiniHomeButton";

export default async function Hero() {
  const { user: me } = await getSession();
  console.log("me", me);
  return (
    <div className="h-[50vh] px-10 sm:px-20 md:px-40 flex items-center">
      <div className="flex flex-col items-center justify-center w-full h-full ">
        <div className="flex flex-col items-center w-full ">
          <div className="w-full text-3xl font-bold text-center font-acme md:text-5xl sm:text-4xl md:mb-2 ">
            Create your own Mini Home
          </div>

          <div className="hidden w-full  mt-2 text-sm text-center lg:w-1/2 md:text-md md:mt-3 sm:flex sm:justify-center">
            Discover your perfect match, and personalize your own mini room
            haven with a unique name and a brand-new skin!
          </div>
        </div>

        {!me ? (
          <div className="flex items-center justify-center w-full my-3 sm:my-8">
            <NaviDiv
              url={"/login"}
              title="GET START"
              iconRight={<FaArrowRight />}
              iconStyles="text-xl font-semibold "
              containerStyles="flex items-center gap-2 p-3 md:p-4 text-sm sm:text-md border border-2 font-semibold  
          rounded-xl bg-hightColor border-hightColor text-white shadow-md hover:bg-white hover:text-hightColor"
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center w-full ">
              <Image
                width={20}
                height={20}
                src={
                  !me?.minime_img
                    ? me?.gender === "male"
                      ? MinniMale
                      : MinniFemale
                    : me?.minime_img
                }
                alt="Minime"
                className="w-[20rem] h-[15rem] drop-shadow-xl object-contain"
              />
            </div>
            <div className="flex items-center justify-center w-full my-3 sm:my-4">
              <GoToMiniHomeButton me={me} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
