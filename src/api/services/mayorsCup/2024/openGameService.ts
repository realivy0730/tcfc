// src/api/services/mayorsCup/2024/openGameService.ts
import { BaseGameService } from '../baseGameService';
import { MAYORS_CUP_CONFIG } from '../../../config/sheetConfig';
import type { GameSchedule } from '../../../types/gameSchedule';

/**
 * 2024年度公開組賽事服務
 * @class OpenGameService2024
 * @extends {BaseGameService}
 */
export class OpenGameService2024 extends BaseGameService {
    constructor() {
        super('2024', MAYORS_CUP_CONFIG.SHEET_IDS['2024'].OPEN, 'open');
    }

    /**
     * 取得幼兒組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU6Schedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U6');
    }

    /**
     * 取得低年級組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU8Schedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U8');
    }

    /**
     * 取得中年級男生組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU10BoySchedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U10_BOY');
    }

    /**
     * 取得中年級女生組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU10GirlSchedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U10_GIRL');
    }

    /**
     * 取得高年級男生組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU12BoySchedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U12_BOY');
    }

    /**
     * 取得高年級女生組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU12GirlSchedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U12_GIRL');
    }

    /**
     * 取得公開國中組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU15Schedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U15');
    }

    /**
     * 取得公開高中組賽程表
     * @returns {Promise<GameSchedule[]>} 賽程表資料陣列
     */
    async getU18Schedule(): Promise<GameSchedule[]> {
        return this.fetchSchedule('U18');
    }
}
