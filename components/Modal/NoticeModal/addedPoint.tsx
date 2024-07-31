"use client";

import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Buttons from "../../button";
import { updateMe } from "./actions";

const AddedPoint = ({
  setModalOpen,
  me,
}: {
  setModalOpen: (a: boolean) => void;
  me: any;
}) => {
  const [changeUserBalance, setChangeUserBalance] = useState(
    parseFloat(me?.point) || 0
  );
  const [balance, setBalance] = useState<string>("0");
  const [isOverAmount, setIsOverAmount] = useState(false);
  const [isMinus, setIsMinus] = useState(false);
  const [userInfo, setUserInfo] = useState({
    point: me?.point,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const totlaPoint = parseFloat(me?.point) + parseFloat(balance);
    setUserInfo({ point: totlaPoint });
    setChangeUserBalance(totlaPoint);
    // setBalance(0);
  }, [me, balance]);

  const ChangeBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(e.target.value);
  };

  const handleAddBalance = async () => {
    if (parseFloat(balance) <= 5000 && parseFloat(balance) >= 0) {
      setLoading(true);
      await updateMe(parseFloat(userInfo?.point));
      setIsOverAmount(false);
      document.body.style.overflow = "unset";
      setBalance("0");
    } else if (parseFloat(balance) > 5000) {
      setIsOverAmount(true);
      setIsMinus(false);
    } else {
      setIsMinus(true);
      setIsOverAmount(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold ">My Point</h2>
        <button>
          <FaTimes onClick={() => setModalOpen(false)} />
        </button>
      </div>
      <p className="mb-4 text-sm">
        Check your point. If not enough, charging your point.
      </p>

      <div className="w-full flex items-center justify-between border border-[#ddd] rounded-md p-3">
        <div className="font-semibold">Your Current Balances:</div>
        <span>
          $
          {me?.point?.toLocaleString("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
          })}
        </span>
      </div>

      <div className="flex flex-col w-full">
        <div className=" border border-[#ddd] rounded-md p-3  my-4">
          <div className="font-semibold">Charge Your Balances:</div>
          <span className="flex flex-col w-full my-4">
            <input
              type="number"
              placeholder="Enter the price you want to add"
              onChange={ChangeBalance}
              value={balance}
              min="0"
              max="5000"
              className="border boder-[#ddd] focus:border-[#2185ff] focus:outline-none rounded-md p-3"
            />
          </span>
          <div className="text-[0.6rem] text-[#bbb] ">
            <span className={isOverAmount ? "text-[#f00]" : ""}>
              * Up to $5,000 at a time
            </span>
            <br />
            <span className={isMinus ? "text-[#f00]" : ""}>
              * Available only from 0 or higher
            </span>
          </div>
          <div className="flex justify-between mt-4">
            <div className="font-semibold">Expected Amount:</div>$
            {changeUserBalance.toLocaleString("en-US", {
              style: "decimal",
              minimumFractionDigits: 2,
            })}
          </div>
        </div>

        <Buttons
          show_loading
          outside_loading={loading}
          onClick={handleAddBalance}
          containerStyles="flex items-center justify-center px-4 py-3 text-sm border border-2 rounded-xl bg-black border-black text-white shadow-md"
          title="Add"
        />
      </div>
    </>
  );
};

export default AddedPoint;
