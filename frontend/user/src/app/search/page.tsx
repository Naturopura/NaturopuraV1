"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useLazySearchProductsQuery } from "@/state/userApi";
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [filters, setFilters] = useState({
    priceRange: [25, 125],
    sort: "",
  });
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [triggerSearch, { data: product, isLoading, isError }] =
    useLazySearchProductsQuery();

  useEffect(() => {
    if (query.trim()) {
      triggerSearch({ query: query, page: page, limit: limit });
    }
  }, [query, page, limit, triggerSearch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  console.log("Product: ", product);

  const totalPages = Math.ceil(
    (product?.pagination.totalProducts || 0) / limit
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xl font-semibold">
              Showing {product?.pagination ? (page - 1) * limit + 1 : 0} -{" "}
              {product?.pagination
                ? Math.min(page * limit, product?.pagination.totalProducts)
                : 0}{" "}
              of {product?.pagination.totalProducts || 0} products for &quot;
              {query}&quot;
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
          {Array.isArray(product?.results) && product.results.length > 0 ? (
            product.results.map((p) => (
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
            ))
          ) : (
            <div className="text-gray-500">No products found.</div>
          )}
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

export default Search;
