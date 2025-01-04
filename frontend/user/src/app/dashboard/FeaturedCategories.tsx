import Image from "next/image";
import React from "react";
import bakery from "@/assets/20353b41b309b6e66e7ead8438746fdb.jpg";
import beverage from "@/assets/pexels-fotios-photos-109275.jpg";
import freshvegetables from "@/assets/vegetables-fresh.jpg";

const FeaturedCategories = () => {
  return (
    // <div>
    //   <div className="-mt-[7.5rem] ml-[3px]">
    //     <Image
    //       width={100}
    //       height={100}
    //       src={leaf}
    //       alt=""
    //       className="ml-[-2px]"
    //     />
    //     <div className="text-2xl text-gray-900 font-bold ml-[3.875rem] -mt-[3.25rem]">
    //       Food Cupboard
    //     </div>
    //     <div className="flex items-center justify-center min-h-screen">
    //       <div className="w-[96vw] -mt-[1.5625rem] h-[90vh] bg-white relative">
    //         <Image
    //           width={600}
    //           height={600}
    //           src={snacks}
    //           alt="Snacks"
    //           className="w-full h-full object-cover"
    //         />
    //         <div className="absolute -ml-[46.875rem] inset-0 flex flex-col items-center justify-center space-y-4 ">
    //           <h1 className="text-4xl font-bold text-black">
    //             Sweet <span className="text-[#ACB631]">Snacks</span> &{" "}
    //             <span className="text-[#ACB631]">Nuts</span> Recipes
    //           </h1>
    //           <p className="text-black text-3xl">Healthy Recipes</p>
    //           <Link href={"/sweets-snacks"}>
    //             <button className="text-white text-xl -ml-5 bg-[#ACB631] font-medium rounded-lg text-md px-12 py-3 mt-4">
    //               Shop now
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex items-center justify-center min-h-screen">
    //     <div className="w-[96vw] -mt-[7.1875rem] ml-[2px] h-[90vh] bg-white relative">
    //       <Image
    //         width={600}
    //         height={600}
    //         src={snacks2}
    //         alt="Snacks"
    //         className="w-full h-full object-cover"
    //       />

    //       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 -mt-5 -ml-[25rem]">
    //         <h1 className="text-4xl font-bold text-[#ACB631]">
    //           Snacks <span className="text-black">For Your</span>
    //           <span className="text-black ml-3">Summer</span>{" "}
    //           <span className="text-[#ACB631]">Party</span>
    //         </h1>
    //         <p className="text-3xl text-black">Healthy Recipes</p>
    //       </div>
    //       <Link href={"/sweets-snacks"}>
    //         <button
    //           className="absolute bottom-10 right-10 text-white text-xl bg-[#ACB631]
    //            focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50  font-medium rounded-lg
    //            text-md px-12 py-3"
    //         >
    //           Shop now
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2">Featured Categories</h2>
      <p className="text-gray-600 mb-8 font-medium">
        Find what you are looking for
      </p>

      <div className="py-12 -mx-4 my-9 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-8 px-4 bg-[rgba(193,220,220,1)] md:px-0">
        {/* Fresh Vegetables Card */}
        <div className="overflow-hidden ml-14">
          <Image
            width={1920}
            height={1080}
            src={freshvegetables}
            alt="Fresh Vegetables"
            className="w-80 h-[28rem] object-cover rounded-lg"
          />
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg mr-12">Fresh Vegetables</h3>
          </div>
        </div>

        {/* Bakery Card */}
        <div className="overflow-hidden ml-12">
          <Image
            width={682}
            height={1023}
            src={bakery}
            alt="Bakery"
            className="w-80 h-[28rem] object-cover rounded-lg"
          />
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg mr-8">Bakery</h3>
          </div>
        </div>

        {/* Beverages Card */}
        <div className="overflow-hidden ml-10">
          <Image
            width={5795}
            height={3797}
            src={beverage}
            alt="Beverages"
            className="w-80 h-[28rem] object-cover rounded-lg"
          />
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg mr-7">Beverages</h3>
          </div>
        </div>

        {/* Description and Explore Button */}
        <div className="col-span-1 md:col-span-3 text-center mt-3">
          <p className="text-gray-500 font-semibold px-6 md:px-32">
            Our product categories feature fresh vegetables, delicious bakery
            items, and refreshing beverages, all carefully selected to enhance
            your daily meals. From farm-fresh produce to freshly baked goods and
            thirst-quenching drinks, we have everything you need. Explore our
            offerings today and discover a variety of flavors to suit your
            taste. Don’t miss out—browse through our selection now!
          </p>
          <button className="mt-6 ml-3 px-6 py-2 bg-white font-semibold rounded-lg transition">
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
