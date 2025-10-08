import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Badge } from "../../ui/badge";
import { Shield, Sprout, Leaf, Bug, Download } from "lucide-react";
import { BackendResponseResult, LanguageOption } from "../types";
import { getContent, getArrayContent, isValidLanguage } from "../utils";

interface DetectionResultsCardProps {
  result: BackendResponseResult | null;
  language: LanguageOption;
  setLanguage: (language: LanguageOption) => void;
  handleDownloadPDF: () => void;
  loading: boolean;
  currentTexts: Record<string, string>;
}

const DetectionResultsCard: React.FC<DetectionResultsCardProps> = ({
  result,
  language,
  setLanguage,
  handleDownloadPDF,
  loading,
  currentTexts,
}) => {
  if (!result) return null;

  return (
    <Card className="border-emerald-100 overflow-hidden shadow-lg">
      <CardHeader className="bg-naturopura-gradient flex-col sm:flex-row justify-between items-center p-4 md:p-6">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" />
          <CardTitle className="text-white text-lg md:text-xl">{currentTexts.detectionResults}</CardTitle>
        </div>
        <div className="flex flex-col xs:flex-row gap-2">
          <ToggleGroup
            type="single"
            value={language}
            onValueChange={(value: string | string[]) => {
              if (typeof value === 'string' && isValidLanguage(value)) {
                setLanguage(value);
              }
            }}
            className="bg-white rounded-md p-0.5 md:p-1"
          >
            <ToggleGroupItem
              value="en"
              aria-label="Toggle English"
              className="data-[state=on]:bg-[#636d1e] data-[state=on]:text-white h-7 px-2 md:h-8 md:px-3 text-xs md:text-sm"
            >
              EN
            </ToggleGroupItem>
            <ToggleGroupItem value="hi" aria-label="Toggle Hindi" className="data-[state=on]:bg-[#636d1e] data-[state=on]:text-white h-7 px-2 md:h-8 md:px-3 text-xs md:text-sm">
              हिंदी
            </ToggleGroupItem>
            <ToggleGroupItem value="or" aria-label="Toggle Odia" className="data-[state=on]:bg-[#636d1e] data-[state=on]:text-white h-7 px-2 md:h-8 md:px-3 text-xs md:text-sm">
              ଓଡିଆ
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            onClick={handleDownloadPDF}
            disabled={loading}
            className="bg-white naturopura-text hover:bg-emerald-50 hover:text-emerald-700 h-8 px-2 md:h-9 md:px-3 text-xs md:text-sm rounded-md shadow-sm"
            title={currentTexts.downloadPDF}
          >
            <Download className="h-3.5 w-3.5 mr-1 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden sm:inline">{currentTexts.downloadPDF}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 bg-white">
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white p-3 md:p-4 rounded-lg border border-emerald-100">
            <h3 className="font-semibold naturopura-text flex items-center gap-1 md:gap-2 text-base md:text-lg mb-2">
              <Sprout className="h-4 w-4" /> {currentTexts.plantInformation}
            </h3>
            <div>
              <p className="text-black text-sm md:text-base">
                <span className="font-medium">{currentTexts.name}:</span>{" "}
                {getContent(result.plant_name, language, "Unknown")}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 md:p-4 rounded-lg border border-emerald-100">
            <h3 className="font-semibold naturopura-text flex items-center gap-1 md:gap-2 text-base md:text-lg mb-2">
              {result.issue_type === "pest" ? (
                <Bug className="h-4 w-4" />
              ) : (
                <Leaf className="h-4 w-4" />
              )}{" "}
              {result.issue_type === "pest" ? currentTexts.pestInformation : currentTexts.diseaseInformation}
            </h3>
            <div>
              <p className="text-black text-sm md:text-base">
                <span className="font-medium">
                  {result.issue_type === "pest" ? currentTexts.pest : currentTexts.issue}:
                </span>{" "}
                {result.issue_detected ? getContent(result.issue_info.name, language, "N/A") : (result.issue_type === 'pest' ? currentTexts.noPestDetected : currentTexts.noDiseaseDetected)}
                {result.issue_detected && result.matched_db_info === "Not in local DB" && (
                  <Badge className="ml-1 bg-yellow-500 text-white text-xs">
                    {currentTexts.aiIdentified}
                  </Badge>
                )}
                {result.issue_detected && result.matched_db_info !== "Not in local DB" && (
                  <Badge className="ml-1 bg-green-500 text-white text-xs">
                    {currentTexts.fromDatabase}
                  </Badge>
                )}
              </p>
              <p className="text-black text-sm md:text-base mt-2">
                <span className="font-medium">
                  {result.issue_type === "pest" ? currentTexts.damage : currentTexts.symptoms}:
                </span>{" "}
                {getContent(result.issue_info.symptoms_or_damage, language, result.issue_type === 'pest' ? currentTexts.noSpecificDamage : currentTexts.noSpecificSymptoms)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 md:p-4 rounded-lg border border-emerald-100">
              <h3 className="font-semibold naturopura-text text-base md:text-lg mb-2">
                {result.issue_type === "pest" ? currentTexts.control : currentTexts.treatment}
              </h3>
              <ul className="mt-2 space-y-1">
                {getArrayContent(
                  result.issue_info.treatment_or_control,
                  currentTexts.noSpecificTreatment,
                  currentTexts.noSpecificTreatment,
                  currentTexts.noSpecificTreatment,
                  language
                ).map((item, index) => (
                  <li key={`treatment-${index}`} className="text-black flex items-start gap-1 md:gap-2 text-sm md:text-base">
                    <div className="h-1.5 w-1.5 rounded-full bg-naturopura-gradient shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 p-3 md:p-4 rounded-lg border border-emerald-100">
              <h3 className="font-semibold naturopura-text text-base md:text-lg mb-2">
                {result.issue_type === "pest" ? currentTexts.biology : currentTexts.causes}
              </h3>
              <ul className="mt-2 space-y-1">
                {getArrayContent(
                  result.issue_info.causes_or_biology,
                  currentTexts.noSpecificCauses,
                  currentTexts.noSpecificCauses,
                  currentTexts.noSpecificCauses,
                  language
                ).map((item, index) => (
                  <li key={`causes-${index}`} className="text-black flex items-start gap-1 md:gap-2 text-sm md:text-base">
                    <div className="h-1.5 w-1.5 rounded-full bg-naturopura-gradient shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectionResultsCard;
