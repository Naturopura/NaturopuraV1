import Image from "next/image";
import Link from "next/link";
import React from "react";
import tea from "@/assets/tea.jpeg";
import coffee from "@/assets/coffee.jpeg";
import lemon from "@/assets/lemon.jpg";
import leaf from "@/assets/leaf.png";

const DrinksTeaCoffee = () => {
  return (
    <div>
      <div className="mt-[-640px]">
        <Image
          width={200}
          height={200}
          src={leaf}
          alt=""
          className="ml-[-15px]"
        />
        <div className="text-2xl text-gray-900 font-bold ml-[98px] mt-[-90px]">
          Drinks, Tea, & Coffee
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] mt-[-65px] h-[90vh] bg-white relative">
            <Image
              width={800}
              height={600}
              src={tea}
              alt="Snacks"
              className="w-full h-full object-cover"
            />
            <div className="absolute ml-[-650px] inset-0 flex flex-col items-center justify-center space-y-4 ">
              <div className="text-white text-xl ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                100% fresh
              </div>
              <h1 className="text-4xl font-bold text-black">
                Delicious <span className="text-[#ACB631]">Milk</span>{" "}
                <span className="text-[#ACB631]">Tea</span> with Lipton cup
              </h1>
              <p className="text-black font-medium text-3xl">No added sugar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[155px]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] mt-[-65px] h-[90vh] bg-white relative">
            <Image
              width={800}
              height={800}
              src={coffee}
              alt="Snacks"
              className="w-full h-[1040px] mt-[-200px]"
            />
            <div className="absolute ml-[-950px] inset-0 flex flex-col items-center justify-center space-y-4 ">
              <p className="text-black text-3xl">Coffee Offers</p>
              <h1 className="text-4xl font-bold text-black">
                <span className="text-black">Cold</span>{" "}
                <span className="text-black">Brew</span> Iced Coffee
              </h1>

              <Link href={"/coffee"}>
                <button className="text-white text-xl ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                  Shop now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[80px]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] mt-[-65px] h-[90vh] bg-white relative">
            <Image
              width={600}
              height={600}
              src={lemon}
              alt="Snacks"
              className="w-full h-full object-cover"
            />
            <div className="absolute ml-[-950px] inset-0 flex flex-col items-center justify-center space-y-4 ">
              <p className="text-white text-3xl">Soft Drinks</p>
              <h1 className="text-4xl font-bold text-black">
                <span className="text-white">Lemon</span>{" "}
                <span className="text-white">Juice 500ml</span>
              </h1>

              <Link href={"/lemon-juice"}>
                <button className="text-white text-xl ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                  Shop now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksTeaCoffee;
