import { GoogleSheetsAPI } from '../api/googleSheets';
import {
    Schedule,
    SchoolScheduleCategory,
    PublicScheduleCategory,
    CompetitionGroup
} from '../api/types/schedule';
import { API_CONFIG } from '../api/config';

/**
 * 賽程表服務
 */
export class ScheduleService {
    /**
     * 取得所有賽程表資料
     * @param group - 賽事組別
     * @returns 所有賽程表資料
     */
    static async getAllSchedules(group: CompetitionGroup): Promise<Map<string, Schedule[]>> {
        const schedules = new Map<string, Schedule[]>();

        if (group === CompetitionGroup.SCHOOL) {
            await this.getAllSchoolSchedules(schedules);
        } else {
            await this.getAllPublicSchedules(schedules);
        }

        return schedules;
    }

    /**
     * 取得特定賽程表資料
     * @param group - 賽事組別
     * @param category - 賽程表分類
     * @returns 特定賽程表資料
     */
    static async getSchedule(
        group: CompetitionGroup,
        category: SchoolScheduleCategory | PublicScheduleCategory
    ): Promise<Schedule[]> {
        const spreadsheetId = group === CompetitionGroup.SCHOOL
            ? API_CONFIG.SPREADSHEET_IDS.SCHOOL
            : API_CONFIG.SPREADSHEET_IDS.PUBLIC;

        const data = await GoogleSheetsAPI.getSheetData(spreadsheetId, category);
        return this.parseScheduleData(data);
    }

    /**
     * 取得所有學校組賽程表
     * @param schedules - 儲存賽程表的 Map
     */
    private static async getAllSchoolSchedules(schedules: Map<string, Schedule[]>): Promise<void> {
        for (const category of Object.values(SchoolScheduleCategory)) {
            const data = await this.getSchedule(CompetitionGroup.SCHOOL, category);
            schedules.set(category, data);
        }
    }

    /**
     * 取得所有公開組賽程表
     * @param schedules - 儲存賽程表的 Map
     */
    private static async getAllPublicSchedules(schedules: Map<string, Schedule[]>): Promise<void> {
        for (const category of Object.values(PublicScheduleCategory)) {
            const data = await this.getSchedule(CompetitionGroup.PUBLIC, category);
            schedules.set(category, data);
        }
    }

    /**
     * 解析試算表資料為賽程表格式
     * @param data - 原始試算表資料
     * @returns 處理過的賽程表資料
     */
    private static parseScheduleData(data: any[]): Schedule[] {
        // 移除標題列
        const rows = data.slice(1);

        return rows.map(row => ({
            time: row[0],
            court: row[1],
            category: row[2],
            teamA: row[3],
            teamB: row[4],
            score: row[5],
            winner: row[6]
        }));
    }
}
