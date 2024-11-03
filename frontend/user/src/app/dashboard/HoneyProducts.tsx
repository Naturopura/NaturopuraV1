import React from "react";
import honeybee from "@/assets/honeybee.png";
import honey5 from "@/assets/honey5.jpg";
import honey10 from "@/assets/honey10.png";
import honey15 from "@/assets/honey15.png";
import honey20 from "@/assets/honey20.png";
import honey25 from "@/assets/honey25.png";
import honey30 from "@/assets/honey30.png";
import honey40 from "@/assets/honey40.png";
import honeybee2 from "@/assets/honeybee2.png";
import daburhoney from "@/assets/daburhoney.jpg";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface ProductProps {
  imageSrc: StaticImageData;
  title: string;
  price: number;
  rating: number;
  link: string;
}

const ProductCard = ({
  imageSrc,
  title,
  price,
  rating,
  link,
}: ProductProps) => (
  <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
    <Link href={link}>
      <Image
        width={100}
        height={100}
        src={imageSrc}
        alt={title}
        className="h-48 ml-7 object-cover rounded-md"
      />
      <h3 className="mt-4 text-xl font-bold text-gray-700">{title}</h3>
    </Link>
    <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
      Add to Cart
    </button>
    <div className="mt-2 flex items-center space-x-1">
      {/* Render rating stars dynamically */}
      {[...Array(rating)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-yellow-500"
        >
          <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
        </svg>
      ))}
      <div className="text-xl text-gray-600">({rating})</div>
    </div>
    <p className="mt-2 text-xl font-bold text-gray-900">₹{price}</p>
  </div>
);

const HoneyProducts = () => {
  const products = [
    {
      imageSrc: daburhoney,
      title: "Honey",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: honey5,
      title: "Patanjali Honey",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: honey10,
      title: "Clover Honey",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: honey15,
      title: "Elias Honey",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: honey20,
      title: "Organic honey",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: honey25,
      title: "Small Bee Honey",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: honey30,
      title: "Honey Veda",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: honey40,
      title: "Indigenous Honey",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
  ];

  return (
    <div className="relative mt-[-60px] bg-gray-200 min-h-screen">
      {/* Honeybee background image */}
      <Image
        width={600}
        height={600}
        src={honeybee}
        alt="Honeybee"
        className="absolute ml-[-70px] mt-[120px] inset-0 w-[1150px] h-[750px] object-cover opacity-100"
      />

      <div className="relative z-10 mx-auto px-6 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Render Product Cards */}
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>

      {/* Second honeybee image */}
      <Image
        width={600}
        height={600}
        src={honeybee2}
        alt="Honeybee"
        className="absolute ml-[800px] mt-[70px] inset-0 w-[1150px] h-[1050px] object-cover opacity-100"
      />
    </div>
  );
};

export default HoneyProducts;
