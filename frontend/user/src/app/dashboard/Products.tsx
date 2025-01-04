import Image, { StaticImageData } from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import frenchbread from "@/assets/f43f22141721ffb88047ba1420cf8314.png";
import donut from "@/assets/a3edea62bac0da6c4317943df7c98841.png";
import dryfruits from "@/assets/66a79465470c73b7a3fb25b6e1d48ff8.png";

interface Product {
  id: number;
  name: string;
  image: StaticImageData;
  price: string;
  discountedPrice: string;
  discount: string;
  reviews: number;
  rating: string;
  imageWidth: number;
  imageHeight: number;
  imageClass: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "French Bread",
    image: frenchbread,
    price: "$10.00",
    discountedPrice: "$9.00",
    discount: "-10%",
    reviews: 97,
    rating: "★★★★☆",
    imageWidth: 447,
    imageHeight: 559,
    imageClass: "w-60 h-56",
  },
  {
    id: 2,
    name: "Dozen Donut Holes",
    image: donut,
    price: "$10.00",
    discountedPrice: "$9.00",
    discount: "-10%",
    reviews: 97,
    rating: "★★★★☆",
    imageWidth: 300,
    imageHeight: 300,
    imageClass: "w-48 h-56",
  },
  {
    id: 3,
    name: "Packaged Dry Fruits",
    image: dryfruits,
    price: "$10.00",
    discountedPrice: "$9.00",
    discount: "-10%",
    reviews: 97,
    rating: "★★★★☆",
    imageWidth: 612,
    imageHeight: 408,
    imageClass: "w-72 h-56",
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <div className="bg-[rgba(240,246,246,1)] rounded-3xl p-4 flex flex-col">
    <div className={`flex items-start mb-10 ml-14 ${product.imageClass}`}>
      <Image
        width={product.imageWidth}
        height={product.imageHeight}
        src={product.image}
        alt={product.name}
        className="object-cover"
      />
    </div>
    <h3 className="text-gray-800 text-xl font-semibold">{product.name}</h3>
    <div className="flex items-center text-2xl mb-2">
      <div className="flex">{product.rating}</div>
      <span className="ml-2 text-xl">{product.reviews} reviews</span>
    </div>
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-gray-500 line-through">{product.price}</span>
      <span className="text-green-500">{product.discount}</span>
    </div>
    <div className="flex justify-between items-center mt-auto">
      <div className="text-xl font-bold text-gray-900">
        {product.discountedPrice}
      </div>
      <button className="w-16 h-16 bg-[#7FA200] rounded-2xl flex items-center justify-center hover:bg-blue-600">
        <FiShoppingCart size={24} color="white" className="mr-1 w-8 h-8" />
      </button>
    </div>
  </div>
);

const Products = () => {
  return (
    <div className="min-h-screen px-5 py-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 my-5 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-[rgba(193,220,220,1)] font-semibold text-gray-800 rounded-lg py-2 px-4">
          View all →
        </button>
      </div>
    </div>
  );
};

export default Products;
