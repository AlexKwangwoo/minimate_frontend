import React from "react";
import { CgGhostCharacter, CgHomeAlt } from "react-icons/cg";
import { TbBackground, TbMusic } from "react-icons/tb";
import { RiFontSize } from "react-icons/ri";

const shopCategory = [
  { image: CgGhostCharacter, name: "Minime" },
  { image: CgHomeAlt, name: "Miniroom" },
  { image: TbBackground, name: "Skin" },
  // { image: TbMusic, name: 'Music' },
  { image: RiFontSize, name: "Font" },
];

export default function HeroShop() {
  return (
    <div className="w-full h-fit flex flex-col items-end justify-center pb-28 md:pb-auto py-12 bg-[#fff9e7]">
      <div className="w-full h-full px-10 sm:px-20 md:px-40">
        <div className="flex justify-center w-full mx-auto mb-6">
          {/* <span className='dots-container'></span> */}
          {/* <div className='pb-1 text-lg font-semibold border-t-2'>SHOP</div> */}
          {/* <div className='mt-2 text-sm text-center'>Brand-new items</div> */}
        </div>
        <div className="grid items-center justify-center w-full grid-cols-2 gap-8 md:grid-cols-4 ">
          {shopCategory.map((category, index) => {
            const IconComponent = category.image;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center cursor-pointer "
              >
                <div
                  className="w-full h-full p-8 mb-2 rounded-lg bg-[#fff] 
            flex items-center justify-center shadow-md"
                >
                  <IconComponent className="w-12 h-12 mx-auto" />
                </div>
                <p className="">{category.name.toUpperCase()}</p>
              </div>
            );
          })}
        </div>
        {/* <div className='flex items-center justify-center w-full'>
      <Buttons
        onClick={() => {
          navigate('/shop');
          scroll.scrollToTop();
        }}
        title='SHOP NOW'
        iconRight={<IoIosArrowForward />}
        iconStyles='text-xl font-semibold '
        containerStyles='flex items-center p-2 md:p-3 text-sm border border-2 font-semibold rounded-xl hover:bg-black hover:border-black hover:text-white shadow-md'
      />
    </div> */}
      </div>
    </div>
  );
}
