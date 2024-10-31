import Image from "next/image";
import Link from "next/link";
import React from "react";
import fruits from "@/assets/fruits.png";
import sp1 from "@/assets/SP 1.png";

const Fruits = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[96vw] mt-[-400px] h-[60vh] border-2 bg-white relative">
          {/* sp1 Image Covering Entire Border */}
          <Image
            width={500}
            height={500}
            src={sp1}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Fruits Image on Top */}
          <Image
            width={500}
            height={500}
            src={fruits}
            alt="Snacks"
            className="absolute top-[-30px] right-0 h-[500px] w-[900px] object-contain z-10"
          />

          {/* Content Block (Left) */}
          <div className="absolute ml-[-900px] mt-[-20px] inset-0 flex flex-col items-center justify-center space-y-4 z-20">
            <h1 className="text-4xl ml-10 font-bold text-[#ACB631]">
              Free{" "}
              <span className="text-black">Shipping on Order upto ₹5000</span>
            </h1>
            <Link href="/fruits">
              <button className="text-white text-xl bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg px-12 py-3 mt-4">
                Shop now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fruits;
