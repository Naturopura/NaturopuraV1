"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
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
import Carousel from "./Carousel";

const Dashboard = () => {
  return (
    <>
      <div className="bg-gray-200 overflow-x-hidden">
        <Carousel />
        <ProductCategory />
        <FeaturedCategories />
        <FoodCupboard />
        <ProductCategoryList />

        <hr className="border-gray-400 border-t-2 w-full max-w-screen-lg mx-auto mt-10" />

        <h2 className="underline ml-8 mt-6 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 w-full max-w-screen-lg mx-auto mt-10" />

        <ProductGrid />
        <Fruits />
        <Vegetables />
        <DrinksTeaCoffee />
        <ProductCategoryLists />

        <hr className="border-gray-400 border-t-2 w-full max-w-screen-lg mx-auto mt-10" />

        <h2 className="underline ml-8 mt-6 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 w-full max-w-screen-lg mx-auto mt-10" />

        <ProductGrid />

        <hr className="border-gray-400 border-t-2 w-full max-w-screen-lg mx-auto -mt-16" />

        <Honey />
        <HoneyProducts />

        <Link href="/honey">
          <button className="text-white z-10 mt-[-1px] mx-auto block text-xl bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg px-12 py-3">
            View Products&gt;
          </button>
        </Link>

        <div className="flex items-center justify-center mt-5">
          <Image width={200} height={100} src={leaf} alt="leaf" />
          <div className="text-black text-3xl font-bold ml-4">
            GET WHAT YOU WANT
          </div>
        </div>

        <Gallery />

        <div className="text-center mt-10">
          <div className="text-[#ACB631] text-4xl font-semibold">
            100% FRESH & HEALTHY
          </div>
          <div className="text-4xl font-semibold">SPROUTS, VEGETABLES</div>
          <div className="text-4xl font-semibold">& lot more</div>
        </div>

        <HealthyFruits />

        <hr className="border-gray-400 border-t-2 w-full max-w-screen-lg mx-auto mt-10" />

        <ProductCategories />
        <SeasonalFruits />
        <OrganicFertilizer />
        <SoilConditioner />

        <div className="text-[#9FA82B] text-center text-3xl font-semibold mt-5">
          Soil Conditioner
        </div>

        <Pesticides />

        <div className="text-[#9FA82B] text-center text-3xl font-semibold mt-5">
          Pesticides
        </div>

        <button className="text-white mt-10 bg-[#ACB631] mx-auto block rounded-md px-2 py-2 text-xl font-medium">
          Know more
        </button>

        <AgricultureSeeds />
        <FarmingGardening />

        <Image width={200} height={100} src={leaf} alt="" className="mx-auto" />
        <div className="text-center text-3xl font-bold mt-[-90px]">
          Recommendations
        </div>

        <div className="text-center text-2xl mt-5">
          New arrival | Best Selling | Most popular | On Sales | All
        </div>

        <Recommendations />
        <RecentViewed />
      </div>
    </>
  );
};

export default Dashboard;
