import Image from "next/image";
import Link from "next/link";
import React from "react";
import leaf from "@/assets/leaf.png";
import pizza from "@/assets/pizza.jpg";
import pringles from "@/assets/pringles.jpg";
import chanadal from "@/assets/chanadal.jpg";

const RecentViewed = () => {
  const products = [pizza, pringles, chanadal];

  return (
    <>
      <div className="-mt-24 flex items-center">
        <Image width={120} height={120} src={leaf} alt="" className="ml-1" />
        <div className="text-3xl font-bold -ml-12 -mt-2">
          Your Recent Viewed
        </div>
        <h2 className="text-3xl hover:underline font-bold -mt-2 ml-[52rem] text-gray-900">
          <Link href="#">View all&gt;</Link>
        </h2>
      </div>

      <div className="min-h-screen flex items-center justify-center -mt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div
              key={index}
              className="h-[25rem] w-[25rem] bg-white flex flex-col items-center justify-center shadow-lg"
            >
              <Image width={300} height={300} src={product} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentViewed;
