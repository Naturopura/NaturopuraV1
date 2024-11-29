import Image from "next/image";
import veggies from "@/assets/veggies.jpg";
import agriculture from "@/assets/agriculture.png";
import organic from "@/assets/organic.png";
import dairy from "@/assets/dairy.png";
import React from "react";

const ProductCategories = () => {
  return (
    <div className="-mt-14">
      <div className="mx-auto px-[22px] py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
            <Image
              width={300}
              height={300}
              src={veggies}
              className="-mt-4"
              alt=""
            />
            <div className="text-[#9FA82B] font-semibold -ml-20 text-2xl">
              Fresh Vegetables
            </div>
            <div className="mt-3 -ml-1 text-2xl">
              Always get adieus nature day course for common
            </div>
            <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 -ml-32 mt-3">
              Shop now
            </button>
          </div>

          <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
            <div className="-mt-3">
              <Image
                width={300}
                height={300}
                src={agriculture}
                className="mt-1 -ml-3"
                alt=""
              />
            </div>

            <div className="text-[#9FA82B] font-semibold mt-7 -ml-9 text-2xl">
              Agricultural Products
            </div>
            <div className="mt-4 -ml-[6px] text-2xl">
              Always get adieus nature day course for common
            </div>
            <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 -ml-32 mt-3">
              Shop now
            </button>
          </div>

          <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
            <Image width={200} height={200} src={organic} className="" alt="" />
            <div className="text-[#9FA82B] font-semibold -ml-24 mt-9 text-2xl">
              Oranic Products
            </div>
            <div className="mt-4 -ml-1 text-2xl">
              Always get adieus nature day course for common
            </div>
            <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 -ml-32 mt-3">
              Shop now
            </button>
          </div>

          <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
            <Image
              width={200}
              height={200}
              src={dairy}
              className="-mt-3"
              alt=""
            />
            <div className="text-[#9FA82B] -mt-5 font-semibold -ml-[6.5rem] text-2xl">
              Dairy Products
            </div>
            <div className="mt-4 -ml-1 text-2xl">
              Always get adieus nature day course for common
            </div>
            <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 -ml-32 mt-3">
              Shop now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
