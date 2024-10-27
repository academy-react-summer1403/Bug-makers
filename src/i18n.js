import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import fa from './locales/fa.json'
import en from './locales/en.json'
i18next.use(LanguageDetector).use(initReactI18next).init({
    debug : true,
    lng: "fa",
    fallbackLng : "fa",
    returnObjects:true,
    resources: {
        en:{
            translation:en
        },
        fa:{
            translation:fa
        }
    }
})