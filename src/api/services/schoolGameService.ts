
import { cachedFetch } from '../../utils/cacheUtils';
import { fetchSheetData } from '../../utils/sheetFetcher';
import { GOOGLE_SHEET_CONFIG, SHEET_NAMES } from '../config/sheetConfig';  // 修正這行
import { handleError } from '../../utils/errorHandler';


export const getU10_SCHOOLApi = () =>
    cachedFetch('U10_SCHOOL', async () => {
        try {
            return await fetchSheetData(GOOGLE_SHEET_CONFIG.SCHOOL_SHEET_ID, SHEET_NAMES.U10_SCHOOL);
        } catch (error) {
            handleError(error, '取得U10_SCHOOL賽程表');
            throw error;
        }
    });


export const getU12_SCHOOLApi = () =>
    cachedFetch('U12_SCHOOL', async () => {
        try {
            return await fetchSheetData(GOOGLE_SHEET_CONFIG.SCHOOL_SHEET_ID, SHEET_NAMES.U12_SCHOOL);
        } catch (error) {
            handleError(error, '取得U12_SCHOOL賽程表');
            throw error;
        }
    });


export const getU15_SCHOOLApi = () =>
    cachedFetch('U15_SCHOOL', async () => {
        try {
            return await fetchSheetData(GOOGLE_SHEET_CONFIG.SCHOOL_SHEET_ID, SHEET_NAMES.U15_SCHOOL);
        } catch (error) {
            handleError(error, '取得U15_SCHOOL賽程表');
            throw error;
        }
    });
