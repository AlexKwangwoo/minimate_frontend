import React from "react";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import { getCarts } from "./actions";
import getSession from "@/lib/session";
import CartList from "@/components/Cart/cartList";

const getCachedCarts = nextCache(getCarts, ["cart"], { tags: ["cart-list"] });

export default async function Cart({}) {
  const { user: me } = await getSession();
  const myCarts = await getCachedCarts(me._id).then((result) => result.data);

  return (
    <div className="flex flex-col w-full h-full px-10 py-16 sm:px-20 md:px-40">
      <div className="mb-4 text-3xl font-bold">Cart</div>

      <div className="w-full mt-4">
        <CartList me={me} myCarts={myCarts} />
      </div>

      {/* {!selectedCart ? (
        <div className="my-20 text-center text-[#bbb]">Select your cart</div>
      ) : (
        <div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length === selectedCartItems.length}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <label className="text-[0.8rem]">Select All</label>
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
                      <img
                        src={cartItem.item_img || "placeholder-image-url"}
                        // src={}
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
                <p>${formatPrice(totalCartItemPrice)}</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Available Points:</p>
                <p>${formatPrice(availablePoints)}</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Remaining Balance:</p>
                <p className={`${pointAlert && "text-[#f64949fe]"}`}>
                  ${formatPrice(availablePoints - totalCartItemPrice)}
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
                containerStyles="text-[0.8rem] px-4 py-2 rounded bg-black text-white"
                title="Checkout"
                onClick={handleCheckout}
              />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
