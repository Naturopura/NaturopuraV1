import Image from "next/image";
import React from "react";
import blog from "@/assets/blog.png";
import article1 from "@/assets/article1.png";
import article2 from "@/assets/article2.png";
import article3 from "@/assets/article3.png";
import arrowright from "@/assets/arrow-right 1.png";
import grass from "@/assets/grass.png";

const NewsBlog = () => {
  return (
    <>
      <div className="flex flex-col mt-[-800px] ml-[150px] items-center p-4 min-h-screen">
        <div className="w-full max-w-4xl bg-white p-8">
          {/* Header */}
          <div className="flex items-center mx-[220px] justify-between">
            <span className="text-xl font-medium text-white h-full px-7 py-3 rounded-lg bg-[#7FA200]">
              Popular News
            </span>
            <span className="text-xl font-medium text-black">
              October 31, 2024
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mt-12">
            Best Strategy to Achieve
            <br />
            Profitable Harvest
          </h1>

          {/* Subtitle */}
          <p className="text-black text-xl font-normal text-center mt-10">
            Optimal Strategies for achieving profitable harvest involve a
            <br />
            comprehensive approach to farm management,
            <br /> selection of appropriate crop varieties.
          </p>

          {/* Image */}
          <div className="my-10">
            <Image
              width={500}
              height={500}
              src={blog} // Replace with the actual image URL
              alt="Harvest"
              className="w-full"
            />
          </div>

          {/* Section Title */}
          <h2 className="text-2xl font-semibold mt-4">
            Achieve a profitable harvest
          </h2>

          {/* Content */}
          <p className="text-gray-600 font-medium text-xl mt-10">
            Achieving a profitable harvest involves a series of strategic steps
            that include selecting plant varieties that suit environmental
            conditions, efficient crop management, use of appropriate
            agricultural technology, choosing optimal harvest times, as well as
            effective marketing and distribution strategies to increase the
            selling value of the harvest.
            <br />
            <div className="mt-12">
              We have a way to achieve profitable harvests for farmers and
              agricultural actors through a holistic approach, including
              selecting the right plant varieties,efficient crop management,
              application of the latest agricultural technology, choosing
              optimal harvest times, and effective marketing and distribution
              strategies.
            </div>
          </p>

          <h2 className="text-2xl font-semibold mt-10">
            1. Selection of right varieties and seeds
          </h2>

          <p className="text-gray-600 font-medium text-xl mt-5">
            Selecting the right varieties and seeds is a key step in achieving a
            successful harvest. This includes in-depth research into varieties
            suited to environmental, climate, and soil conditions, as well as
            selecting high-quality seeds that can provide optimal results. By
            paying attention to these factors, farmers can increase their
            chances of achieving a profitable harvest.
          </p>

          <h2 className="text-2xl font-semibold mt-10">
            2.Efficient crop management
          </h2>

          <p className="text-gray-600 font-medium text-xl mt-5">
            Efficient plant management involves regular plant maintenance,
            application of appropriate fertilizer according to plant needs,
            effective pest and disease control, and regular monitoring of plant
            growth and health. By managing crops well, farmers can increase the
            productivity, quality, and profits of their crops.
          </p>

          <h2 className="text-2xl font-semibold mt-10">
            3.Use of Agricultural Technology
          </h2>

          <p className="text-gray-600 font-medium text-xl mt-5">
            Utlization of agricultural technology involves the use of various
            advanced tools and technologies such as soil sensors, automatic
            irigation systems, agricultural management software applications,
            and other technologies that can incrUtlization of agricultural
            technology involves the use of various advanced tools and
            technologies such as soil sensors, automatic irigation systems,
            agricultural management software applications, and other
            technologies that can increase efficiency in agricultural
            processes.ease efficiency in agricultural processes.
          </p>

          <h2 className="text-2xl font-semibold mt-10">
            4.Choosing the right harvest time
          </h2>

          <p className="text-gray-600 font-medium text-xl mt-5">
            Utlization of agricultural technology involves the use of various
            advanced tools and technologies such as soil sensors, automatic
            irigation systems, agricultural management software applications,
            and other technologies that can increase efficiency in agricultural
            processes.
          </p>

          <h2 className="text-2xl font-semibold ml-[-412px] mt-10">
            Related Articles
          </h2>
        </div>
      </div>
      <div className="min-h-screen">
        <div className="container mx-auto py-8 px-4">
          {/* Article Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                width={400}
                height={400}
                className="h-48 w-full object-cover"
                src={article1}
                alt="Garden produce"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm">October 31, 2024</p>
                <h2 className="text-lg font-semibold mt-2">
                  Achieving High Productivity From Your Own Home Garden
                </h2>
                <p className="text-gray-700 mt-2">
                  A practical guide to achieving satisfactory results from
                  plants grown in your home
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                width={400}
                height={400}
                className="h-48 w-full object-cover"
                src={article2}
                alt="Planting seeds"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm">October 31, 2024</p>
                <h2 className="text-lg font-semibold mt-2">
                  Achieving High Productivity From Your Own Home Garden
                </h2>
                <p className="text-gray-700 mt-2">
                  A practical guide to achieving satisfactory results from
                  plants grown in your home
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                width={400}
                height={400}
                className="h-48 w-full object-cover"
                src={article3}
                alt="Sustainable agriculture"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm">October 31, 2024</p>
                <h2 className="text-lg font-semibold mt-2">
                  Achieving High Productivity From Your Own Home Garden
                </h2>
                <p className="text-gray-700 mt-2">
                  A practical guide to achieving satisfactory results from
                  plants grown in your home
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grass Image with Overlay Section */}
        <div className="relative py-10 mx-10 mt-10">
          <Image
            width={700}
            height={700}
            src={grass}
            className="w-full h-auto"
            alt="Grass background"
          />

          <div className="absolute mt-[-80px] inset-0 flex flex-col items-center justify-center text-black">
            <h2 className="text-4xl  font-semibold">
              Get Involved In Agricultural Uprising
            </h2>
            <div className="mt-48 flex justify-center">
              <input
                type="email"
                placeholder="Type your email address"
                className="p-2 w-[750px] h-[75px] placeholder:font-medium placeholder:text-2xl placeholder:text-black rounded-2xl focus:outline-none"
              />
              <button className="bg-[#7FA200] my-[6px] text-2xl -ml-[165px] text-black font-semibold p-2 rounded-xl flex items-center">
                <span>Join Now</span>
                <Image
                  width={100}
                  height={100}
                  src={arrowright}
                  alt="Arrow"
                  className="w-8 h-8 ml-2"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsBlog;
