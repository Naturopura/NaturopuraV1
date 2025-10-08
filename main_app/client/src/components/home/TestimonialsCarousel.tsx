import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Tusar Mohapatra",
    location: "Punjab",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQEUGYWM3-BLJg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1671088385192?e=1759363200&v=beta&t=1BagTXSwFoUsDmcTI_kAV01pkdm7OCD1DsYwYGXxiOY",
    text: "Naturopura helped me get better prices for my wheat crop and access to micro-loans for new equipment.",
    rating: 5,
    crop: "Wheat Farmer"
  },
  {
    name: "Sipul Nayak",
    location: "Maharashtra", 
    image: "https://media.licdn.com/dms/image/v2/D5603AQErK0KoExcJcg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728285518633?e=1759363200&v=beta&t=dq62ywelm0pwesVlI2F7EvpbuS6_490JvrVxmOFIOMk",
    text: "The IoT monitoring system saved my cotton crop from pest damage. Amazing technology made simple!",
    rating: 5,
    crop: "Cotton Farmer"
  },
  {
    name: "Debanjali Lenka",
    location: "Gujarat",
    image: "https://debanjali-portfolio.onrender.com/passportphoto.jpg", 
    text: "Easy digital verification and instant access to government subsidies. Life-changing platform!",
    rating: 5,
    crop: "Sugarcane Farmer"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-4xl mx-auto">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="text-naturopura-gradient">
          Farmer Success Stories
        </span>
      </motion.h2>
      
      <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-lg border border-white/50 shadow-2xl p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <img 
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-lg"
              />
            </div>
            
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-lg text-gray-700 mb-6 italic max-w-2xl mx-auto leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
            
            <div>
              <h4 className="font-bold text-xl text-gray-800">{testimonials[currentIndex].name}</h4>
              <p className="naturopura-text font-medium">{testimonials[currentIndex].crop}</p>
              <p className="text-gray-600">{testimonials[currentIndex].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-naturopura-gradient scale-125' : 'bg-blue-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;