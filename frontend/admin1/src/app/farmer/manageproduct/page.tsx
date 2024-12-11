"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {
  UpdateProductRequest,
  useDeleteProductMutation,
  useGetCategoryQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByCategoryAndPaginationQuery,
  useUpdateProductMutation,
} from "@/state/farmerApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

interface Category {
  _id: string;
  name: string;
  image: ImageBuffer;
}

interface ProductFormData {
  _id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  description: string;
  unit: string;
  image: ImageBuffer;
  category: Category;
}

type DeleteProduct = {
  _id: string;
};

const ManageProduct: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormData | null>(null);
  const [deletedProduct, setDeletedProduct] = useState<DeleteProduct | null>(
    null
  );
  // const [categoryId, setCategoryId] = useState("");

  const { data: filteredData, isFetching: isFetchingFiltered } =
    useGetProductsByCategoryQuery(categoryId, { skip: !categoryId });

  console.log("Is Skip Active:", !categoryId);

  console.log("Filtered Data:", filteredData);
  console.log("categoryId:", categoryId);

  const {
    data: products,
    isError,
    error,
    isLoading,
  } = useGetProductsByCategoryAndPaginationQuery({
    page: 1,
    limit: 10,
    categoryId,
  });

  console.log("111111111111", products?.data);

  console.log(isError, "isError");
  console.log(error, "error");
  console.log(products, "products");

  const { data: categoryData } = useGetCategoryQuery();
  console.log("category", categoryData?.categories);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const router = useRouter();

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (categoryId && (!filteredData || filteredData.length === 0)) {
    return <div>No products found for this category.</div>;
  }

  if (isFetchingFiltered) {
    return <div className="py-4">Loading...</div>;
  }
  console.log(products?.data[0].category._id);
  console.log(categoryId);
  console.log("fff", filteredData);
  console.log("+_+_+_+_+_+_+_+_+_+_+", products?.data);
  // const product = categoryId
  //   ? filteredData?.filter((product) => product.category?._id === categoryId)
  //   : products?.data;

  const totalPages = categoryId ? 1 : products?.pagination?.totalPages || 1;
  console.log("-----------", products);
  console.log("==========", totalPages);

  if (isError) {
    if ("data" in (error as FetchBaseQueryError)) {
      return (
        <div className="text-center ml-52 -mt-[600px] text-4xl">
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

  // if (products?.data.length === 0)
  // return <div className="text-center text-black py-4">No products yet</div>;

  const openEditModal = (product: ProductFormData) => {
    setSelectedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: DeleteProduct) => {
    setDeletedProduct({ ...product });
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setIsModalOpen(false);
  };

  const deleteHandler = async () => {
    if (deletedProduct) {
      try {
        const { _id } = deletedProduct;
        const deletedProductData = {
          productId: _id,
        };
        await deleteProduct(deletedProductData);
        toast.success("Product deleted successfully");
        router.refresh();

        confirmDelete();

        // Refresh to see updated data
      } catch (error) {
        console.error("Failed to delete product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedProduct((prev) => ({
            ...prev!,
            image: {
              type: "Buffer",
              data: Array.from(new Uint8Array(reader.result as ArrayBuffer)),
            },
          }));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setSelectedProduct((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedProduct) {
      const updatedProduct: UpdateProductRequest = {
        ...selectedProduct,
        category: selectedProduct.category._id, // Convert category to the expected string (e.g., category ID)
      };

      try {
        // Your function to update the product, e.g., API call
        await updateProduct(updatedProduct);
        setIsEditModalOpen(false); // Close the modal after update
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
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

  console.log("selectedProduct?.category.id", selectedProduct?.category._id);

  return (
    <div className="p-8 ml-72 -mt-[840px]">
      {/* Header with Filters and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center mt-5 gap-4 p-4">
          <button className="bg-gray-300 text-xl w-32 border rounded-r-none border-black px-4 py-2 rounded-md font-normal">
            Category
          </button>

          <select
            // onChange={handleCategoryChange}
            value={categoryId}
            className="border text-xl rounded-l-none border-black -ml-[18px] px-3 w-64 py-[11px] rounded-md"
          >
            <option value="Select Category">Select Category</option>
            {categoryData?.categories.map((category) => (
              <option key={category._id} value={category._id}>
                <Link href={`/farmer/products/${category._id}`}>
                  {category.name}
                </Link>
              </option>
            ))}
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
            {products?.data.map((product, index) => (
              <tr key={index} className="border-t  border-gray-300">
                <td className="px-4 text-xl py-2 text-center">
                  {product.name}
                </td>
                <td className="px-4 py-2 text-center">
                  <Image
                    width={80}
                    height={80}
                    src={getImageSrc(product.image)}
                    alt={product.name}
                    className="h-8 w-8 ml-8"
                  />
                </td>
                <td className="px-4 py-2 text-xl text-center">
                  {product.currency} {product.price}
                </td>
                <td className="px-4 py-2 text-xl text-center">
                  {product.quantity}
                </td>
                <td className="px-4 py-2 text-xl text-center">
                  {product.unit}
                </td>

                <td className="px-4 py-2 text-xl text-center">
                  {product.category ? product.category.name : "No Category"}
                </td>

                <td className="px-4 py-2 text-xl text-center truncate">
                  {product.description}
                </td>
                <td className="px-4 py-2 ml-20 flex gap-2 text-right">
                  <FaEdit
                    onClick={() => openEditModal(product)}
                    className="text-green-500 text-4xl cursor-pointer"
                  />
                  <FaTrash
                    className="text-red-500 text-4xl cursor-pointer"
                    onClick={() => openDeleteModal(product)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center -ml-36 mt-12">
        <hr className="w-[93%] border-t-2 ml-40 border-black mb-6" />
        <div className="flex justify-between items-center space-x-4 w-full max-w-[20rem]">
          <span className="text-xl -ml-64 font-semibold">
            Page {page} of {totalPages}
          </span>
          <div className="flex space-x-2">
            {/* Previous Button */}
            {page > 1 && (
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`text-xl font-medium px-4 py-2 rounded-full ${
                  page <= 1
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-[#7FA200] text-white"
                }`}
              >
                Previous
              </button>
            )}

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-full font-medium text-xl ${
                    pageNum === page ? "bg-[#7FA200] text-white" : ""
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}

            {/* Next Button */}

            {page < totalPages && (
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`text-xl font-medium px-4 py-2 rounded-full ${
                  page < totalPages
                    ? "bg-[#7FA200] text-white"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          key={selectedProduct?._id}
        >
          <div className="bg-white p-8 rounded-md w-full max-w-[700px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-4xl font-semibold text-center mb-6">
              Update Product
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-xl mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedProduct?.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 border-black rounded-md"
                  placeholder="Product Name"
                />
              </div>

              {/* Price Field */}
              <div className="mb-4">
                <label className="block text-xl mb-2">Price</label>
                <div className="relative w-full">
                  <input
                    type="number"
                    name="price"
                    value={selectedProduct?.price}
                    onChange={handleChange}
                    className="w-full border border-black px-4 py-2 rounded-md pr-[120px]"
                    placeholder="Price"
                  />
                  <select
                    id="currency"
                    name="currency"
                    className="absolute -right-2 -top-2 w-[100px] border border-black text-xl rounded-md text-black py-[9px] mt-2 mr-2"
                    value={selectedProduct?.currency}
                    onChange={handleChange}
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              {/* Quantity Field */}
              <div className="mb-4">
                <label className="block text-xl mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={selectedProduct?.quantity}
                  onChange={handleChange}
                  className="w-full border border-black px-4 py-2 rounded-md"
                  placeholder="Quantity"
                />
              </div>

              {/* Unit Field */}
              <div className="mb-4">
                <label className="block text-xl mb-2">Unit</label>
                <select
                  name="unit"
                  value={selectedProduct?.unit}
                  onChange={handleChange}
                  className="w-full border border-black px-4 py-2 rounded-md"
                >
                  {["g", "kg", "ml", "L"].map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Field */}

              <div className="mb-4">
                <label className="block text-xl mb-2">Category</label>
                <select
                  name="category"
                  value={selectedProduct?.category._id || ""}
                  onChange={(e) => {
                    const selectedCategoryId = e.target.value;
                    setSelectedProduct((prev) =>
                      prev
                        ? {
                            ...prev,
                            category: {
                              ...prev.category,
                              _id: selectedCategoryId, // Update category ID
                            },
                          }
                        : null
                    );
                  }}
                  className="w-full border border-black px-4 py-2 rounded-md"
                >
                  <option value={selectedProduct?.category._id}>
                    {selectedProduct?.category.name || "Select a category"}
                  </option>
                </select>
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label className="block text-xl mb-2">Description</label>
                <textarea
                  name="description"
                  value={selectedProduct?.description}
                  onChange={handleChange}
                  className="w-full border border-black px-4 py-2 rounded-md"
                  placeholder="Description"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-xl mb-2">Image</label>
                {selectedProduct?.image && (
                  <div className="mb-4">
                    <Image
                      width={100}
                      height={100}
                      src={getImageSrc(selectedProduct?.image)}
                      alt={selectedProduct?.name || ""}
                      className="rounded-md"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mt-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && deletedProduct && (
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
                onClick={deleteHandler}
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
