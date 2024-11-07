import Link from "next/link";
import React from "react";

const ProductCategoryList = () => {
  return (
    <div>
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
    </div>
  );
};

export default ProductCategoryList;
