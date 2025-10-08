import { CropDetails } from '../types/soil';

export const cropHarvestingDetails: Record<string, CropDetails> = {
  Wheat: {
    growingTips: [
      "Sow seeds in well-prepared soil.",
      "Maintain moisture during the growing period.",
      "Avoid waterlogging.",
    ],
    idealSoil: "Loamy, well-drained soil with neutral pH.",
    commonProblems: ["Rust disease", "Aphids", "Drought stress"],
    solutions: [
      "Use resistant wheat varieties.",
      "Apply appropriate pesticides.",
      "Ensure proper irrigation.",
    ],
  },
  Barley: {
    growingTips: [
      "Plant in cool climates.",
      "Use certified seeds.",
      "Ensure good soil drainage.",
    ],
    idealSoil: "Sandy loam with pH 6.0 to 7.5.",
    commonProblems: ["Powdery mildew", "Barley yellow dwarf virus"],
    solutions: ["Apply fungicides.", "Use virus-free seeds."],
  },
  Corn: {
    growingTips: [
      "Plant in warm soil.",
      "Ensure full sun exposure.",
      "Fertilize with nitrogen-rich fertilizers.",
    ],
    idealSoil: "Fertile, well-drained soil with pH 5.8 to 7.0.",
    commonProblems: ["Corn borers", "Leaf blight"],
    solutions: ["Use insecticides.", "Practice crop rotation."],
  },
  Rice: {
    growingTips: [
      "Requires flooded fields for most varieties.",
      "Maintain consistent water levels.",
      "Use high-quality seeds for better yield.",
    ],
    idealSoil: "Clay or clay loam with good water retention.",
    commonProblems: ["Rice blast", "Stem borers", "Water scarcity"],
    solutions: [
      "Use disease-resistant varieties.",
      "Practice proper water management.",
      "Apply appropriate pesticides when needed.",
    ],
  },
  Soybean: {
    growingTips: [
      "Plant in well-drained soil after last frost.",
      "Inoculate seeds with rhizobium bacteria.",
      "Maintain consistent moisture during flowering.",
    ],
    idealSoil: "Well-drained loam with pH 6.0-6.8.",
    commonProblems: ["Root rot", "Aphids", "Bean leaf beetles"],
    solutions: [
      "Practice crop rotation.",
      "Use resistant varieties.",
      "Apply insecticides when thresholds are reached.",
    ],
  },
};