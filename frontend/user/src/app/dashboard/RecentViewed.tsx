import Image from "next/image";
import Link from "next/link";
import React from "react";
import leaf from "@/assets/leaf.png";
import pizza from "@/assets/pizza.jpg";
import pringles from "@/assets/pringles.jpg";
import chanadal from "@/assets/chanadal.jpg";

const RecentViewed = () => {
  return (
    <div>
      <div className="mt-[-90px]">
        <Image width={200} height={100} src={leaf} alt="" />
        <div className="text-3xl font-bold mt-[-90px] ml-[115px]">
          Your Recent Viewed
        </div>
        <h2 className="text-2xl underline mt-[-30px] font-bold text-gray-900 ml-[1540px]">
          <Link href="#">View all&gt;</Link>
        </h2>
      </div>

      <div className="min-h-screen ml-10 mt-[-100px]  flex items-center justify-center px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10">
          <div className="h-[500px] w-[500px] bg-white flex flex-col items-center justify-center shadow-lg ">
            <Image width={500} height={500} src={pizza} alt="" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10">
          <div className="h-[500px] w-[500px] bg-white flex flex-col items-center justify-center shadow-lg ">
            <Image
              width={500}
              height={500}
              src={pringles}
              alt=""
              className="h-96"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10">
          <div className="h-[500px] w-[500px] bg-white flex flex-col items-center justify-center shadow-lg ">
            <Image
              width={500}
              height={500}
              src={chanadal}
              alt=""
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentViewed;
