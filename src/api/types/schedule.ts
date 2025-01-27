/**
 * 賽程表類型定義
 */
export interface Schedule {
    time: string;          // 比賽時間
    court: string;         // 場地
    category: string;      // 組別
    teamA: string;         // A隊
    teamB: string;         // B隊
    score: string;         // 比分
    winner: string;        // 勝方
}

/**
 * 學校組賽程表分類
 */
export enum SchoolScheduleCategory {
    MIDDLE = '學校中年級賽程表',
    HIGH = '學校高年級賽程表',
    JUNIOR = '學校國中組賽程表'
}

/**
 * 公開組賽程表分類
 */
export enum PublicScheduleCategory {
    KINDERGARTEN = '幼兒組賽程表',
    LOWER = '低年級組賽程表',
    MIDDLE_BOYS = '中年級男生組賽程表',
    MIDDLE_GIRLS = '中年級女生組賽程表',
    HIGH_BOYS = '高年級男生組賽程表',
    HIGH_GIRLS = '高年級女生組賽程表',
    JUNIOR = '公開國中組賽程表',
    SENIOR = '公開高中組賽程表'
}

/**
 * 賽事組別
 */
export enum CompetitionGroup {
    SCHOOL = 'school',
    PUBLIC = 'public'
}
