import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ShieldCheck, ShoppingCart, ArrowRight, Leaf, Sprout } from "lucide-react";
import { motion} from "framer-motion";
import AnimatedCounter from '../components/home/AnimatedCounter';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import FloatingParticles from '../components/home/FloatingParticles';
import InteractiveMap from '../components/home/InteractiveMap';

const Index = () => {
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
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };
  
  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px -5px rgba(59, 130, 246, 0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      transition: { duration: 0.3 }
    }
  };

  const stats = [
    { value: 50, suffix: "K+", label: "Farmers" },
    { value: 100, suffix: "Cr+", label: "Transactions" },
    { value: 15, suffix: "+", label: "States" },
    { value: 98, suffix: "%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen w-full bg-center bg-cover bg-no-repeat flex flex-col items-center overflow-hidden relative">
      <FloatingParticles />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Hero Section */}
      <motion.div 
        className="w-full flex items-center justify-center min-h-screen px-4 py-20 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="max-w-6xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <span className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-full text-sm font-medium text-blue-700 border border-blue-300/50 shadow-lg">
              🌟 A Quotus Innovation
            </span>
          </motion.div>

          <motion.h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8"
            variants={itemVariants}
          >
            <span className="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">Naturopura</span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-gray-700 mb-8 font-light leading-relaxed"
            variants={itemVariants}
          >
            Empowering Farmers Through
            <span className="text-green-600 font-semibold"> Digital Innovation</span>
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A revolutionary platform connecting farmers with technology, resources, and markets for sustainable agriculture
          </motion.p>
          
          {/* Enhanced Main CTAs Container */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                <Link 
                  to="/login" 
                  className="relative px-10 py-5 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-2xl transition-all duration-300 text-lg shadow-2xl flex items-center justify-center group min-w-[200px]"
                >
                  🚀 Login to Account
                  <ArrowRight className="ml-3 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                <Link 
                  to="/register" 
                  className="relative px-10 py-5 bg-white/80 hover:bg-white/90 backdrop-blur-md text-gray-700 font-semibold rounded-2xl transition-all duration-300 text-lg border border-gray-200 shadow-2xl flex items-center justify-center group min-w-[200px]"
                >
                  ✨ Register Now
                  <ArrowRight className="ml-3 w-5 h-5 opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Enhanced Secondary CTAs */}
            <motion.div
              className="flex flex-col lg:flex-row gap-4 justify-center items-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full lg:w-auto relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
                <Link
                  to="/delivery-partner/register"
                  className="relative px-8 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 backdrop-blur-md text-cyan-700 font-semibold rounded-2xl border border-cyan-200 shadow-xl transition-all duration-300 text-base flex items-center justify-center group min-h-[60px]"
                >
                  <div className="flex items-center">
                    <span className="text-center">🚚 Delivery Partner Register</span>
                    <ArrowRight className="ml-3 w-4 h-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full lg:w-auto relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400/30 to-rose-400/30 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
                <Link
                  to="/store-manager/register"
                  className="relative px-8 py-4 bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 backdrop-blur-md text-pink-700 font-semibold rounded-2xl border border-pink-200 shadow-xl transition-all duration-300 text-base flex items-center justify-center group min-h-[60px]"
                >
                  <div className="flex items-center">
                    <span className="text-center">🏪 Store Manager Register</span>
                    <ArrowRight className="ml-3 w-4 h-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Section with Animated Counters */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/50 relative group overflow-hidden shadow-lg"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.3)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" as const }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce p-3 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className="w-full bg-white/40 backdrop-blur-md py-24 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <TestimonialsCarousel />
      </motion.div>

      {/* Interactive Map Section */}
      <motion.div 
        className="w-full bg-gradient-to-br from-blue-50/80 to-green-50/80 backdrop-blur-md py-24 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <InteractiveMap />
      </motion.div>

      {/* Enhanced Features Section */}
      <motion.div 
        className="w-full bg-white/40 backdrop-blur-md py-24 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center mb-20"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 text-transparent bg-clip-text">
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
                borderColor: "border-blue-200"
              },
              {
                icon: <Leaf size={48} className="text-green-500" />,
                title: "Financial Services",
                description: "Access loans, insurance, and government subsidies seamlessly",
                color: "from-green-500/10 to-emerald-500/10",
                borderColor: "border-green-200"
              },
              {
                icon: <ShoppingCart size={48} className="text-purple-500" />,
                title: "Marketplace",
                description: "Direct buyer-seller connections with AI-based price recommendations",
                color: "from-purple-500/10 to-pink-500/10",
                borderColor: "border-purple-200"
              },
              {
                icon: <Sprout size={48} className="text-orange-500" />,
                title: "Smart Farming",
                description: "IoT-powered monitoring and early warning systems",
                color: "from-orange-500/10 to-yellow-500/10",
                borderColor: "border-orange-200"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className={`bg-white/60 backdrop-blur-sm p-10 rounded-3xl border ${feature.borderColor} flex flex-col items-center text-center transition-all cursor-pointer relative group overflow-hidden shadow-lg`}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="rounded-3xl bg-white/80 p-6 mb-8 group-hover:bg-white/90 transition-colors duration-300 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group inline-block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              <Link 
                to="/register" 
                className="relative px-12 py-5 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-2xl transition-all duration-300 text-lg shadow-2xl inline-flex items-center group"
              >
                🎉 Join Naturopura Today
                <ArrowRight className="ml-3 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced Footer */}
      <motion.footer 
        className="w-full bg-white/50 backdrop-blur-md py-12 px-4 relative z-10 border-t border-white/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-lg">&copy; 2025 Naturopura by Quotus. Transforming agriculture through technology. 🌱</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;