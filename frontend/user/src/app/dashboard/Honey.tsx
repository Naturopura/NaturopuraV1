import React from "react";
import Link from "next/link";
import Image from "next/image";
import leaf from "@/assets/leaf.png";
import greenbg from "@/assets/green-bg.png";
import honeynest from "@/assets/honeynest.png";
import honeybottle from "@/assets/honeybottle.png";
import honeynest2 from "@/assets/honeynest2.png";

const Honey = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        {/* Leaf Image */}
        <Image
          width={100}
          height={100}
          src={leaf}
          alt="Leaf"
          className="w-[200px] h-auto"
        />
      </div>

      {/* Natural Honey Text */}
      <div className="text-3xl font-bold mt-[-110px] ml-[120px] text-black">
        Natural Honey
      </div>

      <div className="mt-[15px]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] mt-[-65px] h-[90vh] bg-white relative overflow-hidden">
            {/* Background Image */}
            <Image
              width={600}
              height={600}
              src={greenbg}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Natural Honey Text at Top-Left Corner */}
            <div className="absolute top-4 left-8 text-white text-6xl font-bold z-30">
              Natural Honey
            </div>

            <div className="absolute top-[100px] left-8 text-black text-6xl font-bold z-30">
              Continually aggregate interfaces thout
            </div>

            {/* Honeynest2 Image - Positioned at Top-Right */}
            <Image
              width={600}
              height={600}
              src={honeynest2}
              alt=""
              className="absolute top-[-15px] right-0 mt-4 mr-[-18px] w-[700px] h-[700px] z-20"
            />

            {/* Honeynest Image - Positioned to the Left and Above */}
            <Image
              width={600}
              height={600}
              src={honeynest}
              alt=""
              className="absolute top-[100px] left-[3px] mt-[-96px] w-[1300px] h-[720px] z-10"
            />

            {/* Honeybottle Image - Positioned at Bottom-Right */}
            <Image
              width={600}
              height={600}
              src={honeybottle}
              alt=""
              className="absolute bottom-0 right-0 mb-0 mr-4 w-[620px] h-auto z-10"
            />

            <div className="absolute inset-0 flex justify-center items-center z-50">
              <div className="flex ml-[-770px] space-x-6">
                {/* Rectangle 1 */}
                <div className="w-[150px] h-[100px] flex flex-col justify-center items-center text-2xl font-bold text-center border-2 rounded-lg border-white bg-white">
                  <div className="text-[#7A8311]">56</div>
                  <div>Days</div>
                </div>

                {/* Rectangle 2 */}
                <div className="w-[150px] h-[100px] flex flex-col justify-center items-center text-2xl font-bold text-center border-2 rounded-lg border-white bg-white">
                  <div className="text-[#7A8311]">22</div>
                  <div>Hours</div>
                </div>

                {/* Rectangle 3 */}
                <div className="w-[150px] h-[100px] flex flex-col justify-center items-center text-2xl font-bold text-center border-2 rounded-lg border-white bg-white">
                  <div className="text-[#7A8311]">56</div>
                  <div>Minutes</div>
                </div>

                {/* Rectangle 4 */}
                <div className="w-[150px] h-[100px] flex flex-col justify-center items-center text-2xl font-bold text-center border-2 rounded-lg border-white bg-white">
                  <div className="text-[#7A8311]">56</div>
                  <div>Seconds</div>
                </div>
              </div>
            </div>

            {/* Content Section - Positioned Lower and Slightly to the Right */}
            <div className="absolute top-[500px] left-[250px] space-y-6">
              <h1 className="text-5xl font-bold text-black">
                <div>Best deal of</div>
                <div className="text-white ml-[280px] mt-[-48px]">the week</div>
              </h1>

              <Link href="/honey">
                <button className="text-white ml-[160px] mt-5 text-xl bg-[#7A8311] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-5 py-3">
                  Buy now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Honey;
