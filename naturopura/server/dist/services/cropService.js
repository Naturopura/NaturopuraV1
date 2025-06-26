"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectCropIssueService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(geminiApiKey);
function bufferToBase64(buffer) {
    return buffer.toString("base64");
}
// --- IMPORTANT: Update plantHealthDatabase with multi-language support ---
// For now, I'm duplicating English for Hindi and Odia as placeholders.
// You should replace these with actual Hindi and Odia translations in your database.
const plantHealthDatabase = {
    tomato: {
        diseases: [
            {
                name: "Late Blight", // This name is used for matching, keep it English or consistent
                symptoms: {
                    en: "Dark lesions on leaves, fruit rot, and stem blight.",
                    hi: "पत्तियों पर गहरे घाव, फल सड़ना, और तने का झुलसा।", // Placeholder, replace with actual Hindi
                    or: "ପତ୍ରରେ ଗାଢ଼ କ୍ଷତ, ଫଳ ସଢ଼ିବା, ଏବଂ କାଣ୍ଡ ବ୍ଲାଇଟ୍।", // Placeholder, replace with actual Odia
                },
                treatment: {
                    en: ["Use fungicides", "Remove infected plants", "Crop rotation"],
                    hi: ["कवकनाशी का प्रयोग करें", "संक्रमित पौधों को हटा दें", "फसल चक्र"], // Placeholder
                    or: ["ଫଙ୍ଗିସାଇଡ୍ ବ୍ୟବହାର କରନ୍ତୁ", "ସଂକ୍ରମିତ ଗଛ ହଟାନ୍ତୁ", "ଫସଲ ଚକ୍ର"], // Placeholder
                },
                causes: {
                    en: ["Phytophthora infestans fungus", "Cool, wet conditions"],
                    hi: ["फाइटोफ्थोरा इन्फेस्टन्स फंगस", "ठंडी, गीली परिस्थितियाँ"], // Placeholder
                    or: ["ଫାଇଟୋଫ୍ଥୋରା ଇନ୍ଫେଷ୍ଟାନ୍ସ ଫିମ୍ପି", "ଥଣ୍ଡା, ଓଦା ପରିସ୍ଥିତି"], // Placeholder
                },
            },
        ],
    },
    potato: {
        diseases: [
            {
                name: "Potato Scab",
                symptoms: {
                    en: "Rough, corky lesions on tuber surface.",
                    hi: "कंद की सतह पर खुरदरे, कॉर्क जैसे घाव।", // Placeholder
                    or: "ଆଳୁର ଚମଡ଼ାରେ ଖରାପ, କର୍କି ଭଳି କ୍ଷତ।", // Placeholder
                },
                treatment: {
                    en: ["Maintain soil pH around 5.2 to 5.5", "Use resistant varieties"],
                    hi: ["मिट्टी का पीएच 5.2 से 5.5 के आसपास बनाए रखें", "प्रतिरोधी किस्मों का उपयोग करें"], // Placeholder
                    or: ["ମାଟିର pH ପ୍ରାୟ 5.2 ରୁ 5.5 ରଖନ୍ତୁ", "ପ୍ରତିରୋଧକ କିସମ ବ୍ୟବହାର କରନ୍ତୁ"], // Placeholder
                },
                causes: {
                    en: ["Streptomyces bacteria", "High soil pH", "Dry soil"],
                    hi: ["स्ट्रेप्टोमाइसेज़ बैक्टीरिया", "उच्च मिट्टी पीएच", "सूखी मिट्टी"], // Placeholder
                    or: ["ଷ୍ଟ୍ରେପ୍ଟୋମାଇସେସ୍ ବ୍ୟାକ୍ଟେରିଆ", "ଅଧିକ ମାଟି pH", "ଶୁଖିଲା ମାଟି"], // Placeholder
                },
            },
        ],
    },
};
const detectCropIssueService = (fileBuffer, mimeType) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const base64Image = bufferToBase64(fileBuffer);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // --- UPDATED PROMPT: Request multi-language JSON output from Gemini ---
    const prompt = `Analyze the plant in this image for any health issues (diseases or pests). 
  Provide the response in a JSON format. The JSON should contain the following fields:
  - plant_name: Detected plant name.
  - issue_detected: boolean (true if an issue is found, false otherwise).
  - issue_type: "disease" | "pest" | "none".
  - issue_info: An object containing:
    - name: Name of the disease/pest.
    - symptoms_or_damage: Description of symptoms or damage.
    - treatment_or_control: Array of recommended treatments or control methods.
    - causes_or_biology: Array of causes or biological information.
  
  All string values for 'plant_name', 'name', and 'symptoms_or_damage' should be provided as objects with English ('en'), Hindi ('hi'), and Odia ('or') translations. 
  All array values for 'treatment_or_control' and 'causes_or_biology' should also be objects with English ('en'), Hindi ('hi'), and Odia ('or') array translations.

  If no issue is detected, set 'issue_detected' to false, 'issue_type' to 'none', and use "N/A" or appropriate "No issue" messages for 'issue_info' fields in all languages.

  Example for a healthy plant:
  \`\`\`json
  {
    "plant_name": { "en": "Tomato", "hi": "टमाटर", "or": "ଟମାଟୋ" },
    "issue_detected": false,
    "issue_type": "none",
    "issue_info": {
      "name": { "en": "No issue", "hi": "कोई समस्या नहीं", "or": "କୌଣସି ସମସ୍ୟା ନାହିଁ" },
      "symptoms_or_damage": { "en": "Plant appears healthy and vibrant.", "hi": "पौधा स्वस्थ और जीवंत दिख रहा है।", "or": "ଗଛ ସୁସ୍ଥ ଓ ଜୀବନ୍ତ ଦେଖାଯାଉଛି।" },
      "treatment_or_control": { "en": ["Continue regular care"], "hi": ["नियमित देखभाल जारी रखें"], "or": ["ନିୟମିତ ଯତ୍ନ ଜାରି ରଖନ୍ତୁ"] },
      "causes_or_biology": { "en": ["Optimal growing conditions"], "hi": ["इष्टतम बढ़ती परिस्थितियां"], "or": ["ଉତ୍ତମ ବୃଦ୍ଧି ପରିସ୍ଥିତି"] }
    },
    "gemini_raw_description": "Based on the image, the plant appears to be a healthy tomato plant with no visible signs of disease or pest damage."
  }
  \`\`\`

  Example for a diseased plant:
  \`\`\`json
  {
    "plant_name": { "en": "Tomato", "hi": "टमाटर", "or": "ଟମାଟୋ" },
    "issue_detected": true,
    "issue_type": "disease",
    "issue_info": {
      "name": { "en": "Late Blight", "hi": "देर से झुलसा", "or": "ଡେରିରେ ବ୍ଲାଇଟ୍" },
      "symptoms_or_damage": { "en": "Dark, water-soaked spots on leaves and stems; white mold on undersides of leaves.", "hi": "पत्तियों और तनों पर गहरे, पानी से सने धब्बे; पत्तियों के नीचे सफेद फफूंदी।", "or": "ପତ୍ର ଓ କାଣ୍ଡରେ ଗାଢ଼, ପାଣିରେ ଭିଜା ଦାଗ; ପତ୍ରର ତଳପଟେ ଧଳା ଛତୁ।" },
      "treatment_or_control": { "en": ["Remove infected plants", "Apply fungicides", "Improve air circulation"], "hi": ["संक्रमित पौधों को हटा दें", "कवकनाशी लगाएं", "हवा का संचार सुधारें"], "or": ["ସଂକ୍ରମିତ ଗଛଗୁଡ଼ିକୁ ହଟାନ୍ତୁ", "ଫଙ୍ଗିସାଇଡ୍ ପ୍ରୟୋଗ କରନ୍ତୁ", "ବାୟୁ ସଞ୍ଚାଳନରେ ଉନ୍ନତି ଆଣନ୍ତୁ"] },
      "causes_or_biology": { "en": ["Caused by the oomycete Phytophthora infestans", "Favored by cool, wet conditions"], "hi": ["ओमाइसेट फाइटोफ्थोरा इन्फेस्टन्स के कारण होता है", "ठंडी, गीली परिस्थितियों में अनुकूल"], "or": ["ଓମାଇସେଟ୍ ଫାଇଟୋଫ୍ଥୋରା ଇନ୍ଫେଷ୍ଟାନ୍ସ ଦ୍ୱାରା ହୁଏ", "ଥଣ୍ଡା, ଓଦା ପରିସ୍ଥିତିରେ ଅନୁକୂଳ"] }
    },
    "gemini_raw_description": "The image shows signs consistent with Late Blight on a tomato plant, characterized by dark lesions and mold."
  }
  \`\`\`
  
  Now, analyze the provided image and return the JSON.
  `;
    const result = yield model.generateContent({
        contents: [{
                role: "user",
                parts: [
                    { inlineData: { mimeType, data: base64Image } },
                    { text: prompt },
                ],
            }],
    });
    const geminiResponseText = result.response.text();
    let geminiParsedResult;
    try {
        const jsonMatch = geminiResponseText.match(/```json\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1].trim() : geminiResponseText.trim();
        geminiParsedResult = JSON.parse(jsonString);
        // --- IMPORTANT: Validate and ensure all multi-language fields are present and correctly typed ---
        // This step is crucial if Gemini doesn't always provide all language fields or if they are empty.
        // It defaults to empty strings/arrays if missing, which your frontend handles as "N/A" or "Unknown".
        const defaultMultiLangString = { en: "N/A", hi: "लागू नहीं", or: "ଲାଗୁ ନୁହେଁ" };
        const defaultMultiLangArray = { en: [], hi: [], or: [] };
        geminiParsedResult.plant_name = geminiParsedResult.plant_name || defaultMultiLangString;
        if (geminiParsedResult.issue_info) {
            geminiParsedResult.issue_info.name = geminiParsedResult.issue_info.name || defaultMultiLangString;
            geminiParsedResult.issue_info.symptoms_or_damage = geminiParsedResult.issue_info.symptoms_or_damage || defaultMultiLangString;
            geminiParsedResult.issue_info.treatment_or_control = geminiParsedResult.issue_info.treatment_or_control || defaultMultiLangArray;
            geminiParsedResult.issue_info.causes_or_biology = geminiParsedResult.issue_info.causes_or_biology || defaultMultiLangArray;
            // Ensure array values are indeed arrays, even if empty
            geminiParsedResult.issue_info.treatment_or_control.en = Array.isArray(geminiParsedResult.issue_info.treatment_or_control.en) ? geminiParsedResult.issue_info.treatment_or_control.en : [];
            geminiParsedResult.issue_info.treatment_or_control.hi = Array.isArray(geminiParsedResult.issue_info.treatment_or_control.hi) ? geminiParsedResult.issue_info.treatment_or_control.hi : [];
            geminiParsedResult.issue_info.treatment_or_control.or = Array.isArray(geminiParsedResult.issue_info.treatment_or_control.or) ? geminiParsedResult.issue_info.treatment_or_control.or : [];
            geminiParsedResult.issue_info.causes_or_biology.en = Array.isArray(geminiParsedResult.issue_info.causes_or_biology.en) ? geminiParsedResult.issue_info.causes_or_biology.en : [];
            geminiParsedResult.issue_info.causes_or_biology.hi = Array.isArray(geminiParsedResult.issue_info.causes_or_biology.hi) ? geminiParsedResult.issue_info.causes_or_biology.hi : [];
            geminiParsedResult.issue_info.causes_or_biology.or = Array.isArray(geminiParsedResult.issue_info.causes_or_biology.or) ? geminiParsedResult.issue_info.causes_or_biology.or : [];
        }
        else {
            // If issue_info itself is missing or malformed, provide a complete default structure
            geminiParsedResult.issue_info = {
                name: defaultMultiLangString,
                symptoms_or_damage: defaultMultiLangString,
                treatment_or_control: defaultMultiLangArray,
                causes_or_biology: defaultMultiLangArray,
            };
        }
    }
    catch (e) {
        console.error("Failed to parse Gemini JSON response, defaulting:", e);
        // Fallback if parsing fails or unexpected format
        geminiParsedResult = {
            plant_name: { en: "Unknown", hi: "अज्ञात", or: "ଅଜ୍ଞାତ" },
            issue_detected: false,
            issue_type: "none",
            issue_info: {
                name: { en: "N/A", hi: "लागू नहीं", or: "ଲାଗୁ ନୁହେଁ" },
                symptoms_or_damage: { en: "N/A", hi: "लागू नहीं", or: "ଲାଗୁ ନୁହେଁ" },
                treatment_or_control: {
                    en: ["No specific recommendations."],
                    hi: ["कोई विशिष्ट सिफारिशें नहीं।"],
                    or: ["କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ସୁପାରିଶ ନାହିଁ।"]
                },
                causes_or_biology: {
                    en: ["Information could not be retrieved."],
                    hi: ["जानकारी प्राप्त नहीं की जा सकी।"],
                    or: ["ସୂଚନା ପ୍ରାପ୍ତ ହୋଇପାରିଲା ନାହିଁ।"]
                }
            },
            gemini_raw_description: geminiResponseText,
        };
    }
    const plantNameEn = (_b = (_a = geminiParsedResult.plant_name) === null || _a === void 0 ? void 0 : _a.en) === null || _b === void 0 ? void 0 : _b.toLowerCase(); // Use English for matching
    const issueNameEn = (_e = (_d = (_c = geminiParsedResult.issue_info) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.en) === null || _e === void 0 ? void 0 : _e.toLowerCase(); // Use English for matching
    // --- MERGE LOGIC: Prioritize Gemini's response, but supplement with local DB if matched ---
    // If Gemini detected an issue AND we find a match in our local DB:
    if (geminiParsedResult.issue_detected && plantNameEn && issueNameEn) {
        const localPlantData = plantHealthDatabase[plantNameEn];
        if (localPlantData) {
            const matchedDisease = localPlantData.diseases.find(d => issueNameEn.includes(d.name.toLowerCase()));
            if (matchedDisease) {
                console.log(`Matched local DB entry for: ${matchedDisease.name}`);
                // Only override if Gemini's field is empty or less specific
                // For simplicity here, we're fully overriding with local DB if matched.
                // You might want more sophisticated merging logic.
                // Merge symptoms_or_damage
                if (!geminiParsedResult.issue_info.symptoms_or_damage.en || geminiParsedResult.issue_info.symptoms_or_damage.en === "N/A") {
                    geminiParsedResult.issue_info.symptoms_or_damage = matchedDisease.symptoms;
                }
                // Merge treatment_or_control
                if (geminiParsedResult.issue_info.treatment_or_control.en.length === 0 || geminiParsedResult.issue_info.treatment_or_control.en[0] === "No specific recommendations." || geminiParsedResult.issue_info.treatment_or_control.en[0] === "No treatment") {
                    geminiParsedResult.issue_info.treatment_or_control = matchedDisease.treatment;
                }
                // Merge causes_or_biology
                if (geminiParsedResult.issue_info.causes_or_biology.en.length === 0 || geminiParsedResult.issue_info.causes_or_biology.en[0] === "Information could not be retrieved." || geminiParsedResult.issue_info.causes_or_biology.en[0] === "Unknown") {
                    geminiParsedResult.issue_info.causes_or_biology = matchedDisease.causes;
                }
                // You might also want to update the issue name if the local DB has a more precise one
                // geminiParsedResult.issue_info.name.en = matchedDisease.name;
                // ... and other languages for the name if applicable, or rely on Gemini for this.
            }
        }
    }
    return geminiParsedResult;
});
exports.detectCropIssueService = detectCropIssueService;
