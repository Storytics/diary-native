import * as Localization from "expo-localization";
import i18n from "i18n-js";
// Dates
import dayjs from "dayjs";
import "dayjs/locale/pt";
import "dayjs/locale/en";
// Languages
import English from "./lang/en";
import Portuguese from "./lang/pt";

// Set the key-value pairs for the different languages to support.
i18n.translations = {
  en: English,
  "pt-BR": Portuguese,
  "pt-PT": Portuguese,
};

const currentLang = Localization.locale;

i18n.locale = currentLang;

const dateLanguage = {
  "pt-PT": "pt",
  "pt-BR": "pt",
  en: "en",
};

// @ts-ignore
dayjs.locale(dateLanguage[currentLang || "en"]);

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default i18n;
