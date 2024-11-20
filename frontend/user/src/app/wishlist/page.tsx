"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { removeWishlistItem } from "@/store/wishlistSlice";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

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

  return (
    <>
      {wishlistItems.length > 0 ? (
        <div className="w-[100%] p-4 my-20">
          <h1 className="text-2xl -mt-16 font-semibold border-b border-black pb-2">
            My Wishlist ({wishlistItems.length})
          </h1>
          <div className="mt-4 space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-black pb-4 w-full"
              >
                {/* Product Image */}
                <Image
                  width={100}
                  height={100}
                  src={getImageSrc(item.image)}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md"
                />

                {/* Product Details */}
                <div className="flex-1 ml-4">
                  {/* Product Name */}
                  <h2 className="text-2xl text-gray-400 font-normal">
                    {item.name}
                  </h2>

                  {/* Rating */}
                  <div className="text-sm text-gray-500 flex items-center mt-2">
                    <span className="text-yellow-500 text-2xl">★★★★★</span>
                    {/* <span className="ml-1 text-2xl">{item.rating.toFixed(5)}</span> */}
                  </div>

                  {/* Price */}
                  <p className="text-2xl font-normal mt-2">₹{item.price}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeHandler(item._id)}
                  className="-mt-20"
                >
                  <TrashIcon className="h-10 w-10" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-4xl font-medium mt-40">
          You have no items in your wishlist. Start adding!
        </h1>
      )}
    </>
  );
};

export default Wishlist;
