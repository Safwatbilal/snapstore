import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "@/localization/ar.json";
import en from "@/localization/en.json";

const isBrowser = typeof window !== "undefined";

const language = isBrowser ? localStorage.getItem("i18nextLng") || "en" : "en";

if (isBrowser) {
  if (language === "ar") {
    document.documentElement.lang = "ar";
    document.body.dir = "ltr";
  } else {
    document.documentElement.lang = "en";
    document.body.dir = "ltr";
  }
}

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: language,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") {
    document.documentElement.lang = lang;
    localStorage.setItem("i18nextLng", lang);

    switch (lang) {
      case "ar":
        document.body.dir = "rtl";
        break;
      default:
        document.body.dir = "ltr";
    }
  }
};

export default i18n;
