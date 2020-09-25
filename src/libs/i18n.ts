import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";

i18n
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: process.env.NODE_ENV !== "production",

    fallbackLng: "ru",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    react: {
      useSuspense: true,
      wait: true,
    },

    detection: {
      lookupCookie: "lang",
    },

    backend: {
      loadPath: `/sedmax/web/ui/${process.env.REACT_APP_NAME}/locales/{{lng}}/{{ns}}.json`,
    },
  });

export default i18n;
