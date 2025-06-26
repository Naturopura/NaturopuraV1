import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FarmerLayout from "../layouts/FarmerLayout"; // Assuming FarmerLayout exists
import { Loader2, Search, Droplets, Leaf, Thermometer, X, Info,  Cloud } from "lucide-react"; // All lucide-react icons

// --- SoilGrids API Response Interfaces ---
interface DepthValues {
  Q0_5: number | null;
  Q0_05: number | null;
  Q0_95: number | null;
  mean: number | null;
  uncertainty: number | null;
}

interface Depth {
  range: {
    top_depth: number;
    bottom_depth: number;
    unit_depth: string;
  };
  label: string;
  values: DepthValues;
}

interface UnitMeasure {
  d_factor: number;
  mapped_units: string;
  target_units: string;
  uncertainty_unit: string;
}

interface Layer {
  depths: Depth[];
  name: string;
  unit_measure: UnitMeasure;
}

interface Properties {
  layers: Layer[];
}

interface SoilDataResponse {
  type: string;
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties?: Properties;
  query_time_s: number;
}

// --- Crop Details Interface and Data ---
interface CropDetails {
  growingTips: string[];
  idealSoil: string;
  commonProblems: string[];
  solutions: string[];
}

const cropHarvestingDetails: Record<string, CropDetails> = {
  Wheat: {
    growingTips: [
      "Sow seeds in well-prepared soil.",
      "Maintain moisture during the growing period.",
      "Avoid waterlogging.",
    ],
    idealSoil: "Loamy, well-drained soil with neutral pH.",
    commonProblems: ["Rust disease", "Aphids", "Drought stress"],
    solutions: [
      "Use resistant wheat varieties.",
      "Apply appropriate pesticides.",
      "Ensure proper irrigation.",
    ],
  },
  Barley: {
    growingTips: [
      "Plant in cool climates.",
      "Use certified seeds.",
      "Ensure good soil drainage.",
    ],
    idealSoil: "Sandy loam with pH 6.0 to 7.5.",
    commonProblems: ["Powdery mildew", "Barley yellow dwarf virus"],
    solutions: ["Apply fungicides.", "Use virus-free seeds."],
  },
  Corn: {
    growingTips: [
      "Plant in warm soil.",
      "Ensure full sun exposure.",
      "Fertilize with nitrogen-rich fertilizers.",
    ],
    idealSoil: "Fertile, well-drained soil with pH 5.8 to 7.0.",
    commonProblems: ["Corn borers", "Leaf blight"],
    solutions: ["Use insecticides.", "Practice crop rotation."],
  },
};

// --- Soil Property Card Component ---
interface SoilPropertyCardProps {
  name: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
}

const SoilPropertyCard: React.FC<SoilPropertyCardProps> = ({ name, value, unit, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
    <p className="text-3xl font-bold">
      {value} {unit}
    </p>
  </motion.div>
);

// --- Crop Details Modal Component ---
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
      {/* Modal Header with Gradient */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 sticky top-0 z-10 rounded-t-2xl">
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

      {/* Modal Body */}
      <div className="p-6 space-y-8">
        <div className="space-y-6">
          {/* Growing Tips */}
          {details.growingTips.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Growing Tips
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {details.growingTips.map((tip, index) => (
                  <li key={index} className="flex items-center gap-2 text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ideal Soil */}
          {details.idealSoil && (
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Ideal Soil
              </h3>
              <p className="text-green-700">{details.idealSoil}</p>
            </div>
          )}

          {/* Common Problems & Solutions */}
          {(details.commonProblems.length > 0 || details.solutions.length > 0) && (
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Common Problems & Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.commonProblems.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Problems:</h4>
                    <ul className="space-y-2">
                      {details.commonProblems.map((problem, index) => (
                        <li key={index} className="flex items-center gap-2 text-green-600">
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
                        <li key={index} className="flex items-center gap-2 text-green-600">
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

// --- Main SoilTest Component ---
const SoilTest: React.FC = () => {
  const [latitude, setLatitude] = useState<string>("27.7172");
  const [longitude, setLongitude] = useState<string>("85.824");
  const [soilData, setSoilData] = useState<SoilDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const getSoilValue = (
    propertyName: string,
    topDepth: number,
    bottomDepth: number,
    preferMean: boolean = true
  ): number | null => {
    if (!soilData || !soilData.properties?.layers) return null;

    const layer = soilData.properties.layers.find(l => l.name === propertyName);
    if (!layer) return null;

    const depthEntry = layer.depths.find(
      d => d.range.top_depth === topDepth && d.range.bottom_depth === bottomDepth
    );

    if (!depthEntry || !depthEntry.values) return null;

    let value: number | null = null;
    if (preferMean && typeof depthEntry.values.mean === "number") {
      value = depthEntry.values.mean;
    } else if (typeof depthEntry.values.Q0_5 === "number") {
      value = depthEntry.values.Q0_5;
    }

    if (value === null) return null;

    const dFactor = layer.unit_measure?.d_factor;
    return value / (typeof dFactor === "number" && dFactor !== 0 ? dFactor : 1);
  };

  const fetchSoilData = async () => {
    if (!latitude || !longitude) {
      setError("Please enter both latitude and longitude.");
      return;
    }

    setLoading(true);
    setError(null);
    setSoilData(null);

    try {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lon)) {
        throw new Error("Invalid latitude or longitude. Please enter numeric values.");
      }

      const response = await fetch(
        `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&depths=0-5cm&properties=bdod,cec,cfvo,clay,phh2o,sand,silt,soc`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Failed to fetch soil data: ${response.statusText}`);
      }

      const data: SoilDataResponse = await response.json();
      setSoilData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred while fetching soil data.");
    } finally {
      setLoading(false);
    }
  };

  const suggestCrops = (pH: number | null, organicCarbon: number | null) => {
    if (pH === null || organicCarbon === null) return [];
    
    const suggested: string[] = [];
    if (pH >= 6.0 && pH <= 7.5 && organicCarbon >= 1.0) {
      suggested.push("Wheat", "Barley", "Corn");
    } else if (pH < 6.0 && organicCarbon >= 0.5) {
      if (!suggested.includes("Barley")) suggested.push("Barley");
      if (!suggested.includes("Wheat")) suggested.push("Wheat");
    } else {
        if (!suggested.includes("Barley")) suggested.push("Barley");
    }
    return suggested.filter(crop => cropHarvestingDetails[crop]);
  };

  const soilPH = getSoilValue("phh2o", 0, 5);
  const soilOrganicCarbon = getSoilValue("soc", 0, 5);
  const soilClayContent = getSoilValue("clay", 0, 5);

  const crops = suggestCrops(soilPH, soilOrganicCarbon);

  return (
    <FarmerLayout
      title="Soil Data Analyzer"
      subtitle="Analyze soil properties for any location on Earth"
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Droplets className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Soil Analysis</h1>
                    <p className="text-green-100">Get detailed soil properties for better farming</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-green-700">Latitude</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 27.7172"
                    />
                    <Search className="absolute right-3 top-3 text-green-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-green-700">Longitude</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 85.824"
                    />
                    <Search className="absolute right-3 top-3 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchSoilData}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Soil"
                  )}
                </motion.button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center"
                >
                  {error}
                </motion.div>
              )}

              {soilData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SoilPropertyCard
                      name="Soil pH"
                      value={soilPH?.toFixed(1) ?? "N/A"}
                      icon={<Thermometer className="h-6 w-6" />}
                      unit=""
                    />
                    <SoilPropertyCard
                      name="Organic Carbon"
                      value={soilOrganicCarbon?.toFixed(1) ?? "N/A"}
                      unit="%"
                      icon={<Leaf className="h-6 w-6" />}
                    />
                    <SoilPropertyCard
                      name="Clay Content"
                      value={soilClayContent?.toFixed(1) ?? "N/A"}
                      unit="%"
                      icon={<Cloud className="h-6 w-6" />}
                    />
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2 mb-6">
                      <Leaf className="h-6 w-6" />
                      Recommended Crops
                    </h2>
                    
                    <div className="grid gap-4">
                      {crops.length > 0 ? (
                        crops.map((cropName) => (
                          <motion.div
                            key={cropName}
                            className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-all border border-green-100"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                                  <span className="text-2xl">🌱</span>
                                  {cropName}
                                </h3>
                                <p className="text-green-600 mt-1">
                                  Click for detailed growing information
                                </p>
                              </div>
                              <button
                                onClick={() => setSelectedCrop(cropName)}
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                              >
                                View Guide
                              </button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-green-600 text-center">
                          No specific crop recommendations based on the current soil data. Try adjusting the location or consult a local expert.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCrop && cropHarvestingDetails[selectedCrop] && (
          <CropDetailsModal
            crop={selectedCrop}
            details={cropHarvestingDetails[selectedCrop]}
            onClose={() => setSelectedCrop(null)}
          />
        )}
      </AnimatePresence>
    </FarmerLayout>
  );
};

export default SoilTest;