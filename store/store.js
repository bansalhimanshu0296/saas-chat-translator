import { create } from "zustand";

export const LanguageSupportedMap = {
    en: "English",
    de: "German",
    fr: "French",
    es: "Spanish",
    hi: "Hindi",
    ja: "Japanese",
    la: "Latin",
    ru: "Russian",
    zh: "Mandarin",
    ar: "Arabic" 
};

const LANGUAGES_IN_FREE = 2;

export const useSubscriptionStore = create((set)=>({
    subscription: undefined,
    setSubscription: (subscription) => set({subscription: subscription})
}))

export const useLanguageStore = create((set, get)=>({
    language: `en`,
    setLanguage: (language) => set({language: language}),
    getLanguages: (isPro) =>{
        if(isPro)
            return Object.keys(LanguageSupportedMap)
        return Object.keys(LanguageSupportedMap).slice(0, LANGUAGES_IN_FREE)
    },
    getNotSupportedLanguages: (isPro) =>{
        if(isPro) return [];
        return Object.keys(LanguageSupportedMap).slice(LANGUAGES_IN_FREE)
    }
}))