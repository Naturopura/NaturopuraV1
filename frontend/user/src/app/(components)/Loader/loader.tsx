import React from "react";

export const AllProductsLoader = () => {
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
};

export const SingleProductLoader = () => {
  return (
    <div className="p-6 mt-28 animate-pulse">
      {/* Top Section */}
      <div className="flex flex-wrap gap-4">
        {/* Image Carousel */}
        <div className="flex flex-col space-y-4">
          <div className="h-[7.35rem] w-[7.35rem] bg-gray-300 rounded-md"></div>
          <div className="h-[7.35rem] w-[7.35rem] bg-gray-300 rounded-md"></div>
          <div className="h-[7.35rem] w-[7.35rem] bg-gray-300 rounded-md"></div>
        </div>
        {/* Main Product Image */}
        <div className="flex-grow h-96 bg-gray-300 rounded-md"></div>
        {/* Product Details */}
        <div className="flex-grow">
          <div className="h-8 w-64 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-8 w-52 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-7 w-60 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-6 w-1/5 bg-gray-300 rounded-md mb-4"></div>
          {/* Buttons 9 and 10 */}
          <div className="flex gap-2 mb-4">
            <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
            <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
          </div>
          {/* Buttons 19, 20, and 21 */}
          <div className="flex gap-2 mt-10">
            <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
            <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
            <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
          </div>

          <div className="flex flex-col p-4 bg-white mt-5 rounded-md w-full space-y-4">
            {/* Top Section */}
            <div className="flex items-start space-x-4">
              {/* Image Placeholder */}
              <div className="h-16 w-16 bg-gray-300 rounded-md"></div>
            </div>

            {/* User Details and Interaction */}
            <div className="flex items-center justify-between">
              {/* User and Date */}
              <div className="flex items-center space-x-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
                <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
              </div>
              {/* Actions */}
              <div className="flex space-x-2">
                <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="mt-8">
        <div className="h-7 w-48 bg-gray-300 rounded-md mb-4 -ml-2"></div>
      </div>

      {/* Similar Items */}
      <div className="mt-5">
        <div className="grid grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-64 w-80 bg-gray-300 rounded-md mb-2"></div>
              <div className="flex gap-52">
                <div className="h-7 w-20 bg-gray-300 rounded-md"></div>
                <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
              </div>
              <div className="h-7 w-16 mr-[15.7rem] mt-2 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="h-7 w-48 bg-gray-300 rounded-md mb-4 -ml-2"></div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-5">
        <div className="grid grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-64 w-80 bg-gray-300 rounded-md mb-2"></div>
              <div className="flex gap-52">
                <div className="h-7 w-20 bg-gray-300 rounded-md"></div>
                <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
              </div>
              <div className="h-7 w-16 mr-[15.7rem] mt-2 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
