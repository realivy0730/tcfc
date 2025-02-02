// src/api/services/mayorsCup/baseGameService.ts
import type {  GameSchedule } from '../../types/gameSchedule';
import { fetchSheetData } from '../../../utils/sheetFetcher';
import { cachedFetch } from '../../../utils/cacheUtils';
import { handleError } from '../../../utils/errorHandler';
import { getCategoryConfig, type YearKey } from '../../config/sheetConfig';

export abstract class BaseGameService {
    protected constructor(
        protected readonly year: YearKey,
        protected readonly sheetId: string,
        protected readonly category: 'school' | 'open'
    ) { }

    protected async fetchSchedule(divisionKey: string): Promise<GameSchedule[]> {
        const cacheKey = `${this.year}_${this.category}_${divisionKey}`;
        const categoryConfig = getCategoryConfig(this.year, this.category);

        if (!categoryConfig || !(divisionKey in categoryConfig)) {
            throw new Error(`無效的組別設定: ${this.year} ${this.category} ${divisionKey}`);
        }

        return cachedFetch(cacheKey, async () => {
            try {
                const sheetName = categoryConfig[divisionKey];
                return await fetchSheetData(this.sheetId, sheetName);
            } catch (error) {
                handleError(error, `取得${this.year}年度${this.category}${divisionKey}賽程表`);
                throw error;
            }
        });
    }
}
