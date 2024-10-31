import Image from "next/image";
import React from "react";
import farmingequipment from "@/assets/farmingequipment.png";
import mugs from "@/assets/mugs.png";
import leafy from "@/assets/leafy.png";
import leaf from "@/assets/leaf.png";

const FarmingGardening = () => {
  return (
    <div>
      <div className="w-full px-7 mt-5">
        <div className="relative h-[1000px] border-[3px] bg-gray-100 border-gray-200 shadow-xl flex items-center justify-center text-black text-lg font-semibold">
          <Image
            width={700}
            height={700}
            src={farmingequipment}
            className="w-full h-full mt-[150px]"
            alt=""
          />

          <Image
            width={700}
            height={700}
            src={leafy}
            className="absolute mt-[-500px] w-[2000px] h-[500px] ml-[30px]"
            alt=""
          />

          <Image
            width={200}
            height={200}
            src={leaf}
            className="absolute mt-[-500px]"
            alt=""
          />

          <div className="text-[#98A02D] mt-[-440px] absolute text-4xl">
            Farming & Gardening
          </div>

          <div className=" mt-[-340px] font-normal absolute text-2xl">
            Illustrations
          </div>

          <Image
            width={400}
            height={400}
            src={mugs}
            className="absolute w-[700px] ml-[450px]"
            alt=""
          />
          <button className="text-white bg-[#ACB631] rounded-md px-2 py-2 text-xl absolute bottom-[50px] left-[92%] transform -translate-x-1/2 font-medium">
            Know more
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmingGardening;
