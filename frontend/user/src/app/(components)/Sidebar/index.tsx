"use client";

import React, { useState, useEffect } from "react";
import {
  useGetCategoryQuery,
  useLazySearchFilterAndSortProductsQuery,
} from "@/state/userApi";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 25,
    maxPrice: 125,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const router = useRouter();

  const [triggerSearch] = useLazySearchFilterAndSortProductsQuery();

  const { data: categories } = useGetCategoryQuery();

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = filters.category === categoryId ? "" : categoryId;
    setFilters((prev) => ({
      ...prev,
      category: newCategory,
    }));

    triggerSearch({
      query: search,
      page: page,
      limit: limit,
      category: newCategory,
    });

    router.push(
      `/search?query=${encodeURIComponent(
        search
      )}&page=${page}&limit=${limit}&category=${newCategory}`
    );
  };

  return (
    <aside className="w-1/4 p-4 border-r-2">
      <h2 className="font-bold text-xl mb-4">Filter Options</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-bold mb-5">Category</h3>
        <ul>
          {categories?.categories.map((category) => (
            <li key={category._id}>
              <label className="flex items-center font-semibold text-gray-600 space-x-4 space-y-1">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange(category._id)}
                  checked={filters.category === category._id}
                />
                <span>{category.name}</span>
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
          max="125"
          step="1"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxPrice: parseInt(e.target.value),
            }))
          }
        />
        <div className="flex mt-3 font-semibold text-gray-500 justify-between">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
