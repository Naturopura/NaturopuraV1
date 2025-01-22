import React from "react";

export const ManageProductLoader = () => {
  return (
    <div className="p-4 mx-2 pl-64 -mt-[37rem] animate-pulse">
      <div className="w-full mb-4">
        <div className="h-8 w-1/6 bg-gray-300 rounded-md"></div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-1/6 h-9 bg-gray-300 ml-[21.4rem] rounded-md"></div>
        <div className="w-1/6 h-9 bg-gray-300 rounded-md"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead>
            <tr>
              {[
                "Name",
                "Image",
                "Price",
                "Stock",
                "Unit",
                "Category",
                "Description",
                "Actions",
              ].map((header, index) => (
                <th key={index} className="px-4 py-2">
                  <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-8 py-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-9 py-2">
                <div className="h-6 w-10 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-2 py-2">
                <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="py-2">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-10 py-2">
                <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
            {/* Repeat rows as needed */}
          </tbody>
        </table>
      </div>

      <div className="flex mt-20">
        <div className="h-8 w-28 ml-20 bg-gray-300 rounded-md"></div>
        <div className="flex space-x-4 ml-60">
          <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export const NewProductLoader = () => {
  return (
    <div className="flex -mt-[37.1rem] animate-pulse">
      {/* Sidebar */}
      <div className="w-64 h-screen p-4">
        <div className="h-10 rounded mb-4"></div>
        <div className="h-10 rounded mb-4"></div>
        <div className="h-10 rounded mb-4"></div>
        <div className="h-10 rounded mb-4"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Page Title */}
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>

        {/* Form Sections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Name and Description */}
          <div className="">
            <div className="h-7 bg-gray-300 rounded w-[55%] ml-5 mb-2"></div>
            <div className="h-7 bg-gray-300 rounded w-1/3 ml-5 mb-2 mt-10"></div>
            <div className="h-10 bg-gray-300 ml-5 rounded mb-4"></div>
            <div className="h-7 bg-gray-300 ml-5  rounded w-[45%] mb-2"></div>
            <div className="h-20 ml-5 bg-gray-300 rounded"></div>
          </div>

          {/* Unit and Currency */}
          <div>
            <div className="h-7 bg-gray-300 rounded w-[55%] mb-2"></div>
            <div className="h-7 bg-gray-300 w-1/3 rounded mt-10 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-full mb-4 -mt-2"></div>
            <div className="h-7 bg-gray-300 w-[45%] rounded"></div>
            <div className="h-10 bg-gray-300 w-full mt-2 rounded"></div>
          </div>

          {/* Product Pricing */}
          <div>
            <div className="h-7 bg-gray-300 rounded w-[55%] ml-5 mb-2 mt-5"></div>
            <div className="h-7 mt-10 ml-5 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-7 mt-2 ml-5 bg-gray-300 rounded"></div>
          </div>

          {/* Product Stock */}
          <div>
            <div className="h-7 bg-gray-300 rounded w-[55%] mb-2"></div>
            <div className="h-7 mt-10 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-7 mt-2 bg-gray-300 rounded"></div>
          </div>

          {/* Category */}
          <div>
            <div className="h-7 bg-gray-300 mt-5 rounded w-[55%] ml-5 mb-2"></div>
            <div className="h-7 w-1/3 bg-gray-300 mt-10 ml-5 rounded"></div>
            <div className="h-7 bg-gray-300 mt-2 ml-5 rounded"></div>
          </div>

          {/* Product Image */}
          <div>
            <div className="h-7 bg-gray-300 rounded w-[55%] mb-4"></div>
            <div className="h-7 bg-gray-300 rounded mt-10"></div>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="-mt-10 flex items-end justify-end">
          <div className="h-9 bg-gray-300 rounded w-1/6"></div>
        </div>
      </div>
    </div>
  );
};
