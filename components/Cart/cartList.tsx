"use client";
import { Cart_type, Shop_item_type } from "@/type/general_type";
import React, { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Buttons from "../button";
// import { deleteCart, updateCart } from "@/app/(main)/cart/client_actions";
import { tostifyError, tostifySuccess } from "../TostifyAlert/TostifyAlert";
import { formatPrice } from "@/lib/util";
import Image from "next/image";
import {
  createHistory,
  deleteCart,
  revalidateCartList,
  updateCart,
} from "@/app/(main)/cart/actions";

import { useFormState } from "react-dom";
import { revalidateHistoryList } from "@/app/(main)/user/history/actions";

export default function CartList({
  me,
  myCarts: list,
}: // revalidateCartList,
{
  me: any;
  myCarts: Cart_type[];
  // revalidateCartList: () => void;
}) {
  const [selectedCart, setSelectedCart] = useState<string | null>(null);
  const [selectedCartItems, setSelectedCartItems] = useState<Shop_item_type[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [pointAlert, setPointAlert] = useState(false);

  useEffect(() => {
    if (list.length > 0 && selectedCart) {
      const cart = list.find((cart: Cart_type) => cart._id === selectedCart);
      if (cart) {
        setSelectedCartItems(cart.shop_items);
      }
    }
  }, [selectedCart, list]);

  const handleSelectCartChange = (cartId: string) => {
    setSelectedCart(cartId);
    setShowDropdown(false);
    setPointAlert(false);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === selectedCartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(selectedCartItems.map((_, index) => index));
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedCart) {
      return tostifyError("No selected cart");
    }
    const itemIdsToDelete = selectedItems.map(
      (index: number) => selectedCartItems[index]._id
    );
    const remainingItems = selectedCartItems.filter(
      (item) => !itemIdsToDelete.includes(item._id)
    );

    if (remainingItems.length === 0) {
      await deleteCart(selectedCart);
      setSelectedCart("");
      setSelectedCartItems([]);
    } else {
      const cartData = {
        user: me._id,
        shop_items: remainingItems.map((item) => item._id),
        total_price: remainingItems.reduce(
          (acc, item) => acc + item.item_price,
          0
        ),
        total_qty: remainingItems.length,
      };
      await updateCart({ cartId: selectedCart, cartData });
      setSelectedCartItems(remainingItems);
    }

    revalidateCartList();
    setSelectedItems([]);
  };

  console.log("list", list);

  const handleCheckboxChange = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item: number) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const totalCartItemPrice = selectedCartItems.reduce(
    (acc, item) => acc + item.item_price,
    0
  );
  const availablePoints = me?.point || 0;

  const handleCheckout = async () => {
    if (totalCartItemPrice <= me.point) {
      setPointAlert(false);
      setLoading(true);

      // const selectedCartID = {
      //   cartId: selectedCart,
      // };
      if (selectedCart) {
        let result = await createHistory(selectedCart);
        if (result.general_error !== null) {
          tostifyError(result.general_error);
        } else {
          setSelectedCartItems([]);
          setSelectedCart(null);
          setSelectedItems([]);
          tostifySuccess("Successfully Bought!");
          revalidateHistoryList();
        }
      } else {
        tostifyError("No selected cart");
      }
      setLoading(false);

      // dispatch(createHistory({ cartId: selectedCartID }));
      // dispatch(createHistory({ cartId: selectedCart }));
      // window.location.reload();
    } else {
      setPointAlert(true);
      tostifyError("Not enough points");
    }
    revalidateCartList();
  };

  // useEffect(() => {
  //   if (state !== null && state?.status === "success") {
  //     tostifySuccess("Logined Successfully!");
  //   } else if (router && state !== null && state?.status === "fail") {
  //     tostifyError(state.general_error);
  //     setPointAlert(true);
  //   }
  // }, [state]);

  return (
    <div>
      <div className="w-full mt-4">
        <div className="relative">
          <button
            className="w-full px-4 border border-[#ddd] p-2 rounded flex justify-between items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>
              {selectedCart
                ? `Cart ${
                    list.findIndex((cart) => cart._id === selectedCart) + 1
                  }`
                : "Select cart"}
            </span>
            {showDropdown ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </button>
          {showDropdown && (
            <div className="absolute w-full bg-white border border-[#ddd] rounded mt-1">
              {list.map((cart, index) => (
                <div
                  key={cart._id}
                  onClick={() => handleSelectCartChange(cart._id)}
                  className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-[#f5f5f5]"
                >
                  <div className="flex items-center">
                    <span>cart {index + 1}</span>
                    <span className="text-[0.7rem] mx-2 text-[#666]">
                      (Qty {list[index].shop_items.length})
                    </span>
                  </div>
                  <span>
                    {cart.updatedAt.substring(0, cart.updatedAt.indexOf("T"))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!selectedCart ? (
        <div className="my-20 text-center text-[#bbb]">Select your cart</div>
      ) : (
        <div>
          <div className="flex items-center justify-between my-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleSelectAll}
            >
              <input
                type="checkbox"
                checked={selectedItems.length === selectedCartItems.length}
                className="mr-2 cursor-pointer"
              />
              <label className="text-[0.8rem] cursor-pointer">Select All</label>
            </div>

            <Buttons
              onClick={handleDeleteSelected}
              containerStyles="text-[0.8rem] px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]"
              title="Delete Selected"
            />
          </div>
          <div className="flex flex-col">
            <div>
              {selectedCartItems.length === 0 ? (
                <div className="text-center text-[#bbb]">
                  No items in this cart
                </div>
              ) : (
                selectedCartItems.map((cartItem, index) => {
                  return (
                    <div
                      key={cartItem._id}
                      className="border-b border-[#aaa] py-3 flex items-center gap-8"
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        className="mr-2"
                      />
                      <Image
                        width={100}
                        height={100}
                        src={cartItem.item_img || "placeholder-image-url"}
                        alt={cartItem.item_name}
                        className="w-24 h-24 mb-2"
                      />
                      <div className="flex items-center justify-between w-full h-full">
                        <div>
                          <p className="text-[0.7rem]">
                            {cartItem.category?.name || "No Category"}
                          </p>
                          <p className="text-lg font-semibold text-[1rem]">
                            {cartItem.item_name}
                          </p>
                        </div>
                        <p className="text-[1rem] mt-2">
                          ${formatPrice(cartItem.item_price)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-end my-8 rounded-md text-[0.9rem]">
            <div className="flex flex-col items-end w-1/2 p-4 bg-white shadow-lg">
              <div className="w-full mb-4 text-lg font-semibold">
                Payment Information
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Items Qty:</p>
                <p>{selectedCartItems?.length}</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Total Price:</p>
                <p>$ {formatPrice(totalCartItemPrice)}</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Available Points:</p>
                <p>$ {formatPrice(availablePoints)}</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Remaining Balance:</p>
                <p className={`${pointAlert && "text-[#f64949fe]"}`}>
                  $ {formatPrice(availablePoints - totalCartItemPrice)}
                </p>
              </div>
              {pointAlert && (
                <p className="text-[#f64949fe] text-[0.7rem] mt-1">
                  !! Your points are not enough. Please check out after
                  charging.
                </p>
              )}
            </div>
            <div className="flex gap-4 my-4">
              <Buttons
                outside_loading={loading}
                show_loading
                // type="submit"
                containerStyles="text-[0.8rem] px-4 py-2 rounded bg-black text-white"
                title="Checkout"
                onClick={() => handleCheckout()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
