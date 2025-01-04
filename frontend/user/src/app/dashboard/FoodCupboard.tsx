import Image from "next/image";
import Link from "next/link";
import foodcupboard from "@/assets/99cf8c18eb8e4d0536f71dbf3d17c532.jpg";

const categories = [
  [
    { href: "/crisps-snacks-nuts", label: "Crisps, Snacks, and Nuts" },
    { href: "/breakfast", label: "Breakfast" },
    { href: "/tins-cans", label: "Tins & Cans" },
    { href: "/chocolates-sweets", label: "Chocolates & Sweets" },
  ],
  [
    { href: "/biscuits", label: "Biscuits" },
    { href: "/rice", label: "Rice" },
    { href: "/pasta-pulses", label: "Pasta & Pulses" },
    { href: "/cooking-sauces", label: "Cooking Sauces" },
  ],
  [
    { href: "/cooking-ingredients", label: "Cooking Ingredients" },
    { href: "/honey-spreads", label: "Honey & Spreads" },
    { href: "/savoury-snacks", label: "Savoury Snacks" },
    { href: "/crackers", label: "Crackers" },
  ],
];

const FoodCupboard = () => (
  // <div className="container ml-[2.25rem] -mt-[3.125rem]">
  //   <div className="flex justify-between w-full">
  //     {categories.map((column, index) => (
  //       <div key={index} className={`space-y-6 ${index === 1 ? "mx-20" : ""}`}>
  //         {column.map(({ href, label }) => (
  //           <Link
  //             key={href}
  //             href={href}
  //             className="text-2xl leading-6 text-black font-bold block"
  //           >
  //             {label}
  //           </Link>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // </div>

  <section className="container mx-auto px-8 md:px-16 py-12">
    {/* Title and Subtitle */}
    <div className="text-center mb-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Food Cupboard</h2>
      <p className="text-gray-500 text-base font-medium">
        Find what you are looking for
      </p>
    </div>

    {/* Grid Section */}
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Left Side: Image */}
      <div className="flex justify-center">
        <Image
          src={foodcupboard} // Replace with your actual image path
          alt="Food Cupboard"
          width={1016}
          height={1524}
          className="rounded-2xl object-cover w-1/2  h-full"
        />
      </div>

      {/* Right Side: Content */}
      <div className="flex flex-col">
        {/* Bold Text */}
        <div className="flex flex-col justify-center mb-6">
          <p className="font-bold text-xl text-gray-900 mb-4 ml-10">
            Sweet <span className="text-[rgba(5,100,53,1)]">Snacks</span> &{" "}
            <span className="text-[rgba(5,100,53,1)]">Nuts</span> Recipes (
            <span className="text-[rgba(5,100,53,1)]">Healthy</span> Recipes)
          </p>
          <p className="text-gray-500 mb-6 text-lg leading-relaxed">
            Stock your pantry with essentials from our Food Cupboard section.
            From grains and spices to oils and sauces, find everything you need
            to create delicious meals. Perfect for everyday cooking or special
            recipes, we’ve got your kitchen covered!
          </p>
        </div>

        {/* List */}
        <div className="grid grid-cols-2 gap-x-6 text-gray-500 font-semibold text-xl">
          <ul className="space-y-2">
            <li>→ Crisps, Snacks and nuts</li>
            <li>→ Breakfast</li>
            <li>→ Tins and cans</li>
            <li>→ Chocolate & Sweets</li>
            <li>→ Biscuits</li>
            <li>→ Rice</li>
            <li>→ Pasta & pulse</li>
          </ul>
          <ul className="space-y-2">
            <li>→ Cooking Sauces</li>
            <li>→ Cooking Ingredients</li>
            <li>→ Honey & Spreads</li>
            <li>→ Savoury snacks</li>
            <li>→ Crackers</li>
            <li>
              <button className="px-6 mt-4 text-black py-2 bg-[#7FA200] font-semibold rounded-lg transition">
                View all →
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default FoodCupboard;
