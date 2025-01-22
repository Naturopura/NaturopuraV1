import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useGetCategoryQuery } from "@/state/userApi";
import juices from "@/assets/premium_photo-1676642614338-e751f7b69ca1.jpg";
import milks from "@/assets/photo-1634141510639-d691d86f47be.jpg";
import fruits from "@/assets/premium_photo-1692878409087-b8169b673495.jpg";

const productCategories = [
  {
    title: "Fresh Juices",
    image: juices,
    category: "Juices",
  },
  {
    title: "Fresh Fruits",
    image: fruits,
    category: "Fruits",
  },
  {
    title: "Fresh Milks",
    image: milks,
    category: "Milks",
  },
];

const NewArrivals = () => {
  const { data, isLoading, isError } = useGetCategoryQuery();
  console.log("Categories Data:", data?.data);
  console.log("isLoading:", isLoading);
  console.log("isError:", isError);

  return (
    <section className="px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between">
      {/* Heading Section */}
      <div className="mb-72">
        <h2 className="text-2xl font-bold mb-2">New Arrivals</h2>
        <p className="text-gray-600 font-medium mb-4">
          Easiest way to healthy life by buying your favorite Food.
        </p>
        <button className="bg-[#7FA200] text-gray-800 font-semibold px-4 py-2 rounded-lg flex items-center space-x-2">
          <span>See more</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 -mx-[1.8rem]">
        {productCategories.map(({ image, category, title }) => {
          // Filter categories based on product category
          const filteredCategories =
            data?.data?.filter((cat) => cat.name === category) || [];

          return filteredCategories.map((filteredCategory) => (
            <div key={filteredCategory._id} className="p-4 hover:opacity-70">
              <Link href={`/products/${filteredCategory._id}`}>
                <Image
                  width={3000}
                  height={4500}
                  src={image}
                  alt={title}
                  className="rounded-lg h-[24rem] w-[24rem] object-cover mb-4"
                />
                <p className="text-left font-semibold">{title}</p>
              </Link>
            </div>
          ));
        })}
      </div>
    </section>
  );
};

export default NewArrivals;
