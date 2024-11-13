"use client";

import { FormEvent, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/state/farmerApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

type ProductFormData = {
  _id: string;
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  unit: string;
  image: ImageBuffer;
};

const ManageProduct = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormData | null>(null);

  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const router = useRouter();

  if (isLoading) return <div className="py-4">Loading...</div>;
  if (isError || !products)
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );

  const openEditModal = (product: ProductFormData) => {
    setSelectedProduct({ ...product });
    setIsEditModalOpen(true);
  };

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProduct(selectedProduct!);
      toast.success("Product updated successfully");
      setIsEditModalOpen(false);
      router.refresh(); // Refresh the page to see updated data
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product");
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

  return (
    <div className="p-8">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-xl text-center">NAME</th>
              <th className="px-4 py-2 text-xl text-center">IMAGE</th>
              <th className="px-4 py-2 text-xl text-center">PRICE</th>
              <th className="px-4 py-2 text-xl text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2 text-center">{product.name}</td>
                <td className="px-4 py-2 text-center">
                  <Image
                    width={80}
                    height={80}
                    src={getImageSrc(product.image)}
                    alt={product.name}
                    className="object-cover"
                  />
                </td>
                <td className="px-4 py-2 text-center">{product.price}</td>
                <td className="px-4 py-2 text-center">
                  <FaEdit
                    onClick={() => openEditModal(product)}
                    className="text-green-500 text-2xl cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-[700px]">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Update Product
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-lg mb-2">Name</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Product Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2">Price</label>
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Price"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2">Image</label>
                {selectedProduct.image && (
                  <Image
                    width={100}
                    height={100}
                    src={getImageSrc(selectedProduct.image)}
                    alt="Current Image"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mt-2"
                />
              </div>
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
    </div>
  );
};

export default ManageProduct;
