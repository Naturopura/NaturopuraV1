import { useState, useRef, ChangeEvent } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import FarmerLayout from "../layouts/FarmerLayout";

// Import our custom components
import ImageUploadCard from "./components/ImageUploadCard";
import DetectionResultsCard from "./components/DetectionResultsCard";
import PDFContent from "./components/PDFContent";

// Import utilities and types
import { LanguageOption, BackendResponseResult, MultiLangString } from "./types";
import uiTexts from "./uiTexts";

// Import PDF libraries
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';



interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
      details?: string;
    };
    status?: number;
  };
}

const CropHealthDetection = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BackendResponseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageOption>('en');
  const [showTempPdfContent, setShowTempPdfContent] = useState(false); // State to control temp PDF content visibility

  // New state for blockchain detection results
  const [blockchainError, setBlockchainError] = useState<string | null>(null);



  // Create refs for the elements to be captured
  const tempPdfContentRef = useRef<HTMLDivElement>(null); // NEW ref for hidden PDF content

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      setResult(null);
      setBlockchainError(null);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/crops/detect`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || "Failed to detect crop health");
      }

      const data: BackendResponseResult = await response.json();

      // Check if the response has the basic required fields
      if (!data.plant_name || typeof data.issue_detected === 'undefined') {
        throw new Error("Invalid response format from server");
      }

      setResult(data);
      setBlockchainError(null);
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
        <ImageUploadCard
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          loading={loading}
          currentTexts={currentTexts}
        />

        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50 shadow-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {blockchainError && (
          <Alert variant="destructive" className="border-red-200 bg-red-50 shadow-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Blockchain Error</AlertTitle>
            <AlertDescription>{blockchainError}</AlertDescription>
          </Alert>
        )}


        <DetectionResultsCard
          result={result}
          language={language}
          setLanguage={setLanguage}
          handleDownloadPDF={handleDownloadPDF}
          loading={loading}
          currentTexts={currentTexts}
        />

        <PDFContent
          showTempPdfContent={showTempPdfContent}
          result={result}
          imagePreview={imagePreview}
          currentTexts={currentTexts}
          language={language}
          currentDate={currentDate}
          currentLocation={currentLocation}
        />
      </div>
    </FarmerLayout>
  );
};

export default CropHealthDetection;