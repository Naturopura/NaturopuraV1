import Image from "next/image";
import veggies from "@/assets/veggies.png";
import agriculture from "@/assets/agriculture.png";
import organic from "@/assets/organic.png";
import dairy from "@/assets/dairy.png";
import React from "react";

const ProductCategories = () => {
  return (
    <div>
      <div className="mt-[-60px]">
        <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
              <Image
                width={300}
                height={300}
                src={veggies}
                className="w-96"
                alt=""
              />
              <div className="text-[#9FA82B] font-semibold ml-[-160px] text-2xl">
                Fresh Vegetables
              </div>
              <div className="mt-3 ml-1 text-2xl">
                Always get adieus nature day course for common
              </div>
              <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 ml-[-215px] mt-3">
                Shop now
              </button>
            </div>

            <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
              <div className="-mt-3">
                <Image
                  width={300}
                  height={300}
                  src={agriculture}
                  className="w-96"
                  alt=""
                />
              </div>

              <div className="text-[#9FA82B] font-semibold ml-[-90px] text-2xl">
                Agricultural Vegetables
              </div>
              <div className="mt-3 ml-1 text-2xl">
                Always get adieus nature day course for common
              </div>
              <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 ml-[-215px] mt-3">
                Shop now
              </button>
            </div>

            <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
              <Image
                width={300}
                height={300}
                src={organic}
                className="w-96"
                alt=""
              />
              <div className="text-[#9FA82B] font-semibold ml-[-153px] text-2xl">
                Oranic Vegetables
              </div>
              <div className="mt-3 ml-1 text-2xl">
                Always get adieus nature day course for common
              </div>
              <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 ml-[-215px] mt-3">
                Shop now
              </button>
            </div>

            <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
              <Image
                width={300}
                height={300}
                src={dairy}
                className="w-72 mt-9"
                alt=""
              />
              <div className="text-[#9FA82B] font-semibold ml-[-165px] text-2xl">
                Dairy Vegetables
              </div>
              <div className="mt-3 ml-1 text-2xl">
                Always get adieus nature day course for common
              </div>
              <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 ml-[-215px] mt-3">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
