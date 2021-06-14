import Constants from "expo-constants";

// DATABASE AND API
export const SQLiteDatabaseName = "diaryStoryticsV1.db";
export const SUPABASE_URL = "https://svysmlxhputrpnaoigve.supabase.co";
export const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjgxNDQ4NCwiZXhwIjoxOTI4MzkwNDg0fQ.z-MICAaM9GVzKHcGpN8jY0KSXOngZWz72uwyfEDMCKk";

// GLOBAL
export const isDev = __DEV__;
export const isLiteVersion =
  Constants.manifest.extra?.appType === "lite" || false;

// GOOGLE MOB ADS
export const adIdsDev = {
  banner: "ca-app-pub-3940256099942544/6300978111",
  interstitial: "ca-app-pub-3940256099942544/1033173712",
};

export const adIdsProd = {
  banner: "ca-app-pub-3172245439816307/2333004707",
  interstitial: "ca-app-pub-3172245439816307/9146180282",
};

export const adUnitID = Constants.isDevice && !isDev ? adIdsProd : adIdsDev;

// URLS
export const billing = {
  checkout: `https://billing.storytics.pt/diary/plans/checkout`,
  plans: `https://billing.storytics.pt/diary/plans/select`,
  portal: `https://billing.storytics.pt/diary/plans/portal`,
};
export const termsUrl = "https://www.storytics.pt/diary/terms";
export const privacyUrl = "https://www.storytics.pt/diary/privacy";
export const diaryProStoreUrl = "market://details?id=pt.storytics.diary";

// SESSION STORAGE IDS
export const userCloudLastSyncItem = "@st_dia_cloud_last_sync";
export const userActiveSubscriptionItem = "@st_dia_active_subscription";
export const userThemeItem = "@st_dia_user_theme";
export const userPasswordPinItem = "@st_dia_user_password_pin";
export const userEditorDraftItem = "@st_dia_user_editor_draft";
export const userServePersonalizedAdsItem =
  "@st_dia_user_serve_personalized_ads";
export const userStoreReviewTimeItem = "@st_dia_store_review_time";
