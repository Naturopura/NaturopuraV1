"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useListProductMutation } from "@/state/farmerApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

type ProductFormData = {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
  description: string;
  unit: string;
  image: ImageBuffer;
};

const NewProduct = () => {
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
      options: [
        "Select Category",
        "vegetables",
        "fruits",
        "staples",
        "chips",
        "bakery",
        "snacks",
        "chocolates",
        "biscuits",
        "tea",
        "coffee",
        "juices",
        "honey",
      ],
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Description",
    },
  ];

  const [createProduct] = useListProductMutation();
  const router = useRouter();

  const initialImage: ImageBuffer = {
    type: "Buffer",
    data: [],
  };

  const [formData, setFormData] = useState<ProductFormData>({
    id: "",
    name: "",
    category: "",
    price: 0,
    currency: "",
    quantity: 0,
    description: "",
    unit: "",
    image: initialImage,
  });

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
      await createProduct(formData);
      toast.success("Product created successfully");
      router.push("/farmer/manageproduct");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product");
    }
  };

  return (
    <>
      <div className="flex items-center ml-32 mt-[-835px] justify-center py-10 h-full">
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
                      className="-ml-1 w-[100px] border text-xl text-black border-black py-[10.7px]"
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
                    value={
                      formData[field.id as keyof ProductFormData] as string
                    }
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
                    value={
                      formData[field.id as keyof ProductFormData] as number
                    }
                    onChange={handleChange}
                  />
                )}

                {/* Textarea Fields */}
                {field.type === "textarea" && (
                  <textarea
                    id={field.id}
                    className="w-full border text-xl placeholder:text-xl border-black p-2"
                    placeholder={field.placeholder}
                    value={
                      formData[field.id as keyof ProductFormData] as string
                    }
                    onChange={handleChange}
                  />
                )}

                {/* Category Select */}
                {field.type === "select" && field.id === "category" && (
                  <select
                    id={field.id}
                    className="w-full border text-xl text-black border-black p-2"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {field.options?.map((option, index) => (
                      <option
                        key={index}
                        value={option === "Select Category" ? "" : option}
                      >
                        {option}
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
