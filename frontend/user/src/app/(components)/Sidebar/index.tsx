"use client";

import React, { useState } from "react";

const Sidebar = () => {
  const [filters, setFilters] = useState({
    priceRange: [25, 125],
    sort: "",
  });

  const handleFilterChange = (key: string, value: string | number[]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <aside className="w-1/4 p-4 border-r-2">
      <h2 className="font-bold text-xl mb-4">Filter Options</h2>
      <div className="mb-6">
        <h3 className="font-bold mb-5">Category</h3>
        <ul>
          {[
            "Fruits",
            "Vegetables",
            "Juices",
            "Staples",
            "Honey",
            "Milks",
            "Groceries",
          ].map((category) => (
            <li key={category}>
              <label className="flex items-center font-semibold text-gray-600 space-x-4 space-y-1">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("category", category)}
                />
                <span>{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-5">Price</h3>
        <input
          type="range"
          min="1"
          max="125"
          step="1"
          value={filters.priceRange[1]}
          onChange={(e) =>
            handleFilterChange("priceRange", [25, parseInt(e.target.value)])
          }
        />
        <div className="flex mt-3 font-semibold text-gray-500 justify-between">
          <span>$1</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
