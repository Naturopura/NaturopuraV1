"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { ArrowRight, IndianRupee } from "lucide-react";
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
import honeybee from "@/assets/honeybee.png";
import honeybee2 from "@/assets/honeybee2.png";
import daburhoney from "@/assets/daburhoney.jpg";
import blueberry from "@/assets/blueberry.png";
import greenleaf from "@/assets/greenleaf.png";
import anotherleaf from "@/assets/anotherleaf.png";
import dragonfruit from "@/assets/dragonfruit.png";
import capsicum from "@/assets/capsicum.png";
import banana from "@/assets/banana.png";
import veggies from "@/assets/veggies.png";
import agriculture from "@/assets/agriculture.png";
import organic from "@/assets/organic.png";
import dairy from "@/assets/dairy.png";
import mango from "@/assets/mango.png";
import pineapple from "@/assets/pineapple.png";
import cherry from "@/assets/cherry.png";
import blackberry from "@/assets/blackberry.png";
import fert from "@/assets/fert.png";
import fert2 from "@/assets/fert2.png";
import fert3 from "@/assets/fer3.png";
import hand from "@/assets/hand.png";
import soil from "@/assets/soil.png";
import crop from "@/assets/crop.png";
import leaf5 from "@/assets/leaf.png";
import seeds from "@/assets/seeds.png";
import seeds2 from "@/assets/seeds2.png";
import greeneryleaf from "@/assets/greenery-leaf.png";
import anothergreenleaf from "@/assets/anothergreenleaf.png";
import farmingequipment from "@/assets/farmingequipment.png";
import mugs from "@/assets/mugs.png";
import leafy from "@/assets/leafy.png";
import pizza from "@/assets/pizza.jpg";
import pringles from "@/assets/pringles.jpg";
import chanadal from "@/assets/chanadal.jpg";
import handsoil from "@/assets/handsoil.png";
import handsoil2 from "@/assets/handsoil2.png";
import handsoil3 from "@/assets/handsoil3.png";
import rectangle from "@/assets/Rectangle 60.png";
import bottle1 from "@/assets/bottle1.png";
import bottle2 from "@/assets/bottle2.png";
import bottle3 from "@/assets/bottle3.png";

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

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-10" />

        <h2 className="underline ml-8 mt-9 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-8" />

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
              <Link href="/fruits">
                <button className="text-white text-xl bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg px-12 py-3 mt-4">
                  Shop now
                </button>
              </Link>
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
                  <Link href="/vegetables">
                    <button className="text-white text-xl mt-8 ml-[180px] bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg px-12 py-3">
                      Shop now
                    </button>
                  </Link>
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

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-10" />

        <h2 className="underline ml-8 mt-9 text-2xl font-bold">
          <Link href={""}>View all&gt;</Link>
        </h2>

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 mt-8" />

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

        <div className="flex items-center mb-4">
          {/* Leaf Image */}
          <Image
            width={100}
            height={100}
            src={leaf}
            alt="Leaf"
            className="w-[200px] h-auto"
          />
        </div>

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

                <Link href="/honey">
                  <button className="text-white ml-[160px] mt-5 text-xl bg-[#7A8311] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-md px-5 py-3">
                    Buy now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-[-60px] bg-gray-200 min-h-screen">
          {/* Honeybee image positioned absolutely */}
          <Image
            width={600}
            height={600}
            src={honeybee}
            alt="Honeybee"
            className="absolute ml-[-70px] mt-[120px] inset-0 w-[1150px] h-[750px] object-cover opacity-100"
          />

          <div className="relative z-10 mx-auto px-6 lg:px-12 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
                <a href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={daburhoney}
                    alt="Honey"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Honey
                  </h3>
                </a>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  {/* Stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                    </svg>
                  ))}
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
                <a href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={daburhoney}
                    alt="Honey"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Honey
                  </h3>
                </a>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  {/* Stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                    </svg>
                  ))}
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
                <a href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={daburhoney}
                    alt="Honey"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Honey
                  </h3>
                </a>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  {/* Stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                    </svg>
                  ))}
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
                <a href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={daburhoney}
                    alt="Honey"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Honey
                  </h3>
                </a>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  {/* Stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                    </svg>
                  ))}
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              <Image
                width={600}
                height={600}
                src={honeybee2}
                alt="Honeybee"
                className="absolute ml-[800px] mt-[70px] inset-0 w-[1150px] h-[1050px] object-cover opacity-100"
              />

              <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
                <a href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={daburhoney}
                    alt="Honey"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Honey
                  </h3>
                </a>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  {/* Stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                    </svg>
                  ))}
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
                <a href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={daburhoney}
                    alt="Honey"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Honey
                  </h3>
                </a>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  {/* Stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                    </svg>
                  ))}
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
                <a href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={daburhoney}
                    alt="Honey"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Honey
                  </h3>
                </a>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  {/* Stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                    </svg>
                  ))}
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>

              <div className="border border-gray-300 bg-white bg-opacity-40 p-4 flex flex-col items-center">
                <a href="/product-detail">
                  <Image
                    width={100}
                    height={100}
                    src={daburhoney}
                    alt="Honey"
                    className="h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-700">
                    Honey
                  </h3>
                </a>
                <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                  Add to Cart
                </button>
                <div className="mt-2 flex items-center space-x-1">
                  {/* Stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                    </svg>
                  ))}
                  <div className="text-xl text-gray-600">(5)</div>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">₹1000</p>
              </div>
            </div>
          </div>
        </div>

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

        <div className="flex flex-row mt-[20px] gap-[150px] p-5 justify-center relative">
          <div className="border-4 border-[#ACB631] bg-white w-[420px] relative  h-[420px] flex items-center justify-center">
            <Image
              width={600}
              height={600}
              src={blueberry}
              alt=""
              className="ml-[-245px] w-96"
            />

            <Image
              width={185}
              height={185}
              src={greenleaf}
              alt=""
              className="absolute -top-[45px] right-[-120px] z-[50]"
            />
            <Image
              width={130}
              height={130}
              src={anotherleaf}
              alt=""
              className="absolute top-[338px] right-[-77px] z-[50]"
            />
          </div>

          <div className="border-4 border-[#ACB631] bg-white w-[420px] relative  h-[420px] flex items-center justify-center">
            <Image
              width={600}
              height={600}
              src={dragonfruit}
              alt=""
              className="ml-[-295px] w-[500px] mt-[-10px]"
            />

            <Image
              width={185}
              height={185}
              src={greenleaf}
              alt=""
              className="absolute -top-[45px] right-[-120px] z-[50]"
            />

            <Image
              width={130}
              height={130}
              src={anotherleaf}
              alt=""
              className="absolute top-[338px] right-[-77px] z-[50]"
            />
          </div>

          <div className="border-4 border-[#ACB631] bg-white w-[420px] relative  h-[420px] flex items-center justify-center">
            <Image
              width={600}
              height={600}
              src={capsicum}
              alt=""
              className="ml-[-233px] mt-10 w-[330px]"
            />

            <Image
              width={185}
              height={185}
              src={greenleaf}
              alt=""
              className="absolute overflow-hidden -top-[45px] right-[-120px] z-[50]"
            />

            <Image
              width={130}
              height={130}
              src={anotherleaf}
              alt=""
              className="absolute top-[338px] right-[-77px] z-[50]"
            />
          </div>
        </div>

        <div className="ml-[678px] mt-[100px]">
          <div className="text-[#ACB631] text-4xl font-semibold">
            100% FRESH & HEALTHY
          </div>
          <div className="ml-0 text-4xl font-semibold">SPROUTS, VEGETABLES</div>
          <div className="ml-[118px] text-4xl font-semibold">& lot more</div>
        </div>

        <div className="mt-[-50px]">
          <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="border-[#ACB631] -mb-5 border-2 px-[126px] bg-white">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="border-[#ACB631] -mb-5 border-2 px-[126px] bg-white">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="border-[#ACB631] -mb-5 border-2 px-[126px] bg-white">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="border-[#ACB631] -mb-5 border-2 px-[126px] bg-white">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="border-[#ACB631] -mb-5 border-2 px-[126px] bg-white">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="border-[#ACB631] -mb-5 border-2 px-[126px] bg-white">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="border-[#ACB631] -mb-5 border-2 px-[126px] bg-white">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="border-[#ACB631] -mb-5 border-2 px-[126px] bg-white">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-400 border-t-2 w-[1730px] ml-8 -mt-10" />

        <div className="mt-[-60px]">
          <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Image
                  width={300}
                  height={300}
                  src={veggies}
                  className="w-96"
                  alt=""
                />
                <div className="text-[#9FA82B] font-semibold ml-[-160px] text-2xl">
                  Fresh Vegetables
                </div>
                <div className="mt-3 ml-1 text-2xl">
                  Always get adieus nature day course for common
                </div>
                <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 ml-[-215px] mt-3">
                  Shop now
                </button>
              </div>

              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <div className="-mt-3">
                  <Image
                    width={300}
                    height={300}
                    src={agriculture}
                    className="w-96"
                    alt=""
                  />
                </div>

                <div className="text-[#9FA82B] font-semibold ml-[-90px] text-2xl">
                  Agricultural Vegetables
                </div>
                <div className="mt-3 ml-1 text-2xl">
                  Always get adieus nature day course for common
                </div>
                <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 ml-[-215px] mt-3">
                  Shop now
                </button>
              </div>

              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Image
                  width={300}
                  height={300}
                  src={organic}
                  className="w-96"
                  alt=""
                />
                <div className="text-[#9FA82B] font-semibold ml-[-153px] text-2xl">
                  Oranic Vegetables
                </div>
                <div className="mt-3 ml-1 text-2xl">
                  Always get adieus nature day course for common
                </div>
                <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 ml-[-215px] mt-3">
                  Shop now
                </button>
              </div>

              <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
                <Image
                  width={300}
                  height={300}
                  src={dairy}
                  className="w-72 mt-9"
                  alt=""
                />
                <div className="text-[#9FA82B] font-semibold ml-[-165px] text-2xl">
                  Dairy Vegetables
                </div>
                <div className="mt-3 ml-1 text-2xl">
                  Always get adieus nature day course for common
                </div>
                <button className="border-[#98A02D] py-2 text-2xl border-[3px] rounded-xl px-5 ml-[-215px] mt-3">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[-110px]">
          <div className="mx-auto px-6 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="border h-[450px] border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6">
                <Image
                  width={500}
                  height={500}
                  src={mango}
                  className="w-96 h-96 object-cover rounded-md"
                  alt="Banana"
                />
                <div>
                  <div className="font-semibold ml-[180px] text-2xl">
                    Summer
                  </div>
                  <div className="mt-3 text-[#98A02D] ml-[135px] text-3xl font-semibold">
                    Fresh Mango
                  </div>
                  <div className="text-xl mt-4 ml-5 font-semibold">
                    Conveniently innovate user-centric benefits architectures
                    rapidiously builmortar testing manufacture distinctively.
                  </div>
                  <button className="bg-[#ACB631] ml-[138px] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                    View Products{""}&gt;
                  </button>
                </div>
              </div>

              <div className="border border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6">
                <Image
                  width={500}
                  height={500}
                  src={pineapple}
                  className="w-96 h-96 object-cover rounded-md"
                  alt="Banana"
                />
                <div>
                  <div className="font-semibold ml-[180px] text-2xl">
                    Winter
                  </div>
                  <div className="mt-3 text-[#98A02D] ml-[105px] text-3xl font-semibold">
                    Fresh Pineapple
                  </div>
                  <div className="text-xl mt-4 font-semibold">
                    Conveniently innovate user-centric benefits architectures
                    rapidiously builmortar testing manufacture distinctively.
                  </div>
                  <button className="bg-[#ACB631] ml-[123px] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                    View Products{""}&gt;
                  </button>
                </div>
              </div>

              <div className="border h-[430px] border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6">
                <Image
                  width={500}
                  height={500}
                  src={cherry}
                  className="w-96 h-96 object-cover rounded-md"
                  alt="Banana"
                />
                <div>
                  <div className="font-semibold ml-[180px] text-2xl">
                    Autumn
                  </div>
                  <div className="mt-3 text-[#98A02D] ml-[105px] text-3xl font-semibold">
                    Fresh Strawberry
                  </div>
                  <div className="text-xl ml-4 mt-4 font-semibold">
                    Conveniently innovate user-centric benefits architectures
                    rapidiously builmortar testing manufacture distinctively.
                  </div>
                  <button className="bg-[#ACB631] ml-[138px] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                    View Products{""}&gt;
                  </button>
                </div>
              </div>

              <div className="border border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6">
                <Image
                  width={500}
                  height={500}
                  src={blackberry}
                  className="w-[440px] h-96 object-cover rounded-md"
                  alt="Banana"
                />
                <div>
                  <div className="font-semibold ml-[150px] text-2xl">
                    Spring
                  </div>
                  <div className="mt-3 text-[#98A02D] ml-[83px] text-3xl font-semibold">
                    Fresh Blackberry
                  </div>
                  <div className="text-xl ml-6 mt-4 font-semibold">
                    Conveniently innovate user-centric benefits architectures
                    rapidiously builmortar testing manufacture distinctively.
                  </div>
                  <button className="bg-[#ACB631] ml-[90px] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                    View Products{""}&gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[-50px]">
          <Image width={200} height={100} src={leaf} alt="" />
          <div className="text-3xl font-bold mt-[-90px] ml-[115px]">
            Organic Fertilizer
          </div>
          <div className="relative mt-[-10px]">
            <div className="">
              <Image
                width={600}
                height={600}
                src={hand}
                alt=""
                className="absolute bg-white inset-0 w-[1730px] ml-[33px] mt-9 px-16 h-[1293px] object-cover z-0"
              />
            </div>
            {/* Background Image */}

            {/* Soil Image - Positioned above the hand image but behind the cards */}
            <Image
              width={400}
              height={400}
              src={soil}
              alt=""
              className="absolute ml-[200px] inset-x-0 bottom-8 w-[2500px] px-16 h-[650px] object-cover z-10"
            />

            <div className="flex p-8 relative  z-20">
              {/* First Card (Horizontal Mobile Screen) */}
              <div className="w-[1400px] h-[1300px] border-[3px] border-gray-400 flex items-center justify-center relative">
                <Image
                  width={600}
                  height={600}
                  src={fert}
                  alt=""
                  className="w-3/4 h-[2000px] object-contain"
                />
                <button className="text-white bg-[#ACB631] rounded-md px-2 py-2 text-xl absolute bottom-[200px] left-[47%] transform -translate-x-1/2 font-bold">
                  Know more
                </button>
              </div>

              <div className="flex flex-col flex-grow">
                {/* Second Card (Square) - Adjusted Size */}
                <div className="aspect-square w-[900px] h-[650px] border-gray-400 border-[3px] flex items-center justify-center text-white text-xl font-bold">
                  <Image
                    width={600}
                    height={600}
                    src={fert2}
                    alt=""
                    className="w-3/4 object-contain"
                  />
                </div>

                {/* Third Card (Square) - Adjusted Size */}
                <div className="aspect-square w-[900px] h-[650px] border-gray-400 border-[3px] flex items-center justify-center text-white text-xl font-bold">
                  <Image
                    width={600}
                    height={600}
                    src={fert3}
                    alt=""
                    className="w-3/4 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[-50px] ml-[330px]">
          <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="rounded-xl p-4 flex flex-col items-center relative">
                {/* Rectangle Image - Positioned below */}
                <Image
                  width={200}
                  height={200}
                  src={rectangle}
                  alt="Rectangle"
                  className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
                />

                {/* Handsoil Image - Positioned above */}
                <Image
                  width={280}
                  height={280}
                  src={handsoil}
                  alt="Handsoil"
                  className="relative z-10 ml-10"
                />
              </div>

              {/* Card 2 */}
              <div className="rounded-xl p-4 flex flex-col items-center relative">
                {/* Rectangle Image - Positioned below */}
                <Image
                  width={200}
                  height={200}
                  src={rectangle}
                  alt="Rectangle"
                  className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
                />

                {/* Handsoil Image - Positioned above */}
                <Image
                  width={280}
                  height={280}
                  src={handsoil2}
                  alt="Handsoil 2"
                  className="relative z-10 ml-10"
                />
              </div>

              {/* Card 3 */}
              <div className="rounded-xl p-4 flex flex-col items-center relative">
                {/* Rectangle Image - Positioned below */}
                <Image
                  width={200}
                  height={200}
                  src={rectangle}
                  alt="Rectangle"
                  className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
                />

                {/* Handsoil Image - Positioned above */}
                <Image
                  width={280}
                  height={280}
                  src={handsoil3}
                  alt="Handsoil 3"
                  className="relative z-10 ml-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-[#9FA82B] ml-[765px] text-3xl font-semibold">
          Soil Conditioner
        </div>

        <div className="mt-[-50px] ml-[330px]">
          <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="rounded-xl p-4 flex flex-col items-center relative">
                {/* Rectangle Image - Positioned below */}
                <Image
                  width={200}
                  height={200}
                  src={rectangle}
                  alt="Rectangle"
                  className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
                />

                {/* Handsoil Image - Positioned above */}
                <Image
                  width={280}
                  height={280}
                  src={bottle1}
                  alt="Handsoil"
                  className="relative z-10 ml-10"
                />
              </div>

              {/* Card 2 */}
              <div className="rounded-xl p-4 flex flex-col items-center relative">
                {/* Rectangle Image - Positioned below */}
                <Image
                  width={200}
                  height={200}
                  src={rectangle}
                  alt="Rectangle"
                  className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
                />

                {/* Handsoil Image - Positioned above */}
                <Image
                  width={280}
                  height={280}
                  src={bottle2}
                  alt="Handsoil 2"
                  className="relative z-10 ml-10"
                />
              </div>

              {/* Card 3 */}
              <div className="rounded-xl p-4 flex flex-col items-center relative">
                {/* Rectangle Image - Positioned below */}
                <Image
                  width={200}
                  height={200}
                  src={rectangle}
                  alt="Rectangle"
                  className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
                />

                {/* Handsoil Image - Positioned above */}
                <Image
                  width={280}
                  height={280}
                  src={bottle3}
                  alt="Handsoil 3"
                  className="relative z-10 ml-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-[#9FA82B] ml-[800px] mt-16  text-3xl font-semibold">
          Pesticides
        </div>

        <button className="text-white mt-10 bg-[#ACB631] ml-[870px] rounded-md px-2 py-2 text-xl bottom-[50px]  transform -translate-x-1/2 font-medium">
          Know more
        </button>

        <div className="w-full px-7 mt-5">
          <div className="relative h-[1000px] bg-white border-[3px] shadow-xl border-gray-300 flex items-center justify-center text-black text-lg font-semibold">
            {/* Crop Image in the background */}

            <Image
              width={700}
              height={700}
              src={crop}
              alt=""
              className="w-full h-full object-cover"
            />

            <Image
              width={400}
              height={400}
              src={greeneryleaf}
              className="absolute mt-[-660px] w-[450px] ml-[-1400px]"
              alt=""
            />

            <Image
              width={500}
              height={500}
              src={seeds2}
              className="absolute mt-[-400px] w-[900px]"
              alt=""
            />
            <Image
              width={200}
              height={200}
              src={leaf5}
              className="absolute mt-[-820px]"
              alt=""
            />
            <div className="text-[#98A02D] text-6xl mt-[-750px] font-medium absolute">
              Agriculture
            </div>

            <Image
              width={400}
              height={400}
              src={anothergreenleaf}
              className="absolute mt-[-650px] w-[450px] h-[450px] ml-[1355px]"
              alt=""
            />

            {/* Seeds Image positioned at the bottom with a small margin on left and right */}
            <Image
              width={700}
              height={700}
              src={seeds}
              alt=""
              className="absolute -bottom-5 left-2 right-2 h-[1100px] w-full  object-cover"
            />
          </div>
        </div>

        <div className="w-full px-7 mt-5">
          <div className="relative h-[1000px] border-[3px] bg-gray-100 border-gray-200 shadow-xl flex items-center justify-center text-black text-lg font-semibold">
            <Image
              width={700}
              height={700}
              src={farmingequipment}
              className="w-full h-full mt-[150px]"
              alt=""
            />

            <Image
              width={700}
              height={700}
              src={leafy}
              className="absolute mt-[-500px] w-[2000px] h-[500px] ml-[30px]"
              alt=""
            />

            <Image
              width={200}
              height={200}
              src={leaf}
              className="absolute mt-[-500px]"
              alt=""
            />

            <div className="text-[#98A02D] mt-[-440px] absolute text-4xl">
              Farming & Gardening
            </div>

            <div className=" mt-[-340px] font-normal absolute text-2xl">
              Illustrations
            </div>

            <Image
              width={400}
              height={400}
              src={mugs}
              className="absolute w-[700px] ml-[450px]"
              alt=""
            />
            <button className="text-white bg-[#ACB631] rounded-md px-2 py-2 text-xl absolute bottom-[50px] left-[92%] transform -translate-x-1/2 font-medium">
              Know more
            </button>
          </div>
        </div>

        <Image width={200} height={100} src={leaf} alt="" />
        <div className="text-3xl font-bold mt-[-90px] ml-[115px]">
          Recommendations
        </div>

        <div className="ml-[116px] mt-[50px] text-2xl">
          New arrival | Best Selling | Most popular | On Sales | All
        </div>

        <div className="mt-[-50px]">
          <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="border-4 border-gray-200 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className=" -mb-5  px-[126px] ">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl  border-[3px] text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-200 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className="-mb-5 px-[126px] ">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl  border-[3px] text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-200 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className=" -mb-5  px-[126px] ">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl border-[3px] text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-200 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className=" -mb-5 px-[126px] ">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl  border-[3px] text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-200 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className=" -mb-5 px-[126px]">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl border-[3px] text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-200 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className=" -mb-5  px-[126px] ">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl  border-[3px] text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-200 bg-white p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className=" -mb-5 px-[126px] ">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl  border-[3px] text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-200 bg-white  p-4 flex flex-col items-center">
                <Link href="/product-detail">
                  {/* Image wrapper with gray background */}
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={banana}
                      alt="Banana"
                      className="w-48 object-cover rounded-md"
                    />
                  </div>
                </Link>

                <div className=" -mb-5  px-[126px] ">
                  <h3 className="mt-4 ml-8 text-xl font-bold text-gray-700">
                    Banana
                  </h3>

                  <button className="mt-2 text-xl  border-[3px] text-black px-4 py-2 border-[#ACB631] rounded-md">
                    Add to Cart
                  </button>

                  <p className="mt-2 ml-8 text-xl font-bold text-black">
                    ₹1000
                  </p>

                  <div className="mt-2 flex items-center space-x-1">
                    {/* Star icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M11.48 3.499a1.5 1.5 0 012.042 0l2.305 4.671 5.13.746a1.5 1.5 0 01.832 2.553l-3.71 3.614.875 5.1a1.5 1.5 0 01-2.176 1.578l-4.575-2.405-4.575 2.405a1.5 1.5 0 01-2.176-1.578l.875-5.1-3.71-3.614a1.5 1.5 0 01.832-2.553l5.13-.746 2.305-4.671z" />
                      </svg>
                    ))}
                    <div className="text-xl text-gray-600">(5)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    </>
  );
};

export default Dashboard;
