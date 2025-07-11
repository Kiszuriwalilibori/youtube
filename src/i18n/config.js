import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        resources: {
            en: {
                translations: () => import("./locales/en/translations.json"),
            },
            pl: {
                translations: () => import("./locales/pl/translations.json"),
            },
        },
        // resources: {
        //     en: {
        //         translations: require("./locales/en/translations.json"),
        //     },
        //     pl: {
        //         translations: require("./locales/pl/translations.json"),
        //     },
        // },
        ns: ["translations"],
        defaultNS: "translations",
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
            lookupLocalStorage: "i18nextLng",
        },
    });

i18n.languages = ["en", "pl"];

export default i18n;
