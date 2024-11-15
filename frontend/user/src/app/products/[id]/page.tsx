"use client";

import React from "react";
import Image from "next/image";
import { useGetProductsQuery } from "@/state/farmerApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";

const ProductCard = () => {
  const {
    data: products = [],
    isError,
    isLoading,
    error,
  } = useGetProductsQuery();

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (isError) {
    if ("data" in (error as FetchBaseQueryError)) {
      // const errorData = (error as FetchBaseQueryError).data;
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

  if (products.length === 0)
    return <div className="text-center text-black py-4">No products yet</div>;

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
    <>
      {products.map((product, index) => (
        <div
          key={index}
          className="h-screen w-screen mx-auto overflow-x-hidden flex"
        >
          {/* Left Section: Thumbnails and Main Image with Buttons */}
          <div className="flex flex-col items-start p-8 w-1/2">
            <div className="flex">
              {/* Thumbnails on the Left */}
              <div className="flex flex-col space-y-0 mr-6">
                <Image
                  width={100}
                  height={100}
                  src={getImageSrc(product.image)}
                  alt="Thumbnail 1"
                  className="w-[8.67rem] h-[8.67rem] border border-gray-500 object-cover"
                />
                <Image
                  width={100}
                  height={100}
                  src={getImageSrc(product.image)}
                  alt="Thumbnail 2"
                  className="w-[8.67rem] h-[8.67rem] border border-gray-500 object-cover"
                />
                <Image
                  width={100}
                  height={100}
                  src={getImageSrc(product.image)}
                  alt="Thumbnail 3"
                  className="w-[8.67rem] h-[8.67rem] border border-gray-500 object-cover"
                />
              </div>

              {/* Main Product Image */}
              <Image
                width={500}
                height={500}
                src={getImageSrc(product.image)}
                alt="Blueberry"
                className="border border-gray-500 w-96 h-[26rem] -ml-6 object-cover"
              />
            </div>

            {/* Action Buttons Below Main Image */}
            <div className="flex space-x-2 ml-36 mt-3">
              <button className="bg-[#E8AE3F] text-white text-2xl font-bold py-3 px-8 rounded-md">
                Add to Cart
              </button>
              <button className="bg-[#00A2A2] text-white text-2xl font-bold py-3 px-8 rounded-md">
                Buy Now
              </button>
            </div>
          </div>

          {/* Right Section: Product Info */}
          <div className="p-12 -ml-96 -mt-6 w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-yellow-400 text-3xl">★★★★★</span>
              <span className="text-gray-500 text-2xl">(5.0)</span>
            </div>
            <p className="text-4xl font-semibold text-gray-800 mb-6">
              {product.currency} {product.price}
            </p>
            <h1 className="text-2xl text-gray-500 font-semibold mb-4">
              Description
            </h1>
            <p className="mb-8 text-xl">{product.description}</p>

            {/* Additional Product Information */}
          </div>
        </div>
      ))}
    </>
  );
};

function ProductDetail() {
  return (
    <div className="min-h-screen py-12">
      <ProductCard />
    </div>
  );
}

export default ProductDetail;
