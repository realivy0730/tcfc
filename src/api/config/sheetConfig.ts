// src/api/config/sheetConfig.ts
/**
 * Google 試算表設定
 */
export const GOOGLE_SHEET_CONFIG = {
    API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
    SCHOOL_SHEET_ID: import.meta.env.VITE_SCHOOL_SHEET_ID,
    PUBLIC_SHEET_ID: import.meta.env.VITE_PUBLIC_SHEET_ID,
    RANGE: 'A2:K',
};

/**
 * 試算表資訊設定
 */
export const SHEET_NAMES = {
    U10_SCHOOL: '學校中年級賽程表',
    U12_SCHOOL: '學校高年級賽程表',
    U15_SCHOOL: '學校國中組賽程表',
    U6_PUBLIC: '幼兒組賽程表',
    U8_PUBLIC: '低年級組賽程表',
    U10_PUBLIC_BOY: '中年級男生組賽程表',
    U10_PUBLIC_GIRL: '中年級女生組賽程表',
    U12_PUBLIC_BOY: '高年級男生組賽程表',
    U12_PUBLIC_GIRL: '高年級女生組賽程表',
    U15_PUBLIC: '公開國中組賽程表',
    U18_PUBLIC: '公開高中組賽程表'
} as const;

export const SHEET_INFO = {
    U10_SCHOOL: { sheetName: SHEET_NAMES.U10_SCHOOL, category: 'school', displayName: '學校中年級' },
    U12_SCHOOL: { sheetName: SHEET_NAMES.U12_SCHOOL, category: 'school', displayName: '學校高年級' },
    U15_SCHOOL: { sheetName: SHEET_NAMES.U15_SCHOOL, category: 'school', displayName: '學校國中組' },
    U6_PUBLIC: { sheetName: SHEET_NAMES.U6_PUBLIC, category: 'public', displayName: '幼兒組' },
    U8_PUBLIC: { sheetName: SHEET_NAMES.U8_PUBLIC, category: 'public', displayName: '低年級組' },
    U10_PUBLIC_BOY: { sheetName: SHEET_NAMES.U10_PUBLIC_BOY, category: 'public', displayName: '中年級男生組' },
    U10_PUBLIC_GIRL: { sheetName: SHEET_NAMES.U10_PUBLIC_GIRL, category: 'public', displayName: '中年級女生組' },
    U12_PUBLIC_BOY: { sheetName: SHEET_NAMES.U12_PUBLIC_BOY, category: 'public', displayName: '高年級男生組' },
    U12_PUBLIC_GIRL: { sheetName: SHEET_NAMES.U12_PUBLIC_GIRL, category: 'public', displayName: '高年級女生組' },
    U15_PUBLIC: { sheetName: SHEET_NAMES.U15_PUBLIC, category: 'public', displayName: '公開國中組' },
    U18_PUBLIC: { sheetName: SHEET_NAMES.U18_PUBLIC, category: 'public', displayName: '公開高中組' }
} as const;

export type SheetKeys = keyof typeof SHEET_INFO;
