import Link from "next/link";

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

const ProductCategoryList = () => (
  <div className="container ml-[2.25rem] -mt-[3.125rem]">
    <div className="flex justify-between w-full">
      {categories.map((column, index) => (
        <div key={index} className={`space-y-6 ${index === 1 ? "mx-20" : ""}`}>
          {column.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-2xl leading-6 text-black font-bold block"
            >
              {label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default ProductCategoryList;
