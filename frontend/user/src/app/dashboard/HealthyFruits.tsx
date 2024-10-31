import Image, { StaticImageData } from "next/image";
import banana from "@/assets/banana.png";
import Link from "next/link";

interface ProductProps {
  imageSrc: StaticImageData;
  name: string;
  price: number;
  rating: number;
  link: string;
}

// Sample product data array
const products = [
  {
    id: 1,
    name: "Banana",
    price: 1000,
    rating: 5,
    imageSrc: banana,
    link: "/product-detail",
  },
  {
    id: 1,
    name: "Banana",
    price: 1000,
    rating: 5,
    imageSrc: banana,
    link: "/product-detail",
  },
  {
    id: 1,
    name: "Banana",
    price: 1000,
    rating: 5,
    imageSrc: banana,
    link: "/product-detail",
  },
  {
    id: 1,
    name: "Banana",
    price: 1000,
    rating: 5,
    imageSrc: banana,
    link: "/product-detail",
  },
  {
    id: 1,
    name: "Banana",
    price: 1000,
    rating: 5,
    imageSrc: banana,
    link: "/product-detail",
  },
  {
    id: 1,
    name: "Banana",
    price: 1000,
    rating: 5,
    imageSrc: banana,
    link: "/product-detail",
  },
  {
    id: 1,
    name: "Banana",
    price: 1000,
    rating: 5,
    imageSrc: banana,
    link: "/product-detail",
  },
  {
    id: 1,
    name: "Banana",
    price: 1000,
    rating: 5,
    imageSrc: banana,
    link: "/product-detail",
  },
  // Add more products as needed
];

// Reusable ProductCard component
// eslint-disable-next-line react/prop-types
const ProductCard = ({ name, price, rating, imageSrc, link }: ProductProps) => {
  return (
    <div className="border-4 border-gray-300 bg-gray-200 p-4 flex flex-col items-center">
      <Link href={link}>
        <div className="">
          <Image
            width={100}
            height={100}
            src={imageSrc}
            alt={name}
            className="w-48 object-cover rounded-md"
          />
        </div>
      </Link>

      <div className="border-[#ACB631] w-[400px] -mb-5 border-2 px-6 sm:px-8 lg:px-12 bg-white text-center">
        <h3 className="mt-4 text-xl font-bold text-gray-700">{name}</h3>

        <button className="mt-2 text-lg bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md transition">
          Add to Cart
        </button>

        <p className="mt-2 text-lg font-bold text-black">₹{price}</p>

        <div className="mt-2 flex items-center justify-center space-x-1">
          {[...Array(rating)].map((_, i) => (
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
          <span className="text-lg text-gray-600">({rating})</span>
        </div>
      </div>
    </div>
  );
};

const HealthyFruits = () => {
  return (
    <div className="mt-[-50px]">
      <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              imageSrc={product.imageSrc}
              link={product.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthyFruits;
