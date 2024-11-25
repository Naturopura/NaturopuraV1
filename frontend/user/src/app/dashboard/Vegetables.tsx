import React from "react";
import vegetables from "@/assets/vegetables.png";
import bg1 from "@/assets/bg 1.png";
import Image from "next/image";
import Link from "next/link";

const Vegetables = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[96vw] -mt-[53.4375rem] h-[60vh] border-2 bg-white relative">
          {/* Background Image Covering Entire Border */}
          <Image
            width={500}
            height={500}
            src={bg1}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Flex Container for Vegetables Image and Content */}
          <div className="relative flex h-full">
            {/* Vegetables Image on the Left */}
            <div className="">
              <Image
                width={600}
                height={600}
                src={vegetables}
                alt="Vegetables"
                className="-mt-5 ml-8 object-cover z-10"
              />
            </div>

            {/* Content Block on the Right */}
            <div className="w-1/2 flex items-center justify-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-[#ACB631]">
                  Save{" "}
                  <span className="text-black">
                    upto 50% on your First Order
                  </span>
                </h1>
                <Link href="/vegetables">
                  <button className="text-white text-xl mt-8 ml-[11.25rem] bg-[#ACB631] font-medium rounded-lg px-12 py-3">
                    Shop now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vegetables;
