import lays from "@/assets/lays.jpg";
import kurkure from "@/assets/kurkure.jpg";
import wheat from "@/assets/wheat.png";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface ProductProps {
  imageSrc: StaticImageData;
  title: string;
  price: number;
  rating: number;
  link: string;
}

const ProductCard = ({
  imageSrc,
  title,
  price,
  link,
  rating,
}: ProductProps) => (
  <div className="border border-gray-300 bg-white p-4 flex flex-col items-center">
    <Link href={link}>
      <Image
        width={100}
        height={100}
        src={imageSrc}
        alt={title}
        className="h-48 object-cover rounded-md"
      />
      <h3 className="mt-4 text-xl font-bold text-gray-700">{title}</h3>
    </Link>
    <button className="mt-2 text-xl bg-white border-2 text-black px-4 py-2 border-[#ACB631] rounded-md">
      Add to Cart
    </button>
    <div className="mt-2 flex items-center space-x-1">
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
      <div className="text-xl text-gray-600">({rating})</div>
    </div>
    <p className="mt-2 text-xl font-bold text-gray-900">₹{price}</p>
  </div>
);

const ProductGrid = () => {
  const products = [
    {
      imageSrc: lays,
      title: "Lays",
      price: 1000,
      link: "/product-detail",
      rating: 5,
    },
    {
      imageSrc: kurkure,
      title: "Kurkure",
      price: 1200,
      link: "/product-detail",
      rating: 5,
    },
    {
      imageSrc: wheat,
      title: "Wheat",
      price: 800,
      link: "/product-detail",
      rating: 5,
    },
    {
      imageSrc: wheat,
      title: "Wheat",
      price: 800,
      link: "/product-detail",
      rating: 5,
    },
    {
      imageSrc: kurkure,
      title: "Kurkure",
      price: 1200,
      link: "/product-detail",
      rating: 5,
    },
    {
      imageSrc: lays,
      title: "Lays",
      price: 1000,
      link: "/product-detail",
      rating: 5,
    },
    {
      imageSrc: wheat,
      title: "Wheat",
      price: 800,
      link: "/product-detail",
      rating: 5,
    },
    {
      imageSrc: kurkure,
      title: "Kurkure",
      price: 1200,
      link: "/product-detail",
      rating: 5,
    },
    // Add more products as needed
  ];

  return (
    <div className="bg-gray-200">
      <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
