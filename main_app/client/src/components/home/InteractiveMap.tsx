import { motion } from "framer-motion";
import { useState } from "react";

const states = [
  { name: "Punjab", farmers: "8.2K", x: "25%", y: "20%" },
  { name: "Maharashtra", farmers: "12.5K", x: "35%", y: "60%" },
  { name: "Gujarat", farmers: "6.8K", x: "20%", y: "50%" },
  { name: "Uttar Pradesh", farmers: "15.3K", x: "45%", y: "35%" },
  { name: "Karnataka", farmers: "4.7K", x: "40%", y: "75%" },
  { name: "Rajasthan", farmers: "3.9K", x: "25%", y: "40%" },
  { name: "Odisha", farmers: "5.1K", x: "30%", y: "55%" },
];

const InteractiveMap = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // More reliable India map image URL
  const mapImageUrl = "https://images.pexels.com/photos/1022092/pexels-photo-1022092.jpeg";
  
  // Fallback: Create a simple outline using CSS if image fails
  const MapFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 rounded-2xl border-2 border-dashed border-gray-300">
      <div className="text-center p-8">
        <div className="w-64 h-48 mx-auto mb-4 bg-gradient-to-br from-green-200 to-blue-200 rounded-xl flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-600">INDIA MAP</span>
        </div>
        <p className="text-gray-500 text-sm">Map visualization</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="text-naturopura-gradient">
          Our Farming Community
        </span>
      </motion.h2>

      <div className="relative  backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-2xl">
        <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl overflow-hidden">
          {!imageError ? (
            <img
              src="https://cdn.hswstatic.com/gif/maps.jpg"
              alt="India Map"
              className={`w-full h-full object-cover opacity-30 transition-opacity duration-500 ${
                imageLoaded ? 'opacity-30' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                console.log("Image failed to load, using fallback");
                setImageError(true);
              }}
            />
          ) : (
            <MapFallback />
          )}
          
          {/* Overlay to make the background more subtle */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-blue-50/80"></div>

          {states.map((state, index) => (
            <motion.div
              key={state.name}
              className="absolute z-10"
              style={{ left: state.x, top: state.y }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="relative group cursor-pointer"
              >
                {/* Animated pulse ring */}
                <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-ping opacity-75"></div>
                
                {/* Main dot */}
                <div className="relative w-4 h-4 bg-naturopura-gradient rounded-full shadow-lg border-2 border-white"></div>
                
                {/* Hover tooltip */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-200 pointer-events-none">
                  <p className="font-bold text-gray-800 text-sm">{state.name}</p>
                  <p className="text-xs naturopura-text font-medium">
                    {state.farmers} Farmers
                  </p>
                  {/* Small arrow pointing down */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Serving farmers across{" "}
            <span className="font-bold text-blue-600">15+ states</span> with
            <span className="font-bold text-green-600">
              {" "}
              50,000+ registered farmers
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;