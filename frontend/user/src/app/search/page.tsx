"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLazySearchFilterAndSortProductsQuery } from "@/state/userApi";
import Link from "next/link";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import Sidebar from "../(components)/Sidebar";
import { addToCart, CartItem } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { addToWishlist, WishlistItem } from "@/store/wishlistSlice";
import { useAppDispatch } from "@/store";

const Search = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [filters, setFilters] = useState({
    priceRange: [25, 125],
    sort: "",
  });
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const [triggerSearch, { data: product, isLoading, isError }] =
    useLazySearchFilterAndSortProductsQuery();

  console.log("Category------", category);

  useEffect(() => {
    if (query.trim()) {
      triggerSearch({ query: query, page: page, limit: limit });
    }
  }, [query, page, limit, triggerSearch]);

  useEffect(() => {
    if (category.trim()) {
      triggerSearch({
        query: query,
        page: page,
        limit: limit,
        category: category,
      });
    }
  }, [query, page, limit, category, triggerSearch]);

  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    if (urlPage && urlPage !== page) {
      setPage(urlPage);
    }
  }, [searchParams, page]);

  if (isLoading)
    return (
      <div className="flex gap-4 mt-32 animate-pulse">
        {/* Sidebar Filter Options Skeleton */}
        <div className="w-1/4 space-y-8">
          <div className="h-7 bg-gray-300 rounded-md w-1/2 ml-10"></div>
          <div className="space-y-8">
            <div className="h-6 bg-gray-300 ml-10 rounded-md w-1/3"></div>

            <div className="space-y-2">
              {" "}
              {/* Reduce vertical spacing */}
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 ml-10">
                  <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                  <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-6 bg-gray-300 ml-10 rounded-md w-1/3"></div>
          <div className="flex flex-col ml-10 gap-2">
            {/* First Line: 4 */}

            <div className="h-6 bg-gray-300 rounded-md w-[89%]"></div>

            {/* Second Line: Two 30s */}
            <div className="flex items-center gap-52">
              <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="w-3/4">
          {/* Product Count */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-7 bg-gray-300 rounded-md w-1/3"></div>
            <div className="h-8 bg-gray-300 rounded-md mr-5 w-1/6"></div>
          </div>

          {/* Product Cards Skeleton */}
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 space-y-4 bg-white">
                <div className="flex gap-0">
                  <div className="h-28 w-28 ml-24 bg-gray-300 rounded-md"></div>
                  <div className="h-7 w-7 ml-24 bg-gray-300 rounded-md"></div>
                </div>
                <div className="flex gap-44">
                  <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
                  <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
                <div className="flex gap-24">
                  <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
                  <div className="h-7 bg-gray-300 w-1/3 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex items-center mt-4">
            {/* Page Info Skeleton */}
            <div className="h-8 bg-gray-300 rounded-md w-1/6"></div>

            {/* Pagination Buttons Skeleton */}
            <div className="flex items-center gap-4 ml-52">
              {/* Page 1 Skeleton */}
              <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>

              {/* Page 2 Skeleton */}
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>

              {/* Next Button Skeleton */}
              <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (isError) return <div>Error fetching products</div>;

  console.log("Product: ", product);

  const totalPages = Math.ceil(
    (product?.data.pagination.totalProducts || 0) / limit
  );

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
        {/* Check if there are products */}
        {Array.isArray(product?.data.products) &&
        product.data.products.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xl font-semibold">
                  Showing{" "}
                  {product?.data.pagination ? (page - 1) * limit + 1 : 0} -{" "}
                  {product?.data.pagination
                    ? Math.min(
                        page * limit,
                        product?.data.pagination.totalProducts
                      )
                    : 0}{" "}
                  of {product?.data.pagination.totalProducts || 0} products for
                  &quot;
                  {category ? product?.data.products[0]?.category.name : query}
                  &quot;
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
              {product.data.products.map((p) => (
                <div
                  key={p._id}
                  className="border-2 border-gray-400 rounded-lg p-4 flex flex-col items-start relative"
                >
                  <div className="relative w-full h-40">
                    <Link href={`/product/${p._id}`}>
                      <Image
                        width={998}
                        height={1000}
                        src={getImageSrc(p.image)}
                        alt="Product"
                        className="mb-4 ml-16 object-cover w-1/2 h-3/4"
                      />
                    </Link>
                    <button
                      onClick={() => handleAddToWishlist(p)}
                      className="absolute -top-3 -right-2 text-xl p-1"
                    >
                      <FiHeart />
                    </button>
                  </div>
                  <p className="text-lg text-gray-500 flex items-center justify-between w-full">
                    <span>{p.category.name}</span>
                    <span className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span>4.5</span>
                    </span>
                  </p>

                  <h4 className="font-bold text-lg pt-2">{p.name}</h4>

                  <div className="flex items-center justify-between w-full mt-2">
                    <p className="text-lg font-bold">
                      {p.currency} {p.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(p)}
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
                    onClick={() => {
                      const newPage = Math.max(page - 1, 1);
                      setPage(newPage);
                      router.push(
                        `/search?query=${encodeURIComponent(
                          query
                        )}&page=${newPage}&limit=${limit}`
                      );
                    }}
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
                    onClick={() => {
                      setPage(pageNum);
                      router.push(
                        `/search?query=${encodeURIComponent(
                          query
                        )}&page=${pageNum}&limit=${limit}`
                      );
                    }}
                    className={`px-4 py-2 ${
                      pageNum === page ? "bg-[#7FA200] text-white" : ""
                    } rounded-full font-medium text-xl`}
                  >
                    {pageNum}
                  </button>
                ))}

                {page < totalPages && (
                  <button
                    onClick={() => {
                      const newPage = Math.min(page + 1, totalPages);
                      setPage(newPage);
                      router.push(
                        `/search?query=${encodeURIComponent(
                          query
                        )}&page=${newPage}&limit=${limit}`
                      );
                    }}
                    className="bg-[#7FA200] text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          // If no products, show a message
          <div className="text-4xl text-center mt-40">No products yet</div>
        )}
      </main>
    </div>
  );
};

export default Search;
