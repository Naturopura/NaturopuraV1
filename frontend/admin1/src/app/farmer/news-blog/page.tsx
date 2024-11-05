import Sidebar from "@/app/(components)/Sidebar/sidebar";
import Image from "next/image";
import React from "react";
import blog from "@/assets/blog.png";

const NewsBlog = () => {
  return (
    <>
      <Sidebar />
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
        </div>
      </div>
    </>
  );
};

export default NewsBlog;
