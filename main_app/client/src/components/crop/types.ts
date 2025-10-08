export interface MultiLangString {
  en: string;
  hi: string;
  or: string; // Odia
}

export interface MultiLangStringArray {
  en: string[];
  hi: string[];
  or: string[]; // Odia
}

export interface HealthIssueDetails {
  name: MultiLangString;
  symptoms?: string; // Original from local DB (single string, English only)
  symptoms_or_damage: MultiLangString;
  treatment?: string; // Original from local DB (single string, English only)
  treatment_or_control: MultiLangStringArray;
  causes?: string[]; // Original from local DB (array of strings, English only)
  causes_or_biology: MultiLangStringArray;
}

export type LanguageOption = 'en' | 'hi' | 'or';

export interface DbMatchInfo {
  id: string;
  name: string;
  description: string;
  // ... add other specific fields
}

export interface BackendResponseResult {
  plant_name: MultiLangString;
  issue_detected: boolean;
  issue_type: "disease" | "pest" | "none";
  issue_info: HealthIssueDetails;
  matched_db_info: DbMatchInfo | "Not in local DB";
  gemini_raw_description: string;
}

export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
      details?: string;
    };
    status?: number;
  };
}

export interface DetectionResultFromContract {
  plantName: string;
  issueType: string;
  issueName: string;
  symptomsOrDamage: string;
  treatmentOrControl: string[];
  causesOrBiology: string[];
  detectedAt: string;
}
