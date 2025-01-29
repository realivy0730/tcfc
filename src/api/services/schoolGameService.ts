import { GOOGLE_SHEET_CONFIG, SHEET_NAMES } from '../config/googleSheetConfig';
import type { GameSchedule } from '../types/gameSchedule';

/**
 * 從 Google 試算表取得資料的基礎方法
 * @param sheetId - 試算表 ID
 * @param sheetName - 工作表名稱
 * @returns 賽程表資料陣列
 */
const fetchSheetData = async (sheetId: string, sheetName: string): Promise<GameSchedule[]> => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${GOOGLE_SHEET_CONFIG.RANGE}?key=${GOOGLE_SHEET_CONFIG.API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values || data.values.length < 2) {
            throw new Error('無法取得賽程資料');
        }

        // 移除標題列並轉換資料格式
        return data.values.slice(1).map(row => ({
            date: row[0] || '',
            gameNumber: row[1] || '',
            group: row[2] || '',
            time: row[3] || '',
            homeTeam: row[4] || '',
            homePK: row[5] || '',
            homeScore: row[6] || '',
            awayScore: row[7] || '',
            awayPK: row[8] || '',
            awayTeam: row[9] || '',
            venue: row[10] || ''
        }));
    } catch (error) {
        console.error(`取得${sheetName}資料時發生錯誤:`, error);
        throw error;
    }
};

/**
 * 取得學校中年級組賽程表
 */
export const getU10SchoolApi = () =>
    fetchSheetData(GOOGLE_SHEET_CONFIG.SCHOOL_SHEET_ID, SHEET_NAMES.U10_SCHOOL);

/**
 * 取得學校高年級組賽程表
 */
export const getU12SchoolApi = () =>
    fetchSheetData(GOOGLE_SHEET_CONFIG.SCHOOL_SHEET_ID, SHEET_NAMES.U12_SCHOOL);

/**
 * 取得學校國中組賽程表
 */
export const getU15SchoolApi = () =>
    fetchSheetData(GOOGLE_SHEET_CONFIG.SCHOOL_SHEET_ID, SHEET_NAMES.U15_SCHOOL);
