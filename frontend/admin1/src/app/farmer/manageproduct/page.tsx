"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UpdateProductRequest,
  useDeleteProductMutation,
  useGetCategoryQuery,
  useGetProductsByCategoryAndPaginationQuery,
  useUpdateProductMutation,
} from "@/state/farmerApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit, MoreVertical, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ManageProductLoader } from "@/app/(components)/Loader/loader";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

interface SelectFieldProps {
  label: string;
  id: string;
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  children?: React.ReactNode;
}

interface InputFieldProps {
  label: string;
  type?: string;
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
}

interface TextAreaFieldProps {
  label: string;
  id: string;
  placeholder: string;
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <div>
    <label className="block text-lg text-gray-600 font-medium mb-1">
      {label}
    </label>
    {children}
  </div>
);

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  children,
  id,
  value,
  onChange,
}) => (
  <FormField label={label}>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full border-2 text-lg border-gray-300 rounded-md p-2"
    >
      {children}
    </select>
  </FormField>
);

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  id,
  value,
  onChange,
  placeholder,
}) => (
  <FormField label={label}>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full border-2 text-lg border-gray-300 rounded-md p-2"
      placeholder={placeholder}
    />
  </FormField>
);

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
}) => (
  <FormField label={label}>
    <textarea
      id={id}
      className="w-full border-2 text-lg border-gray-300 rounded-md p-2"
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </FormField>
);

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface ProductFormData {
  _id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  description: string;
  unit: string;
  image: string;
  category: Category;
}

type DeleteProduct = {
  _id: string;
};

const ManageProduct: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [categoryId, setCategoryId] = useState<string | undefined>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormData | null>(null);
  const [deletedProduct, setDeletedProduct] = useState<DeleteProduct | null>(
    null
  );

  useEffect(() => {
    console.log("Selected Product updated:", selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    console.log("Edit Modal state updated:", isEditModalOpen);
  }, [isEditModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-container")) {
        setVisibleDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  let interval: NodeJS.Timeout;
  let isLoadingProgress = false; // Prevent multiple intervals

  const startLoading = () => {
    if (isLoadingProgress) return; // Prevent duplicate loading
    isLoadingProgress = true;
    setLoadingProgress(0);
    interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          console.log("Loading complete");
          clearInterval(interval);
          return 100;
        }
        const nextProgress = prev + 2;
        console.log(`Progress incremented to: ${nextProgress}`);
        return nextProgress;
      });
    }, 500);
  };

  const finishLoading = () => {
    if (!isLoadingProgress) return; // Skip if not loading
    console.log("Finishing loading");
    clearInterval(interval);
    setLoadingProgress(100);

    setTimeout(() => {
      console.log("Hiding progress bar");
      setLoadingProgress(-1); // Set to -1 to hide (or use another mechanism)
      setTimeout(() => {
        console.log("Resetting loading progress");
        setLoadingProgress(0); // Reset after hiding
        isLoadingProgress = false; // Allow new loading
      }, 400); // Match your CSS transition duration
    }, 500);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategoryId(value === "Select Category" ? undefined : value);
    setPage(1);
    startLoading();
    setTimeout(() => {
      finishLoading();
    }, 5000); // Simulated loading time
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    startLoading();
    setTimeout(() => {
      finishLoading();
    }, 5000); // Simulated loading time
  };

  useEffect(() => {
    return () => {
      console.log("Cleanup: finishing loading");
      finishLoading();
    };
  });

  const {
    data: products,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetProductsByCategoryAndPaginationQuery({
    page,
    limit,
    categoryId,
  });

  console.log("Products:", products);

  console.log("isError:", isError);
  console.log("error:", error);

  const { data: categoryData } = useGetCategoryQuery();

  console.log("CategoryData", categoryData);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const router = useRouter();

  if (isLoading) return <ManageProductLoader />;

  const totalPages = products?.data.pagination?.totalPages || 1;

  if (isError) {
    if ("data" in (error as FetchBaseQueryError)) {
      return (
        <div className="text-center ml-52 -mt-96 text-4xl">No products yet</div>
      );
    }
    return (
      <div className="text-center text-red-500 py-4">
        Something went wrong. Please try again later.
      </div>
    );
  }

  const openEditModal = (product: ProductFormData) => {
    console.log("Opening edit modal with product:", product);
    setSelectedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: DeleteProduct) => {
    setDeletedProduct({ ...product });
    setIsModalOpen(true);
  };

  console.log("selectedProduct?.category.id", selectedProduct?.category._id);

  const toggleDropdown = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setVisibleDropdown((prev) => (prev === id ? null : id));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setSelectedProduct((prev) => (prev ? { ...prev, [id]: value } : null));
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
        await updateProduct(updatedProduct).unwrap();
        toast.success("Product updated successfully");
        router.refresh();
        setIsEditModalOpen(false); // Close the modal after update
        refetch();
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Failed to update product");
      }
    }
  };

  const deleteHandler = async () => {
    if (deletedProduct) {
      try {
        const { _id } = deletedProduct;
        const deletedProductData = {
          productId: _id,
        };
        await deleteProduct(deletedProductData).unwrap();
        toast.success("Product deleted successfully");
        router.refresh();
        setIsModalOpen(false);
        refetch();
      } catch (error) {
        console.error("Failed to delete product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: loadingProgress >= 0 ? `${loadingProgress}%` : "0%",
          height: "4px",
          backgroundColor: "#7FA200",
          zIndex: 9999,
          transition: "width 0.4s ease-in-out, opacity 0.4s ease-in-out",
          opacity: loadingProgress >= 0 ? 1 : 0, // Hide smoothly
        }}
      />

      <div className="flex-1 ml-64 -mt-[36rem] px-6">
        <main>
          <h1 className="text-2xl font-bold">Products</h1>

          <div className="mt-4 flex items-center justify-between">
            <div className="relative w-1/2">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products by name or keyword..."
                className="w-full border-gray-500 placeholder:font-semibold border-2 pl-10 pr-4 py-2.5 rounded-lg"
              />
            </div>

            <div className="flex items-center gap-1">
              <select
                value={categoryId || ""}
                onChange={handleCategoryChange}
                className="border-2 border-gray-500 py-2.5 rounded-lg font-semibold"
              >
                <option value="Select Category">Select Category</option>
                {categoryData?.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <button className="bg-[#7FA200] text-white px-4 py-2.5 font-semibold rounded-md">
                <Link href={"/farmer/newproduct"}>+ Add Product</Link>
              </button>
            </div>
          </div>

          <div className="mt-6 border border-gray-400 rounded-lg">
            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="px-4 py-2 font-black">Name</th>
                  <th className="px-4 py-2 font-black">Image</th>
                  <th className="px-4 py-2 font-black">Price</th>
                  <th className="px-4 py-2 font-black">Stock</th>
                  <th className="px-4 py-2 font-black">Unit</th>
                  <th className="px-4 py-2 font-black">Category</th>
                  <th className="px-4 py-2 font-black">Description</th>
                  <th className="px-4 py-2 font-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products?.data.products) &&
                  products?.data.products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="px-4 py-2 font-semibold">
                        {product.name}
                      </td>
                      <td className="px-4 py-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {product.currency} {product.price}
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {product.unit}
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {product.category
                          ? product.category.name
                          : "No Category"}
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {product.description}
                      </td>
                      <td className="px-4 py-2 font-semibold relative dropdown-container">
                        <button
                          onClick={(e) => toggleDropdown(product._id, e)}
                          className="px-2 py-1 rounded"
                        >
                          <MoreVertical />
                        </button>

                        {visibleDropdown === product._id && (
                          <div className="absolute right-0 bg-white shadow-md rounded-md mt-2 z-50 w-40">
                            <button
                              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 w-full"
                              onClick={() => {
                                setVisibleDropdown(null);
                                openEditModal(product);
                              }}
                            >
                              <Edit className="mr-2" size={20} />
                              Edit
                            </button>
                            <button
                              className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                              onClick={() => {
                                setVisibleDropdown(null);
                                openDeleteModal(product);
                              }}
                            >
                              <Trash2 className="mr-2" size={20} />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>

        <div className="flex flex-col items-center mt-12">
          <hr className="w-full border-t-2 border-black mb-6" />
          <div className="flex justify-between items-center w-full max-w-4xl">
            <span className="text-xl font-semibold flex-1 justify-start">
              Page {page} of {totalPages}
            </span>

            <div className="flex-1 flex justify-start space-x-2">
              {page > 1 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="text-xl font-medium px-4 py-2 rounded-full bg-[#7FA200] text-white"
                >
                  Previous
                </button>
              )}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-full font-medium text-xl ${
                      pageNum === page ? "bg-[#7FA200] text-white" : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
              {page < totalPages && (
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className="text-xl font-medium px-4 py-2 rounded-full bg-[#7FA200] text-white"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-black bg-opacity-50 overflow-auto">
          <div className="bg-white w-full max-w-4xl h-auto rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">Update Product</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="border-2 border-gray-300 p-4 rounded-md space-y-4">
                <h2 className="text-xl font-semibold mb-2">
                  Name and Description
                </h2>
                <hr className="border-b border-gray-200 my-4" />
                <InputField
                  label="Product Name"
                  id="name"
                  value={selectedProduct?.name}
                  onChange={handleChange}
                  placeholder="Enter Product Name"
                />
                <TextAreaField
                  id="description"
                  label="Product Description"
                  value={selectedProduct?.description}
                  onChange={handleChange}
                  placeholder="Enter Product Description"
                />
              </div>

              <div className="border-2 border-gray-300 h-[77%] p-4 rounded-md space-y-4">
                <h2 className="text-xl font-semibold mb-2">
                  Unit and Currency
                </h2>
                <hr className="border-b border-gray-200 my-4" />
                <SelectField
                  id="unit"
                  label="Unit"
                  value={selectedProduct?.unit}
                  onChange={handleChange}
                >
                  <option value="">Select Unit</option>
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="L">L</option>
                </SelectField>

                <SelectField
                  id="currency"
                  label="Currency"
                  value={selectedProduct?.currency}
                  onChange={handleChange}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </SelectField>
              </div>

              <div className="border-2 border-gray-300 p-4 rounded-md space-y-4">
                <h2 className="text-xl font-semibold mb-2">Product Pricing</h2>
                <hr className="border-b border-gray-200 my-4" />
                <InputField
                  type="number"
                  label="Price"
                  id="price"
                  value={selectedProduct?.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                />
              </div>

              <div className="border-2 border-gray-300 p-4 -mt-20 h-full rounded-md space-y-4">
                <h2 className="text-xl font-semibold mb-2">Category</h2>
                <hr className="border-b border-gray-200 my-4" />
                <SelectField
                  id="category"
                  label="Product Category"
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
                >
                  <option value={selectedProduct?.category._id}>
                    {selectedProduct?.category.name || "Select a category"}
                  </option>
                </SelectField>
              </div>

              <div className="border-2 border-gray-300 p-4 rounded-md space-y-4">
                <h2 className="text-xl font-semibold mb-2">Manage Stock</h2>
                <hr className="border-b border-gray-200 my-4" />
                <InputField
                  id="quantity"
                  type="number"
                  label="Product Stock"
                  value={selectedProduct?.quantity}
                  onChange={handleChange}
                  placeholder="Enter Product Stock"
                />
              </div>

              <div className="border-2 border-gray-300 p-4 -mt-20 h-[90%] rounded-md space-y-4">
                <h2 className="text-xl font-semibold mb-2">Product Image</h2>
                <hr className="border-b border-gray-200 my-4" />
                <div className="flex items-center space-x-4">
                  {selectedProduct?.image && (
                    <Image
                      width={80}
                      height={80}
                      src={selectedProduct?.image}
                      alt={selectedProduct?.name || ""}
                      className="rounded-md"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border-2 text-lg border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="col-span-2 flex justify-end space-x-2 -mt-44">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                  }}
                  className="px-6 my-16 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 my-16 bg-[#7FA200] text-white font-semibold rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && deletedProduct && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-[#7FA200] text-white font-semibold rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={deleteHandler}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageProduct;
