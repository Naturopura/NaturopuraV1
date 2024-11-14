"use client";

import arrowup from "@/assets/arrow-up-01-512.jpg";
import Image from "next/image";
import { useGetProductsQuery } from "@/state/farmerApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type SidebarProps = {
  title: string;
  items: (string | number)[];
};

// const products = [
//   { name: "Mango Juice", price: "₹200", img: mangojuice },
//   { name: "Pineapple Juice", price: "₹300", img: pineapplejuice },
//   { name: "Orange Juice", price: "₹100", img: orangejuice },
//   { name: "Apple Juice", price: "₹200", img: applejuice },
//   { name: "Strawberry Juice", price: "₹300", img: strawberryjuice },
//   { name: "Mixed Fruit Juice", price: "₹400", img: mixedfruit },
// ];

const filters = {
  brand: ["Rita", "Paper Boat", "Tropicana"],
  ratings: [4, 3, 2, 1],
  type: ["Mango Juice", "Apple Juice", "Orange Juice"],
};

// Reusable Checkbox Component
const CheckboxGroup = ({ title, items }: SidebarProps) => (
  <div className="mt-5">
    <h4 className="font-semibold text-xl">
      {title}
      <Image
        className="float-right mt-1"
        src={arrowup}
        alt=""
        width={20}
        height={20}
      />
    </h4>
    {Array.isArray(items) ? (
      items.map((item, index) => (
        <div key={index} className="flex items-center text-xl mb-2">
          <input type="checkbox" className="mr-3 w-5 h-5 cursor-pointer" />
          <label>
            {item} {title === "CUSTOMER RATINGS" && "★ & above"}
          </label>
        </div>
      ))
    ) : (
      <div className="text-red-500">Invalid items type</div>
    )}
  </div>
);

const Juices = () => {
  const {
    data: products = [],
    isError,
    isLoading,
    error,
  } = useGetProductsQuery();

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (isError) {
    if ("data" in (error as FetchBaseQueryError)) {
      // const errorData = (error as FetchBaseQueryError).data;
      return (
        <div className="text-center ml-84 -mt-[600px] text-4xl">
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

  if (products.length === 0)
    return <div className="text-center text-black py-4">No products yet</div>;

  const getImageSrc = (image: any) => {
    if (
      typeof image === "string" &&
      (image.startsWith("http://") || image.startsWith("https://"))
    ) {
      return image;
    }

    if (image && image.data && Array.isArray(image.data)) {
      try {
        return `data:image/png;base64,${Buffer.from(image.data).toString(
          "base64"
        )}`;
      } catch (error) {
        console.error("Failed to convert Buffer to Base64:", error);
      }
    }

    console.warn("No valid image source found:", image);

    return "/default-image.png";
  };

  return (
    <div className="flex overflow-x-hidden min-h-screen">
      {/* Sidebar */}
      <div className="w-[20rem] p-6 border-r-2 border-black">
        <h3 className="font-semibold text-2xl mb-6">Filters</h3>
        <hr className="border-black -ml-6 mb-5 w-[200rem]" />

        <CheckboxGroup title="BRAND" items={filters.brand} />
        <hr className="border-black my-5 -ml-7 w-[20.2rem]" />

        <CheckboxGroup title="CUSTOMER RATINGS" items={filters.ratings} />
        <hr className="border-black my-5 -ml-7 w-[20.2rem]" />

        <CheckboxGroup title="TYPE" items={filters.type} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Showing 1-3 of 3 results for juices
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {products
            .filter((product) => product.category === "juices")
            .map((product, index) => (
              <div key={index} className="p-4">
                <Image
                  src={getImageSrc(product.image)}
                  width={100}
                  height={100}
                  alt={product.name}
                  className="w-full h-[70%] object-cover mb-4"
                />
                <h4 className="font-semibold text-xl text-center">
                  {product.name}
                </h4>
                <p className="text-xl font-bold text-center">
                  {product.currency} {product.price}
                </p>
                <div className="flex justify-center space-x-2 mt-2">
                  <button className="bg-[#7FA200] ml-6 text-white font-medium text-xl px-4 py-2 rounded-lg">
                    Add to Cart
                  </button>
                  <button className="bg-[#7FA200] ml-6 text-white font-medium text-xl px-4 py-2 rounded-lg">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center -ml-36 mt-12">
          <hr className="w-[96%] border-t-2 ml-[11rem] border-black mb-6" />
          <div className="flex justify-between items-center space-x-4 w-full max-w-[20rem]">
            <span className="text-xl -ml-[31rem] font-semibold">
              Page 1 of 3
            </span>
            <div className="flex space-x-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 ${
                    page === 1 ? "bg-[#7FA200] text-white" : ""
                  } rounded-full font-medium text-xl`}
                >
                  {page}
                </button>
              ))}
              <span className="text-xl mt-2 font-medium">NEXT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Juices;
