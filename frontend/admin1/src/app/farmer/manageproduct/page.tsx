"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
// import apple from "@/assets/apple.png";
import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "@/state/farmerApi";

const ManageProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products, isError, isLoading } = useGetProductsQuery();
  console.log(products, "farmer products");

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  // const handleDeleteClick = (product: SetStateAction<null>) => {
  //   setSelectedProduct(product);
  //   setIsModalOpen(true);
  // };

  const confirmDelete = () => {
    // Handle the deletion logic here, e.g., update state or make an API call
    // console.log("Deleted product:", selectedProduct);
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getImageSrc = (image: any) => {
    // Check if the image is already a URL string
    if (
      typeof image === "string" &&
      (image.startsWith("http://") || image.startsWith("https://"))
    ) {
      return image;
    }

    // Check if the image is a Buffer with data
    if (image && image.data && Array.isArray(image.data)) {
      try {
        return `data:image/png;base64,${Buffer.from(image.data).toString(
          "base64"
        )}`;
      } catch (error) {
        console.error("Failed to convert Buffer to Base64:", error);
      }
    }

    // Log an error if no valid image source is found
    console.warn("No valid image source found:", image);

    // Return a placeholder image as a fallback
    return "/default-image.png"; // Ensure this placeholder exists in your public folder
  };

  return (
    <div className="p-8 ml-72 -mt-[840px]">
      {/* Header with Filters and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center mt-5 gap-4 p-4">
          <button className="bg-gray-300 text-xl w-32 border rounded-r-none border-black px-4 py-2 rounded-md font-normal">
            Property
          </button>
          <select className="border text-xl rounded-l-none border-black -ml-[18px] px-3 w-64 py-[11px] rounded-md">
            <option>Choose Property</option>
          </select>
          <button className="bg-gray-300 ml-10 w-32 text-xl border-black border px-4 py-[7px] rounded-r-none rounded-md font-normal">
            Value
          </button>
          <input
            type="text"
            className="border border-black w-72 -mt-0 px-3 py-[9px] -ml-[16.7px] rounded-md rounded-l-none"
          />
        </div>
        <button className="bg-[#7FA200] mt-5 text-xl text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Link href={"/farmer/newproduct"}>+ Add Product</Link>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-xl text-center w-1/8">NAME</th>
              <th className="px-4 py-2 text-xl text-center w-1/8">IMAGE</th>
              <th className="px-4 py-2 text-xl text-center w-1/8">PRICE</th>
              <th className="px-4 py-2 text-xl text-center w-1/8">QUANTITY</th>
              <th className="px-4 py-2 text-xl text-center w-1/8">UNIT</th>
              <th className="px-4 py-2 text-xl text-center w-1/8">CATEGORY</th>
              <th className="px-4 py-2 text-xl text-center w-2/8">
                DESCRIPTION
              </th>
              <th className="px-4 py-2 text-xl text-center w-1/8">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t  border-gray-300">
                <td className="px-4 text-xl py-2 text-center">
                  {product.name}
                </td>
                <td className="px-4 py-2 text-center">
                  <Image
                    width={100}
                    height={100}
                    src={getImageSrc(product.image)}
                    alt={product.name || "Product"}
                    className="h-8 w-8 ml-8"
                  />
                </td>
                <td className="px-4 py-2 text-xl text-center">
                  {product.price}
                </td>
                <td className="px-4 py-2 text-xl text-center">
                  {product.quantity}
                </td>
                <td className="px-4 py-2 text-xl text-center">
                  {product.unit}
                </td>
                <td className="px-4 py-2 text-xl text-center">
                  {product.category}
                </td>
                <td className="px-4 py-2 text-xl text-center truncate">
                  {product.description}
                </td>
                <td className="px-4 py-2 ml-20 flex gap-2 text-right">
                  <FaEdit className="text-green-500 text-4xl cursor-pointer" />
                  <FaTrash
                    className="text-red-500 text-4xl cursor-pointer"
                    // onClick={() => handleDeleteClick("")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-md text-center w-[700px] h-[300px]">
            <h2 className="text-4xl ml-3 font-normal mt-10">ARE YOU SURE?</h2>
            <p className="mt-8 text-3xl font-normal">
              Do you really want to delete this item?
            </p>
            <div className="flex mt-12 justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-xl text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-xl text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
