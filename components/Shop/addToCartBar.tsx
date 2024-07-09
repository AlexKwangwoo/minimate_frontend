import API from "@/app/utils/request";
import React, { useEffect, useState } from "react";
// import {
//   fetchAllCartsByUser,
//   fetchCartItems,
//   createCart,
//   updateCart,
// } from "../redux/cartSlice";
import { MdDelete } from "react-icons/md";

const AddToCartBar = ({
  setTempCartItems,
  tempCartItems,
  error,
  handleSaveCart,
  handleCreateCart,
  setCartSidebarOpen,
  me,
}) => {
  // const dispatch = useDispatch();
  // const { item, list, loading } = useSelector((state) => state.cart);
  // const [cartItems, setCartItems] = useState(item.shop_items || []);
  const [selectedCart, setSelectedCart] = useState("");
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  // const [localCartItems, setLocalCartItems] = useState(tempCartItems || []);
  const [warning, setWarning] = useState("");
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   if (me) {
  //     dispatch(fetchAllCartsByUser({ userId: me?._id }));
  //   }
  // }, [dispatch, me]);

  const getUserCarts = async () => {
    let res = await API.get("/carts", { params: { user: me._id } });
    console.log("res", res);
    console.log("user: me.userId ", me);
  };
  useEffect(() => {
    getUserCarts();
  }, []);

  // useEffect(() => {
  //   if (list.length > 0 && selectedCart) {
  //     const cart = list.find((cart: any) => cart._id === selectedCart);
  //     if (cart) {
  //       setSelectedCartItems(cart.shop_items || []);
  //     }
  //   }
  // }, [selectedCart, list]);

  useEffect(() => {
    localStorage.setItem("tempCartItems", JSON.stringify(tempCartItems));
  }, [tempCartItems]);

  const handleRemoveItem = (index) => {
    const updatedCartItems = tempCartItems?.filter((_, i) => i !== index);
    setTempCartItems(updatedCartItems);
    localStorage.setItem("tempCartItems", JSON.stringify(updatedCartItems));
    setSelectedCartItems([]);
  };

  const handleSelectCartChange = (e) => {
    setSelectedCart(e.target.value);
    setWarning("");
  };

  // const handleCreateOrUpdateCart = () => {
  //   const existingItemIds = selectedCartItems.map((item) => item._id);
  //   const newItems = tempCartItems.filter((item) => !existingItemIds.includes(item._id));

  //   if (newItems.length !== tempCartItems.length) {
  //     setWarning("Some items are already in your cart");
  //     return;
  //   }

  //   if (selectedCart === "new") {
  //     const cartData = {
  //       user: me._id,
  //       shop_items: tempCartItems.map((item) => item._id),
  //       total_price: tempCartItems.reduce((total, item) => total + item.item_price, 0),
  //       total_qty: tempCartItems.length,
  //     };
  //     dispatch(createCart({ cartData }));
  //   } else {
  //     const updatedCart = {
  //       shop_items: [...selectedCartItems, ...tempCartItems].map((item) => item._id),
  //       total_price:
  //         selectedCartItems.reduce((total, item) => total + item.item_price, 0) +
  //         tempCartItems.reduce((total, item) => total + item.item_price, 0),
  //       total_qty: selectedCartItems.length + tempCartItems.length,
  //     };
  //     dispatch(updateCart({ cartId: selectedCart, cartData: updatedCart }));
  //   }
  //   localStorage.removeItem("tempCartItems");
  //   setTempCartItems([]);
  //   setSelectedCartItems([]);
  //   setCartSidebarOpen(false);
  // };
  // const handleCreateOrUpdateCart = () => {
  //   const existingItemIds = selectedCartItems.map((item) => item._id);
  //   const newItems = tempCartItems.filter(
  //     (item) => !existingItemIds.includes(item._id)
  //   );

  //   if (selectedCart !== "new" && newItems.length !== tempCartItems.length) {
  //     setWarning("Some items are already in your cart");
  //     return;
  //   }

  //   if (selectedCart === "new") {
  //     const cartData = {
  //       user: me._id,
  //       shop_items: tempCartItems.map((item) => item._id),
  //       total_price: tempCartItems.reduce(
  //         (total, item) => total + item.item_price,
  //         0
  //       ),
  //       total_qty: tempCartItems.length,
  //     };
  //     dispatch(createCart({ cartData }));
  //   } else {
  //     const updatedCart = {
  //       shop_items: [...selectedCartItems, ...tempCartItems].map(
  //         (item) => item._id
  //       ),
  //       total_price:
  //         selectedCartItems.reduce(
  //           (total, item) => total + item.item_price,
  //           0
  //         ) + tempCartItems.reduce((total, item) => total + item.item_price, 0),
  //       total_qty: selectedCartItems.length + tempCartItems.length,
  //     };
  //     dispatch(updateCart({ cartId: selectedCart, cartData: updatedCart }));
  //   }
  //   localStorage.removeItem("tempCartItems");
  //   setTempCartItems([]);
  //   setSelectedCartItems([]);
  //   setCartSidebarOpen(false);
  // };

  return (
    <>
      <div className="fixed top-0 right-0 w-[40vw] md:w-[30vw] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-fit max-h-[1/2] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Cart</h2>
            <button
              onClick={() => setCartSidebarOpen(false)}
              className="text-xl"
            >
              &times;
            </button>
          </div>
          <div className="flex-grow overflow-y-auto h-fit">
            {tempCartItems.length === 0 ? (
              <div className="text-center">Your cart is empty</div>
            ) : (
              <>
                {tempCartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between my-4 h-fit"
                  >
                    <div className="flex items-center">
                      <div className="mr-2">{index + 1}.</div>
                      <div>{item.item_name}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">🧀 {item.item_price}</div>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-lg hover:text-[#e35252]"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {warning && (
            <div className="mt-2 text-center text-[#e35252]">{warning}</div>
          )}
          <div className="mt-4">
            <select
              className="w-full bg-[#ddd] p-2 rounded"
              value={selectedCart}
              onChange={handleSelectCartChange}
            >
              <option value="">Select cart</option>
              <option value="new">New Cart</option>
              {list.map((cart, index) => (
                <option key={cart._id} value={cart._id}>
                  cart {index + 1}
                </option>
              ))}
            </select>
          </div>
          {selectedCart && selectedCart !== "new" && (
            <div className="mt-4">
              {selectedCartItems.length === 0 ? (
                <div className="text-center text-[#bbb]">
                  No items in this cart
                </div>
              ) : (
                selectedCartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-4"
                  >
                    <div>{item.item_name}</div>
                    <div>🧀 {item.item_price}</div>
                  </div>
                ))
              )}
            </div>
          )}
          {selectedCart && (
            <div className="mt-4">
              <div className="mt-4">
                <button
                  onClick={handleCreateOrUpdateCart}
                  className="w-full py-2 mb-2 text-white bg-black rounded"
                >
                  Add to Selected Cart
                </button>
                <button
                  onClick={() => setCartSidebarOpen(false)}
                  className="w-full py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={() => setCartSidebarOpen(false)}
      ></div>
    </>
  );
};

export default AddToCartBar;
