// src/api/services/publicGameService.ts
import { cachedFetch } from '../../utils/cacheUtils';
import { fetchSheetData } from '../../utils/sheetFetcher';
import { GOOGLE_SHEET_CONFIG, SHEET_NAMES } from '../config/sheetConfig';  // 修正這行
import { handleError } from '../../utils/errorHandler';


/**
 * 取得幼兒組賽程表
 * @returns 賽程表資料陣列
 */
export const getU6_PUBLICApi = () =>
    cachedFetch('U6_PUBLIC', async () => {
        try {
            return await fetchSheetData(
                GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID,
                SHEET_NAMES.U6_PUBLIC
            );
        } catch (error) {
            handleError(error, '取得幼兒組賽程表');
            throw error;
        }
    });


/**
 * 取得低年級組賽程表
 * @returns 賽程表資料陣列
 */
export const getU8_PUBLICApi = () =>
    cachedFetch('U8_PUBLIC', async () => {
        try {
            return await fetchSheetData(
                GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID,
                SHEET_NAMES.U8_PUBLIC
            );
        } catch (error) {
            handleError(error, '取得低年級組賽程表');
            throw error;
        }
    });


/**
 * 取得中年級男生組賽程表
 * @returns 賽程表資料陣列
 */
export const getU10_PUBLIC_BOYApi = () =>
    cachedFetch('U10_PUBLIC_BOY', async () => {
        try {
            return await fetchSheetData(
                GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID,
                SHEET_NAMES.U10_PUBLIC_BOY
            );
        } catch (error) {
            handleError(error, '取得中年級男生組賽程表');
            throw error;
        }
    });


/**
 * 取得中年級女生組賽程表
 * @returns 賽程表資料陣列
 */
export const getU10_PUBLIC_GIRLApi = () =>
    cachedFetch('U10_PUBLIC_GIRL', async () => {
        try {
            return await fetchSheetData(
                GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID,
                SHEET_NAMES.U10_PUBLIC_GIRL
            );
        } catch (error) {
            handleError(error, '取得中年級女生組賽程表');
            throw error;
        }
    });


/**
 * 取得高年級男生組賽程表
 * @returns 賽程表資料陣列
 */
export const getU12_PUBLIC_BOYApi = () =>
    cachedFetch('U12_PUBLIC_BOY', async () => {
        try {
            return await fetchSheetData(
                GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID,
                SHEET_NAMES.U12_PUBLIC_BOY
            );
        } catch (error) {
            handleError(error, '取得高年級男生組賽程表');
            throw error;
        }
    });


/**
 * 取得高年級女生組賽程表
 * @returns 賽程表資料陣列
 */
export const getU12_PUBLIC_GIRLApi = () =>
    cachedFetch('U12_PUBLIC_GIRL', async () => {
        try {
            return await fetchSheetData(
                GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID,
                SHEET_NAMES.U12_PUBLIC_GIRL
            );
        } catch (error) {
            handleError(error, '取得高年級女生組賽程表');
            throw error;
        }
    });


/**
 * 取得公開國中組賽程表
 * @returns 賽程表資料陣列
 */
export const getU15_PUBLICApi = () =>
    cachedFetch('U15_PUBLIC', async () => {
        try {
            return await fetchSheetData(
                GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID,
                SHEET_NAMES.U15_PUBLIC
            );
        } catch (error) {
            handleError(error, '取得公開國中組賽程表');
            throw error;
        }
    });


/**
 * 取得公開高中組賽程表
 * @returns 賽程表資料陣列
 */
export const getU18_PUBLICApi = () =>
    cachedFetch('U18_PUBLIC', async () => {
        try {
            return await fetchSheetData(
                GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID,
                SHEET_NAMES.U18_PUBLIC
            );
        } catch (error) {
            handleError(error, '取得公開高中組賽程表');
            throw error;
        }
    });
