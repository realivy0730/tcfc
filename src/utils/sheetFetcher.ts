// src/utils/sheetFetcher.ts
import { GameSchedule } from '../api/types/gameSchedule';
import { GOOGLE_SHEET_CONFIG } from '../api/config/sheetConfig';
import axiosInstance from './axios';

/**
 * 從 Google 試算表提取資料
 * @param sheetId - 試算表 ID
 * @param sheetName - 工作表名稱
 * @returns 賽程表資料陣列
 */
export const fetchSheetData = async (
    sheetId: string,
    sheetName: string
): Promise<GameSchedule[]> => {
    const { API_KEY, RANGE } = GOOGLE_SHEET_CONFIG;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}!${RANGE}?key=${API_KEY}`;

    try {
        const response = await axiosInstance.get(url);
        if (!response.data.values?.length) return [];

        return response.data.values.slice(1).map(normalizeRowData);
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
