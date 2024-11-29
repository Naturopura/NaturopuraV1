import Image from "next/image";
import React from "react";
import handsoil from "@/assets/handsoil.png";
import handsoil2 from "@/assets/handsoil2.png";
import handsoil3 from "@/assets/handsoil3.png";

const images = [handsoil, handsoil2, handsoil3];

const SoilConditioner = () => (
  <div className="ml-5 w-[130%]">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Handsoil ${index + 1}`}
          className="w-full h-auto object-cover"
        />
      ))}
    </div>
  </div>
);

export default SoilConditioner;
