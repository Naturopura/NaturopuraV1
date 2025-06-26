import { motion } from "framer-motion";

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
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 text-transparent bg-clip-text">
          Our Farming Community
        </span>
      </motion.h2>

      <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-2xl">
        <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6f/India-locator-map-blank.svg"
            alt="Blank India Map"
            className="w-full h-full object-contain opacity-70"
          />

          {states.map((state, index) => (
            <motion.div
              key={state.name}
              className="absolute"
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
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-lg animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-200">
                  <p className="font-bold text-gray-800">{state.name}</p>
                  <p className="text-sm text-blue-600">
                    {state.farmers} Farmers
                  </p>
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
