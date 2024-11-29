import Image from "next/image";
import React from "react";
import bottle1 from "@/assets/bottle1.png";
import bottle2 from "@/assets/bottle2.png";
import bottle3 from "@/assets/bottle3.png";

const images = [bottle1, bottle2, bottle3];

const Pesticides = () => {
  return (
    <div className="ml-5 mt-10 w-[130%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Bottle ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default Pesticides;
