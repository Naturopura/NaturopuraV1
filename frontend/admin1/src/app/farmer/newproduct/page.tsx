"use client";

import React, { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import Image from "next/image";
import {
  ListProductRequest,
  useGetCategoryQuery,
  useListProductMutation,
  useListProductsQuery,
} from "@/state/farmerApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

interface InputFieldProps {
  label: string;
  type?: string;
  id: string;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaFieldProps {
  label: string;
  id: string;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <div>
    <label className="block text-lg text-gray-600 font-medium mb-1">
      {label}
    </label>
    {children}
  </div>
);

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  children,
}) => (
  <div>
    <label htmlFor={id} className="block text-lg font-medium text-gray-600">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-10 py-2 border-2 border-gray-300 text-lg rounded-md"
    >
      {children}
    </select>
  </div>
);

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  id,
  placeholder,
  onChange,
}) => (
  <FormField label={label}>
    <input
      type={type}
      id={id}
      className="w-full border-2 text-lg border-gray-300 rounded-md p-2"
      placeholder={placeholder}
      onChange={onChange}
    />
  </FormField>
);

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  id,
  placeholder,
  rows = 4,
  onChange,
}) => (
  <FormField label={label}>
    <textarea
      id={id}
      className="w-full border-2 text-lg border-gray-300 rounded-md p-2"
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
    />
  </FormField>
);

const NewProduct = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "status" in error;
  };

  const [createProduct] = useListProductMutation();
  const { refetch } = useListProductsQuery();
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
      router.refresh();
      router.push("/farmer/manageproduct");
      refetch();
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
      <div className="absolute top-24 right-0 w-full lg:w-[calc(100%-16rem)] p-6">
        <h1 className="text-2xl font-semibold mb-2 ml-1">Add New Product</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1 border-2 border-gray-300 p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">Name and Description</h2>
            <hr className="border-b border-gray-200 my-4 -mx-4" />
            <InputField
              label="Product Name"
              id="name"
              placeholder="Enter Product Name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextAreaField
              id="description"
              label="Product Description"
              placeholder="Enter Product Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 lg:col-span-1 border-2 h-3/4 border-gray-300 p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">Unit and Currency</h2>
            <hr className="border-b border-gray-200 my-4 -mx-4" />
            <SelectField
              id="unit"
              label="Unit"
              value={formData.unit}
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
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </SelectField>
          </div>

          <div className="col-span-2 lg:col-span-1 border-2 border-gray-300 p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">Product Pricing</h2>
            <hr className="border-b border-gray-200 my-4 -mx-4" />
            <InputField
              type="number"
              label="Price"
              id="price"
              placeholder="Enter Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 lg:col-span-1 border-2 -mt-[5.5rem] h-[103%] border-gray-300 p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <hr className="border-b border-gray-200 my-4 -mx-4" />
            <SelectField
              id="category"
              label="Product Category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {category?.categories.map((categoryItem) => (
                <option key={categoryItem._id} value={categoryItem._id}>
                  {categoryItem.name}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="col-span-2 lg:col-span-1 border-2 border-gray-300 p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">Manage Stock</h2>
            <hr className="border-b border-gray-200 my-4 -mx-4" />
            <InputField
              id="quantity"
              type="number"
              label="Product Stock"
              placeholder="Enter Product Stock"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 lg:col-span-1 border-2 -mt-20 h-[125%] border-gray-300 p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">Product Image</h2>
            <hr className="border-b border-gray-200 my-4 -mx-4" />
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
              alt="Product Image"
              className="h-12 w-12 object-cover rounded-md"
            />
            <input
              type="file"
              className="w-full border-2 text-lg border-gray-300 rounded-md p-2"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-span-2 flex justify-end space-x-4">
            <button
              type="submit"
              className="px-6 my-2 -mt-12 bg-[#7FA200] text-white font-semibold rounded-md"
            >
              + Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
