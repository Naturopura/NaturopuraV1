import Image, { StaticImageData } from "next/image";
import banana from "@/assets/banana.png";
import Link from "next/link";

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
  rating,
  link,
}: ProductProps) => (
  <>
    <div className=" bg-white border-4 border-gray-200 p-4 flex flex-col items-center text-center">
      <Link href={link}>
        <div className="w-48 h-48 flex items-center justify-center rounded-md overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </Link>

      <h3 className="mt-[-25px] text-xl font-bold text-gray-700">{title}</h3>

      <button className="mt-2 text-lg border-2 text-black px-6 py-2 border-[#ACB631] rounded-md hover:bg-[#ACB631] hover:text-white transition">
        Add to Cart
      </button>

      <p className="mt-2 text-lg font-semibold text-black">₹{price}</p>

      <div className="mt-2 flex items-center space-x-1">
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
        <div className="text-lg text-gray-600">({rating})</div>
      </div>
    </div>
  </>
);

const Recommendations = () => {
  const products = [
    {
      imageSrc: banana,
      title: "Banana",
      price: 1000,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: banana,
      title: "Apple",
      price: 800,
      rating: 4,
      link: "/product-detail",
    },
    {
      imageSrc: banana,
      title: "Orange",
      price: 600,
      rating: 4,
      link: "/product-detail",
    },
    {
      imageSrc: banana,
      title: "Strawberry",
      price: 1200,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: banana,
      title: "Strawberry",
      price: 1200,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: banana,
      title: "Strawberry",
      price: 1200,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: banana,
      title: "Strawberry",
      price: 1200,
      rating: 5,
      link: "/product-detail",
    },
    {
      imageSrc: banana,
      title: "Strawberry",
      price: 1200,
      rating: 5,
      link: "/product-detail",
    },
    // Add more products as needed
  ];

  return (
    <div className="mt-[-50px] px-6 lg:px-12 py-16 sm:py-24 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            rating={product.rating}
            link={product.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
