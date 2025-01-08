"use client";

import {
  useGetProductByIdQuery,
  useGetProductsByCategoryAndPaginationQuery,
} from "@/state/userApi";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart, CartItem } from "@/store/cartSlice";
import { removeWishlistItem } from "@/store/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart } from "react-icons/ai";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlistItems } = useAppSelector(
    (state) => state.rootReducer.wishlist
  );

  const removeHandler = (_id: string) => {
    const wishlistItem = wishlistItems.find((item) => item._id === _id);
    if (!wishlistItem) {
      console.error("Cart item not found for ID:", _id);
      return;
    }
    dispatch(removeWishlistItem(_id));
    toast.success(`${wishlistItem.name} removed from wishlist`);
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

  const handleAddToCart = (product: any) => {
    const cartItem: CartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      description: product.description,
      currency: product.currency,
      unit: product.unit,
      category: product.category,
    };

    dispatch(addToCart(cartItem));
    toast.success(`${product.name} added to cart`);
  };

  const WishlistHeader = () => (
    <div className="flex items-center justify-between border-b pb-4 mb-4">
      <h1 className="text-2xl font-bold">Wishlist ({wishlistItems.length})</h1>
    </div>
  );

  const WishlistCard = ({
    _id,
    imageSrc,
    name,
    description,
    price,
    image,
  }: {
    _id: string;
    imageSrc: string;
    name: string;
    description: string;
    price: number;
    image: unknown;
  }) => (
    <div className="border p-4 h-[98%] rounded-lg shadow-lg border-gray-300 relative flex flex-col">
      {/* Heart icon in the top right corner */}
      <button onClick={() => removeHandler(_id)}>
        <AiFillHeart
          className="absolute top-2 right-2 text-red-500 cursor-pointer"
          size={24}
        />
      </button>

      <Image
        width={1000}
        height={1000}
        src={getImageSrc(image)}
        alt={name}
        className="h-48 w-5/6 ml-6 object-cover rounded-md"
      />
      <h3 className="font-semibold -mt-2">{name}</h3>
      <p className="text-base mt-1 font-medium text-gray-500 flex-grow">
        {description}
      </p>

      {/* Ensuring price and button are aligned at the bottom */}
      <div className="mt-2 flex flex-col justify-end">
        <span className="text-lg font-bold">₹{price}</span>
        <button
          onClick={() =>
            handleAddToCart({ _id, name, price, image, description })
          }
          className="mt-2 mx-auto w-full bg-[#7FA200] text-white font-semibold py-2 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  // Main Return
  return (
    <div className="p-8 max-w-7xl mt-20 px-1 mx-auto">
      <WishlistHeader />

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-center">
          <p className="text-4xl mb-4">No items in wishlist. Start Adding</p>
          <Link
            href={"/"}
            className="bg-[#7FA200] text-white font-semibold py-2 px-6 rounded-lg transition hover:bg-[#6f9100] active:bg-[#5c7a00]"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item._id}
              {...item}
              imageSrc={getImageSrc(item.image)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
