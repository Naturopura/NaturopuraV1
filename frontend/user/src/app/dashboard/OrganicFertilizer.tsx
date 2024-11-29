import Image from "next/image";
import React from "react";
import fert from "@/assets/fert.png";
import fert2 from "@/assets/fert2.jpg";
import fert3 from "@/assets/fert3.jpg";
import hand from "@/assets/hand.png";
import soil from "@/assets/soil.png";
import leaf from "@/assets/leaf.png";

const OrganicFertilizer = () => {
  return (
    <div className="-mt-12 -mx-2">
      <Image width={100} height={100} src={leaf} className="ml-3" alt="" />
      <div className="text-3xl font-bold -mt-[3.25rem] ml-[4.5rem]">
        Organic Fertilizer
      </div>
      <div className="relative -mt-2">
        <div className="">
          <Image
            width={1300}
            height={1400}
            src={hand}
            alt=""
            className="absolute bg-white inset-0 ml-8 py-[18px] mt-8 object-cover z-0"
          />
        </div>
        {/* Background Image */}

        {/* Soil Image - Positioned above the hand image but behind the cards */}

        <Image
          width={1400}
          height={1400}
          src={soil}
          alt=""
          className="absolute ml-32 inset-x-0 bottom-8 object-cover z-10"
        />

        <div className="flex p-8 relative z-20">
          {/* First Card (Horizontal Mobile Screen) */}
          <div className="w-[87.5rem] h-[81.25rem] border-[3px] border-gray-400 flex items-center justify-center relative">
            <Image
              width={700}
              height={700}
              src={fert}
              alt=""
              className="object-contain"
            />
            <button className="text-white bg-[#ACB631] rounded-md px-2 py-2 text-xl absolute bottom-[12.5rem] left-[50%] transform -translate-x-1/2 font-bold">
              Know more
            </button>
          </div>

          <div className="flex flex-col flex-grow">
            {/* Second Card (Square) - Adjusted Size */}
            <div className="aspect-square w-[40.65rem] h-[40.65rem] border-gray-400 border-[3px] flex items-center justify-center text-white text-xl font-bold">
              <Image
                width={500}
                height={500}
                src={fert2}
                alt=""
                className="rounded-full"
              />
            </div>

            {/* Third Card (Square) - Adjusted Size */}
            <div className="aspect-square w-[40.65rem] h-[40.6rem] border-gray-400 border-[3px] flex items-center justify-center text-white text-xl font-bold">
              <Image
                width={500}
                height={500}
                src={fert3}
                alt=""
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganicFertilizer;
