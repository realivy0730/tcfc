// src/api/types/gameSchedule.ts

/**
 * 賽程資料介面
 * @interface GameSchedule
 */
interface GameSchedule {
    /** 比賽日期 (格式: YYYY-MM-DD) */
    date: string;

    /** 場次編號 */
    gameNumber: string;

    /** 比賽組別 */
    group: string;

    /** 比賽時間 (格式: HH:mm) */
    time: string;

    /** 主場隊伍名稱 */
    homeTeam: string;

    /** 主場點球得分 */
    homePK: number;

    /** 主場比分 */
    homeScore: string;

    /** 客場比分 */
    awayScore: string;

    /** 客場點球得分 */
    awayPK: number;

    /** 客場隊伍名稱 */
    awayTeam: string;

    /** 比賽場地 */
    venue: string;
}

// 匯出類型
export type { GameSchedule };
