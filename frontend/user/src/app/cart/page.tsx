"use client";

import Image from "next/image";
import { addToCart, CartItem, removeCartItem } from "@/store/cartSlice";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";
import { useState } from "react";
import SimilarItems from "../product/SimilarItems/similaritems";
import RecentlyViewed from "../product/RecentlyViewed/recentlyviewed";

const CartPage = () => {
  // const { _id } = cartItem;
  const [promoCode, setPromoCode] = useState("");
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.rootReducer.cart);

  const incrementHandler = (cartItem: CartItem) => {
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    toast.success(
      `You have increased ${cartItem.name} quantity to ${cartItem.quantity + 1}`
    );
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) {
      return;
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    toast.success(
      `You have decreased ${cartItem.name} quantity to ${cartItem.quantity - 1}`
    );
  };

  const removeHandler = (_id: string) => {
    const cartItem = cartItems.find((item) => item._id === _id);
    if (!cartItem) {
      console.error("Cart item not found for ID:", _id);
      return;
    }
    dispatch(removeCartItem(_id));
    toast.success(`${cartItem.name} removed from cart`);
  };

  const getImageSrc = (image: any) => {
    if (
      typeof image === "string" &&
      (image.startsWith("http://") || image.startsWith("https://"))
    ) {
      return image;
    }

    if (image?.data && Array.isArray(image.data)) {
      return `data:image/png;base64,${Buffer.from(image.data).toString(
        "base64"
      )}`;
    }

    return "/default-image.png"; // Fallback image
  };

  return (
    <>
      <div className="min-h-screen mt-16 py-12">
        {cartItems.length > 0 ? (
          <div className="px-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Shopping Cart Section */}
              <div className="flex-1 border border-gray-300 rounded-lg p-6">
                <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center py-6">
                      <Image
                        width={150}
                        height={150}
                        src={getImageSrc(item.image)}
                        alt={item.name}
                        className="w-20 h-20 rounded"
                      />
                      <div className="ml-6 flex-1">
                        {/* Name and Total Price */}
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium">{item.name}</h2>
                          <p className="font-semibold text-lg">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        {/* Actual Price and Stock Status */}
                        <div className="flex items-center space-x-4 mt-2">
                          <p className="text-lg text-gray-500 font-medium">
                            ₹{item.price.toFixed(2)}
                          </p>
                          <div className="border-l border-gray-400 h-5"></div>
                          <p className="text-lg text-green-600">In stock</p>
                        </div>
                        {/* Quantity Controls and Save/Delete Buttons */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-300 rounded-lg space-x-3">
                            <button
                              onClick={() => decrementHandler(item)}
                              className="px-3 text-gray-500 text-2xl"
                            >
                              -
                            </button>
                            <span className="text-xl text-gray-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => incrementHandler(item)}
                              className="px-3 text-gray-500 text-2xl"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex space-x-4">
                            {/* Save Button */}
                            <button className="flex items-center font-semibold text-gray-500 hover:text-gray-600 text-md">
                              <AiFillHeart className="w-5 h-5 mr-2" />
                              Save
                            </button>
                            <div className="border-l border-gray-400 mt-0.5 h-5"></div>
                            {/* Delete Button */}
                            <button
                              onClick={() => removeHandler(item._id)}
                              className="flex items-center font-semibold text-gray-500 hover:text-gray-600 text-md"
                            >
                              <AiFillDelete className="w-5 h-5 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Section */}
              <div className="w-full h-1/2 lg:w-1/3 border border-gray-300 rounded-lg p-6 bg-gray-50 shadow-sm space-y-3">
                <h2 className="text-xl font-semibold">Price Details</h2>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-lg">
                    <p>Subtotal</p>
                    <p>
                      ₹
                      {cartItems.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )}
                    </p>
                  </div>
                </div>
                {/* Coupon Code Section */}
                <div className="mt-6">
                  <label htmlFor="promo" className="block text-md">
                    Coupon code
                  </label>
                  <div className="flex space-x-2 mt-2">
                    <input
                      id="promo"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-md"
                      placeholder="Enter code"
                    />
                    <button className="bg-[#7FA200] text-white font-semibold px-5 py-2 rounded-lg text-md">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="flex justify-between font-semibold text-xl mt-6">
                  <p>Total</p>
                  <p>
                    ₹
                    {cartItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
                <Link href={"/checkout"}>
                  <button className="w-full mt-2 bg-[#7FA200] text-white py-3 rounded-lg font-semibold text-lg">
                    Proceed to Buy
                  </button>
                </Link>
                <button className="w-full py-3 border border-gray-400 font-semibold rounded-lg text-lg">
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-72">
            <h1 className="text-6xl">Your cart is empty</h1>
            <Link
              href="/"
              className="mt-6 bg-[#7FA200] text-white text-xl font-bold py-3 px-8 rounded-xl"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>

      {/* Similar Items */}
      <SimilarItems />

      {/* Recently Viewed */}
      <RecentlyViewed />
    </>
  );
};

export default CartPage;
