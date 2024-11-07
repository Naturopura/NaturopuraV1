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
    <div>
      <div className="mt-[-50px]">
        <Image width={200} height={100} src={leaf} alt="" />
        <div className="text-3xl font-bold mt-[-90px] ml-[115px]">
          Organic Fertilizer
        </div>
        <div className="relative mt-[-10px]">
          <div className="">
            <Image
              width={600}
              height={600}
              src={hand}
              alt=""
              className="absolute bg-white inset-0 w-[1730px] ml-[33px] mt-9 px-16 h-[1293px] object-cover z-0"
            />
          </div>
          {/* Background Image */}

          {/* Soil Image - Positioned above the hand image but behind the cards */}
          <Image
            width={400}
            height={400}
            src={soil}
            alt=""
            className="absolute ml-[200px] inset-x-0 bottom-8 w-[2500px] px-16 h-[650px] object-cover z-10"
          />

          <div className="flex p-8 relative  z-20">
            {/* First Card (Horizontal Mobile Screen) */}
            <div className="w-[1400px] h-[1300px] border-[3px] border-gray-400 flex items-center justify-center relative">
              <Image
                width={600}
                height={600}
                src={fert}
                alt=""
                className="w-full h-full object-contain"
              />
              <button className="text-white bg-[#ACB631] rounded-md px-2 py-2 text-xl absolute bottom-[200px] left-[47%] transform -translate-x-1/2 font-bold">
                Know more
              </button>
            </div>

            <div className="flex flex-col flex-grow">
              {/* Second Card (Square) - Adjusted Size */}
              <div className="aspect-square w-[900px] h-[650px] border-gray-400 border-[3px] flex items-center justify-center text-white text-xl font-bold">
                <Image
                  width={600}
                  height={600}
                  src={fert2}
                  alt=""
                  className="w-[60%] h-[60%] rounded-full"
                />
              </div>

              {/* Third Card (Square) - Adjusted Size */}
              <div className="aspect-square w-[900px] h-[650px] border-gray-400 border-[3px] flex items-center justify-center text-white text-xl font-bold">
                <Image
                  width={600}
                  height={600}
                  src={fert3}
                  alt=""
                  className="w-[60%] h-[60%] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganicFertilizer;
