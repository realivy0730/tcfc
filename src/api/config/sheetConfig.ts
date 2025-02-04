// src/api/config/sheetConfig.ts

/**
 * API 設定介面
 */
interface ApiConfig {
    API_KEY: string;
    SHEET_IDS: {
        [key: string]: {
            SCHOOL: string;
            OPEN: string;
        }
    };
    RANGE: string;
}

/**
 * 組別設定介面
 */
interface SheetNames {
    [key: string]: {
        school: {
            [key: string]: string;
        };
        open: {
            [key: string]: string;
        };
    };
}

/**
 * Google Sheet API 設定
 */
export const MAYORS_CUP_CONFIG: ApiConfig = {
    API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
    SHEET_IDS: {
        '2024': {
            SCHOOL: "16wHkCtgAsVNnK2O-ZB-8qusmn_aOrZCGYFQhNqxQVIU",
            OPEN: "1KK7sWlqxWqvzSePBrg6HUDBqnCP-WMuVQzmfhMzcTLA",
        },
        '2025': {
            SCHOOL: "16wHkCtgAsVNnK2O-ZB-8qusmn_aOrZCGYFQhNqxQVIU",
            OPEN: "1KK7sWlqxWqvzSePBrg6HUDBqnCP-WMuVQzmfhMzcTLA",
        }
    },
    RANGE: 'A2:K',
};

/**
 * 各年度賽事組別設定
 */
export const SHEET_NAMES: SheetNames = {
    '2024': {
        school: {
            U10: '學校中年級賽程表',
            U12: '學校高年級賽程表',
            U15: '學校國中組賽程表',
        },
        open: {
            U6: '幼兒組賽程表',
            U8: '低年級組賽程表',
            U10_BOY: '中年級男生組賽程表',
            U10_GIRL: '中年級女生組賽程表',
            U12_BOY: '高年級男生組賽程表',
            U12_GIRL: '高年級女生組賽程表',
            U15: '公開國中組賽程表',
            U18: '公開高中組賽程表',
        },
    },
    '2025': {
        school: {
            // 2025年度的學校組別設定
            U10: '學校中年級賽程表',
            U12: '學校高年級賽程表',
            U15: '學校國中組賽程表',
            // 如果有新增或移除的組別，可以在這裡調整
        },
        open: {
            // 2025年度的公開組別設定
            U6: '幼兒組賽程表',
            U8: '低年級組賽程表',
            U10_BOY: '中年級男生組賽程表',
            U10_GIRL: '中年級女生組賽程表',
            U12_BOY: '高年級男生組賽程表',
            U12_GIRL: '高年級女生組賽程表',
            U15: '公開國中組賽程表',
            U18: '公開高中組賽程表',
            // 如果有新增或移除的組別，可以在這裡調整
        },
    },
};

/**
 * 取得特定年度的組別設定
 * @param year 年度
 * @returns 該年度的組別設定
 */
export const getYearConfig = (year: string) => {
    return SHEET_NAMES[year];
};

/**
 * 取得特定年度和類別的組別設定
 * @param year 年度
 * @param category 類別（school 或 open）
 * @returns 該年度和類別的組別設定
 */
export const getCategoryConfig = (year: string, category: 'school' | 'open') => {
    return SHEET_NAMES[year]?.[category];
};

// 型別定義
export type YearKey = keyof typeof SHEET_NAMES;
export type CategoryKey = keyof (typeof SHEET_NAMES)[YearKey];
export type SchoolDivisionKey = keyof (typeof SHEET_NAMES)[YearKey]['school'];
export type OpenDivisionKey = keyof (typeof SHEET_NAMES)[YearKey]['open'];
