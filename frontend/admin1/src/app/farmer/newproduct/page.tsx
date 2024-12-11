"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import {
  ListProductRequest,
  // useCreateCategoryMutation,
  useGetCategoryQuery,
  useListProductMutation,
} from "@/state/farmerApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

const NewProduct = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "status" in error;
  };
  const formFields = [
    { id: "name", label: "Name", type: "text", placeholder: "Name" },
    { id: "price", label: "Price", type: "number", placeholder: "Price" },
    {
      id: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Quantity",
    },
    {
      id: "unit",
      label: "Unit",
      type: "select",
      options: ["Select Unit", "g", "kg", "ml", "L"],
      placeholder: "Unit",
    },
    {
      id: "currency",
      label: "",
      type: "select",
      options: ["INR", "USD"],
      placeholder: "Currency",
    },
    {
      id: "category",
      label: "Category",
      type: "select",
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Description",
    },
  ];

  const [createProduct] = useListProductMutation();
  // const [createCategory] = useCreateCategoryMutation();
  const { data: category, isLoading, error } = useGetCategoryQuery();
  console.log("getCategory", category?.categories);

  const router = useRouter();

  const initialImage: ImageBuffer = {
    type: "Buffer",
    data: [],
  };

  const [formData, setFormData] = useState<ListProductRequest>({
    name: "",
    category: "",
    price: 0,
    currency: "INR",
    quantity: 0,
    description: "",
    unit: "",
    image: initialImage,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch category</div>;
  }

  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle file input change for image upload
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Compress the image
      const options = {
        maxSizeMB: 1, // Set the maximum size in MB
        maxWidthOrHeight: 1920, // Set a max width or height
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const buffer = await compressedFile.arrayBuffer();
        setFormData((prevData) => ({
          ...prevData,
          image: {
            type: "Buffer",
            data: Array.from(new Uint8Array(buffer)),
          },
        }));
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    }
  };

  console.log("Payload size:", JSON.stringify(formData).length / 1024, "KB");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send the request using the mutation function with .unwrap()
      const res = await createProduct(formData).unwrap();

      // If successful, show success toast
      toast.success("Product created successfully");
      router.push("/farmer/manageproduct");
      console.log(res, "listing response");
    } catch (error) {
      console.error("Failed to create product:", error);

      // Use type guards to handle specific error types
      if (isFetchBaseQueryError(error)) {
        const status = error.status;

        if (status === 400) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          toast.error((error.data as any)?.error || "Invalid product data.");
        } else if (status === 404) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          toast.error((error.data as any)?.error || "Farmer does not exist.");
        } else if (status === 500) {
          toast.error(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error.data as any)?.error ||
              "Internal server error. Please try again."
          );
        } else {
          toast.error("Failed to create product");
        }
      } else if (error instanceof Error) {
        // Handle SerializedError (network issues or other errors)
        toast.error(error.message || "An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="flex items-center ml-72 mt-[-835px] justify-center py-10 h-full">
        <div className="w-[1000px] bg-white shadow-2xl p-6">
          <h2 className="text-center text-2xl font-bold mb-6">NEW PRODUCT</h2>
          <form onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div className="mb-4" key={field.id}>
                <label
                  className="block text-xl font-semibold mb-2"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>

                {/* Price Field with Currency Select */}
                {field.id === "price" && (
                  <div className="flex items-center">
                    <input
                      type="number"
                      id={field.id}
                      className="w-full border text-xl placeholder:text-xl border-black p-2"
                      placeholder={field.placeholder}
                      value={formData.price}
                      onChange={handleChange}
                    />
                    <select
                      id="currency"
                      className="-ml-1 w-[100px] border text-xl text-black border-black py-[10.4px]"
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                )}

                {/* Other Text Fields */}
                {field.type === "text" && field.id !== "price" && (
                  <input
                    type="text"
                    id={field.id}
                    className="w-full border text-xl placeholder:text-xl border-black p-2"
                    placeholder={field.placeholder}
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}

                {/* Number Fields */}
                {field.type === "number" && field.id !== "price" && (
                  <input
                    type="number"
                    id={field.id}
                    className="w-full border text-xl placeholder:text-xl border-black p-2"
                    placeholder={field.placeholder}
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                )}

                {/* Textarea Fields */}
                {field.type === "textarea" && (
                  <textarea
                    id={field.id}
                    className="w-full border text-xl placeholder:text-xl border-black p-2"
                    placeholder={field.placeholder}
                    value={formData.description}
                    onChange={handleChange}
                  />
                )}

                {field.type === "select" && field.id === "category" && (
                  <select
                    id={field.id}
                    className="w-full border text-xl text-black border-black p-2"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {category?.categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}

                {/* Unit Select */}
                {field.type === "select" && field.id === "unit" && (
                  <select
                    id={field.id}
                    className="w-full border text-xl text-black border-black p-2"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    {field.options?.map((option, index) => (
                      <option
                        key={index}
                        value={option === "Select Unit" ? "" : option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            <div className="mb-6">
              <label className="block text-xl font-semibold mb-2">Image</label>
              <div className="flex items-center">
                <Image
                  width={100}
                  height={100}
                  src={
                    formData.image.data.length > 0
                      ? `data:image/jpeg;base64,${Buffer.from(
                          formData.image.data
                        ).toString("base64")}`
                      : ""
                  }
                  alt=""
                  className="h-12 w-12 object-cover rounded-md mr-4"
                />
                <input
                  type="file"
                  className="text-xl ml-5 text-gray-500"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#7FA200] text-xl text-white font-semibold p-3"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
