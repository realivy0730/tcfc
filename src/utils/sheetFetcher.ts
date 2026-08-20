// src/utils/sheetFetcher.ts
import type { GameSchedule } from '../api/types/gameSchedule';
import { MAYORS_CUP_CONFIG } from '../api/config/sheetConfig';
import { GAS_CONFIG } from '../api/config/gasConfig';
import axiosInstance from './axios';

/**
 * 從賽程資料源提取資料（GAS 代理優先，自動降級直讀 Google Sheets）
 * @param sheetId - 試算表 ID
 * @param sheetName - 工作表名稱
 * @returns 賽程表資料陣列
 */
export const fetchSheetData = async (
    sheetId: string,
    sheetName: string
): Promise<GameSchedule[]> => {
    let rows: string[][] | null = null;

    if (GAS_CONFIG.USE_GAS) {
        try {
            rows = await fetchViaGas(sheetId, sheetName);
        } catch (gasError) {
            // 配額緩解（決策 D1）：GAS 觸頂/異常時自動降級直讀，不影響使用者
            console.warn('[sheetFetcher] GAS 讀取失敗，自動降級直讀 Google Sheets', gasError);
        }
    }

    if (!rows) rows = await fetchDirect(sheetId, sheetName);
    return rows.slice(1).map(normalizeRowData);
};

/** GAS 代理讀取（D1=② 讀寫全過 GAS） */
const fetchViaGas = async (sheetId: string, sheetName: string): Promise<string[][]> => {
    const url = `${GAS_CONFIG.URL}?action=schedule&sheetId=${encodeURIComponent(sheetId)}&sheetName=${encodeURIComponent(sheetName)}`;
    const response = await axiosInstance.get(url);
    const payload = response.data;

    if (!payload || payload.result !== 'success' || !Array.isArray(payload.data)) {
        throw new Error(`GAS 回應異常 (${sheetName})`);
    }
    return payload.data as string[][];
};

/** 直讀 Google Sheets（現況路徑；fallback 與非 GAS 模式） */
const fetchDirect = async (sheetId: string, sheetName: string): Promise<string[][]> => {
    const { API_KEY, RANGE } = MAYORS_CUP_CONFIG;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}!${RANGE}?key=${API_KEY}`;

    try {
        const response = await axiosInstance.get(url);
        if (!response.data.values?.length) return [];
        return response.data.values as string[][];
    } catch (error) {
        throw new Error(`資料暫時無法取得，請稍後再試 (錯誤代碼: GSHEET_${sheetName})`);
    }
};

/** 資料格式標準化處理 */
const normalizeRowData = (row: string[]): GameSchedule => ({
    date: row[0] || '',
    gameNumber: row[1] || 'N/A',
    group: row[2] || '',
    time: row[3] || '',
    homeTeam: row[4] || '',
    homePK: Number(row[5]) || 0,
    homeScore: row[6] || '',
    awayScore: row[7] || '',
    awayPK: Number(row[8]) || 0,
    awayTeam: row[9] || '',
    venue: row[10] || ''
});