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
import { SingleProductLoader } from "@/app/(components)/Loader/loader";

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

  console.log("Product Image URL:", product?.image);

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

  if (isLoading) return <SingleProductLoader />;

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
                      src={product.image}
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
                  src={product.image}
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
