import { MultiLangString, MultiLangStringArray, LanguageOption } from "./types";

// Helper to get content based on selected language
export const getContent = (multiLang: MultiLangString, language: LanguageOption, fallback?: string): string => {
  return multiLang[language] || multiLang.en || fallback ||
    (language === 'en' ? "N/A" : language === 'hi' ? "लागू नहीं" : "ଲାଗୁ ନୁହେଁ");
};

// Add type guard helper
export const isValidLanguage = (value: string): value is LanguageOption => {
  return ['en', 'hi', 'or'].includes(value);
};

// Update the getArrayContent function with proper type checking
export const getArrayContent = (
  multiLangArray: MultiLangStringArray,
  defaultEn: string,
  defaultHi: string,
  defaultOr: string,
  language: LanguageOption
): string[] => {
  const content = multiLangArray[language];

  if (Array.isArray(content)) {
    const validItems = content.filter((item): item is string => {
      return typeof item === 'string' && item.trim() !== '';
    });
    if (validItems.length > 0) {
      return validItems;
    }
  }

  return [language === 'en' ? defaultEn : language === 'hi' ? defaultHi : defaultOr];
};
