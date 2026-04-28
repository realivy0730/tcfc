import type { GameSchedule } from '../types/gameSchedule';
import { OpenGameService2025 } from './mayorsCup/2025/openGameService';
import { SchoolGameService2025 } from './mayorsCup/2025/schoolGameService';

const openService = new OpenGameService2025();
const schoolService = new SchoolGameService2025();

/** 取得 2025 最新比分（已完賽，最多 5 筆，依日期降序） */
export async function getLatestResults(limit = 5): Promise<(GameSchedule & { category: string })[]> {
    const fetchers = [
        openService.getU18Schedule().then(d => d.map(g => ({ ...g, category: '公開高中組' }))),
        openService.getU15Schedule().then(d => d.map(g => ({ ...g, category: '公開國中組' }))),
        openService.getU12BoySchedule().then(d => d.map(g => ({ ...g, category: '高年級男生組' }))),
        openService.getU12GirlSchedule().then(d => d.map(g => ({ ...g, category: '高年級女生組' }))),
        schoolService.getU15Schedule().then(d => d.map(g => ({ ...g, category: '學校國中組' }))),
    ];

    const results = await Promise.allSettled(fetchers);
    const all = results
        .filter((r): r is PromiseFulfilledResult<(GameSchedule & { category: string })[]> => r.status === 'fulfilled')
        .flatMap(r => r.value)
        .filter(g => g.homeScore !== '' && g.awayScore !== '')
        .sort((a, b) => b.date.localeCompare(a.date));

    return all.slice(0, limit);
}
