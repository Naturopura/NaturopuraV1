import React from "react";

interface Product {
  id: number;
  name: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Protective Sensor",  image: "https://images.pexels.com/photos/27505236/pexels-photo-27505236.jpeg" },
  { id: 2, name: "Equipment",  image: "https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg" },
  { id: 3, name: "Fertilizer", image: "https://images.pexels.com/photos/17903068/pexels-photo-17903068.jpeg" },
];

const TrendingProducts: React.FC = () => {
  return (
    <div className="w-full py-6">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xl font-bold mb-4 text-center">Trending Products</h2>
        <div className="flex justify-center">
          <div
            className="flex gap-6 overflow-x-auto scrollbar-hide justify-center"
            style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
          >
            {products.map((prod) => (
              <div
                key={prod.id}
                className="min-w-[200px] bg-white shadow rounded-lg p-4"
                style={{ scrollSnapAlign: "start" }}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="h-40 w-full object-cover rounded-md"
                />
                <h3 className="mt-2 font-medium">{prod.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
