import React from "react";
import Image from "next/image";
import Link from "next/link";
import broccoli from "@/assets/broccoli-lg.jpg";
import bread from "@/assets/Bread.png";
import cola from "@/assets/cola.png";
import leaf from "@/assets/leaf.png";

const FeaturedCategories = () => {
  return (
    <div>
      <div className="">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ml-[-270px] mt-[-550px] max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <div className="flex items-center justify-between">
              {/* Leaf image */}
              <div className="ml-[-35px]">
                <Image
                  width={200}
                  height={100}
                  src={leaf}
                  alt=""
                  className=""
                />
              </div>
              {/* Featured Categories Title */}
              <h2 className="text-2xl font-bold ml-[-80px] mt-[-20px] text-gray-900">
                Featured Categories
              </h2>

              {/* View all link aligned to the right */}
              <h2 className="text-2xl underline font-bold text-gray-900 m-[-240px] ml-auto">
                <Link href="#">View all&gt;</Link>
              </h2>
            </div>

            <div className="mt-[-30px] space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <div className="group relative">
                <div className="relative w-[900px] overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 h-[600px]">
                  <Image
                    width={350}
                    height={100}
                    alt=""
                    src={broccoli}
                    className="object-cover mt-[-30px] ml-[220px] object-center"
                  />
                  <div className="p-6">
                    <h2 className="text-xl ml-[288px] mt-[-100px] font-bold text-gray-800">
                      <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                        <Link href={"/vegetables"}>Shop now</Link>
                      </button>
                    </h2>
                  </div>
                  <div className="ml-[310px] mt-[-40px] text-xl">
                    Fresh Vegetables
                  </div>
                  <div className="ml-[340px] mt-[10px] text-gray-500 text-xl">
                    125 items
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-[-880px] ml-[640px] max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <div className="group relative">
                <div className="relative h-[300px] w-[845px] overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
                  <Image
                    width={300}
                    height={100}
                    alt=""
                    src={bread}
                    className="h-[180px] ml-[160px] mt-[65px] object-cover object-center"
                  />
                  <div className="p-6">
                    <h2 className="text-xl ml-[450px] mt-[-200px] font-bold text-gray-800">
                      <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                        <Link href={"/bakery"}>Shop now</Link>
                      </button>
                    </h2>
                  </div>
                  <div className="ml-[515px] mt-[-140px] text-xl">Bakery</div>
                  <div className="ml-[505px] mt-[10px] text-gray-500 text-xl">
                    29 items
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-[-265px] ml-[640px] max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <div className="group relative">
                <div className="relative h-[284px] w-[845px] overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
                  <Image
                    width={200}
                    height={100}
                    alt=""
                    src={cola}
                    className="h-[220px] ml-[200px] mt-[35px] object-cover object-center"
                  />
                  <div className="p-6">
                    <h2 className="text-xl ml-[450px] mt-[-200px] font-bold text-gray-800">
                      <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                        <Link href={"/drinks"}>Shop now</Link>
                      </button>
                    </h2>
                  </div>
                  <div className="ml-[455px] mt-[-140px] text-xl">
                    Drinks, Tea & Coffee
                  </div>
                  <div className="ml-[505px] mt-[10px] text-gray-500 text-xl">
                    45 items
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default FeaturedCategories;
