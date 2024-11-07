import Link from "next/link";
import React from "react";

const ProductCategoryLists = () => {
  return (
    <div>
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
    </div>
  );
};

export default ProductCategoryLists;
