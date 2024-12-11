"use client";

import Image from "next/image";
import { addToCart, CartItem, removeCartItem } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";

const CartPage = () => {
  // const { _id } = cartItem;
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
    <div className="min-h-screen p-8">
      {cartItems.length > 0 ? (
        <div className="container mx-auto grid grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div
            className={`col-span-2 ${
              cartItems.length === 1
                ? "bg-gray-200 h-44"
                : cartItems.length === 2
                ? "bg-gray-200 h-80"
                : cartItems.length === 3
                ? "bg-gray-200 h-[29.2rem]"
                : cartItems.length === 4
                ? "bg-gray-200 h-[38.2rem]"
                : cartItems.length === 5
                ? "bg-gray-200 h-[47.4rem]"
                : cartItems.length === 6
                ? "bg-gray-200 h-[56.3rem]"
                : cartItems.length === 7
                ? "bg-gray-200 h-[65.4rem]"
                : cartItems.length === 8
                ? "bg-gray-200 h-[74.5rem]"
                : cartItems.length === 9
                ? "bg-gray-200 h-[83.6rem]"
                : cartItems.length === 10
                ? "bg-gray-200 h-[92.7rem]"
                : "bg-gray-200 h-16"
            } space-y-8`}
          >
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-gray-300 py-4"
              >
                <div className="flex items-center space-x-6">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      src={getImageSrc(item.image)}
                      alt={item.name}
                      className="w-20 h-20 ml-4 rounded"
                    />
                  </div>
                  <div className="w-64">
                    <h3
                      className="text-xl font-bold truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                  </div>
                </div>
                <p className="text-xl">₹{item.price}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => decrementHandler(item)}
                    className="px-4 py-2 text-xl font-bold border bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-xl px-3 py-2 font-semibold border bg-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementHandler(item)}
                    className="px-3 text-xl py-2 font-bold border bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <p className="text-xl">₹{item.price * item.quantity}</p>
                <button
                  onClick={() => removeHandler(item._id)}
                  className="text-2xl mr-5"
                >
                  X
                </button>
              </div>
            ))}

            {/* Coupon Code Section */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Your coupon code"
                className="border border-gray-300 -mt-7 ml-[15px] py-3 px-8 text-lg w-1/4 rounded"
              />
              <button className="bg-[#E8AE3F] ml-1 -mt-7 text-white text-xl font-bold py-3 px-8 rounded">
                Apply
              </button>

              <button className="bg-[#E8AE3F] -mt-7 ml-80 py-3 text-white text-xl font-bold px-5 w-[20%] rounded">
                Update Cart
              </button>
            </div>
          </div>

          {/* Cart Total Section (Right Side) */}
          <div className="relative">
            <div className="-top-10 sticky bg-gray-200">
              <div className="p-6 h-[24rem] rounded-md flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-4">Cart Total</h2>
                <div className="flex justify-between text-xl mb-2">
                  <span>Subtotal:</span>
                  <span>
                    ₹
                    {cartItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-xl mb-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span>
                    ₹
                    {cartItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <button className="bg-[#00A2A2] text-xl text-white font-bold py-3 px-8 w-full mt-6 rounded">
                  Proceed to checkout →
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-72">
          <h1 className="text-6xl">Your cart is empty</h1>
          <Link
            href="/"
            className="mt-6 bg-[#E8AE3F] text-white text-xl font-bold py-3 px-8 rounded"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
