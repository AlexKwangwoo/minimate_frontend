"use client";
import { revalidateHistoryList } from "@/app/(main)/user/history/actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HistoryTable({
  orderHistories: history,
  me,
}: {
  orderHistories: any;
  me: any;
}) {
  const [detailOpen, setDetailOpen] = useState<string | null>(null);

  const handleDetails = (orderId: string) => {
    setDetailOpen(detailOpen === orderId ? null : orderId);
  };

  return (
    <div className="flex flex-col w-full px-10 pt-12 pb-28 sm:pb-12 sm:px-20 md:px-40">
      <h1
        onClick={() => revalidateHistoryList()}
        className="mb-6 text-3xl font-semibold text-center"
      >
        My Order History
      </h1>
      <div className=" h-[65vh] overflow-y-auto bg-white shadow-md">
        {history &&
        history.filter((order: any) => order.user._id === me._id).length > 0 ? (
          <table className="w-full text-left border-collapse text-[0.8rem] mt-2 ">
            <thead>
              <tr className="bg-[#eee] border-b border-[#bbb] font-semibold ">
                <th className="p-2">ID</th>
                <th className="p-2">TOTAL QTY</th>
                <th className="p-2">TOTAL PRICE</th>
                <th className="p-2">ORDER DATE</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            {history
              .filter((order: any) => order.user._id === me._id)
              .map((order: any, index: number) => (
                <tbody key={order._id}>
                  <tr className="border-t border-[#bbb]">
                    <td className="p-2">{order._id.slice(-5)}</td>
                    <td className="p-2">{order.total_qty}</td>
                    <td className="p-2">${order.total_price}</td>
                    <td className="p-2">
                      {order.createdAt.substring(
                        0,
                        order.createdAt.indexOf("T")
                      )}
                    </td>
                    <td className="flex justify-end p-2">
                      <button
                        className={` rounded-lg py-2 px-2 text-[0.7rem] ${
                          detailOpen === order._id
                            ? "bg-[#ddd] text-black"
                            : "bg-black text-white"
                        }`}
                        onClick={() => handleDetails(order._id)}
                      >
                        {detailOpen === order._id
                          ? "Close Details"
                          : " View Details"}
                      </button>
                    </td>
                  </tr>
                  {detailOpen === order._id && (
                    <tr className="border-t border-[#bbb] bg-[#f9f9f9]">
                      {/* <td></td> */}
                      <td colSpan={5} className="p-4">
                        <div className="flex flex-col">
                          {order.shop_items.map((item: any, ind: number) => (
                            <div key={ind} className="flex mb-2">
                              <div className="w-1/12">{ind + 1}.</div>
                              <div className="w-2/12">
                                <Image
                                  src={item.item_img}
                                  alt={item.item_name}
                                  className="object-contain w-12 h-12"
                                  width="300"
                                  height="300"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span>{item.item_name}</span>
                                <span>${item.item_price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
          </table>
        ) : (
          <div className="text-center text-[#bbb] mt-5">
            No order history found.
          </div>
        )}
      </div>
    </div>
  );
}
