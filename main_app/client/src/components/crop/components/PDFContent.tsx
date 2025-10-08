import React from "react";
import { Sprout, Bug, Leaf } from "lucide-react";
import { BackendResponseResult, LanguageOption } from "../types";
import { getContent, getArrayContent } from "../utils";

interface PDFContentProps {
  showTempPdfContent: boolean;
  result: BackendResponseResult | null;
  imagePreview: string | null;
  currentTexts: Record<string, string>;
  language: LanguageOption;
  currentDate: string;
  currentLocation: string;
}

const PDFContent: React.FC<PDFContentProps> = ({
  showTempPdfContent,
  result,
  imagePreview,
  currentTexts,
  language,
  currentDate,
  currentLocation,
}) => {
  if (!showTempPdfContent || !result) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        width: '210mm',
        padding: '15mm',
        boxSizing: 'border-box',
        background: 'white',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.4',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '15mm',
          fontSize: '28px',
          color: '#047857',
          fontWeight: 'bold',
        }}
      >
        {currentTexts.reportTitle}
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#4B5563',
          marginBottom: '15mm',
        }}
      >
        <span>
          <span style={{ fontWeight: 'bold' }}>{currentTexts.date}</span> {currentDate}
        </span>
        <span>
          <span style={{ fontWeight: 'bold' }}>{currentTexts.location}</span> {currentLocation}
        </span>
      </div>

      {imagePreview && (
        <div
          style={{
            marginBottom: '15mm',
            textAlign: 'center',
            border: '1px solid #d1fae5',
            padding: '10mm',
            borderRadius: '8px',
            background: '#f0fdf4',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              color: '#065F46',
              marginBottom: '10mm',
              fontWeight: 'bold',
            }}
          >
            {currentTexts.uploadedImageForPDF}
          </h2>
          <img
            src={imagePreview}
            alt="Uploaded Plant"
            style={{
              maxWidth: '80%',
              height: 'auto',
              border: '2px solid #a7f3d0',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      )}

      <div
        style={{
          padding: '15mm',
          background: '#ecfdf5',
          borderRadius: '8px',
          border: '1px solid #d1fae5',
          marginBottom: '15mm',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            color: '#065F46',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10mm',
            fontWeight: 'bold',
          }}
        >
          <Sprout style={{ width: '24px', height: '24px', color: '#10B981' }} /> {currentTexts.plantInformation}
        </h3>
        <p style={{ color: '#047857', fontSize: '16px' }}>
          <span style={{ fontWeight: 'bold' }}>{currentTexts.name}:</span>{" "}
          {getContent(result.plant_name, language, "Unknown")}
        </p>
      </div>

      <div
        style={{
          padding: '15mm',
          background: '#ecfdf5',
          borderRadius: '8px',
          border: '1px solid #d1fae5',
          marginBottom: '15mm',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            color: '#065F46',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10mm',
            fontWeight: 'bold',
          }}
        >
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
          {result.issue_detected ? getContent(result.issue_info.name, language, "N/A") : (result.issue_type === 'pest' ? currentTexts.noPestDetected : currentTexts.noDiseaseDetected)}
        </p>
        <p style={{ color: '#047857', fontSize: '16px' }}>
          <span style={{ fontWeight: 'bold' }}>
            {result.issue_type === "pest" ? currentTexts.damage : currentTexts.symptoms}:
          </span>{" "}
          {getContent(result.issue_info.symptoms_or_damage, language, result.issue_type === 'pest' ? currentTexts.noSpecificDamage : currentTexts.noSpecificSymptoms)}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15mm' }}>
        <div
          style={{
            padding: '15mm',
            background: '#ecfdf5',
            borderRadius: '8px',
            border: '1px solid #d1fae5',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ fontSize: '20px', color: '#065F46', marginBottom: '10mm', fontWeight: 'bold' }}>
            {result.issue_type === "pest" ? currentTexts.control : currentTexts.treatment}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '16px', color: '#047857' }}>
            {getArrayContent(
              result.issue_info.treatment_or_control,
              currentTexts.noSpecificTreatment,
              currentTexts.noSpecificTreatment,
              currentTexts.noSpecificTreatment,
              language
            ).map((item, index) => (
              <li key={`treatment-${index}`} style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', flexShrink: 0, marginTop: '8px' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            padding: '15mm',
            background: '#ecfdf5',
            borderRadius: '8px',
            border: '1px solid #d1fae5',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ fontSize: '20px', color: '#065F46', marginBottom: '10mm', fontWeight: 'bold' }}>
            {result.issue_type === "pest" ? currentTexts.biology : currentTexts.causes}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '16px', color: '#047857' }}>
            {getArrayContent(
              result.issue_info.causes_or_biology,
              currentTexts.noSpecificCauses,
              currentTexts.noSpecificCauses,
              currentTexts.noSpecificCauses,
              language
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
  );
};

export default PDFContent;

