import type { SupportedLanguage } from '../types';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  population: string;
  speechLang: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    population: 'Pan-India',
    speechLang: 'en-IN',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    population: '~528.3M (43.6%)',
    speechLang: 'hi-IN',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    population: '~97.2M (8.0%)',
    speechLang: 'bn-IN',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    population: '~83.0M (6.9%)',
    speechLang: 'mr-IN',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    population: '~81.1M (6.7%)',
    speechLang: 'te-IN',
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    population: '~69.0M (5.7%)',
    speechLang: 'ta-IN',
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    population: '~55.4M (4.6%)',
    speechLang: 'gu-IN',
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    population: '~50.7M (4.2%)',
    speechLang: 'ur-IN',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    population: '~43.7M (3.6%)',
    speechLang: 'kn-IN',
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    population: '~37.5M (3.1%)',
    speechLang: 'or-IN',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    population: '~34.8M (2.9%)',
    speechLang: 'ml-IN',
  },
];

export const getLanguageByCode = (code: SupportedLanguage): LanguageInfo => {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code) || SUPPORTED_LANGUAGES[0];
};
