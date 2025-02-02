// src/api/services/mayorsCup/2024/schoolGameService.ts
import { BaseGameService } from '../baseGameService';
import { MAYORS_CUP_CONFIG } from '../../../config/sheetConfig';
import type { GameSchedule } from '../../../types/gameSchedule';

/**
 * 2024年度學校組賽事服務
 * @class SchoolGameService2024
 * @extends {BaseGameService}
 */
export class SchoolGameService2024 extends BaseGameService {
    constructor() {
        super('2024', MAYORS_CUP_CONFIG.SHEET_IDS['2024'].SCHOOL, 'school');
    }

    /**
     * 取得中年級賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU10Schedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U10');
    }

    /**
     * 取得高年級賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU12Schedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U12');
    }

    /**
     * 取得國中組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU15Schedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U15');
    }
}
