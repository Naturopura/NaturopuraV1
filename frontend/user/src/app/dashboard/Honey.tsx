import React from "react";
import Link from "next/link";
import Image from "next/image";
import leaf from "@/assets/leaf.png";
import greenbg from "@/assets/green-bg.png";
import honeynest from "@/assets/honeynest.png";
import honeybottle from "@/assets/honeybottle.png";
import honeynest2 from "@/assets/honeynest2.png";

const timeUnits = [
  { value: 56, label: "Days" },
  { value: 22, label: "Hours" },
  { value: 56, label: "Minutes" },
  { value: 56, label: "Seconds" },
];

const Honey = () => {
  return (
    <>
      <div className="flex items-center mb-4">
        {/* Leaf Image */}
        <Image width={100} height={100} src={leaf} alt="Leaf" className="" />
      </div>

      {/* Natural Honey Text */}
      <div className="text-3xl font-bold -mt-[4.25rem] ml-16 text-black">
        Natural Honey
      </div>

      <div className="mt-4 mx-5">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] -mt-16 h-[90vh] bg-white relative overflow-hidden">
            {/* Background Image */}
            <Image
              width={600}
              height={600}
              src={greenbg}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Natural Honey Text at Top-Left Corner */}
            <div className="absolute top-4 left-8 text-white text-5xl font-bold z-30">
              Natural Honey
            </div>

            <div className="absolute top-[6.25rem] left-8 text-black text-5xl font-bold z-30">
              Continually aggregate interfaces thout
            </div>

            {/* Honeynest2 Image - Positioned at Top-Right */}
            <Image
              width={600}
              height={600}
              src={honeynest2}
              alt=""
              className="absolute -top-4 right-0 mt-4 -mr-4 w-[43.75rem] h-[43.75rem] z-20"
            />

            {/* Honeynest Image - Positioned to the Left and Above */}
            <Image
              width={600}
              height={600}
              src={honeynest}
              alt=""
              className="absolute top-[6.25rem] left-[3px] -mt-24 w-[81.25rem] h-[45rem] z-10"
            />

            {/* Honeybottle Image - Positioned at Bottom-Right */}
            <Image
              width={600}
              height={600}
              src={honeybottle}
              alt=""
              className="absolute bottom-0 right-0 -mb-16 -mr-6 w-[38.75rem] h-auto z-10"
            />

            <div className="absolute inset-0 flex justify-center items-center z-50">
              <div className="flex -ml-[35.625rem] space-x-6">
                {/* Rectangle 1 */}
                {timeUnits.map((unit, index) => (
                  <div
                    key={index}
                    className="w-[9.375rem] h-[6.25rem] flex flex-col justify-center items-center text-2xl font-bold border-2 rounded-lg bg-white border-white"
                  >
                    <div className="text-[#7A8311]">{unit.value}</div>
                    <div>{unit.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Section - Positioned Lower and Slightly to the Right */}
            <div className="absolute top-[22.5rem] left-[7.5rem] space-y-6">
              <h1 className="text-5xl font-bold text-black">
                <div>Best deal of</div>
                <div className="text-white ml-[17.5rem] -mt-12">the week</div>
              </h1>

              <Link href="/honey">
                <button className="text-white ml-44 mt-5 text-xl bg-[#7A8311] font-medium rounded-lg text-md px-5 py-3">
                  Buy now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Honey;
