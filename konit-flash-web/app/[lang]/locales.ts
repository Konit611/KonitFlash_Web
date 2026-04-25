export const locales = ["ko", "en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export const htmlLang: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-CN",
};

export const localeLabels: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

const APP_STORE_ID = "6760538485";
const appStoreStorefront: Record<Locale, string> = {
  ko: "kr",
  en: "us",
  ja: "jp",
  zh: "cn",
};

export const appStoreUrl = (locale: Locale): string =>
  `https://apps.apple.com/${appStoreStorefront[locale]}/app/id${APP_STORE_ID}`;

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
