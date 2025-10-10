import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import LazyImage from '../ui/LazyImage';

interface Category {
  slug: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  {
    slug: "cereals_grains",
    name: "Cereals & Grains",
    image: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg",
  },
  {
    slug: "pulses_legumes",
    name: "Pulses & Legumes",
    image: "https://images.pexels.com/photos/3735170/pexels-photo-3735170.jpeg",
  },
  {
    slug: "oilseeds",
    name: "Oilseeds",
    image:
      "https://images.pexels.com/photos/33381314/pexels-photo-33381314.jpeg",
  },
  {
    slug: "fiber_crops",
    name: "Fiber Crops",
    image: "https://images.pexels.com/photos/7420868/pexels-photo-7420868.jpeg",
  },
  {
    slug: "sugar_crops",
    name: "Sugar Crops",
    image: "https://images.pexels.com/photos/7457175/pexels-photo-7457175.jpeg",
  },
  {
    slug: "vegetables",
    name: "Vegetables",
    image: "https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg",
  },
  {
    slug: "fruits",
    name: "Fruits",
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg",
  },
  {
    slug: "beverage_crops",
    name: "Beverage Crops",
    image: "https://images.pexels.com/photos/1933370/pexels-photo-1933370.jpeg",
  },
  {
    slug: "cultivated_fungi",
    name: "Cultivated Fungi",
    image: "https://images.pexels.com/photos/168140/pexels-photo-168140.jpeg",
  },
  {
    slug: "aquaculture",
    name: "Aquaculture",
    image:
      "https://images.pexels.com/photos/32444024/pexels-photo-32444024.jpeg",
  },
  {
    slug: "farmed_animals",
    name: "Farmed Animals",
    image: "https://images.pexels.com/photos/2446695/pexels-photo-2446695.jpeg",
  },
  {
    slug: "other",
    name: "Other",
    image:
      "https://images.pexels.com/photos/31673795/pexels-photo-31673795.jpeg",
  },
];

const CategoryGrid: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the URL has a hash fragment
    if (window.location.hash === "#categories-section") {
      // Find the element with the matching ID
      const element = document.getElementById("categories-section");
      if (element) {
        // Smooth scroll to the element
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div id="categories-section" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-naturopura-gradient py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

        {/* The corrected section: wrapped in a single container */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Explore The
            <span className="block  text-black mt-2 ">
              Categories
            </span>
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover premium agricultural products across diverse categories with
            real-time updates
          </p>
        </div>
      </div>
      {/* Main Content */}
      <div  className="max-w-7xl mx-auto px-4 py-16">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((cat: Category, index) => (
            <div
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200">
                             

                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <LazyImage
                    src={cat.image}
                    alt={cat.name}
                    className="transform transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Hover content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button
                      type="button"
                      className="bg-naturopura-gradient text-white px-6 py-3 rounded-full font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      View Products
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#b0c632] transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-naturopura-gradient h-1 rounded-full transition-all duration-1000 group-hover:w-full"
                        style={{ width: `${Math.random() * 60 + 40}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-naturopura-gradient text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <button onClick={() => navigate("/marketplace/buy-sell")}>
              Explore All Categories Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;