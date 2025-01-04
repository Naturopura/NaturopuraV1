"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import leaf from "@/assets/leaf.png";
import NewArrivals from "./NewArrivals";
import Sales from "./Sales";
import ProductGrid from "./Products";
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
import Hero from "./Hero";
import FeaturedCategories from "./FeaturedCategories";
import FoodCupboard from "./FoodCupboard";
import Products from "./Products";

const Dashboard = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        <Hero />
        <NewArrivals />
        <Sales />
        <FeaturedCategories />
        <FoodCupboard />

        <Products />
        <Fruits />
        <Vegetables />
        <DrinksTeaCoffee />
        <ProductCategoryLists />

        <hr className="border-gray-400 border-t-2 mx-5 mt-10" />

        <h2 className="underline ml-8 mt-6 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 mx-5 mt-10" />

        <ProductGrid />

        <hr className="border-gray-400 border-t-2 mx-5 -mt-16" />

        <Honey />
        <HoneyProducts />

        <Link href="/honey">
          <button className="text-white ml-[35rem] text-xl bg-[#ACB631] font-medium rounded-lg px-12 py-3">
            View Products&gt;
          </button>
        </Link>

        <div className="flex items-center justify-center -ml-[7.1875rem] mt-5">
          <div className="mr-3">
            <Image width={200} height={200} src={leaf} alt="leaf" />
          </div>
          <div className="text-black -mt-6 -ml-24 text-3xl font-bold rounded-lg py-2.5">
            GET WHAT YOU WANT
          </div>
        </div>

        <Gallery />

        <div className="ml-[28.6rem] mt-20">
          <div className="text-[#ACB631] text-4xl font-semibold">
            100% FRESH & HEALTHY
          </div>
          <div className="ml-0 text-4xl font-semibold">SPROUTS, VEGETABLES</div>
          <div className="ml-[7.4rem] text-4xl font-semibold">& lot more</div>
        </div>

        <HealthyFruits />

        <hr className="border-gray-400 border-t-2 mx-5 -mt-10" />

        <ProductCategories />
        <SeasonalFruits />
        <OrganicFertilizer />
        <SoilConditioner />

        <div className="text-[#9FA82B] ml-[33.5rem] mt-10 text-4xl font-semibold">
          Soil Conditioner
        </div>

        <Pesticides />

        <div className="text-[#9FA82B] ml-[36.5rem] mt-10  text-4xl font-semibold">
          Pesticides
        </div>

        <button className="text-white mt-10 bg-[#ACB631] ml-[42rem] rounded-md px-2 py-2 text-xl bottom-12 transform -translate-x-1/2 font-semibold">
          Know more
        </button>

        <AgricultureSeeds />
        <FarmingGardening />

        <Image
          width={120}
          height={120}
          src={leaf}
          className="ml-2 mt-5"
          alt=""
        />
        <div className="text-3xl font-bold -mt-[3.75rem] ml-20">
          Recommendations
        </div>

        <div className="ml-20 mt-7 text-2xl cursor-pointer space-x-4">
          {[
            "New arrival",
            "Best Selling",
            "Most popular",
            "On Sales",
            "All",
          ].map((text, index, arr) => (
            <span key={index} className="hover:underline">
              {text} {index < arr.length - 1 && "|"}
            </span>
          ))}
        </div>

        <Recommendations />
        <RecentViewed />
      </div>
    </>
  );
};

export default Dashboard;
