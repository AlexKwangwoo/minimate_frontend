"use client"; //cart 때문에 use client 사용해야하나..?
import API from "@/app/utils/request";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SingleLoader from "../singleLoader";
import { Cart_type, Item_type } from "@/type/general_type";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import AddToCartBar from "./addToCartBar";

export default function ItemsList({ me }: { me: any }) {
  const { category } = useParams();
  const [itemsLoading, setItemsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [tempCartItems, setTempCartItems] = useState<Cart_type[]>([]);
  const [error, setError] = useState<string>("");

  const getItem = async (category: string) => {
    try {
      let res;

      if (category === "all") {
        res = await API.get("/shopItems");
      } else {
        res = await API.get("/shopItems/findByCatename", {
          params: { name: category },
        });
      }

      setItems(res.data);
    } catch (e: any) {
    } finally {
      setItemsLoading(false);
    }
  };

  useEffect(() => {
    if (category && typeof category === "string") {
      getItem(category);
    }
  }, [category]);

  useEffect(() => {
    if (cartSidebarOpen) {
      const storedTempCartItems = localStorage.getItem("tempCartItems")
        ? JSON.parse(localStorage.getItem("tempCartItems")!)
        : [];
      setTempCartItems(storedTempCartItems);
    }
  }, [cartSidebarOpen]);

  const handleAddToTempCart = (item: any) => {
    if (tempCartItems.some((cartItem: any) => cartItem._id === item._id)) {
      setError("Item is already in the cart");
    } else {
      const updatedTempCartItems = [...tempCartItems, item];
      setTempCartItems(updatedTempCartItems);
      localStorage.setItem(
        "tempCartItems",
        JSON.stringify(updatedTempCartItems)
      );
      setError("");
    }
    setCartSidebarOpen(true);
  };

  const handleSaveCart = () => {
    setCartSidebarOpen(false);
  };

  const handleCreateCart = () => {
    const cartData = {
      user: me._id,
      shop_items: tempCartItems.map((item: any) => item._id),
      total_price: tempCartItems.reduce(
        (total: any, item: any) => total + item.item_price,
        0
      ),
      total_qty: tempCartItems.length,
    };
    // dispatch(createCart({ cartData }));
    setTempCartItems([]);
    localStorage.removeItem("tempCartItems");
    setCartSidebarOpen(false);
  };

  return (
    <div className="w-full h-full my-12">
      {itemsLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <SingleLoader loadingSize={80} color="#000000" />
        </div>
      ) : (
        <div className="grid items-stretch w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-8">
          {items.length === 0 ? (
            <div className="w-full py-4 text-[#bbb]">
              Sorry, this page is empty.
            </div>
          ) : (
            items
              .filter(
                (item: Item_type) =>
                  item.item_img !== null && item.category !== null
              )
              .map((item: Item_type, index) => (
                <div
                  key={index}
                  className="cursor-pointer text-sm w-full flex flex-col items-center justify-between shadow-md bg-white border border-[#ccc] rounded-lg hover:scale-[1.05] ease-in-out duration-300"
                >
                  {item.item_img && (
                    <Image
                      unoptimized
                      width={100}
                      height={100}
                      src={item.item_img}
                      alt={item.item_name}
                      className="w-full h-[10rem] object-contain rounded-lg mt-4"
                    />
                  )}
                  <div className="flex flex-col justify-between flex-grow w-full px-4 py-3">
                    <div className="flex justify-between w-full item-center">
                      <div className="item-name">{item.item_name}</div>
                      <div className="item-price">🧀 {item.item_price}</div>
                    </div>
                    <button
                      className="w-full text-[0.8rem] flex items-center justify-center bg-[#f5f5f5] rounded-lg py-2 mt-2 text-black hover:bg-hightColor hover:text-white"
                      onClick={() => handleAddToTempCart(item)}
                    >
                      <GoPlus className="mr-1" size={15} /> Add to cart
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {cartSidebarOpen && (
        <AddToCartBar
          me={me}
          setTempCartItems={setTempCartItems}
          tempCartItems={tempCartItems}
          error={error}
          handleSaveCart={handleSaveCart}
          handleCreateCart={handleCreateCart}
          setCartSidebarOpen={setCartSidebarOpen}
        />
      )}
    </div>
  );
}
