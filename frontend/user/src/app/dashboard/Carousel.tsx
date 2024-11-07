import React, { useState, useEffect } from "react";
import Image from "next/image";
import img11 from "@/assets/img11.jpg";
import img12 from "@/assets/img12.jpeg";
import img14 from "@/assets/img14.jpg";

const slides = [
  {
    url: img11,
  },
  {
    url: img12,
  },
  {
    url: img14,
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    console.log("Current Index:", currentIndex);
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [currentIndex]);
  return (
    <div className=" h-[780px] w-[1831px] ml-[-16px] mt-[-63px] py-16 px-4 relative group overflow-hidden">
      <div className="w-full h-full relative">
        <Image
          src={slides[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition duration-500"
        />
      </div>

      <div className="absolute top-[44%] left-[17%] transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <div className="text-8xl text-[#18650B]">Farm fresh</div>
        <div className="text-6xl text-black">locally grown</div>
      </div>
    </div>
  );
};

export default Carousel;
