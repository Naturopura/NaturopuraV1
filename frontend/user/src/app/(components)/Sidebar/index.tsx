"use client";

import React, { useEffect, useState } from "react";
import {
  useGetCategoryQuery,
  useLazySearchFilterAndSortProductsQuery,
} from "@/state/userApi";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(500);
  const router = useRouter();

  const [triggerSearch, { data, isLoading, error }] =
    useLazySearchFilterAndSortProductsQuery();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  console.log("Image Data: ", data?.data.products);

  const { data: category } = useGetCategoryQuery();

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  useEffect(() => {
    if (selectedCategories.length > 0) {
      triggerSearch({
        query: search,
        categories: selectedCategories,
        sort,
        page,
        limit,
        minPrice,
        maxPrice,
      });
      const categoryString = selectedCategories.join(",");
      router.push(
        `/search?query=${encodeURIComponent(
          search
        )}&categories=${categoryString}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`
      );
    }
  }, [
    selectedCategories,
    sort,
    page,
    minPrice,
    maxPrice,
    limit,
    search,
    triggerSearch,
    router,
  ]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Parse the range value and update minPrice or maxPrice accordingly
    const value = Number(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  console.log("minPrice: ", minPrice);

  return (
    <aside className="w-1/4 p-4 border-r-2">
      <h2 className="font-bold text-xl mb-4">Filter Options</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-bold mb-5">Category</h3>
        <ul>
          {category?.data.map((cat) => (
            <li key={cat._id}>
              <label className="flex items-center font-semibold text-gray-600 space-x-4">
                <input
                  type="checkbox"
                  value={cat._id}
                  onChange={() => handleCategoryChange(cat._id)}
                  checked={selectedCategories.includes(cat._id)}
                />
                <span>{cat.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-bold mb-5">Price</h3>
        <input
          type="range"
          min="1"
          max="500"
          step="1"
          value={minPrice}
          onChange={handleRangeChange}
          style={{
            background: `linear-gradient(to right, #4CAF50 ${
              ((minPrice - 1) / (500 - 1)) * 100
            }%, #d3d3d3 ${((minPrice - 1) / (500 - 1)) * 100}%)`,
          }}
        />
        <div className="flex mt-3 font-semibold text-gray-500 justify-between">
          <>
            <span>
              {data?.data?.products?.[0]?.currency || "INR"} {minPrice}
            </span>
            <span>
              {data?.data?.products?.[0]?.currency || "INR"} {maxPrice}
            </span>
          </>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
