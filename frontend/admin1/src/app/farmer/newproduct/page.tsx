"use client";

import React, { useState } from "react";
import image from "@/assets/image (2).png";
import Image from "next/image";
import Sidebar from "@/app/(components)/Sidebar/sidebar";

const NewProduct = () => {
  type FormDataKey =
    | "name"
    | "price"
    | "quantity"
    | "unit"
    | "category"
    | "description";
  // Define form fields dynamically
  const formFields = [
    { id: "name", label: "Name", type: "text", placeholder: "Name" },
    { id: "price", label: "Price", type: "text", placeholder: "Price" },
    {
      id: "quantity",
      label: "Quantity",
      type: "text",
      placeholder: "Quantity",
    },
    { id: "unit", label: "Unit", type: "text", placeholder: "Unit" },
    {
      id: "category",
      label: "Category",
      type: "select",
      options: ["Select Category", "Category 1", "Category 2"],
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Description",
    },
  ];

  const initialFormData: { [key in FormDataKey]: string } = {
    name: "",
    price: "",
    quantity: "",
    unit: "",
    category: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Handle change for inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <>
      <Sidebar />
      <div className=" flex items-center ml-32 mt-[-835px] justify-center py-10 h-[950px]">
        <div className="w-[1000px] bg-white shadow-2xl p-6">
          <h2 className="text-center text-2xl font-bold mb-6">NEW PRODUCT</h2>
          <form className="">
            {formFields.map((field) => (
              <div className="mb-4" key={field.id}>
                <label
                  className="block text-xl font-semibold mb-2"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
                {field.type === "text" && (
                  <input
                    type="text"
                    id={field.id}
                    className="w-full border placeholder:text-xl border-black p-2"
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    id={field.id}
                    className="w-full border placeholder:text-xl border-black p-2"
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                  />
                )}
                {field.type === "select" && (
                  <select
                    id={field.id}
                    className="w-full border text-xl text-gray-500 border-black p-2"
                    value={formData[field.id as keyof typeof formData]}
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
              </div>
            ))}
            <div className="mb-6">
              <label className="block text-xl font-semibold mb-2">
                Feature Image
              </label>
              <div className="flex items-center">
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt="Feature"
                  className="h-12 w-12 object-cover rounded-md mr-4"
                />
                <input type="file" className="text-xl ml-5 text-gray-500" />
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
