import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from 'i18next-browser-languagedetector';
import ar from "@/localization/ar.json";
import en from "@/localization/en.json";

const language = localStorage.getItem("i18nextLng") || "en";
console.log(language)
if (language === "ar") {
  document.documentElement.lang = "ar";
  document.body.dir = "ltr";
} else {
  document.documentElement.lang = "en";
  document.body.dir = "ltr";
}
const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};
i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: language,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

//   i18n.on("languageChanged", (language) => {

//   if (i18n.language !== language) {
//     i18n.changeLanguage(language);

//   }
// }

// );

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
  localStorage.setItem("i18nextLng", lang);

  switch (lang) {
    case "ar":
      document.body.dir = "rtl";
      break;
    default:
      document.body.dir = "ltr";
  }
};

export default i18n;
