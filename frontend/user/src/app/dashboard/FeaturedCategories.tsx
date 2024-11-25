import React from "react";
import Image from "next/image";
import Link from "next/link";
import broccoli from "@/assets/broccoli-lg.jpg";
import bread from "@/assets/Bread.png";
import cola from "@/assets/cola.png";
import leaf from "@/assets/leaf.png";

const FeaturedCategories = () => {
  return (
    <>
      <div className="-mt-[29rem] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-24 lg:py-32">
          <div className="flex items-center -ml-[6.6rem] justify-between px-10 py-4">
            {/* Leaf Image */}
            <div className="">
              <Image
                width={100}
                height={100}
                src={leaf}
                alt="Leaf Icon"
                className=""
              />
            </div>

            {/* Featured Categories Title */}
            <h2 className="text-2xl -ml-[54.5rem] -mt-3 font-bold text-gray-900">
              Featured Categories
            </h2>

            {/* View All Link */}
            <h2 className="text-2xl hover:underline font-bold text-gray-900">
              <Link href="#">View all &gt;</Link>
            </h2>
          </div>

          <div className="-mt-4 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            <div className="group relative">
              <div className="relative w-[175%] -ml-12 overflow-hidden bg-white h-[37.5rem]">
                <Image
                  width={400}
                  height={400}
                  alt="Fresh Vegetables"
                  src={broccoli}
                  className="object-center ml-32 -mt-16"
                />
                <div className="p-6 -mt-24 -ml-7 text-center">
                  <button className="text-white text-2xl bg-[#ACB631] font-medium rounded-lg text-md px-12 py-3 mt-4">
                    <Link href={"/vegetables"}>Shop now</Link>
                  </button>
                  <div className="mt-4 text-xl font-bold">Fresh Vegetables</div>
                  <div className="text-gray-500 text-xl">125 items</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-[55rem] ml-[40rem] max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            <div className="group relative">
              <div className="relative h-[18.75rem] w-[39.0625rem] overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
                <Image
                  width={300}
                  height={100}
                  alt="Bakery"
                  src={bread}
                  className="h-[11.25rem] ml-[3.125rem] mt-[4.0625rem] object-cover object-center"
                />
                <div className="p-6">
                  <h2 className="text-2xl ml-[20.625rem] -mt-[12.5rem] font-bold text-gray-800">
                    <button className="text-white -ml-[1.25rem] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                      <Link href={"/bakery"}>Shop now</Link>
                    </button>
                  </h2>
                </div>
                <div className="ml-[25rem] -mt-[8.75rem] font-bold text-xl">
                  Bakery
                </div>
                <div className="ml-[24.5625rem] mt-[0.187rem] text-gray-500 text-xl">
                  29 items
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-[16.5625rem] ml-[40rem] max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            <div className="group relative">
              <div className="relative h-[17.75rem] w-[39.0625rem] overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
                <Image
                  width={200}
                  height={100}
                  alt="Drinks, Tea & Coffee"
                  src={cola}
                  className="h-[13.75rem] ml-[5.625rem] mt-[2.1875rem] object-cover object-center"
                />
                <div className="p-6">
                  <h2 className="text-2xl ml-[20.625rem] -mt-[12.5rem] font-bold text-gray-800">
                    <button className="text-white -ml-5 bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                      <Link href={"/drinks"}>Shop now</Link>
                    </button>
                  </h2>
                </div>
                <div className="ml-[21.0625rem] -mt-[8.75rem] font-bold text-xl">
                  Drinks, Tea & Coffee
                </div>
                <div className="ml-[24.5625rem] mt-[3px] text-gray-500 text-xl">
                  45 items
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCategories;
