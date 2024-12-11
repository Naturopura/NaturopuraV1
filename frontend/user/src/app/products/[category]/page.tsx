"use client";

import Image from "next/image";
import {
  useGetProductsByCategoryAndPaginationQuery,
  // useGetProductsByCategoryQuery,
} from "@/state/userApi";
import { FetchBaseQueryError, skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { addToCart, CartItem } from "@/store/cartSlice";
import { useAppDispatch } from "@/store";
import toast from "react-hot-toast";
import { addToWishlist, WishlistItem } from "@/store/wishlistSlice";
import Sidebar from "../../(components)/Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Juices = () => {
  const dispatch = useAppDispatch();
  // const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const { category }: { category: string } = useParams();

  console.log("here is cat", category);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryAndPaginationQuery({ category, page, limit });

  if (isLoading)
    return (
      <div className="flex animate-pulse">
        {/* Filters Section */}
        <div className="w-1/4 p-4 space-y-6 border-r">
          <div className="h-6 bg-gray-300 rounded w-[35%]"></div>
          <div className="flex">
            <div className="h-6 bg-gray-300 rounded w-[35%]"></div>
            <div className="h-6 ml-44 w-6 bg-gray-300 rounded"></div>
          </div>

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex -mt-4 items-center space-x-3">
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="h-6 bg-gray-300 rounded w-[150%]"></div>
            <div className="h-7 ml-44 w-24 bg-gray-300 rounded"></div>
          </div>

          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex -mt-5 items-center space-x-3">
                <div className="h-6 w-6  bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-[40%]"></div>
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="h-6 bg-gray-300 rounded w-[35%]"></div>
            <div className="h-6 ml-44 w-6 bg-gray-300 rounded"></div>
          </div>

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex -mt-4 items-center space-x-3">
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="w-3/4 p-4">
          <div className="flex justify-between mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-32 w-32 ml-24 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 ml-[6.55rem] rounded w-[35%]"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4 ml-[7.5rem]"></div>
                <div className="flex space-x-2 ml-12">
                  <div className="h-8 bg-gray-300 rounded w-[40%]"></div>
                  <div className="h-8 bg-gray-300 rounded w-[40%]"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-16">
            <div className="h-7 ml-1 bg-gray-300 rounded w-24"></div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 ml-[19rem] bg-gray-300 rounded-full"></div>{" "}
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>{" "}
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (error) {
    if ("data" in (error as FetchBaseQueryError)) {
      return (
        <div className="text-center ml-84 -mt-[600px] text-4xl">
          No products yet
        </div>
      );
    }
    return (
      <div className="text-center text-red-500 py-4">
        Something went wrong. Please try again later.
      </div>
    );
  }

  if (!products) return <div>Failed to fetch products</div>;

  if (products.data.length === 0) {
    return (
      <div className="text-center text-black py-4">
        No products found for the {category} category.
      </div>
    );
  }

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

  const handleAddToWishlist = (product: any) => {
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
  };

  const getImageSrc = (image: any) => {
    if (
      typeof image === "string" &&
      (image.startsWith("http://") || image.startsWith("https://"))
    ) {
      return image;
    }

    if (image && image.data && Array.isArray(image.data)) {
      try {
        return `data:image/png;base64,${Buffer.from(image.data).toString(
          "base64"
        )}`;
      } catch (error) {
        console.error("Failed to convert Buffer to Base64:", error);
      }
    }

    console.warn("No valid image source found:", image);

    return "/default-image.png";
  };

  return (
    <div className="flex overflow-x-hidden min-h-screen">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Showing{" "}
          {products?.data
            ? Math.min(
                (page - 1) * limit + 1,
                products.data.filter((product) => product.category === category)
                  ?.length
              )
            : 0}{" "}
          -{" "}
          {products?.data
            ? Math.min(
                page * limit,
                products.data.filter((product) => product.category === category)
                  ?.length
              )
            : 0}{" "}
          of{" "}
          {products?.data?.filter((product) => product.category === category)
            ?.length || 0}{" "}
          products
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {products?.data
            ?.slice((page - 1) * limit, page * limit)
            .map((product) => (
              <div key={product._id} className="p-4">
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={getImageSrc(product.image)}
                    width={100}
                    height={100}
                    alt={product.name}
                    className="w-full h-[70%] object-cover mb-4"
                  />
                  <h4 className="font-semibold text-xl text-center">
                    {product.name}
                  </h4>
                </Link>
                <p className="text-xl font-bold text-center">
                  {product.currency} {product.price}
                </p>
                <div className="flex space-x-1 ml-7">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#7FA200] rounded-xl text-white px-4 py-2"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="bg-[#7FA200] rounded-xl text-white px-4 py-2"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center -ml-36 mt-12">
          <hr className="w-[93%] border-t-2 ml-40 border-black mb-6" />
          <div className="flex justify-between items-center space-x-4 w-full max-w-[20rem]">
            <span className="text-xl -ml-64 font-semibold">
              Page {page} of{" "}
              {Math.ceil(
                (products?.data?.filter(
                  (product) => product.category === category
                )?.length || 0) / limit
              ) || 1}
            </span>
            <div className="flex space-x-2">
              {/* Previous Button */}
              {page > 1 && (
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={`text-xl font-medium px-4 py-2 rounded-full ${
                    page <= 1
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-[#7FA200] text-white"
                  }`}
                >
                  Previous
                </button>
              )}

              {/* Page Number Buttons */}
              {Array.from(
                {
                  length:
                    Math.ceil(
                      (products?.data?.filter(
                        (product) => product.category === category
                      )?.length || 0) / limit
                    ) || 1,
                },
                (_, index) => index + 1
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 ${
                    pageNum === page ? "bg-[#7FA200] text-white" : ""
                  } rounded-full font-medium text-xl`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              {page <
                Math.ceil(
                  (products?.data?.filter(
                    (product) => product.category === category
                  )?.length || 0) / limit
                ) && (
                <button
                  onClick={() => {
                    setPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(
                          (products?.data?.filter(
                            (product) => product.category === category
                          )?.length || 0) / limit
                        )
                      )
                    );
                  }}
                  className={`text-xl font-medium px-4 py-2 rounded-full ${
                    page >=
                    Math.ceil(
                      (products?.data?.filter(
                        (product) => product.category === category
                      )?.length || 0) / limit
                    )
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-[#7FA200] text-white"
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Juices;
