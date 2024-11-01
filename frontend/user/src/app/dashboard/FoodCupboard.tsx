import Image from "next/image";
import Link from "next/link";
import React from "react";
import snacks from "@/assets/snacks.jpeg";
import snacks2 from "@/assets/snacks2.jpg";
import leaf from "@/assets/leaf.png";

const FoodCupboard = () => {
  return (
    <div>
      <div className="mt-[-120px]">
        <Image
          width={200}
          height={200}
          src={leaf}
          alt=""
          className="ml-[-15px]"
        />
        <div className="text-2xl text-gray-900 font-bold ml-[98px] mt-[-90px]">
          Food Cupboard
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] mt-[-65px] h-[90vh] bg-white relative">
            <Image
              width={600}
              height={600}
              src={snacks}
              alt="Snacks"
              className="w-full h-full object-cover"
            />
            <div className="absolute ml-[-1090px] inset-0 flex flex-col items-center justify-center space-y-4 ">
              <h1 className="text-4xl font-bold text-black">
                Sweet <span className="text-[#ACB631]">Snacks</span> &{" "}
                <span className="text-[#ACB631]">Nuts</span> Recipes
              </h1>
              <p className="text-black text-3xl">Healthy Recipes</p>
              <Link href={"/sweets-snacks"}>
                <button className="text-white text-xl ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                  Shop now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[96vw] mt-[-115px] h-[90vh] bg-white relative">
          <Image
            width={600}
            height={600}
            src={snacks2}
            alt="Snacks"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 mt-[-20px] ml-[-400px]">
            <h1 className="text-4xl font-bold text-[#ACB631]">
              Snacks <span className="text-black">For Your</span>
              <span className="text-black ml-3">Summer</span>{" "}
              <span className="text-[#ACB631]">Party</span>
            </h1>
            <p className="text-3xl text-black">Healthy Recipes</p>
          </div>

          {/* Adjust the button's position to bottom-right inside the image */}
          <Link href={"/sweets-snacks"}>
            <button
              className="absolute bottom-10 right-10 text-white text-xl bg-[#ACB631]
               focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50  font-medium rounded-lg 
               text-md px-12 py-3"
            >
              Shop now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCupboard;
