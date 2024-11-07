import React from "react";
import Image from "next/image";
import blueberry from "@/assets/blueberry.png";
import greenleaf from "@/assets/greenleaf.png";
import anotherleaf from "@/assets/anotherleaf.png";
import dragonfruit from "@/assets/dragonfruit.png";
import capsicum from "@/assets/capsicum.png";

const Gallery = () => {
  return (
    <div>
      <div className="flex flex-row mt-[20px] gap-[150px] p-5 justify-center relative">
        <div className="border-4 border-[#ACB631] bg-white w-[420px] relative  h-[420px] flex items-center justify-center">
          <Image
            width={600}
            height={600}
            src={blueberry}
            alt=""
            className="ml-[-245px] w-96"
          />

          <Image
            width={185}
            height={185}
            src={greenleaf}
            alt=""
            className="absolute -top-[45px] right-[-120px] z-[50]"
          />
          <Image
            width={130}
            height={130}
            src={anotherleaf}
            alt=""
            className="absolute top-[338px] right-[-77px] z-[50]"
          />
        </div>

        <div className="border-4 border-[#ACB631] bg-white w-[420px] relative  h-[420px] flex items-center justify-center">
          <Image
            width={600}
            height={600}
            src={dragonfruit}
            alt=""
            className="ml-[-295px] w-[500px] mt-[-10px]"
          />

          <Image
            width={185}
            height={185}
            src={greenleaf}
            alt=""
            className="absolute -top-[45px] right-[-120px] z-[50]"
          />

          <Image
            width={130}
            height={130}
            src={anotherleaf}
            alt=""
            className="absolute top-[338px] right-[-77px] z-[50]"
          />
        </div>

        <div className="border-4 border-[#ACB631] bg-white w-[420px] relative  h-[420px] flex items-center justify-center">
          <Image
            width={600}
            height={600}
            src={capsicum}
            alt=""
            className="ml-[-233px] mt-10 w-[330px]"
          />

          <Image
            width={185}
            height={185}
            src={greenleaf}
            alt=""
            className="absolute overflow-hidden -top-[45px] right-[-120px] z-[50]"
          />

          <Image
            width={130}
            height={130}
            src={anotherleaf}
            alt=""
            className="absolute top-[338px] right-[-77px] z-[50]"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
