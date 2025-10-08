import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ShoppingCart,
  ArrowRight,
  Leaf,
  Sprout,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/home/Navbar";
import TestimonialsCarousel from "../../components/home/TestimonialsCarousel";
import InteractiveMap from "../../components/home/InteractiveMap";
import HeroVisual from "../../components/home/HeroVisual";


const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

 

 

  return (
    <div className="min-h-screen w-full bg-center bg-cover bg-no-repeat flex flex-col overflow-hidden relative">
      <Navbar />

      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10 pt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Main Heading */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-naturopura-gradient">
                  Naturopura
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                The complete digital ecosystem for modern agriculture. Connect,
                trade, and grow with confidence.
              </p>
            </motion.div>

            {/* Key Features Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={itemVariants}
            >
              {[
                {
                  icon: "🌾",
                  title: "Smart Trading",
                  desc: "AI-powered marketplace",
                },
                {
                  icon: "💰",
                  title: "Instant Payments",
                  desc: "Secure digital transactions",
                },
                {
                  icon: "📊",
                  title: "Real-time Analytics",
                  desc: "Market insights & trends",
                },
                {
                  icon: "🛡️",
                  title: "Verified Network",
                  desc: "Trusted farmer community",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="px-8 py-4 bg-naturopura-gradient text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl group"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md group"
                >
                  Join Network
                  <ArrowRight className="ml-2 w-4 h-4 opacity-0 transform transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            className="lg:h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="w-full bg-white/40 backdrop-blur-md py-16 px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="w-full bg-gradient-to-br from-blue-50/80 to-green-50/80 backdrop-blur-md py-24 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <TestimonialsCarousel />
      </motion.section>

      {/* Interactive Map Section */}
      <motion.section
        className="w-full bg-white/40 backdrop-blur-md py-24 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <InteractiveMap />
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="w-full bg-gradient-to-br from-gray-50/80 to-blue-50/80 backdrop-blur-md py-24 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-naturopura-gradient">
              Why Choose Naturopura
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <ShieldCheck size={48} className="text-blue-500" />,
                title: "Identity Verification",
                description: "Secure digital onboarding with eKYC and blockchain-based verification",
                color: "from-blue-500/10 to-cyan-500/10",
                borderColor: "border-blue-200",
                id: "identity",
                link: "/feature/identity",
              },
              {
                icon: <Leaf size={48} className="text-green-500" />,
                title: "Financial Services",
                description: "Access loans, insurance, and government subsidies seamlessly",
                color: "from-green-500/10 to-emerald-500/10",
                borderColor: "border-green-200",
                id: "finance",
                link: "/feature/finance",
              },
              {
                icon: <ShoppingCart size={48} className="text-purple-500" />,
                title: "Marketplace",
                description: "Direct buyer-seller connections with AI-based price recommendations",
                color: "from-purple-500/10 to-pink-500/10",
                borderColor: "border-purple-200",
                id: "marketplace",
                link: "/feature/marketplace",
              },
              {
                icon: <Sprout size={48} className="text-orange-500" />,
                title: "Smart Farming",
                description: "IoT-powered monitoring and early warning systems",
                color: "from-orange-500/10 to-yellow-500/10",
                borderColor: "border-orange-200",
                id: "smartfarming",
                link: "/feature/smartfarming",
              },
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className={`bg-white/60 backdrop-blur-sm p-8 rounded-3xl border ${feature.borderColor} flex flex-col items-center text-center transition-all cursor-pointer relative group overflow-hidden shadow-lg hover:scale-105`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative">
                  <div className="rounded-3xl bg-white/80 p-4 mb-6 group-hover:bg-white/90 transition-colors duration-300 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="w-full bg-white/50 backdrop-blur-md py-12 px-4 relative z-10 border-t border-white/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-lg">
            &copy; 2025 Naturopura by Quotus. Transforming agriculture through
            technology. 🌱
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
