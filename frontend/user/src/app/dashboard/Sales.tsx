import React from "react";
import Image from "next/image";
import seafoods from "@/assets/cd7114c33af7f07dcbc4fed7baac21ec.jpg";
import americandiet from "@/assets/b655a2f45a28f0f9ca0551a539763c5d.jpg";
import mosaic from "@/assets/ac5ebb5e6ab6ed0300b75608340ead0b.jpg";

const Sales = () => {
  return (
    <>
      <section className="px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Heading Section */}
        <div className="mb-72">
          <h2 className="text-2xl font-bold mb-2">On Sales upto 30%</h2>
          <p className="text-gray-600 font-medium mb-4">
            Easiest way to healthy life by buying your favorite Food.
          </p>
          <button className="bg-[#7FA200] text-gray-800 font-semibold px-4 py-2 rounded-lg flex items-center space-x-2">
            <span>See more</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 -mx-[1.8rem]">
          {/* Card 1 */}
          <div className="p-4">
            <Image
              width={484}
              height={726}
              src={seafoods}
              alt="Daily Meal Seafoods"
              className="rounded-lg h-[24rem] w-[24rem] object-cover mb-4"
            />
            <p className="text-left font-semibold">Daily Meal Seafoods</p>
          </div>

          {/* Card 2 */}
          <div className="p-4">
            <Image
              width={484}
              height={726}
              src={americandiet}
              alt="American Diet Ready Meal"
              className="rounded-lg h-[24rem] w-[24rem] object-cover mb-4"
            />
            <p className="text-left font-semibold">American Diet Ready Meal</p>
          </div>

          {/* Card 3 */}
          <div className="p-4">
            <Image
              width={484}
              height={726}
              src={mosaic}
              alt="Mosaic Foods"
              className="rounded-lg h-[24rem] w-[24rem] object-cover mb-4"
            />
            <p className="text-left font-semibold">Mosaic Foods</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sales;
