// --- SoilGrids API Response Interfaces ---
export interface DepthValues {
  Q0_5: number | null;
  Q0_05: number | null;
  Q0_95: number | null;
  mean: number | null;
  uncertainty: number | null;
}

export interface Depth {
  range: {
    top_depth: number;
    bottom_depth: number;
    unit_depth: string;
  };
  label: string;
  values: DepthValues;
}

export interface UnitMeasure {
  d_factor: number;
  mapped_units: string;
  target_units: string;
  uncertainty_unit: string;
}

export interface Layer {
  depths: Depth[];
  name: string;
  unit_measure: UnitMeasure;
}

export interface Properties {
  layers: Layer[];
}

export interface SoilDataResponse {
  type: string;
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties?: Properties;
  query_time_s: number;
}

// --- Crop Details Interface ---
export interface CropDetails {
  growingTips: string[];
  idealSoil: string;
  commonProblems: string[];
  solutions: string[];
}

// --- Blockchain Soil Data Interface ---
export interface BlockchainSoilData {
  location: string;
  ph: number;
  organicCarbon: number;
  clayContent: number;
  timestamp: Date;
}