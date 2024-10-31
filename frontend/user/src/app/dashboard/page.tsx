"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import img10 from "@/assets/farm fresh.png";
import leaf from "@/assets/leaf.png";
import ProductCategory from "./ProductCategory";
import FeaturedCategories from "./FeaturedCategories";
import FoodCupboard from "./FoodCupboard";
import ProductCategoryList from "./ProductCategoryList";
import ProductGrid from "./ProductGrid";
import Fruits from "./Fruits";
import Vegetables from "./Vegetables";
import DrinksTeaCoffee from "./DrinksTeaCoffee";
import ProductCategoryLists from "./ProductCategoryLists";
import Honey from "./Honey";
import HoneyProducts from "./HoneyProducts";
import Gallery from "./Gallery";
import HealthyFruits from "./HealthyFruits";
import ProductCategories from "./ProductCategories";
import SeasonalFruits from "./SeasonalFruits";
import OrganicFertilizer from "./OrganicFertilizer";
import SoilConditioner from "./SoilConditioner";
import Pesticides from "./Pesticides";
import AgricultureSeeds from "./AgricultureSeeds";
import FarmingGardening from "./FarmingGardening";
import Recommendations from "./Recommendations";
import RecentViewed from "./RecentViewed";

const Dashboard = () => {
  return (
    <>
      <div className="bg-gray-200">
        <div className="relative mt-[-197px]">
          <Image
            width={1920}
            height={1080}
            src={img10}
            alt="Breakfast Image"
            className="object-contain w-full aspect-[1.34]"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-green-800 z-10 text-9xl">
            <div className="mr-[800px] rounded-md">
              <span>Farm fresh</span>
              <br /> {/* Line break to place 'locally grown' below */}
              <span className="text-black">locally grown</span>
            </div>
          </div>
        </div>

        <ProductCategory />
        <FeaturedCategories />
        <FoodCupboard />
        <ProductCategoryList />

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-10" />

        <h2 className="underline ml-8 mt-9 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-8" />

        <ProductGrid />
        <Fruits />
        <Vegetables />
        <DrinksTeaCoffee />
        <ProductCategoryLists />

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-10" />

        <h2 className="underline ml-8 mt-9 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-8" />

        <ProductGrid />

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-[-28px]" />

        <Honey />
        <HoneyProducts />

        <Link href="/honey">
          <button className="text-white z-10 mt-[-1px] ml-[778px] text-xl bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg px-12 py-3">
            View Products&gt;
          </button>
        </Link>

        <div className="flex items-center justify-center ml-[-125px] mt-5">
          <div className="mr-3">
            <Image width={200} height={100} src={leaf} alt="leaf" />
          </div>
          <div className="text-black mt-[-23px] ml-[-95px] text-3xl focus:ring-4 focus:outline-none font-bold rounded-lg py-2.5">
            GET WHAT YOU WANT
          </div>
        </div>

        <Gallery />

        <div className="ml-[678px] mt-[100px]">
          <div className="text-[#ACB631] text-4xl font-semibold">
            100% FRESH & HEALTHY
          </div>
          <div className="ml-0 text-4xl font-semibold">SPROUTS, VEGETABLES</div>
          <div className="ml-[118px] text-4xl font-semibold">& lot more</div>
        </div>

        <HealthyFruits />

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 -mt-10" />

        <ProductCategories />
        <SeasonalFruits />
        <OrganicFertilizer />
        <SoilConditioner />

        <div className="text-[#9FA82B] ml-[765px] text-3xl font-semibold">
          Soil Conditioner
        </div>

        <Pesticides />

        <div className="text-[#9FA82B] ml-[800px] mt-16  text-3xl font-semibold">
          Pesticides
        </div>

        <button className="text-white mt-10 bg-[#ACB631] ml-[870px] rounded-md px-2 py-2 text-xl bottom-[50px]  transform -translate-x-1/2 font-medium">
          Know more
        </button>

        <AgricultureSeeds />
        <FarmingGardening />

        <Image width={200} height={100} src={leaf} alt="" />
        <div className="text-3xl font-bold mt-[-90px] ml-[115px]">
          Recommendations
        </div>

        <div className="ml-[116px] mt-[50px] text-2xl">
          New arrival | Best Selling | Most popular | On Sales | All
        </div>

        <Recommendations />
        <RecentViewed />
      </div>
    </>
  );
};

export default Dashboard;
