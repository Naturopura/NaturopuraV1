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
      <div className="relative -top-14">
        <Image
          width={100}
          height={100}
          src={leaf}
          alt=""
          className="absolute left-5 ml-[-15px]"
        />
        <div className="absolute top-2 left-[70px] text-2xl text-gray-900 font-bold">
          Drinks, Tea, & Coffee
        </div>
      </div>

      <div className="flex items-center justify-center mx-[1.35rem] -mt-[30rem]">
        <div className="w-[96vw] h-[90vh] bg-white relative">
          <Image
            width={800}
            height={600}
            src={tea}
            alt="Snacks"
            className="w-full h-full object-cover"
          />
          <div className="absolute mr-[34rem] inset-0 flex flex-col items-center justify-center space-y-4">
            <div className="text-white text-xl bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg px-12 py-3">
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

      <div className="my-52 mx-[1.4rem]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] -mt-16 h-[90vh] bg-white relative">
            <Image
              width={800}
              height={800}
              src={coffee}
              alt="Snacks"
              className="w-full h-[65rem] -mt-[12.5rem]"
            />
            <div className="absolute -ml-[40.625rem] inset-0 flex flex-col items-center justify-center space-y-4 ">
              <p className="text-black text-3xl">Coffee Offers</p>
              <h1 className="text-4xl font-bold text-black">
                <span className="text-black">Cold</span>{" "}
                <span className="text-black">Brew</span> Iced Coffee
              </h1>

              <Link href={"/coffee"}>
                <button className="text-white text-xl -ml-5 bg-[#ACB631] font-medium rounded-lg text-md px-12 py-3 mt-4">
                  Shop now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[15.625rem] mx-[22px]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] -mt-[4.0625rem] h-[90vh] bg-white relative">
            <Image
              width={600}
              height={600}
              src={lemon}
              alt="Snacks"
              className="w-full h-full object-cover"
            />
            <div className="absolute -ml-[59.375rem] inset-0 flex flex-col items-center justify-center space-y-4 ">
              <p className="text-white text-3xl">Soft Drinks</p>
              <h1 className="text-4xl font-bold text-black">
                <span className="text-white">Lemon</span>{" "}
                <span className="text-white">Juice 500ml</span>
              </h1>

              <Link href={"/lemon-juice"}>
                <button className="text-white text-xl -ml-5 bg-[#ACB631] font-medium rounded-lg text-md px-12 py-3 mt-4">
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
