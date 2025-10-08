import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface CropRecommendationsProps {
  crops: string[];
  onCropSelect: (crop: string) => void;
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ crops, onCropSelect }) => {
  if (crops.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-naturopura-gradient flex items-center gap-2 mb-6">
        <Leaf className="h-6 w-6 naturopura-text" />
        Recommended Crops
      </h2>

      <div className="grid gap-4">
        {crops.map((cropName) => (
          <motion.div
            key={cropName}
            className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-all border border-green-100"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold naturopura-text flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  {cropName}
                </h3>
                <p className="naturopura-text mt-1">
                  Click for detailed growing information
                </p>
              </div>
              <button
                onClick={() => onCropSelect(cropName)}
                className="px-4 py-2 bg-naturopura-gradient text-white rounded-lg"
              >
                View Guide
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CropRecommendations;