import React from "react";
import Navbar from "../components/home/Navbar";
import HeroCarousel from "../components/home/Hero";
import CategoryGrid from "../components/home/CategoryGrid";
import TrendingProducts from "../components/home/TrendingProducts";
import Footer from "../components/home/Footer";
import ScrollingShowcase from "../components/home/ScrollingShowcase";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <ScrollingShowcase/>
      <CategoryGrid />
      <TrendingProducts />
      <Footer />
    </>
  );
};

export default Home;
