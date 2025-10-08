import React, { ChangeEvent } from "react";
import { Upload, Badge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Button } from "../../ui/button";
import { Sprout } from "lucide-react";

interface ImageUploadCardProps {
  imagePreview: string | null;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
  currentTexts: Record<string, string>;
}

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({ 
  imagePreview, 
  handleImageChange, 
  handleSubmit, 
  loading, 
  currentTexts 
}) => {
  return (
    <Card className="border-emerald-100 shadow-lg">
      <CardHeader className="border-b border-emerald-100 bg-white">
        <div className="flex items-center gap-2">
          <Sprout className="h-6 w-6 naturopura-text" />
          <CardTitle className="text-lg md:text-xl">{currentTexts.uploadImage}</CardTitle>
        </div>
        <CardDescription className="text-black text-sm md:text-base">
          {currentTexts.uploadDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 bg-white">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-200 rounded-lg p-4 md:p-8 hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
            disabled={loading}
          />
          <label
            htmlFor="image-upload"
            className={`cursor-pointer flex flex-col items-center w-full ${loading ? "opacity-50 pointer-events-none" : ""}`}
          >
            {imagePreview ? (
              <div className="relative w-full text-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 sm:max-h-56 md:max-h-64 rounded-lg mb-4 shadow-lg border-4 border-white object-contain inline-block"
                />
                <Badge className="absolute top-2 right-2 bg-naturopura-gradient text-white text-xs sm:text-sm">
                  {currentTexts.changeImage}
                </Badge>
              </div>
            ) : (
              <div className="p-6 md:p-8 bg-green-50 rounded-full mb-4">
                <Upload className="h-10 w-10 md:h-12 md:w-12 naturopura-text" />
              </div>
            )}
            <span className="text-sm md:text-base naturopura-text font-medium">
              {currentTexts.clickToUpload}
            </span>
          </label>
          <Button
            onClick={handleSubmit}
            className="w-full mt-4 bg-naturopura-gradient text-white py-2 rounded-md hover:brightness-110 transition"
            type="button"
            disabled={loading || !imagePreview}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {currentTexts.analyzingText || "Analyzing..."}
              </div>
            ) : (
              currentTexts.detectButton
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploadCard;