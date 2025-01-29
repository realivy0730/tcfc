/**
 * 賽程表資料介面
 * @interface GameSchedule
 */
export interface GameSchedule {
    /** 比賽日期 */
    date: string;
    /** 場次編號 */
    gameNumber: string;
    /** 比賽組別 */
    group: string;
    /** 比賽時間 */
    time: string;
    /** 主場隊伍名稱 */
    homeTeam: string;
    /** 主場點球得分 */
    homePK: string;
    /** 主場比分 */
    homeScore: string;
    /** 客場比分 */
    awayScore: string;
    /** 客場點球得分 */
    awayPK: string;
    /** 客場隊伍名稱 */
    awayTeam: string;
    /** 比賽場地 */
    venue: string;
}
