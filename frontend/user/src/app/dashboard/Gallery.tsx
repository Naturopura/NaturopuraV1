import React from "react";
import Image, { StaticImageData } from "next/image";
import blueberry from "@/assets/blueberry.png";
import greenleaf from "@/assets/greenleaf.png";
import anotherleaf from "@/assets/anotherleaf.png";
import dragonfruit from "@/assets/dragonfruit.png";
import capsicum from "@/assets/capsicum.png";

const items = [
  { src: blueberry, className: "-ml-56" },
  { src: dragonfruit, className: "-ml-[17rem] -mt-2" },
  { src: capsicum, className: "-ml-[14.5rem] mt-10" },
];

const GalleryItem = ({
  src,
  imgClass,
}: {
  src: StaticImageData;
  imgClass: string;
}) => (
  <div className="border-4 border-[#ACB631] bg-white w-[19rem] h-[19rem] relative flex items-center justify-center">
    <Image width={250} height={250} src={src} alt="" className={imgClass} />
    <Image
      width={185}
      height={185}
      src={greenleaf}
      alt=""
      className="absolute -top-11 -right-[7.5rem] z-[50]"
    />
    <Image
      width={130}
      height={130}
      src={anotherleaf}
      alt=""
      className="absolute top-56 -right-20 z-[50]"
    />
  </div>
);

const Gallery = () => (
  <div className="flex flex-row gap-32 p-5 justify-center relative">
    {items.map((item, index) => (
      <GalleryItem key={index} src={item.src} imgClass={item.className} />
    ))}
  </div>
);

export default Gallery;
