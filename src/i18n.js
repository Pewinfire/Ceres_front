import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
const resources = {
  es: {
    translation: {
      MARKETS: "Mercados",
    },
  },
  en: {
    translation: {
      MARKETS: "Markets",
    },
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "es",

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});
export default i18n;
