import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Shield } from "lucide-react";
import { DetectionResultFromContract } from "../types";

interface BlockchainResultsCardProps {
  blockchainResults: DetectionResultFromContract[] | null;
  blockchainLoading: boolean;
  blockchainError: string | null;
  fetchBlockchainResults: () => void;
  currentTexts: Record<string, string>;
}

const BlockchainResultsCard: React.FC<BlockchainResultsCardProps> = ({
  blockchainResults,
  blockchainLoading,
  blockchainError,
  fetchBlockchainResults,
  currentTexts,
}) => {
  return (
    <>
      <button
        onClick={fetchBlockchainResults}
        disabled={blockchainLoading}
        className="mb-4 w-full border border-[#636d1e] naturopura-text hover:bg-emerald-50 py-2 rounded"
      >
        {blockchainLoading ? (
          <div className="flex items-center gap-2 justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-500 border-t-transparent"></div>
            {currentTexts.analyzing}
          </div>
        ) : (
          currentTexts.fetchBlockchainResults
        )}
      </button>

      {blockchainError && (
        <div className="text-red-600 mb-4">{blockchainError}</div>
      )}

      {blockchainResults && (
        <Card className="border-emerald-100 overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-black flex-col sm:flex-row justify-between items-center p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" />
              <CardTitle className="text-white text-lg md:text-xl">{currentTexts.blockchainResults}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6 bg-white">
            {blockchainResults.length === 0 ? (
              <p className="text-center text-gray-500 py-4">{currentTexts.noBlockchainResults}</p>
            ) : (
              <div className="space-y-4">
                <h3 className="font-semibold text-green-800 text-lg">{currentTexts.previousDetections}</h3>
                <div className="space-y-4">
                  {blockchainResults.map((detection, index) => (
                    <div key={index} className="border border-emerald-100 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-green-700">
                            <span className="font-medium">{currentTexts.name}:</span> {detection.plantName}
                          </p>
                          <p className="text-green-700">
                            <span className="font-medium">{currentTexts.issue}:</span> {detection.issueName}
                          </p>
                          <p className="text-green-700">
                            <span className="font-medium">{currentTexts.detectionDate}:</span> {new Date(detection.detectedAt).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-green-700">
                            <span className="font-medium">
                              {detection.issueType === "pest" ? currentTexts.damage : currentTexts.symptoms}:
                            </span> {detection.symptomsOrDamage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BlockchainResultsCard;
