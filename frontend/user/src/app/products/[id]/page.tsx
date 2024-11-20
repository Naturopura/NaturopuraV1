"use client";

import React from "react";
import Image from "next/image";
import { useGetProductByIdQuery } from "@/state/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { addToCart, CartItem } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/store";

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
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useGetProductByIdQuery(id as string);

  if (isLoading) return <div className="py-4">Loading...</div>;

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
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="h-screen w-screen mx-auto flex">
      {/* Left Section: Thumbnails and Main Image */}
      <div className="flex flex-col items-start p-8 w-1/2">
        <div className="flex">
          {/* Thumbnails */}
          <div className="flex flex-col space-y-0 mr-6">
            {[1, 2, 3].map((i) => (
              <Image
                key={i}
                width={100}
                height={100}
                src={getImageSrc(product.image)}
                alt={`Thumbnail ${i}`}
                className="w-[8.67rem] h-[8.67rem] border border-gray-500 object-cover"
              />
            ))}
          </div>

          {/* Main Product Image */}
          <Image
            width={500}
            height={500}
            src={getImageSrc(product.image)}
            alt={product.name}
            className="border border-gray-500 w-96 h-[26rem] -ml-6 object-cover"
          />
        </div>

        {/* Action Buttons Below Main Image */}
        <div className="flex space-x-2 ml-36 mt-3">
          <button
            onClick={handleAddToCart}
            className="bg-[#E8AE3F] hover:bg-yellow-700 text-white text-2xl font-bold py-3 px-8 rounded-md"
          >
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
        <p className="mb-8 text-xl">
          {product.quantity > 0 ? (
            <div className="text-green-600">In stock</div>
          ) : (
            <div className="text-red-600">Out of stock</div>
          )}
        </p>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  return (
    <div className="min-h-screen overflow-x-hidden py-12">
      <ProductCard />
    </div>
  );
};

export default ProductDetail;
