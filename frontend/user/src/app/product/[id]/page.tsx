"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useGetProductByIdQuery } from "@/state/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { addToCart, CartItem } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store";
import { addToWishlist, WishlistItem } from "@/store/wishlistSlice";
import { FiHeart } from "react-icons/fi";
import RatingsAndReviews from "../RatingsAndReviews/ratingsandreviews";
import SimilarItems from "../SimilarItems/similaritems";
import RecentlyViewed from "../RecentlyViewed/recentlyviewed";

// Helper function to handle image rendering
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

const ProductCard = () => {
  const detailsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useGetProductByIdQuery(id as string);

  useEffect(() => {
    const container = containerRef.current;
    const details = detailsRef.current;

    const handleScroll = () => {
      if (!container || !details) return;

      const detailsScrollTop = details.scrollTop;
      const detailsScrollHeight = details.scrollHeight;
      const detailsClientHeight = details.clientHeight;
      const isDetailsScrollable = detailsScrollHeight > detailsClientHeight;

      if (isDetailsScrollable) {
        if (
          container.scrollTop >= details.offsetTop &&
          detailsScrollTop + detailsClientHeight < detailsScrollHeight
        ) {
          // Lock container scrolling and enable details scrolling
          container.style.overflowY = "hidden";
          details.style.overflowY = "auto";
        } else if (
          container.scrollTop < details.offsetTop ||
          detailsScrollTop + detailsClientHeight >= detailsScrollHeight
        ) {
          // Enable container scrolling and disable details scrolling
          container.style.overflowY = "auto";
          details.style.overflowY = "hidden";
        }
      }
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading)
    return (
      <div className="p-6 mt-28 animate-pulse">
        {/* Top Section */}
        <div className="flex flex-wrap gap-4">
          {/* Image Carousel */}
          <div className="flex flex-col space-y-4">
            <div className="h-[7.35rem] w-[7.35rem] bg-gray-300 rounded-md"></div>
            <div className="h-[7.35rem] w-[7.35rem] bg-gray-300 rounded-md"></div>
            <div className="h-[7.35rem] w-[7.35rem] bg-gray-300 rounded-md"></div>
          </div>
          {/* Main Product Image */}
          <div className="flex-grow h-96 bg-gray-300 rounded-md"></div>
          {/* Product Details */}
          <div className="flex-grow">
            <div className="h-8 w-64 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-8 w-52 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-7 w-60 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-6 w-1/5 bg-gray-300 rounded-md mb-4"></div>
            {/* Buttons 9 and 10 */}
            <div className="flex gap-2 mb-4">
              <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
            </div>
            {/* Buttons 19, 20, and 21 */}
            <div className="flex gap-2 mt-10">
              <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
            </div>

            <div className="flex flex-col p-4 bg-white mt-5 rounded-md w-full space-y-4">
              {/* Top Section */}
              <div className="flex items-start space-x-4">
                {/* Image Placeholder */}
                <div className="h-16 w-16 bg-gray-300 rounded-md"></div>
              </div>

              {/* User Details and Interaction */}
              <div className="flex items-center justify-between">
                {/* User and Date */}
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
                  <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
                </div>
                {/* Actions */}
                <div className="flex space-x-2">
                  <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                  <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                  <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="mt-8">
          <div className="h-7 w-48 bg-gray-300 rounded-md mb-4 -ml-2"></div>
        </div>

        {/* Similar Items */}
        <div className="mt-5">
          <div className="grid grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-64 w-80 bg-gray-300 rounded-md mb-2"></div>
                <div className="flex gap-52">
                  <div className="h-7 w-20 bg-gray-300 rounded-md"></div>
                  <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
                </div>
                <div className="h-7 w-16 mr-[15.7rem] mt-2 bg-gray-300 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="h-7 w-48 bg-gray-300 rounded-md mb-4 -ml-2"></div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-5">
          <div className="grid grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-64 w-80 bg-gray-300 rounded-md mb-2"></div>
                <div className="flex gap-52">
                  <div className="h-7 w-20 bg-gray-300 rounded-md"></div>
                  <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
                </div>
                <div className="h-7 w-16 mr-[15.7rem] mt-2 bg-gray-300 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  if (isError) {
    const errorMsg =
      "data" in (error as FetchBaseQueryError)
        ? "No product found"
        : "Something went wrong. Please try again later.";
    return <div className="text-center text-red-500 py-4">{errorMsg}</div>;
  }

  if (!product)
    return <div className="text-center text-black py-4">No product found</div>;

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1, // Default quantity when adding to cart
        image: product.image,
        description: product.description,
        currency: product.currency,
        unit: product.unit,
        category: product.category,
      };

      dispatch(addToCart(cartItem));
      toast.success(`${product.name} added to cart`);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      const wishlistItem: WishlistItem = {
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

      dispatch(addToWishlist(wishlistItem));
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="min-h-screen p-8 mt-24 px-6 overflow-y-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="sticky top-1 h-fit">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-40 h-40 border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 bg-gray-200 relative"
                  >
                    <Image
                      src={getImageSrc(product.image)}
                      alt={`Fruit variant ${i}`}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="relative bg-gray-200 rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={handleAddToWishlist}
                  className="absolute top-2 right-2 text-2xl"
                >
                  <FiHeart />
                </button>
                <Image
                  src={getImageSrc(product.image)}
                  alt={product.name}
                  width={1000}
                  height={1000}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            ref={detailsRef}
            className="space-y-6 overflow-y-auto max-h-[calc(100vh-2.2rem)] scrollbar-hide"
          >
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">
                {product.currency} {product.price}
              </div>
              <div className="text-gray-500 text-xl line-through">INR 200</div>
              <div className="text-xl text-green-500">50% Off</div>
            </div>

            <div className="flex items-center mt-4">
              <span className="text-yellow-500 text-2xl">★★★★★</span>
              <span className="ml-2 text-gray-500 text-2xl">
                (4.9) 1.2K Reviews
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed text-xl">
              {product.description}
            </p>

            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                className="bg-[#7FA200] text-xl font-semibold text-white px-6 py-3 rounded-lg"
              >
                Add To Cart
              </button>
              <button className="bg-green-500 font-semibold text-white text-xl px-6 py-3 rounded-lg hover:bg-green-600">
                Buy Now
              </button>
            </div>
            <RatingsAndReviews />
          </div>
        </div>
      </div>
      <SimilarItems />

      <RecentlyViewed />
    </>
  );
};

const ProductDetail = () => {
  return (
    <div className="">
      <ProductCard />
    </div>
  );
};

export default ProductDetail;
