// src/utils/cacheUtils.ts
import type { GameSchedule } from '../api/types/gameSchedule';

const CACHE_PREFIX = 'GSCHEDULE_';
const CACHE_TTL = 30 * 60 * 1000; // 30 分鐘

/**
 * 使用 localStorage 實作簡易快取
 * @param key - 快取鍵值
 * @param fetchFn - 提取資料的函式
 * @returns 快取資料或重新提取的資料
 */
export const cachedFetch = async (
    key: string,
    fetchFn: () => Promise<GameSchedule[]>
): Promise<GameSchedule[]> => {
    const cachedData = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    const now = Date.now();

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < CACHE_TTL) return data;
    }

    const freshData = await fetchFn();
    localStorage.setItem(
        `${CACHE_PREFIX}${key}`,
        JSON.stringify({ data: freshData, timestamp: now })
    );
    return freshData;
};
