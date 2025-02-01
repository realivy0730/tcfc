
import { cachedFetch } from '../utils/cacheUtils';
import { fetchSheetData } from '../utils/sheetFetcher';
import { GOOGLE_SHEET_CONFIG, SHEET_NAMES } from '../config/googleSheetConfig';
import { handleError } from '../utils/errorHandler';


export const getU6_PUBLICApi = () =>
  cachedFetch('U6_PUBLIC', async () => {
    try {
      return await fetchSheetData(GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID, SHEET_NAMES.U6_PUBLIC);
    } catch (error) {
      handleError(error, '取得U6_PUBLIC賽程表');
      throw error;
    }
  });


export const getU8_PUBLICApi = () =>
  cachedFetch('U8_PUBLIC', async () => {
    try {
      return await fetchSheetData(GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID, SHEET_NAMES.U8_PUBLIC);
    } catch (error) {
      handleError(error, '取得U8_PUBLIC賽程表');
      throw error;
    }
  });


export const getU10_PUBLIC_BOYApi = () =>
  cachedFetch('U10_PUBLIC_BOY', async () => {
    try {
      return await fetchSheetData(GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID, SHEET_NAMES.U10_PUBLIC_BOY);
    } catch (error) {
      handleError(error, '取得U10_PUBLIC_BOY賽程表');
      throw error;
    }
  });


export const getU10_PUBLIC_GIRLApi = () =>
  cachedFetch('U10_PUBLIC_GIRL', async () => {
    try {
      return await fetchSheetData(GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID, SHEET_NAMES.U10_PUBLIC_GIRL);
    } catch (error) {
      handleError(error, '取得U10_PUBLIC_GIRL賽程表');
      throw error;
    }
  });


export const getU12_PUBLIC_BOYApi = () =>
  cachedFetch('U12_PUBLIC_BOY', async () => {
    try {
      return await fetchSheetData(GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID, SHEET_NAMES.U12_PUBLIC_BOY);
    } catch (error) {
      handleError(error, '取得U12_PUBLIC_BOY賽程表');
      throw error;
    }
  });


export const getU12_PUBLIC_GIRLApi = () =>
  cachedFetch('U12_PUBLIC_GIRL', async () => {
    try {
      return await fetchSheetData(GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID, SHEET_NAMES.U12_PUBLIC_GIRL);
    } catch (error) {
      handleError(error, '取得U12_PUBLIC_GIRL賽程表');
      throw error;
    }
  });


export const getU15_PUBLICApi = () =>
  cachedFetch('U15_PUBLIC', async () => {
    try {
      return await fetchSheetData(GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID, SHEET_NAMES.U15_PUBLIC);
    } catch (error) {
      handleError(error, '取得U15_PUBLIC賽程表');
      throw error;
    }
  });


export const getU18_PUBLICApi = () =>
  cachedFetch('U18_PUBLIC', async () => {
    try {
      return await fetchSheetData(GOOGLE_SHEET_CONFIG.PUBLIC_SHEET_ID, SHEET_NAMES.U18_PUBLIC);
    } catch (error) {
      handleError(error, '取得U18_PUBLIC賽程表');
      throw error;
    }
  });
