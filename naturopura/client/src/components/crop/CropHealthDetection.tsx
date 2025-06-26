import { useState, useRef, ChangeEvent } from "react";
import { Upload, AlertCircle, Sprout, Leaf, Shield, Bug, Download } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import FarmerLayout from "../layouts/FarmerLayout";
import { Badge } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

// Import PDF libraries
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

// Multi-language string type (now with 'or')
interface MultiLangString {
  en: string;
  hi: string;
  or: string; // Odia
}

// Multi-language array of strings type (now with 'or')
interface MultiLangStringArray {
  en: string[];
  hi: string[];
  or: string[]; // Odia
}

// Interface for detailed health issue information
interface HealthIssueDetails {
  name: MultiLangString;
  symptoms?: string; // Original from local DB (single string, English only)
  symptoms_or_damage: MultiLangString; // Gemini's response (multi-language string)
  treatment?: string; // Original from local DB (single string, English only)
  treatment_or_control: MultiLangStringArray; // Gemini's response (multi-language array)
  causes?: string[]; // Original from local DB (array of strings, English only)
  causes_or_biology: MultiLangStringArray; // Gemini's response (multi-language array)
}

// First, add a type for the language options
type LanguageOption = 'en' | 'hi' | 'or';

// Define a more specific type for matched_db_info
interface DbMatchInfo {
  id: string;
  name: string;
  description: string;
  // ... add other specific fields
}

// Update BackendResponseResult interface
interface BackendResponseResult {
  plant_name: MultiLangString;
  issue_detected: boolean;
  issue_type: "disease" | "pest" | "none";
  issue_info: HealthIssueDetails;
  matched_db_info: DbMatchInfo | "Not in local DB"; // More specific type
  gemini_raw_description: string;
}

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
      details?: string;
    };
    status?: number;
  };
}

// ... (your existing imports and interfaces)

const CropHealthDetection = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BackendResponseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageOption>('en');
  const [showTempPdfContent, setShowTempPdfContent] = useState(false); // State to control temp PDF content visibility

  // Create refs for the elements to be captured
  const resultsCardRef = useRef<HTMLDivElement>(null); // Existing ref for visible card
  const tempPdfContentRef = useRef<HTMLDivElement>(null); // NEW ref for hidden PDF content

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError(language === 'en' ? "Please select an image first" :
        language === 'hi' ? "कृपया पहले एक छवि चुनें" :
          "ଦୟାକରି ପ୍ରଥମେ ଏକ ଚିତ୍ର ବାଛନ୍ତୁ");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("http://localhost:5000/api/crops/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || "Failed to detect crop health");
      }

      const data: BackendResponseResult = await response.json();

      // --- IMPORTANT DEBUGGING POINT ---
      // Log the raw data from the backend to inspect its content for each language.
      // Check `data.plant_name`, `data.issue_info.name`, `symptoms_or_damage`,
      // `treatment_or_control`, and `causes_or_biology` for missing or empty strings/arrays.
      console.log("Backend Response Data:", data);

      // Check if the response has the basic required fields
      if (!data.plant_name || typeof data.issue_detected === 'undefined') {
        throw new Error("Invalid response format from server");
      }

      setResult(data);
    } catch (err) {
      const error = err as ApiError;
      console.error("Fetch error:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get content based on selected language
  const getContent = (multiLang: MultiLangString, fallback?: string) => {
    // Check if the specific language property exists and is a non-empty string.
    // If not, fall back to 'en', then to provided `fallback`, then to generic 'N/A'.
    return multiLang[language] || multiLang.en || fallback ||
      (language === 'en' ? "N/A" : language === 'hi' ? "लागू नहीं" : "ଲାଗୁ ନୁହେଁ");
  };

  // Add type guard helper
  const isValidLanguage = (value: string): value is LanguageOption => {
    return ['en', 'hi', 'or'].includes(value);
  };

  // Update the getArrayContent function with proper type checking
  const getArrayContent = (
    multiLangArray: MultiLangStringArray,
    defaultEn: string,
    defaultHi: string,
    defaultOr: string,
  ): string[] => {
    const content = multiLangArray[language];

    // Ensure content is an array and filter out non-string or empty items
    if (Array.isArray(content)) {
      const validItems = content.filter((item): item is string => {
        return typeof item === 'string' && item.trim() !== '';
      });
      if (validItems.length > 0) {
        return validItems;
      }
    }

    // --- IMPORTANT: Modified fallback logic ---
    // If no valid content for the current language, return an array with the appropriate single fallback string.
    return [language === 'en' ? defaultEn : language === 'hi' ? defaultHi : defaultOr];
  };

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    if (!result) {
      return;
    }

    setLoading(true);
    // 1. Show the hidden content first
    setShowTempPdfContent(true);

    // 2. Wait for the next render cycle to ensure content is in DOM
    await new Promise(resolve => requestAnimationFrame(resolve));

    // 3. Now capture the content
    try {
      const input = tempPdfContentRef.current;
      if (!input) {
        throw new Error("PDF content reference not found.");
      }

      const canvas = await html2canvas(input, {
        scale: 2, // Higher scale for better resolution
        useCORS: true,
        // Remove windowWidth/Height unless specifically needed for a window-level capture
        // x: 0,
        // y: 0
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) { // Changed condition to > 0
        position = -(imgHeight - heightLeft); // Corrected calculation for next page
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${getContent(result.plant_name)}-health-report.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate PDF";
      alert(errorMessage);
    } finally {
      setLoading(false);
      // 4. Hide the content after PDF generation
      setShowTempPdfContent(false);
    }
  };


  // Dynamic texts for UI elements (expanded for Odia)
  const uiTexts = {
    en: {
      uploadImage: "Upload Image",
      uploadDescription: "Take a clear photo of the affected plant part (leaf, stem, or fruit)",
      clickToUpload: "Click to upload or drag and drop",
      changeImage: "Change Image",
      detectButton: "Detect Crop Health",
      analyzing: "Analyzing...",
      detectionResults: "Detection Results",
      plantInformation: "Plant Information",
      name: "Name",
      diseaseInformation: "Disease Information",
      pestInformation: "Pest Information",
      issue: "Issue",
      pest: "Pest",
      symptoms: "Symptoms",
      damage: "Damage",
      treatment: "Treatment",
      control: "Control",
      causes: "Causes",
      biology: "Biology/Causes",
      noDiseaseDetected: "No disease detected",
      noPestDetected: "No pest detected",
      aiIdentified: "AI Identified",
      fromDatabase: "From Database",
      noSpecificSymptoms: "No specific symptoms provided.",
      noSpecificDamage: "No specific damage provided.",
      noSpecificTreatment: "No specific treatment recommendations.",
      noSpecificControl: "No specific control methods.",
      noSpecificCauses: "No specific causes information available.",
      noSpecificBiologyCauses: "No specific biology/causes information available.",
      downloadPDF: "Download PDF",
      uploadedImageForPDF: "Uploaded Image:",
      reportTitle: "Crop Health Report",
      date: "Date:",
      location: "Location:",
    },
    hi: {
      uploadImage: "छवि अपलोड करें",
      uploadDescription: "प्रभावित पौधे के हिस्से (पत्ती, तना या फल) की स्पष्ट फोटो लें",
      clickToUpload: "अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें",
      changeImage: "छवि बदलें",
      detectButton: "फसल का स्वास्थ्य पता लगाएं",
      analyzing: "विश्लेषण हो रहा है...",
      detectionResults: "पता लगाने के परिणाम",
      plantInformation: "पौधे की जानकारी",
      name: "नाम",
      diseaseInformation: "रोग की जानकारी",
      pestInformation: "कीट की जानकारी",
      issue: "समस्या",
      pest: "कीट",
      symptoms: "लक्षण",
      damage: "क्षति",
      treatment: "उपचार",
      control: "नियंत्रण",
      causes: "कारण",
      biology: "जीव विज्ञान/कारण",
      noDiseaseDetected: "कोई रोग नहीं पाया गया",
      noPestDetected: "कोई कीट नहीं पाया गया",
      aiIdentified: "एआई द्वारा पहचाना गया",
      fromDatabase: "डेटाबेस से",
      noSpecificSymptoms: "कोई विशिष्ट लक्षण प्रदान नहीं किए गए।",
      noSpecificDamage: "कोई विशिष्ट क्षति प्रदान नहीं की गई।",
      noSpecificTreatment: "कोई विशिष्ट उपचार सुझाव नहीं।",
      noSpecificControl: "कोई विशिष्ट नियंत्रण विधि नहीं।",
      noSpecificCauses: "कोई विशिष्ट कारण जानकारी उपलब्ध नहीं।",
      noSpecificBiologyCauses: "कोई विशिष्ट जीव विज्ञान/कारण जानकारी उपलब्ध नहीं।",
      downloadPDF: "पीडीएफ डाउनलोड करें",
      uploadedImageForPDF: "अपलोड की गई छवि:",
      reportTitle: "फसल स्वास्थ्य रिपोर्ट",
      date: "दिनांक:",
      location: "स्थान:",
    },
    or: { // Odia Translations
      uploadImage: "ଛବି ଅପଲୋଡ୍ କରନ୍ତୁ",
      uploadDescription: "ପ୍ରଭାବିତ ଗଛର ଅଂଶ (ପତ୍ର, କାଣ୍ଡ, କିମ୍ବା ଫଳ) ର ଏକ ସ୍ପଷ୍ଟ ଫଟୋ ଉଠାନ୍ତୁ",
      clickToUpload: "ଅପଲୋଡ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ କିମ୍ବା ଟାଣି ଆଣି ଛାଡନ୍ତୁ",
      changeImage: "ଛବି ବଦଳାନ୍ତୁ",
      detectButton: "ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ଚିହ୍ନଟ କରନ୍ତୁ",
      analyzing: "ବିଶ୍ଳେଷଣ କରାଯାଉଛି...",
      detectionResults: "ଚିହ୍ନଟ ଫଳାଫଳ",
      plantInformation: "ଗଛର ସୂଚନା",
      name: "ନାମ",
      diseaseInformation: "ରୋଗ ସୂଚନା",
      pestInformation: "କୀଟ ସୂଚନା",
      issue: "ସମସ୍ୟା",
      pest: "କୀଟ",
      symptoms: "ଲକ୍ଷଣ",
      damage: "କ୍ଷତି",
      treatment: "ଚିକିତ୍ସା",
      control: "ନିୟନ୍ତ୍ରଣ",
      causes: "କାରଣ",
      biology: "ଜୀବ ବିଜ୍ଞାନ/କାରଣ",
      noDiseaseDetected: "କୌଣସି ରୋଗ ଚିହ୍ନଟ ହୋଇନାହିଁ",
      noPestDetected: "କୌଣସି କୀଟ ଚିହ୍ନଟ ହୋଇନାହିଁ",
      aiIdentified: "AI ଦ୍ୱାରା ଚିହ୍ନଟ",
      fromDatabase: "ଡାଟାବେସ୍ ରୁ",
      noSpecificSymptoms: "କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଲକ୍ଷଣ ପ୍ରଦାନ କରାଯାଇ ନାହିଁ ।",
      noSpecificDamage: "କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ କ୍ଷତି ପ୍ରଦାନ କରାଯାଇ ନାହିଁ ।",
      noSpecificTreatment: "କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଚିକିତ୍ସା ସୁପାରିଶ ନାହିଁ ।",
      noSpecificControl: "କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ନିୟନ୍ତ୍ରଣ ପଦ୍ଧତି ନାହିଁ ।",
      noSpecificCauses: "କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣ ସୂଚନା ଉପଲବ୍ଧ ନାହିଁ ।",
      noSpecificBiologyCauses: "କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଜୀବ ବିଜ୍ଞାନ/କାରଣ ସୂଚନା ଉପଲବ୍ଧ ନାହିଁ ।",
      downloadPDF: "PDF ଡାଉନଲୋଡ୍ କରନ୍ତୁ",
      uploadedImageForPDF: "ଅପଲୋଡ୍ ହୋଇଥିବା ଛବି:",
      reportTitle: "ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ରିପୋର୍ଟ",
      date: "ତାରିଖ:",
      location: "ସ୍ଥାନ:",
    }
  };

  const currentTexts = uiTexts[language];
  const currentDate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'or-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const currentLocation = "Gothapatna, Odisha, India";

  return (
    <FarmerLayout
      title={currentTexts.detectButton}
      subtitle={currentTexts.uploadDescription}
    >
      <div className="grid gap-6 p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
        <Card className="border-emerald-100 shadow-lg">
          <CardHeader className="border-b border-emerald-100 bg-white">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-emerald-600" />
              <CardTitle className="text-lg md:text-xl">{currentTexts.uploadImage}</CardTitle>
            </div>
            <CardDescription className="text-emerald-700 text-sm md:text-base">
              {currentTexts.uploadDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-200 rounded-lg p-4 md:p-8 hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center w-full"
              >
                {imagePreview ? (
                  <div className="relative w-full text-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 sm:max-h-56 md:max-h-64 rounded-lg mb-4 shadow-lg border-4 border-white object-contain inline-block"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600 text-white text-xs sm:text-sm">
                      {currentTexts.changeImage}
                    </Badge>
                  </div>
                ) : (
                  <div className="p-6 md:p-8 bg-green-50 rounded-full mb-4">
                    <Upload className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
                  </div>
                )}
                <span className="text-sm md:text-base text-green-700 font-medium">
                  {currentTexts.clickToUpload}
                </span>
              </label>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!selectedImage || loading}
              className="w-full bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-4 md:py-6"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  {currentTexts.analyzing}
                </div>
              ) : (
                currentTexts.detectButton
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50 shadow-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card className="border-emerald-100 overflow-hidden shadow-lg">
            <CardHeader className="bg-gradient-to-br from-emerald-500 to-green-600 flex-col sm:flex-row justify-between items-center p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" />
                <CardTitle className="text-white text-lg md:text-xl">{currentTexts.detectionResults}</CardTitle>
              </div>
              <div className="flex flex-col xs:flex-row gap-2">
                <ToggleGroup
                  type="single"
                  value={language}
                  onValueChange={(value: string | string[]) => {
                    // For single type toggle groups, we'll only get a string or undefined
                    if (typeof value === 'string' && isValidLanguage(value)) {
                      setLanguage(value);
                    }
                  }}
                  className="bg-white rounded-md p-0.5 md:p-1"
                >
                  <ToggleGroupItem
                    value="en"
                    aria-label="Toggle English"
                    className="data-[state=on]:bg-emerald-500 data-[state=on]:text-white h-7 px-2 md:h-8 md:px-3 text-xs md:text-sm"
                  >
                    EN
                  </ToggleGroupItem>
                  <ToggleGroupItem value="hi" aria-label="Toggle Hindi" className="data-[state=on]:bg-emerald-500 data-[state=on]:text-white h-7 px-2 md:h-8 md:px-3 text-xs md:text-sm">
                    HI
                  </ToggleGroupItem>
                  <ToggleGroupItem value="or" aria-label="Toggle Odia" className="data-[state=on]:bg-emerald-500 data-[state=on]:text-white h-7 px-2 md:h-8 md:px-3 text-xs md:text-sm">
                    ଓଡିଆ
                  </ToggleGroupItem>
                </ToggleGroup>
                <Button
                  onClick={handleDownloadPDF}
                  disabled={loading}
                  className="bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 h-8 px-2 md:h-9 md:px-3 text-xs md:text-sm rounded-md shadow-sm"
                  title={currentTexts.downloadPDF}
                >
                  <Download className="h-3.5 w-3.5 mr-1 md:h-4 md:w-4 md:mr-2" />
                  <span className="hidden sm:inline">{currentTexts.downloadPDF}</span>
                </Button>
              </div>
            </CardHeader>
            {/* The visible results card content */}
            <CardContent ref={resultsCardRef} className="p-4 md:p-6 bg-white">
              <div className="space-y-4 md:space-y-6">
                <div className="bg-emerald-50 p-3 md:p-4 rounded-lg border border-emerald-100">
                  <h3 className="font-semibold text-green-800 flex items-center gap-1 md:gap-2 text-base md:text-lg mb-2">
                    <Sprout className="h-4 w-4" /> {currentTexts.plantInformation}
                  </h3>
                  <div>
                    <p className="text-green-700 text-sm md:text-base">
                      <span className="font-medium">{currentTexts.name}:</span>{" "}
                      {getContent(result.plant_name, "Unknown")}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 md:p-4 rounded-lg border border-emerald-100">
                  <h3 className="font-semibold text-green-800 flex items-center gap-1 md:gap-2 text-base md:text-lg mb-2">
                    {result.issue_type === "pest" ? (
                      <Bug className="h-4 w-4" />
                    ) : (
                      <Leaf className="h-4 w-4" />
                    )}{" "}
                    {result.issue_type === "pest" ? currentTexts.pestInformation : currentTexts.diseaseInformation}
                  </h3>
                  <div>
                    <p className="text-green-700 text-sm md:text-base">
                      <span className="font-medium">
                        {result.issue_type === "pest" ? currentTexts.pest : currentTexts.issue}:
                      </span>{" "}
                      {result.issue_detected ? getContent(result.issue_info.name, "N/A") : (result.issue_type === 'pest' ? currentTexts.noPestDetected : currentTexts.noDiseaseDetected)}
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
                    <p className="text-green-700 text-sm md:text-base mt-2">
                      <span className="font-medium">
                        {result.issue_type === "pest" ? currentTexts.damage : currentTexts.symptoms}:
                      </span>{" "}
                      {getContent(result.issue_info.symptoms_or_damage, result.issue_type === 'pest' ? currentTexts.noSpecificDamage : currentTexts.noSpecificSymptoms)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-3 md:p-4 rounded-lg border border-emerald-100">
                    <h3 className="font-semibold text-green-800 text-base md:text-lg mb-2">
                      {result.issue_type === "pest" ? currentTexts.control : currentTexts.treatment}
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {getArrayContent(
                        result.issue_info.treatment_or_control,
                        currentTexts.noSpecificTreatment,
                        currentTexts.noSpecificTreatment,
                        currentTexts.noSpecificTreatment
                      ).map((item, index) => (
                        <li key={`treatment-${index}`} className="text-emerald-700 flex items-start gap-1 md:gap-2 text-sm md:text-base">
                          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-50 p-3 md:p-4 rounded-lg border border-emerald-100">
                    <h3 className="font-semibold text-green-800 text-base md:text-lg mb-2">
                      {result.issue_type === "pest" ? currentTexts.biology : currentTexts.causes}
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {getArrayContent(
                        result.issue_info.causes_or_biology,
                        currentTexts.noSpecificCauses,
                        currentTexts.noSpecificCauses,
                        currentTexts.noSpecificCauses
                      ).map((item, index) => (
                        <li key={`causes-${index}`} className="text-emerald-700 flex items-start gap-1 md:gap-2 text-sm md:text-base">
                          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hidden content for PDF generation - this div is used by html2canvas */}
        {showTempPdfContent && result && (
          <div ref={tempPdfContentRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '210mm', padding: '15mm', boxSizing: 'border-box', background: 'white', fontFamily: 'Arial, sans-serif', lineHeight: '1.4' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '15mm', fontSize: '28px', color: '#047857', fontWeight: 'bold' }}>{currentTexts.reportTitle}</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4B5563', marginBottom: '15mm' }}>
              <span><span style={{ fontWeight: 'bold' }}>{currentTexts.date}</span> {currentDate}</span>
              <span><span style={{ fontWeight: 'bold' }}>{currentTexts.location}</span> {currentLocation}</span>
            </div>

            {/* Uploaded Image Section */}
            {imagePreview && (
              <div style={{ marginBottom: '15mm', textAlign: 'center', border: '1px solid #d1fae5', padding: '10mm', borderRadius: '8px', background: '#f0fdf4' }}>
                <h2 style={{ fontSize: '20px', color: '#065F46', marginBottom: '10mm', fontWeight: 'bold' }}>{currentTexts.uploadedImageForPDF}</h2>
                <img
                  src={imagePreview}
                  alt="Uploaded Plant"
                  style={{ maxWidth: '80%', height: 'auto', border: '2px solid #a7f3d0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                />
              </div>
            )}

            {/* Re-render the relevant parts of the detection results here using inline styles */}
            <div style={{ padding: '15mm', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #d1fae5', marginBottom: '15mm', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '20px', color: '#065F46', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10mm', fontWeight: 'bold' }}>
                <Sprout style={{ width: '24px', height: '24px', color: '#10B981' }} /> {currentTexts.plantInformation}
              </h3>
              <p style={{ color: '#047857', fontSize: '16px' }}>
                <span style={{ fontWeight: 'bold' }}>{currentTexts.name}:</span>{" "}
                {getContent(result.plant_name, "Unknown")}
              </p>
            </div>

            <div style={{ padding: '15mm', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #d1fae5', marginBottom: '15mm', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '20px', color: '#065F46', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10mm', fontWeight: 'bold' }}>
                {result.issue_type === "pest" ? (
                  <Bug style={{ width: '24px', height: '24px', color: '#10B981' }} />
                ) : (
                  <Leaf style={{ width: '24px', height: '24px', color: '#10B981' }} />
                )}{" "}
                {result.issue_type === "pest" ? currentTexts.pestInformation : currentTexts.diseaseInformation}
              </h3>
              <p style={{ color: '#047857', fontSize: '16px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>
                  {result.issue_type === "pest" ? currentTexts.pest : currentTexts.issue}:
                </span>{" "}
                {result.issue_detected ? getContent(result.issue_info.name, "N/A") : (result.issue_type === 'pest' ? currentTexts.noPestDetected : currentTexts.noDiseaseDetected)}
              </p>
              <p style={{ color: '#047857', fontSize: '16px' }}>
                <span style={{ fontWeight: 'bold' }}>
                  {result.issue_type === "pest" ? currentTexts.damage : currentTexts.symptoms}:
                </span>{" "}
                {getContent(result.issue_info.symptoms_or_damage, result.issue_type === 'pest' ? currentTexts.noSpecificDamage : currentTexts.noSpecificSymptoms)}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15mm' }}>
              <div style={{ padding: '15mm', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #d1fae5', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '20px', color: '#065F46', marginBottom: '10mm', fontWeight: 'bold' }}>
                  {result.issue_type === "pest" ? currentTexts.control : currentTexts.treatment}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '16px', color: '#047857' }}>
                  {getArrayContent(
                    result.issue_info.treatment_or_control,
                    currentTexts.noSpecificTreatment,
                    currentTexts.noSpecificTreatment,
                    currentTexts.noSpecificTreatment
                  ).map((item, index) => (
                    <li key={`treatment-${index}`} style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', flexShrink: 0, marginTop: '8px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '15mm', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #d1fae5', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '20px', color: '#065F46', marginBottom: '10mm', fontWeight: 'bold' }}>
                  {result.issue_type === "pest" ? currentTexts.biology : currentTexts.causes}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '16px', color: '#047857' }}>
                  {getArrayContent(
                    result.issue_info.causes_or_biology,
                    currentTexts.noSpecificCauses,
                    currentTexts.noSpecificCauses,
                    currentTexts.noSpecificCauses
                  ).map((item, index) => (
                    <li key={`causes-${index}`} style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', flexShrink: 0, marginTop: '8px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </FarmerLayout>
  );
};

export default CropHealthDetection;