import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FarmerLayout from "../layouts/FarmerLayout";
import { Loader2, Search, Droplets, Leaf, Thermometer, Cloud } from "lucide-react";
import { SoilDataResponse, BlockchainSoilData } from '../../types/soil';
import { cropHarvestingDetails } from '../../data/cropData';
import { fetchSoilDataFromAPI, getSoilValue, suggestCrops } from '../../services/soilService';
import { storeSoilDataOnChain, getMySoilDataFromChain } from '../../services/blockchainService';
import SoilPropertyCard from "./SoilPropertyCard";
import CropDetailsModal from './CropDetailsModal';
import CropRecommendations from './CropRecommendations';
import BlockchainSoilDataTable from './BlockchainSoilDataTable';

const SoilTest: React.FC = () => {
  const [latitude, setLatitude] = useState<string>("27.7172");
  const [longitude, setLongitude] = useState<string>("85.824");
  const [soilData, setSoilData] = useState<SoilDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [blockchainSoilData, setBlockchainSoilData] = useState<BlockchainSoilData[]>([]);
  const [blockchainLoading, setBlockchainLoading] = useState<boolean>(false);
  const [blockchainError, setBlockchainError] = useState<string | null>(null);

  const fetchSoilDataFromBlockchain = async () => {
    setBlockchainLoading(true);
    setBlockchainError(null);
    try {
      const data = await getMySoilDataFromChain();
      setBlockchainSoilData(data);
    } catch (err) {
      setBlockchainError(err instanceof Error ? err.message : "Failed to fetch soil data from blockchain");
    } finally {
      setBlockchainLoading(false);
    }
  };

  const fetchSoilData = async () => {
    if (!latitude || !longitude) {
      setError("Please enter both latitude and longitude.");
      return;
    }

    setLoading(true);
    setError(null);
    setSoilData(null);
    setSaveSuccess(false);

    try {
      const data = await fetchSoilDataFromAPI(latitude, longitude);
      setSoilData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred while fetching soil data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToBlockchain = async () => {
    if (!soilData) return;

    const ph = getSoilValue(soilData, "phh2o", 0, 5);
    const organicCarbon = getSoilValue(soilData, "soc", 0, 5) || getSoilValue(soilData, "ocd", 0, 5);
    const clayContent = getSoilValue(soilData, "clay", 0, 5);

    if (ph === null || organicCarbon === null || clayContent === null) {
      setError("Incomplete soil data to save to blockchain");
      return;
    }

    setSaveLoading(true);
    try {
      await storeSoilDataOnChain({
        ph,
        organicCarbon,
        clayContent,
        latitude,
        longitude
      });
      setSaveSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save data to blockchain");
    } finally {
      setSaveLoading(false);
    }
  };

  const soilPH = getSoilValue(soilData, "phh2o", 0, 5);
  const soilOrganicCarbon = getSoilValue(soilData, "soc", 0, 5) || getSoilValue(soilData, "ocd", 0, 5);
  const soilClayContent = getSoilValue(soilData, "clay", 0, 5);

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
            <div className="bg-naturopura-gradient text-white p-8 relative overflow-hidden">
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
                  <label className="block text-sm font-medium naturopura-text">Latitude</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 27.7172"
                    />
                    <Search className="absolute right-3 top-3 naturopura-text" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium naturopura-text">Longitude</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 85.3240"
                    />
                    <Search className="absolute right-3 top-3 naturopura-text" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchSoilData}
                  disabled={loading}
                  className="px-8 py-3 bg-naturopura-gradient text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
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

              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center"
                >
                  Soil data successfully saved to blockchain!
                </motion.div>
              )}

              {soilData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 space-y-8"
                >
                  {soilPH === null && soilOrganicCarbon === null && soilClayContent === null ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            No soil data available for this location. Try a different location where SoilGrids has coverage.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SoilPropertyCard
                          name="Soil pH"
                          value={soilPH !== null ? soilPH.toFixed(1) : "N/A"}
                          icon={<Thermometer className="h-6 w-6" />}
                          unit=""
                        />
                        <SoilPropertyCard
                          name="Organic Carbon"
                          value={soilOrganicCarbon !== null ? soilOrganicCarbon.toFixed(1) : "N/A"}
                          unit="%"
                          icon={<Leaf className="h-6 w-6" />}
                        />
                        <SoilPropertyCard
                          name="Clay Content"
                          value={soilClayContent !== null ? soilClayContent.toFixed(1) : "N/A"}
                          unit="%"
                          icon={<Cloud className="h-6 w-6" />}
                        />
                      </div>

                      <div className="flex justify-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSaveToBlockchain}
                          disabled={saveLoading}
                          className="px-6 py-2 bg-naturopura-gradient text-white rounded-lg font-medium shadow hover:shadow-md transition-all disabled:opacity-50"
                        >
                          {saveLoading ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="animate-spin" />
                              Saving...
                            </span>
                          ) : (
                            "Save to Blockchain"
                          )}
                        </motion.button>
                      </div>

                      <CropRecommendations 
                        crops={crops} 
                        onCropSelect={setSelectedCrop} 
                      />
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <BlockchainSoilDataTable
        data={blockchainSoilData}
        loading={blockchainLoading}
        error={blockchainError}
        onFetch={fetchSoilDataFromBlockchain}
      />

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