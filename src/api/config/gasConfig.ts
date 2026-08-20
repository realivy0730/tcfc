// src/api/config/gasConfig.ts
// GAS 後端設定（Issue #7：讀寫代理 + 白名單護欄）
// - VITE_GAS_URL：GAS Web App `/exec` 網址（部署後取得，見 gas-backend-guide.md）
// - VITE_USE_GAS：設為 'false' 時強制直讀 Google Sheets（配額緩解②）
// - 未設定 VITE_GAS_URL → 自動直讀（不影響既有行為）
export const GAS_CONFIG = {
    URL: import.meta.env.VITE_GAS_URL || '',
    USE_GAS: import.meta.env.VITE_USE_GAS !== 'false' && !!import.meta.env.VITE_GAS_URL,
} as const;