import React from "react";
import { motion } from "framer-motion";
import { X, Info, Leaf } from "lucide-react";
import { CropDetails } from '../../types/soil';

interface CropDetailsModalProps {
  crop: string;
  details: CropDetails;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 300 } },
  exit: { scale: 0.95, opacity: 0 },
};

const CropDetailsModal: React.FC<CropDetailsModalProps> = ({ crop, details, onClose }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={backdropVariants}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      variants={modalVariants}
      className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      <div className="bg-naturopura-gradient p-6 sticky top-0 z-10 rounded-t-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Leaf className="w-6 h-6" />
          {crop} Growing Guide
        </h2>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-6">
          {details.growingTips.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold naturopura-text mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Growing Tips
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {details.growingTips.map((tip, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-500">
                    <span className="w-2 h-2 bg-naturopura-gradient rounded-full"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {details.idealSoil && (
            <div>
              <h3 className="text-xl font-semibold naturopura-text mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Ideal Soil
              </h3>
              <p className="text-gray-500">{details.idealSoil}</p>
            </div>
          )}

          {(details.commonProblems.length > 0 || details.solutions.length > 0) && (
            <div>
              <h3 className="text-xl font-semibold naturopura-text mb-3">Common Problems & Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.commonProblems.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">Problems:</h4>
                    <ul className="space-y-2">
                      {details.commonProblems.map((problem, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-500">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {details.solutions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Solutions:</h4>
                    <ul className="space-y-2">
                      {details.solutions.map((solution, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-500">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default CropDetailsModal;