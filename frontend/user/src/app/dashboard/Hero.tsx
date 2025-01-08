import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "@/assets/b714fa9235ce346b8350685054646dbb.png";
import vector from "@/assets/Vector 186.png";
import vector1 from "@/assets/Vector 187.png";
import { Search } from "lucide-react";
import { useLazySearchFilterAndSortProductsQuery } from "@/state/userApi";
import { useRouter } from "next/navigation";

type StatProps = {
  number: string;
  label: string;
};

const Stat = ({ number, label }: StatProps) => (
  <div className="text-center">
    <p className="text-4xl font-bold">{number}</p>
    <p className="text-gray-900 text-xl">{label}</p>
  </div>
);

const Hero = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const router = useRouter();
  const [triggerSearch, { data: products, isLoading, isError }] =
    useLazySearchFilterAndSortProductsQuery();

  const handleSearch = () => {
    if (search.trim()) {
      triggerSearch({ query: search, page: page, limit: limit });
      router.push(
        `/search?query=${encodeURIComponent(
          search
        )}&page=${page}&limit=${limit}`
      );
    }
  };

  console.log("Search: ", search);
  console.log("Products: ", products);
  console.log("Loading: ", isLoading);
  console.log("Error: ", isError);

  return (
    <div className="flex justify-between max-w-[82rem] mt-28 h-[80vh] items-center bg-[#7FA200] p-8 rounded-lg mx-auto relative">
      {/* Left Content */}
      <div className="w-1/2 space-y-8">
        <h1 className="text-6xl font-extrabold text-gray-900">
          Farm Fresh <br /> Locally Grown
        </h1>

        <div className="flex space-x-12 items-center">
          <Stat number="50+" label="Plant Species" />
          <div className="h-16 w-px bg-gray-900"></div>
          <Stat number="100+" label="Customers" />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // Trigger search on Enter key
              }
            }}
            className="w-[80%] p-4 pl-5 pr-16 placeholder:font-semibold text-lg border rounded-xl shadow-sm"
          />
          <div
            onClick={handleSearch}
            className="absolute inset-y-0 right-[8.4rem] top-2 h-12 w-12 bg-[#7FA200] rounded-xl border flex items-center justify-center cursor-pointer"
          >
            <Search size={24} />
          </div>
        </div>
      </div>

      {/* Right Circular Image with Vectors */}
      <div className="relative w-1/2 h-full flex justify-center items-center">
        <div className="absolute mt-24 mr-12">
          <div className="w-[30rem] h-[24rem] bg-[rgba(30,30,30,1)] rounded-tl-[100%] rounded-bl-[100%] rounded-tr-[100%] rounded-br-none" />
        </div>

        <div className="absolute -top-1 rounded-full overflow-hidden z-10">
          <Image
            src={img}
            alt="Circular Food Graphic"
            width={390}
            height={390}
            className="object-cover"
          />
        </div>

        <Image
          src={vector}
          width={150}
          height={150}
          alt="Vector"
          className="absolute -left-[6rem] bottom-8 z-20 object-cover"
        />

        <Image
          src={vector1}
          width={75}
          height={75}
          alt="Vector1"
          className="absolute left-[32rem] -top-6 z-20 object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
