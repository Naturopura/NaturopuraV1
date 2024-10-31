import Image from "next/image";
import Link from "next/link";
import React from "react";
import img3 from "@/assets/file (2).png";
import img1 from "@/assets/file (1).png";
import img2 from "@/assets/Braeburn.jpg";
import img4 from "@/assets/file (3).png";
import img5 from "@/assets/u copy 1.png";
import img6 from "@/assets/file (12).png";
import img7 from "@/assets/file (8).png";
import img8 from "@/assets/255848_14-daawat-basmati-rice-super.jpg";
import img9 from "@/assets/file (10).png";

const ProductCategory = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        {/* Unified Card Container */}
        <div className="relative mt-[-630px] shadow-xl rounded-lg overflow-hidden w-[1800px] p-10">
          {/* Background Image */}
          <Image
            width={300}
            height={300}
            alt="Background"
            src={img5} // Replace with your actual background image path
            className="absolute inset-0 object-fill px-5 mt-[-10px] w-full h-full opacity-100" // Adjust opacity and other styles as needed
          />

          <div className="grid grid-cols-4 gap-x-[40px] gap-y-40 relative z-10">
            {" "}
            {/* Added z-10 to keep content above the image */}
            {/* Section 1 - NEW ARRIVALS */}
            <div className="flex items-center">
              <div className="p-6">
                <h2 className="text-xl ml-[-20px] font-bold text-gray-800">
                  Fresh Juices
                  <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                    <Link href={"/juices"}>Shop now</Link>
                  </button>
                </h2>
              </div>
              <div className="w-72 ml-[-194px] h-40 flex items-center justify-center">
                <Image
                  width={300}
                  height={300}
                  alt="Juices"
                  src={img1}
                  className="object-cover h-[250px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Fresh Fruits
                  <Link href={"/fruits"}>
                    <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-[50px] py-3 mt-4">
                      Shop now
                    </button>
                  </Link>
                </h2>
              </div>
              <div className="w-72 h-40 ml-[-120px] flex items-center justify-center">
                <Image
                  width={300}
                  height={300}
                  alt="Fruits"
                  src={img2} // Replace with the actual image path
                  className="object-cover mt-[-20px] h-[230px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Fresh Milk
                  <Link href={"/milks"}>
                    <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                      Shop now
                    </button>
                  </Link>
                </h2>
              </div>
              <div className="w-72 h-40 ml-[-199px] flex items-center justify-center">
                <Image
                  width={180}
                  height={300}
                  alt="Milk"
                  src={img3} // Replace with the actual image path
                  className="object-cover mt-[-20px] h-[230px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Fresh Vegetables
                  <Link href={"/vegetables"}>
                    <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                      Shop now
                    </button>
                  </Link>
                </h2>
              </div>
              <div className="w-72 h-40 ml-[-190px] flex items-center justify-center">
                <Image
                  width={180}
                  height={300}
                  alt="Vegetables"
                  src={img4} // Replace with the actual image path
                  className="object-cover h-[200px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-6">
                <h2 className="text-xl ml-[-25px] font-bold text-gray-800">
                  Farming Chemicals
                  <Link href={"/farming-chemicals"}>
                    <button className="text-white ml-[-15px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                      Shop now
                    </button>
                  </Link>
                </h2>
              </div>
              <div className="w-72 h-40 ml-[-250px] flex items-center justify-center">
                <Image
                  width={300}
                  height={300}
                  alt="Farming Chemicals"
                  src={img6} // Replace with the actual image path
                  className="object-cover ml-[-50px] h-[260px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Farming Equipments
                  <Link href={"/farming-equipments"}>
                    <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                      Shop now
                    </button>
                  </Link>
                </h2>
              </div>
              <div className="w-72 h-40 ml-[-180px] flex items-center justify-center">
                <Image
                  width={150}
                  height={300}
                  alt="Farming Equipments"
                  src={img7} // Replace with the actual image path
                  className="object-cover mt-[-30px] h-[220px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  All Groceries
                  <Link href={"/groceries"}>
                    <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                      Shop now
                    </button>
                  </Link>
                </h2>
              </div>
              <div className="w-72 h-40 ml-[-220px] flex items-center justify-center">
                <Image
                  width={200}
                  height={300}
                  alt="Groceries"
                  src={img8} // Replace with the actual image path
                  className="object-cover mt-[-10px] h-[180px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Chips & Snacks
                  <Link href={"/chips-snacks"}>
                    <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                      Shop now
                    </button>
                  </Link>
                </h2>
              </div>
              <div className="w-72 h-40 ml-[-180px] flex items-center justify-center">
                <Image
                  width={200}
                  height={300}
                  alt="Chips Snacks"
                  src={img9} // Replace with the actual image path
                  className="object-cover h-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
