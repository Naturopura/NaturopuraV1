import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import apple from "@/assets/apple.png";
import Image from "next/image";

const products = Array(12).fill({
  name: "Apple",
  image: apple, // replace with your image URL
  price: "₹30.00",
  quantity: 2,
  unit: "KG",
  category: "Chemical",
  description: "Use fertilizer to ...",
});

const ManageProduct = () => {
  return (
    <div className="p-8  ml-72 -mt-[840px]">
      {/* Header with Filters and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 p-4">
          {/* Property Button */}
          <button
            className="bg-gray-300 text-xl w-32 border rounded-r-none border-black
           px-4 py-2 rounded-md font-normal"
          >
            Property
          </button>

          {/* Select Input */}
          <select className="border text-xl rounded-l-none border-black -ml-4 px-3 w-64 py-3 rounded-md">
            <option className="">Choose Property</option>
            {/* Add additional options here */}
          </select>

          {/* Value Button */}
          <button className="bg-gray-300 ml-10 w-32 text-xl border-black border px-4 py-[7px] rounded-r-none rounded-md font-normal">
            Value
          </button>

          {/* Text Input */}
          <input
            type="text"
            className="border border-black w-72 -mt-0 px-3 py-2 -ml-[16.7px] rounded-md rounded-l-none"
          />
        </div>
        <button className="bg-[#7FA200] text-xl text-white px-4 py-2 rounded-md flex items-center gap-2">
          <span>+ Add Product</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-xl text-left w-1/8">NAME</th>
              <th className="px-4 py-2 text-xl text-left w-1/8">IMAGE</th>
              <th className="px-4 py-2 text-xl text-left w-1/8">PRICE</th>
              <th className="px-4 py-2 text-xl text-left w-1/8">QUANTITY</th>
              <th className="px-4 py-2 text-xl text-left w-1/8">UNIT</th>
              <th className="px-4 py-2 text-xl text-left w-1/8">CATEGORY</th>
              <th className="px-4 py-2 text-xl text-left w-2/8">DESCRIPTION</th>
              <th className="px-4 py-2 text-xl text-left w-1/8">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 text-xl py-2 text-left">{product.name}</td>
                <td className="px-4 py-2 text-left">
                  <Image
                    width={100}
                    height={100}
                    src={product.image}
                    alt="Product"
                    className="h-8 w-8"
                  />
                </td>
                <td className="px-4 py-2 text-xl text-left">{product.price}</td>
                <td className="px-4 py-2 text-xl text-left">
                  {product.quantity}
                </td>
                <td className="px-4 py-2 text-xl text-left">{product.unit}</td>
                <td className="px-4 py-2 text-xl text-left">
                  {product.category}
                </td>
                <td className="px-4 py-2 text-xl text-left truncate">
                  {product.description}
                </td>
                <td className="px-4 py-2 flex gap-2 text-left">
                  <FaStar className="text-yellow-500 text-4xl cursor-pointer" />
                  <FaEdit className="text-green-500 text-4xl cursor-pointer" />
                  <FaTrash className="text-red-500 text-4xl cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View More */}
      <div className="text-center -ml-32 mt-4">
        <button className="text-black text-xl">View More</button>
      </div>
    </div>
  );
};

export default ManageProduct;
