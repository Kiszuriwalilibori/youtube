import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

const i18nConfig: InitOptions = {
    fallbackLng: "en",
    resources: {
        en: {
            translations: {},
        },
        pl: {
            translations: {},
        },
    },
    ns: ["translations"],
    defaultNS: "translations",
    detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "i18nextLng",
    },
};

i18n.use(LanguageDetector).use(initReactI18next).init(i18nConfig);

i18n.addResourceBundle("en", "translations", require("./locales/en/translations.json"), true, true);
i18n.addResourceBundle("pl", "translations", require("./locales/pl/translations.json"), true, true);

i18n.languages = ["en", "pl"];

export default i18n;
