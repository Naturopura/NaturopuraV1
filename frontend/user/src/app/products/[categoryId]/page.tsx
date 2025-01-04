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
import { useState } from "react";
import { useParams } from "next/navigation";
import { FiHeart } from "react-icons/fi";

const Products = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [filters, setFilters] = useState({
    priceRange: [25, 125],
    sort: "",
  });
  const { categoryId }: { categoryId: string } = useParams();

  console.log("categoryId:", categoryId);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryAndPaginationQuery({ categoryId, page, limit });

  const totalPages = Math.ceil(
    (products?.pagination.totalProducts || 0) / limit
  );

  console.log("Products:", products);
  console.log("Current Page:", page);
  console.log("Total Products:", products?.data?.length);
  console.log("Total Pages:", Math.ceil((products?.data?.length || 0) / limit));

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
      <div className="text-center text-2xl mt-64 ml-10 font-semibold py-4">
        No products found for this category
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

  const handleFilterChange = (key: string, value: string | number[]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex mt-32 mx-5 border-t-2">
      {/* Sidebar Filters */}
      <Sidebar />

      {/* Main Content */}
      <main className="w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xl font-semibold">
              Showing {products?.pagination ? (page - 1) * limit + 1 : 0} -{" "}
              {products?.pagination
                ? Math.min(page * limit, products.pagination.totalProducts)
                : 0}{" "}
              of {products?.pagination?.totalProducts || 0} products
            </p>
          </div>
          <select
            className={`border font-semibold rounded p-2 ${
              filters.sort === "price-low" ||
              filters.sort === "price-high" ||
              filters.sort === "all-products"
                ? "w-64"
                : "w-44"
            }`}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
          >
            <option value="all-products">Sort By: All Products</option>
            <option value="newest">Sort By: Newest</option>
            <option value="price-low">Sort By: Price: Low to High</option>
            <option value="price-high">Sort By: Price: High to Low</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-3 gap-4">
          {products?.data.map((product) => (
            <div
              key={product._id}
              className="border-2 border-gray-400 rounded-lg p-4 flex flex-col items-start relative"
            >
              <div className="relative w-full h-40">
                <Link href={`/product/${product._id}`}>
                  <Image
                    width={998}
                    height={1000}
                    src={getImageSrc(product.image)}
                    alt="Product"
                    className="mb-4 ml-16 object-cover w-1/2 h-3/4"
                  />
                </Link>
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="absolute -top-3 -right-2 text-xl p-1 "
                >
                  <FiHeart />
                </button>
              </div>
              <p className="text-lg text-gray-500 flex items-center justify-between w-full">
                <span>{product.category.name}</span>
                <span className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>4.5</span>
                </span>
              </p>
              <Link href={`/product/${product._id}`}>
                <h4 className="font-bold text-lg pt-2">{product.name}</h4>
              </Link>
              <div className="flex items-center justify-between w-full mt-2">
                <p className="text-lg font-bold">
                  {product.currency} {product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#7FA200] font-semibold text-white px-4 py-2 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          {/* Page Info */}
          <div className="text-lg font-semibold">
            Page {page} of {totalPages || 1}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center flex-grow space-x-2">
            {page > 1 && (
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="bg-[#7FA200] text-white px-4 py-2 font-semibold rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
            )}

            {/* Page Numbers */}
            {Array.from(
              {
                length: totalPages,
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

            {page < totalPages && (
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="bg-[#7FA200] text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
