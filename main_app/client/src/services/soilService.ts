import { SoilDataResponse } from '../types/soil';

export const fetchSoilDataFromAPI = async (latitude: string, longitude: string): Promise<SoilDataResponse> => {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat)) {
    throw new Error("Invalid latitude. Please enter a numeric value between -90 and 90.");
  }
  if (isNaN(lon)) {
    throw new Error("Invalid longitude. Please enter a numeric value between -180 and 180.");
  }

  if (lat < -90 || lat > 90) {
    throw new Error("Latitude must be between -90 and 90 degrees.");
  }
  if (lon < -180 || lon > 180) {
    throw new Error("Longitude must be between -180 and 180 degrees.");
  }

  const response = await fetch(
    `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&depths=0-5cm&properties=bdod,cec,cfvo,clay,phh2o,sand,silt,soc`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `Failed to fetch soil data: ${response.statusText}`);
  }

  const data: SoilDataResponse = await response.json();
  console.log("Raw soil data API response:", data);
  return data;
};

export const getSoilValue = (
  soilData: SoilDataResponse | null,
  propertyName: string,
  topDepth: number,
  bottomDepth: number
): number | null => {
  if (!soilData || !soilData.properties?.layers) {
    console.warn("getSoilValue: No soil data or layers available.");
    return null;
  }

  const layer = soilData.properties.layers.find(l => l.name === propertyName);
  if (!layer) {
    console.warn(`getSoilValue: Layer not found for property: ${propertyName}`);
    return null;
  }

  const depthEntry = layer.depths.find(
    d => d.range.top_depth === topDepth && d.range.bottom_depth === bottomDepth
  );

  if (!depthEntry || !depthEntry.values) {
    console.warn(`getSoilValue: No depth entry or values found for ${propertyName} at ${topDepth}-${bottomDepth}cm.`);
    return null;
  }

  // Prioritize 'mean', then fall back to other quantiles.
  let value: number | null = null;
  if (typeof depthEntry.values.mean === 'number') {
    value = depthEntry.values.mean;
  } else if (typeof depthEntry.values.Q0_5 === 'number') {
    value = depthEntry.values.Q0_5;
  } else if (typeof depthEntry.values.Q0_95 === 'number') {
    value = depthEntry.values.Q0_95;
  } else if (typeof depthEntry.values.Q0_05 === 'number') {
    value = depthEntry.values.Q0_05;
  }

  if (value === null) {
    console.warn(`getSoilValue: No valid numerical value found for ${propertyName} at ${topDepth}-${bottomDepth}cm.`);
    return null;
  }

  // Apply unit conversion if d_factor is a valid number and not 1 or 0
  const dFactor = layer.unit_measure?.d_factor;
  if (typeof dFactor === 'number' && dFactor !== 1 && dFactor !== 0) {
    const convertedValue = value / dFactor;
    if (isNaN(convertedValue)) {
      console.error(`getSoilValue: Conversion resulted in NaN for ${propertyName}. Value: ${value}, d_factor: ${dFactor}`);
      return null;
    }
    return convertedValue;
  } else if (typeof dFactor !== 'number' && dFactor !== undefined && dFactor !== null) {
    console.warn(`getSoilValue: Invalid d_factor type for ${propertyName}: ${dFactor}. Skipping conversion.`);
  }

  return value;
};

export const suggestCrops = (pH: number | null, organicCarbon: number | null): string[] => {
  if (pH === null || organicCarbon === null) return [];

  const suggested: string[] = [];

  // pH-based suggestions
  if (pH >= 5.5 && pH <= 7.5) {
    suggested.push("Wheat", "Barley", "Corn", "Soybean");
  } else if (pH >= 4.5 && pH < 5.5) {
    suggested.push("Rice", "Barley");
  }

  // Organic carbon adjustments
  if (organicCarbon >= 1.5) {
    if (!suggested.includes("Corn")) suggested.push("Corn");
  } else if (organicCarbon < 0.8) {
    suggested.push("Barley"); // More tolerant of low organic matter
  }

  return suggested.filter(crop => crop in {
    Wheat: true,
    Barley: true,
    Corn: true,
    Rice: true,
    Soybean: true
  });
};