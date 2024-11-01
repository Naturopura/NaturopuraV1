import Image from "next/image";
import React from "react";
import mango from "@/assets/mango.png";
import pineapple from "@/assets/pineapple.png";
import strawberry from "@/assets/strawberry.png";
import blackberry from "@/assets/blackberry.jpg";

const SeasonalFruits = () => {
  return (
    <div>
      <div className="mt-[-110px]">
        <div className="mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="border h-[450px] border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6">
              <Image
                width={500}
                height={500}
                src={mango}
                className="w-96 h-96 object-cover rounded-md"
                alt="Banana"
              />
              <div>
                <div className="font-semibold ml-[180px] text-2xl">Summer</div>
                <div className="mt-3 text-[#98A02D] ml-[135px] text-3xl font-semibold">
                  Fresh Mango
                </div>
                <div className="text-xl mt-4 ml-5 font-semibold">
                  Conveniently innovate user-centric benefits architectures
                  rapidiously builmortar testing manufacture distinctively.
                </div>
                <button className="bg-[#ACB631] ml-[138px] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                  View Products{""}&gt;
                </button>
              </div>
            </div>

            <div className="border border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6">
              <Image
                width={500}
                height={500}
                src={pineapple}
                className="w-96 h-96 object-cover rounded-md"
                alt="Banana"
              />
              <div>
                <div className="font-semibold ml-[180px] text-2xl">Winter</div>
                <div className="mt-3 text-[#98A02D] ml-[105px] text-3xl font-semibold">
                  Fresh Pineapple
                </div>
                <div className="text-xl mt-4 font-semibold">
                  Conveniently innovate user-centric benefits architectures
                  rapidiously builmortar testing manufacture distinctively.
                </div>
                <button className="bg-[#ACB631] ml-[123px] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                  View Products{""}&gt;
                </button>
              </div>
            </div>

            <div className="border h-[430px] border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6">
              <Image
                width={500}
                height={500}
                src={strawberry}
                className="w-96 h-96 object-cover rounded-md"
                alt="Banana"
              />
              <div>
                <div className="font-semibold ml-[180px] text-2xl">Autumn</div>
                <div className="mt-3 text-[#98A02D] ml-[105px] text-3xl font-semibold">
                  Fresh Strawberry
                </div>
                <div className="text-xl ml-4 mt-4 font-semibold">
                  Conveniently innovate user-centric benefits architectures
                  rapidiously builmortar testing manufacture distinctively.
                </div>
                <button className="bg-[#ACB631] ml-[138px] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                  View Products{""}&gt;
                </button>
              </div>
            </div>

            <div className="border border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6">
              <Image
                width={500}
                height={500}
                src={blackberry}
                className="w-[440px] h-96 object-cover rounded-md"
                alt="Banana"
              />
              <div>
                <div className="font-semibold ml-[150px] text-2xl">Spring</div>
                <div className="mt-3 text-[#98A02D] ml-[83px] text-3xl font-semibold">
                  Fresh Blackberry
                </div>
                <div className="text-xl ml-6 mt-4 font-semibold">
                  Conveniently innovate user-centric benefits architectures
                  rapidiously builmortar testing manufacture distinctively.
                </div>
                <button className="bg-[#ACB631] ml-[90px] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                  View Products{""}&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalFruits;
