"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
<<<<<<< HEAD
import { ArrowRight, IndianRupee, Star } from "lucide-react";
import Sidebar from "../(components)/Sidebar";
import img3 from "@/assets/file (2).png";
import img1 from "@/assets/file (1).png";
import img2 from "@/assets/Braeburn.jpg";
import img4 from "@/assets/file (3).png";
import img5 from "@/assets/u copy 1.png";
import img6 from "@/assets/file (12).png";
import img7 from "@/assets/file (8).png";
import img8 from "@/assets/255848_14-daawat-basmati-rice-super.jpg";
import img9 from "@/assets/file (10).png";
import img10 from "@/assets/farm fresh.png";
import broccoli from "@/assets/broccoli-lg.jpg";
import bread from "@/assets/Bread.png";
import cola from "@/assets/cola.png";
import leaf from "@/assets/leaf.png";
import snacks from "@/assets/snacks.png";
import snacks2 from "@/assets/snacks2.png";
import lays from "@/assets/lays.jpg";
import kurkure from "@/assets/kurkure.jpg";
import wheat from "@/assets/wheat.png";
import frenchbread from "@/assets/french-bread.jpg";
import fruits from "@/assets/fruits.png";
import vegetables from "@/assets/vegetables.png";
import sp1 from "@/assets/SP 1.png";
import bg1 from "@/assets/bg 1.png";
import tea from "@/assets/Tea.png";
import coffee from "@/assets/coffee.png";
import lemon from "@/assets/Lemon.png";
import tea2 from "@/assets/tea2.jpg";
import water from "@/assets/water.jpg";
import coffee2 from "@/assets/coffee2.jpg";
import juice from "@/assets/juice.jpg";
import greenbg from "@/assets/green-bg.png";
import honeynest from "@/assets/honeynest.png";
import honeybottle from "@/assets/honeybottle.png";
import honeynest2 from "@/assets/honeynest2.png";
=======
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
>>>>>>> rakesh-bin

const Dashboard = () => {
  return (
    <>
<<<<<<< HEAD
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

        <div className="">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="ml-[-270px] mt-[-550px] max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <div className="flex items-center justify-between">
                {/* Leaf image */}
                <div className="ml-[-35px]">
                  <Image
                    width={200}
                    height={100}
                    src={leaf}
                    alt=""
                    className=""
                  />
                </div>
                {/* Featured Categories Title */}
                <h2 className="text-2xl font-bold ml-[-80px] mt-[-20px] text-gray-900">
                  Featured Categories
                </h2>

                {/* View all link aligned to the right */}
                <h2 className="text-2xl underline font-bold text-gray-900 m-[-240px] ml-auto">
                  <Link href="#">View all&gt;</Link>
                </h2>
              </div>

              <div className="mt-[-30px] space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                <div className="group relative">
                  <div className="relative w-[900px] overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 h-[600px]">
                    <Image
                      width={350}
                      height={100}
                      alt=""
                      src={broccoli}
                      className="object-cover mt-[-30px] ml-[220px] object-center"
                    />
                    <div className="p-6">
                      <h2 className="text-xl ml-[288px] mt-[-100px] font-bold text-gray-800">
                        <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                          <Link href={"/vegetables"}>Shop now</Link>
                        </button>
                      </h2>
                    </div>
                    <div className="ml-[310px] mt-[-40px] text-xl">
                      Fresh Vegetables
                    </div>
                    <div className="ml-[340px] mt-[10px] text-gray-500 text-xl">
                      125 items
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-[-880px] ml-[640px] max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                <div className="group relative">
                  <div className="relative h-[300px] w-[845px] overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
                    <Image
                      width={300}
                      height={100}
                      alt=""
                      src={bread}
                      className="h-[180px] ml-[160px] mt-[65px] object-cover object-center"
                    />
                    <div className="p-6">
                      <h2 className="text-xl ml-[450px] mt-[-200px] font-bold text-gray-800">
                        <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                          <Link href={"/bakery"}>Shop now</Link>
                        </button>
                      </h2>
                    </div>
                    <div className="ml-[515px] mt-[-140px] text-xl">Bakery</div>
                    <div className="ml-[505px] mt-[10px] text-gray-500 text-xl">
                      29 items
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-[-265px] ml-[640px] max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                <div className="group relative">
                  <div className="relative h-[284px] w-[845px] overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
                    <Image
                      width={200}
                      height={100}
                      alt=""
                      src={cola}
                      className="h-[220px] ml-[200px] mt-[35px] object-cover object-center"
                    />
                    <div className="p-6">
                      <h2 className="text-xl ml-[450px] mt-[-200px] font-bold text-gray-800">
                        <button className="text-white ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                          <Link href={"/drinks"}>Shop now</Link>
                        </button>
                      </h2>
                    </div>
                    <div className="ml-[455px] mt-[-140px] text-xl">
                      Drinks, Tea & Coffee
                    </div>
                    <div className="ml-[505px] mt-[10px] text-gray-500 text-xl">
                      45 items
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              <div className="absolute ml-[-950px] inset-0 flex flex-col items-center justify-center space-y-4 ">
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
              width={200}
              height={200}
              src={snacks2}
              alt="Snacks"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 mt-[200px] ml-[-300px]">
              <h1 className="text-4xl font-bold text-[#ACB631]">
                Snacks <span className="text-white">For Your</span>
                <span className="text-white ml-3">Summer</span>{" "}
                <span className="text-[#ACB631]">Party</span>
              </h1>
              <p className="text-3xl text-white">Healthy Recipes</p>
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

        <div className="container ml-[260px] mt-[-50px]">
          <div className="flex justify-between w-full">
            {/* Column 1 - Left */}
            <div className="space-y-6 ml-[-230px]">
              <Link
                href="/crisps-snacks-nuts"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Crisps, Snacks, and Nuts
              </Link>
              <Link
                href="/breakfast"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Breakfast
              </Link>
              <Link
                href="/tins-cans"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Tins & Cans
              </Link>
              <Link
                href="/chocolates-sweets"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Chocolates & Sweets
              </Link>
            </div>

            {/* Column 2 - Middle */}
            <div className="space-y-6">
              <Link
                href="/biscuits"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Biscuits
              </Link>
              <Link
                href="/rice"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Rice
              </Link>
              <Link
                href="/pasta-pulses"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Pasta & Pulses
              </Link>
              <Link
                href="/cooking-sauces"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Cooking Sauces
              </Link>
            </div>

            {/* Column 3 - Right */}
            <div className="space-y-6 mr-5">
              <Link
                href="/cooking-ingredients"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Cooking Ingredients
              </Link>
              <Link
                href="/honey-spreads"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Honey & Spreads
              </Link>
              <Link
                href="/savoury-snacks"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Savoury Snacks
              </Link>
              <Link
                href="/crackers"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Crackers
              </Link>
            </div>
          </div>
        </div>
=======
      <div className="bg-gray-200 overflow-x-hidden">
        <Carousel />
        <ProductCategory />
        <FeaturedCategories />
        <FoodCupboard />
        <ProductCategoryList />
>>>>>>> rakesh-bin

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-10" />

        <h2 className="underline ml-8 mt-9 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-8" />

<<<<<<< HEAD
        <div className="bg-gray-200">
          <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={lays}
                    alt="Lays"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">Lays</h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              {/* Card 2 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={kurkure}
                    alt="Kurkure"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Kurkure
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1200</p>
              </div>

              {/* Card 3 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={wheat}
                    alt="wheat"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Wheat
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1500</p>
              </div>

              {/* Card 4 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={frenchbread}
                    alt="French Bread"
                    className="w-48 h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    French Bread
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹2000</p>
              </div>

              {/* Card 5 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={wheat}
                    alt="Wheat"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Wheat
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹2500</p>
              </div>

              {/* Card 6 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={lays}
                    alt="Lays"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">Lays</h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹3000</p>
              </div>

              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={kurkure}
                    alt="Kurkure"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Kurkure
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(4)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹3000</p>
              </div>

              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={frenchbread}
                    alt="French Bread"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    French Bread
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(3)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹3000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] mt-[-400px] h-[60vh] border-2 bg-white relative">
            {/* sp1 Image Covering Entire Border */}
            <Image
              width={500}
              height={500}
              src={sp1}
              alt=""
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Fruits Image on Top */}
            <Image
              width={500}
              height={500}
              src={fruits}
              alt="Snacks"
              className="absolute top-[-30px] right-0 h-[500px] w-[900px] object-contain z-10"
            />

            {/* Content Block (Left) */}
            <div className="absolute ml-[-900px] mt-[-20px] inset-0 flex flex-col items-center justify-center space-y-4 z-20">
              <h1 className="text-4xl ml-10 font-bold text-[#ACB631]">
                Free{" "}
                <span className="text-black">Shipping on Order upto ₹5000</span>
              </h1>
              <a href="/fruits">
                <button className="text-white text-xl bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg px-12 py-3 mt-4">
                  Shop now
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[96vw] mt-[-960px] h-[60vh] border-2 bg-white relative">
            {/* Background Image Covering Entire Border */}
            <Image
              width={500}
              height={500}
              src={bg1}
              alt=""
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Flex Container for Vegetables Image and Content */}
            <div className="relative flex h-full">
              {/* Vegetables Image on the Left */}
              <div className="">
                <Image
                  width={500}
                  height={500}
                  src={vegetables}
                  alt="Vegetables"
                  className="h-72 w-full mt-10 ml-8 object-cover z-10"
                />
              </div>

              {/* Content Block on the Right */}
              <div className="w-1/2 flex items-center justify-center">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-[#ACB631]">
                    Save{" "}
                    <span className="text-black">
                      upto 50% on your First Order
                    </span>
                  </h1>
                  <a href="/vegetables">
                    <button className="text-white text-xl mt-8 ml-[180px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg px-12 py-3">
                      Shop now
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                width={600}
                height={600}
                src={tea}
                alt="Snacks"
                className="w-full h-full object-cover"
              />
              <div className="absolute ml-[650px] inset-0 flex flex-col items-center justify-center space-y-4 ">
                <div className="text-white text-xl ml-[-20px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-12 py-3 mt-4">
                  100% fresh
                </div>
                <h1 className="text-4xl font-bold text-black">
                  Delicious <span className="text-[#ACB631]">Milk</span>{" "}
                  <span className="text-[#ACB631]">Tea</span> with Lipton cup
                </h1>
                <p className="text-black font-medium text-3xl">
                  No added sugar
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[-55px]">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-[96vw] mt-[-65px] h-[90vh] bg-white relative">
              <Image
                width={600}
                height={600}
                src={coffee}
                alt="Snacks"
                className="w-full h-full object-cover"
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

        <div className="mt-[-55px]">
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
                <p className="text-black text-3xl">Soft Drinks</p>
                <h1 className="text-4xl font-bold text-black">
                  <span className="text-black">Lemon</span>{" "}
                  <span className="text-black">Juice</span> 500ml
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

        <div className="container ml-[260px] mt-[-50px]">
          <div className="flex justify-between w-full">
            {/* Column 1 - Left */}
            <div className="space-y-6 ml-[-230px]">
              <Link
                href="/tea-coffee"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Tea & Coffee
              </Link>
              <Link
                href="/hot-drinks"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Hot Drinks
              </Link>
              <Link
                href="/fizzy-drinks"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Fizzy Drinks
              </Link>
              <Link
                href="/water"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Water
              </Link>
            </div>

            {/* Column 2 - Middle */}
            <div className="space-y-6">
              <Link
                href="/squash"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Squash
              </Link>
              <Link
                href="/juices"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Juices
              </Link>
              <Link
                href="/mixers"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Mixers
              </Link>
              <Link
                href="/still-sparkling"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Still & Sparkling
              </Link>
            </div>

            {/* Column 3 - Right */}
            <div className="space-y-6 mr-5">
              <Link
                href="/no-added-sugar"
                className="text-2xl leading-6 text-black font-bold block"
              >
                No Added Sugar
              </Link>
              <Link
                href="/still-sparkling"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Still & Sparkling
              </Link>
              <Link
                href="/cordials"
                className="text-2xl leading-6 text-black font-bold block"
              >
                Cordials
              </Link>
            </div>
          </div>
        </div>
=======
        <ProductGrid />
        <Fruits />
        <Vegetables />
        <DrinksTeaCoffee />
        <ProductCategoryLists />
>>>>>>> rakesh-bin

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-10" />

        <h2 className="underline ml-8 mt-9 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-8" />

<<<<<<< HEAD
        <div className="bg-gray-200">
          <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={tea2}
                    alt="Tea"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">Tea</h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              {/* Card 2 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={water}
                    alt="Water"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Water
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1200</p>
              </div>

              {/* Card 3 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={coffee2}
                    alt="coffee2"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Coffee
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1500</p>
              </div>

              {/* Card 4 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={juice}
                    alt="Juice"
                    className="w-48 h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 ml-16 text-xl font-bold text-gray-700">
                    Juice
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹2000</p>
              </div>

              {/* Card 5 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={wheat}
                    alt="Wheat"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Wheat
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹2500</p>
              </div>

              {/* Card 6 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={lays}
                    alt="Lays"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">Lays</h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹3000</p>
              </div>

              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={kurkure}
                    alt="Kurkure"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Kurkure
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(4)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹3000</p>
              </div>

              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={frenchbread}
                    alt="French Bread"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    French Bread
                  </h3>
                </Link>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                  </svg>
                  <div className="text-xl text-gray-600">(3)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹3000</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-[-28px]" />

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
                  <div className="text-white ml-[280px] mt-[-48px]">
                    the week
                  </div>
                </h1>

                <button className="text-white ml-[160px] text-xl bg-[#7A8311] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-5 py-3">
                  <a href="/honey">Buy now</a>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 ml-[600px] mt-[-280px]">
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/41OQH1ST2dL._SX300_SY300_QL70_FMwebp_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Dabur Honey</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/41JjKD+4NVL._SY300_SX300_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Organic Honey</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/41y3+yO54hL._SY300_SX300_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Patanjali Honey</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/41R0CMLEmhL._SX300_SY300_QL70_FMwebp_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Zandu Pure Honey</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/71AuTPJ0veL._SX679_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Lays</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/71AuTPJ0veL._SX679_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Lays</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/71AuTPJ0veL._SX679_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Lays</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/71AuTPJ0veL._SX679_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Lays</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://m.media-amazon.com/images/I/71AuTPJ0veL._SX679_.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Lays</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              (5)
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
        </div>
        <button className="text-white mt-5 ml-[930px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
          <Link href={"/honey"}>View Products</Link>
        </button>
        <div className="text-black mt-5 ml-[930px] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-2.5">
          GET WHAT YOU WANT
        </div>
        <div className="ml-[600px]">
          <Image
            width={200}
            height={400}
            alt=""
            src="https://5.imimg.com/data5/VU/MR/MY-24751011/purple-grapes-1000x1000.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
        <div className="mt-[-200px] ml-[850px]">
          <Image
            width={200}
            height={400}
            alt=""
            src="https://cdn.shopaccino.com/rootz/products/picture1-12865436519083_l.jpg?v=492?param=1"
            className="rounded-lg bg-gray-100"
          />
        </div>
        <div className="mt-[-200px] ml-[1100px]">
          <Image
            width={200}
            height={400}
            alt=""
            src="https://4.imimg.com/data4/XP/GY/MY-27758951/green-capsicum-1000x1000.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
        <div className="ml-[700px]">
          100% FRESH AND HEALTHY SPROUTS, VEGETABLES & lot more
        </div>
        <Sidebar />
        <div className="grid grid-cols-3 gap-5 ml-[600px] mt-[-280px]">
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://www.chandigarhayurvedcentre.com/wp-content/uploads/2021/03/APPLE.png"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Apple</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>

            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://images.everydayhealth.com/images/diet-nutrition/how-many-calories-are-in-a-banana-1440x810.jpg?sfvrsn=be4504bc_4"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Banana</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://fruitboxco.com/cdn/shop/products/asset_19_400x.jpg?v=1594383262"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Guava</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://www.earthytales.in/uploads/products/3x/327c076eb2dc327535b959378a5d3624.jpg?v=031020241"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Cherry</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://www.bigbasket.com/media/uploads/p/l/40122445_6-fresho-grapes-green-residue-free.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Grape</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://www.fervalle.com/wp-content/uploads/2022/07/transparent-orange-apple5eacfeae85ac29.7815306015883956945475-300x300.png"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Orange</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://cdn.shopaccino.com/rootz/products/picture1-12865436519083_l.jpg?v=492?param=1"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Dragon Fruit</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://cdn.britannica.com/18/176518-050-5AB1E61D/lychee-fruits-Southeast-Asia.jpg?w=300"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Lychee</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://media.istockphoto.com/id/579754040/photo/red-berry-strawberry.jpg?s=612x612&w=0&k=20&c=o8m7UEe6NEVqyTO1bEZU5A6fKl3Zu43NLQ23JrlLQgM="
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Strawberry</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
            <div className="cursor-pointer flex gap-1 ml-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
        </div>
        <div className="relative mt-5 ml-[630px] w-[300px] h-[100px]">
          <Image
            width={300}
            height={100}
            alt=""
            src="https://happyharvestfarms.com/blog/wp-content/uploads/2024/01/Vegetables-3.jpg"
            className="rounded-lg bg-gray-100 object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-2 bg-black/50 rounded-lg">
            <p className="text-sm font-semibold">
              Fresh Vegetables Always get adiues nature day course for common
            </p>
            <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-3 py-2.5">
              <Link href={"/vegetables"}>Shop now</Link>
            </button>
          </div>
        </div>

        <div className="relative mt-5 ml-[1000px] w-[300px] h-[100px]">
          <Image
            width={300}
            height={100}
            alt=""
            src="https://healthybuddha.in/image/cache/catalog/Sooji/basmati-rice-500x515.jpeg"
            className="rounded-lg bg-gray-100 object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-2 bg-black/50 rounded-lg">
            <p className="text-sm font-semibold">
              Agricultural Vegetables Always get adiues nature day course for
              common
            </p>
            <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-3 py-2.5">
              <Link href={"/agriculture"}>Shop now</Link>
            </button>
          </div>
        </div>

        <div className="relative mt-[300px] ml-[1000px] w-[300px] h-[100px]">
          <Image
            width={300}
            height={100}
            alt=""
            src="https://simplyfresh.info/wp-content/uploads/2015/09/simply-handlingdairy-300x207.jpg"
            className="rounded-lg bg-gray-100 object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-2 bg-black/50 rounded-lg">
            <p className="text-sm font-semibold">
              Dairy Vegetables Always get adiues nature day course for common
            </p>
            <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-3 py-2.5">
              <Link href={"/dairy"}>Shop now</Link>
            </button>
          </div>
        </div>

        <div className="relative mt-[-400px] ml-[630px] w-[300px] h-[100px]">
          <Image
            width={300}
            height={100}
            alt=""
            src="https://blog.cabi.org/wp-content/uploads/sites/5/2018/01/spices-1024x783.jpg"
            className="rounded-lg bg-gray-100 object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-2 bg-black/50 rounded-lg">
            <p className="text-sm font-semibold">
              Organic Vegetables Always get adiues nature day course for common
            </p>
            <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-3 py-2.5">
              <Link href={"/spices"}>Shop now</Link>
            </button>
          </div>
        </div>
        <div className="relative mt-[425px] ml-[700px] w-[300px] h-[300px]">
          <Image
            width={300}
            height={300}
            alt=""
            src="https://5.imimg.com/data5/SELLER/Default/2024/1/378879267/DJ/VN/VT/200058092/fresh-mango-1000x1000.jpeg"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-3 bg-black/40 rounded-lg p-4">
            <p className="text-sm font-semibold">
              Summer Fresh Mango Conveniently innovate user-centric benefits
              architectures rapidly build mortar testing manufacture
              distinctively
            </p>
            <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-4 py-2.5">
              <Link href={"/mango"}>View products</Link>
            </button>
          </div>
        </div>

        <div className="relative mt-[-290px] ml-[1030px] w-[300px] h-[300px]">
          <Image
            width={300}
            height={300}
            alt=""
            src="https://www.healthxchange.sg/sites/hexassets/Assets/food-nutrition/pineapple-health-benefits-and-ways-to-enjoy.jpg"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-3 bg-black/50 rounded-lg p-4">
            <p className="text-sm font-semibold">
              Winter Fresh Pineapple Conveniently innovate user-centric benefits
              architectures rapidly build mortar testing manufacture
              distinctively
            </p>
            <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-4 py-2.5">
              <Link href={"/pineapple"}>View products</Link>
            </button>
          </div>
        </div>

        <div className="relative mt-[100px] ml-[1030px] w-[300px] h-[300px]">
          <Image
            width={300}
            height={300}
            alt=""
            src="https://media.istockphoto.com/id/579754040/photo/red-berry-strawberry.jpg?s=612x612&w=0&k=20&c=o8m7UEe6NEVqyTO1bEZU5A6fKl3Zu43NLQ23JrlLQgM="
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-3 bg-black/50 rounded-lg p-4">
            <p className="text-sm font-semibold">
              Autumn Fresh Strawberry Conveniently innovate user-centric
              benefits architectures rapidly build mortar testing manufacture
              distinctively
            </p>
            <button className="text-white bg-[#ACB631] font-medium rounded-lg text-sm px-4 py-2.5 focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50">
              <Link href={"/strawberry"}>View products</Link>
            </button>
          </div>
        </div>

        <div className="relative mt-[-250px] ml-[700px] w-[300px] h-[300px]">
          <Image
            width={300}
            height={300}
            alt="Spring Fresh Blackberry"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Blackberries_%28Rubus_fruticosus%29.jpg/250px-Blackberries_%28Rubus_fruticosus%29.jpg"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 space-y-3 rounded-lg p-4">
            <p className="text-sm font-semibold">
              Spring Fresh Blackberry Conveniently innovate user-centric
              benefits architectures rapidly build mortar testing manufacture
              distinctively
            </p>
            <button className="text-white bg-[#ACB631] font-medium rounded-lg text-sm px-4 py-2.5 focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50">
              <Link href={"/blackberry"}>View products</Link>
            </button>
          </div>
        </div>
        <div className="ml-[650px] mt-[50px]">Organic Fertilizer</div>
        <div className="relative ml-[550px]">
          <Image
            width={500}
            height={200}
            alt="Fertilizers"
            src="https://www.ecepl.com/wp-content/uploads/2024/04/Earthcare-41-1024x576.jpg"
            className="rounded-lg h-[500px] bg-gray-100"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-black/ rounded-lg">
            <button
              type="button"
              className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-10 py-2.5"
            >
              <Link href="/fertilizers">Know more</Link>
            </button>
          </div>
        </div>

        <div className="relative ml-[1060px] mt-[-500px]">
          <Image
            width={270}
            height={200}
            alt="Korean Ramen"
            src="https://kellogggarden.com/wp-content/uploads/2018/06/Hands-Holding-Soil-300x200.jpg"
            className="rounded-lg bg-gray-100"
          />

          {/* Overlay content */}
        </div>

        <div className="relative ml-[1060px] mt-[10px]">
          <Image
            width={275}
            height={200}
            alt="Korean Ramen"
            src="https://media.istockphoto.com/id/637583458/photo/hands-holding-and-caring-a-green-young-plant.jpg?s=612x612&w=0&k=20&c=vayQ471oZW7dTCeDJos5h4wH7SZqL4cbD-F-pZxj114="
            className="rounded-lg bg-gray-100"
          />

          {/* Overlay content */}
        </div>
        <div className="mt-[200px] ml-[600px]">
          <Image
            width={200}
            height={200}
            src="https://cdn.mos.cms.futurecdn.net/JvUBWzUho5ngxRNvK8Hf9i-1024-80.jpg.webp"
            alt=""
            className=""
          />
        </div>
        <div className="mt-[-133px] ml-[830px]">
          <Image
            width={200}
            height={200}
            src="https://cdn.mos.cms.futurecdn.net/JvUBWzUho5ngxRNvK8Hf9i-1024-80.jpg.webp"
            alt=""
            className=""
          />
        </div>
        <div className="mt-[-135px] ml-[1065px]">
          <Image
            width={200}
            height={200}
            src="https://cdn.mos.cms.futurecdn.net/JvUBWzUho5ngxRNvK8Hf9i-1024-80.jpg.webp"
            alt=""
            className=""
          />
        </div>
        <div className="ml-[850px]">Soil Conditioner</div>
        <div className="mt-5 ml-[600px]">
          <Image
            width={200}
            height={200}
            src="https://m.media-amazon.com/images/I/51CSqx1w9SS._SX300_SY300_QL70_FMwebp_.jpg"
            alt=""
            className=""
          />
        </div>
        <div className="mt-[-185px] ml-[830px]">
          <Image
            width={200}
            height={200}
            src="https://m.media-amazon.com/images/I/51CSqx1w9SS._SX300_SY300_QL70_FMwebp_.jpg"
            alt=""
            className=""
          />
        </div>
        <div className="mt-[-255px] ml-[1065px]">
          <Image
            width={200}
            height={200}
            src="https://m.media-amazon.com/images/I/51CSqx1w9SS._SX300_SY300_QL70_FMwebp_.jpg"
            alt=""
            className=""
          />
        </div>
        <div className="mt-[80px] ml-[850px]">Pesticides</div>
        <button
          type="button"
          className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-10 py-2.5 ml-[810px]"
        >
          <Link href="/pesticides">Know more</Link>
        </button>
        <div className="relative ml-[600px] mt-10 w-[400px] h-[350px]">
          <Image
            width={400}
            height={350}
            src="https://www.skorganicfarms.com/cdn/shop/collections/seeds_1296x.jpg?v=1550061858"
            alt="Agriculture SEEDS"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50 rounded-lg">
            <h2 className="text-xl font-semibold">Agriculture SEEDS</h2>
          </div>
        </div>

        <div className="relative ml-[1060px] mt-[-345px] w-[200px] h-[350px]">
          <Image
            width={200}
            height={350}
            src="https://www.alkarty.com/images/product/resized/500-500/03-07-2021industries-garden-sanitizer-chemical-pressure-sprayer-pump-original-imafwhzyzwsjgkzn.jpeg"
            alt="Farming & Gardening"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 text-center text-white bg-black/50 rounded-lg p-4">
            <h2 className="text-lg font-semibold">Farming & Gardening</h2>
            <button
              type="button"
              className="text-black bg-[#ACB631] font-medium rounded-lg text-sm px-10 py-2.5 focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50"
            >
              <Link href="/farming">Know more</Link>
            </button>
          </div>
        </div>
        <div className="ml-[650px] mt-[50px]">Recommendations</div>
        <div className="ml-[650px] mt-[50px]">
          New arrival | Best Selling | Most popular | On Sales | All
        </div>
        <div className="grid grid-cols-3 gap-5 ml-[600px] mt-5">
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://5.imimg.com/data5/SELLER/Default/2023/8/332766634/BV/LK/TV/119986806/500-gram-frozen-chicken-500x500.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Chicken</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>

            <div className="flex">
              <IndianRupee /> 500
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://www.bluetribefoods.com/cdn/shop/products/Pepperonifront1500x1500whitebackground_1024x1024.jpg?v=1704718440"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Pepperoni</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 800
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://images-cdn.ubuy.co.in/663b390a85df32464c346e75-minute-maid-pink-lemonade-20-oz-bottle.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Minute Maid</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 50
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://www.earthytales.in/uploads/products/3x/327c076eb2dc327535b959378a5d3624.jpg?v=031020241"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Cherry</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://www.bigbasket.com/media/uploads/p/l/40122445_6-fresho-grapes-green-residue-free.jpg"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Grape</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://www.fervalle.com/wp-content/uploads/2022/07/transparent-orange-apple5eacfeae85ac29.7815306015883956945475-300x300.png"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Orange</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://cdn.shopaccino.com/rootz/products/picture1-12865436519083_l.jpg?v=492?param=1"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Dragon Fruit</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://cdn.britannica.com/18/176518-050-5AB1E61D/lychee-fruits-Southeast-Asia.jpg?w=300"
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Lychee</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              width={150}
              height={100}
              alt=""
              src="https://media.istockphoto.com/id/579754040/photo/red-berry-strawberry.jpg?s=612x612&w=0&k=20&c=o8m7UEe6NEVqyTO1bEZU5A6fKl3Zu43NLQ23JrlLQgM="
              className="h-[150px] rounded-lg bg-gray-100"
            />
            <p className="text-center mt-[-20px]">Strawberry</p>
            <div className="flex gap-4 mt-[-11px] ml-5">
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to cart
              </button>
              <button className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-1 py-2.5">
                Add to wishlist
              </button>
            </div>
            <div className="flex">
              <IndianRupee /> 20
            </div>
          </div>
        </div>
        <div className="ml-[650px] mt-[50px]">Your Recent Viewed</div>
        <div className="ml-[1250px] mt-[-25px] underline">
          <Link href={""}>
            View all
            <ArrowRight className="ml-[55px] mt-[-25px]" />
          </Link>
        </div>
        <div className="ml-[680px] mt-5">
          <Image
            width={600}
            height={400}
            alt=""
            src="https://www.bluetribefoods.com/cdn/shop/products/Pepperonifront1500x1500whitebackground_1024x1024.jpg?v=1704718440"
            className="rounded-lg bg-gray-100"
          />
        </div>
=======
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

        <div className="text-[#9FA82B] ml-[800px] -mt-10  text-3xl font-semibold">
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
>>>>>>> rakesh-bin
      </div>
    </>
  );
};

export default Dashboard;
