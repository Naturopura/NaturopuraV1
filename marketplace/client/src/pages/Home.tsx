import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/home/Navbar";
import HeroCarousel from "../components/home/Hero";
import CategoryGrid from "../components/home/CategoryGrid";
import TrendingProducts from "../components/home/TrendingProducts";
import Footer from "../components/home/Footer";
import ScrollingShowcase from "../components/home/ScrollingShowcase";

const Home: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/marketplace/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // or a message, but since redirecting, null is fine
  }

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
