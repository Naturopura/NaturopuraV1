// Assuming this is your cropTypes.ts file
// Add export keyword to these interfaces

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

// Interface for detailed health issue information (from previous context, ensure it's also exported)
export interface HealthIssueInfo {
  name: MultiLangString;
  symptoms?: string; // Original from local DB (single string, English only) - Consider updating to MultiLangString
  symptoms_or_damage: MultiLangString; // Gemini's response (multi-language string)
  treatment?: string; // Original from local DB (single string, English only) - Consider updating to MultiLangStringArray
  treatment_or_control: MultiLangStringArray; // Gemini's response (multi-language array)
  causes?: string[]; // Original from local DB (array of strings, English only) - Consider updating to MultiLangStringArray
  causes_or_biology: MultiLangStringArray; // Gemini's response (multi-language array)
}

// Define a more specific type for matched_db_info (from previous context, ensure it's also exported)
export interface DbMatchInfo {
  id: string;
  name: string;
  description: string;
  // ... add other specific fields
}

// Update BackendResponseResult interface (from previous context, ensure it's also exported)
export interface GeminiResponse { // Renamed from BackendResponseResult for clarity in this context
  plant_name: MultiLangString;
  issue_detected: boolean;
  issue_type: "disease" | "pest" | "none";
  issue_info: HealthIssueInfo;
  matched_db_info?: DbMatchInfo | "Not in local DB"; // Optional, as not always returned by Gemini
  gemini_raw_description: string;
}

// If you have any other types/interfaces in this file, make sure they are also exported
// if you intend to import them elsewhere.