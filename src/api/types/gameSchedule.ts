// src/api/types/gameSchedule.ts
/**
 * 賽程表資料結構
 * @interface GameSchedule
 */
export interface GameSchedule {
    date: string;         // 比賽日期 (格式: YYYY-MM-DD)
    gameNumber: string;   // 場次編號
    group: string;        // 比賽組別
    time: string;         // 比賽時間 (格式: HH:mm)
    homeTeam: string;     // 主場隊伍名稱
    homePK: number;       // 主場點球得分
    homeScore: string;    // 主場比分
    awayScore: string;    // 客場比分
    awayPK: number;       // 客場點球得分
    awayTeam: string;     // 客場隊伍名稱
    venue: string;        // 比賽場地
}
