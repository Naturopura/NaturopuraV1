import React, { useState, useEffect } from "react";
import Image from "next/image";
import img11 from "@/assets/img11.jpg";
import img12 from "@/assets/img12.jpeg";
import img14 from "@/assets/img14.jpg";

const slides = [
  {
    id: 1,
    title: "locally grown",
    description: "Farm fresh",
    img: img11,
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "locally grown",
    description: "Farm fresh",
    img: img12,
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "locally grown",
    description: "Farm fresh",
    img: img14,
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className="w-screen h-full flex flex-col xl:flex-row relative"
            key={slide.id}
          >
            {/* IMAGE CONTAINER */}
            <div className="h-full w-full relative">
              <Image
                src={slide.img}
                alt={slide.title || ""}
                fill
                sizes="100%"
                className="object-cover"
              />
              {/* TEXT CONTAINER */}
              <div className="absolute inset-0 -ml-6 mt-16 flex flex-col items-start justify-start gap-4 text-start p-16">
                <h2 className="text-[#18650B] text-8xl">{slide.description}</h2>
                <h1 className="text-5xl ml-6 lg:text-7xl 2xl:text-8xl font-medium">
                  {slide.title}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* DOT NAVIGATION */}
      <div className="absolute left-1/2 -bottom-12 flex gap-4 transform -translate-x-1/2">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
