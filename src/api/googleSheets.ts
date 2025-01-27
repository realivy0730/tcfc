import axiosInstance from '@/utils/axios';
import { API_CONFIG, BASE_URL } from "./config";

export class GoogleSheetsAPI {
    /**
     * 取得試算表資料
     * @param spreadsheetId - 試算表 ID
     * @param sheetName - 工作表名稱
     * @returns 試算表資料
     */
    static async getSheetData(spreadsheetId: string, sheetName: string): Promise<any[]> {
        try {
            const response = await axiosInstance.get(
                `${BASE_URL}/${spreadsheetId}/values/${sheetName}!${API_CONFIG.RANGE}`,
                {
                    params: {
                        key: API_CONFIG.GOOGLE_SHEETS_API_KEY
                    }
                }
            );
            return response.data.values || [];
        } catch (error) {
            console.error('取得試算表資料失敗:', error);
            throw error;
        }
    }
}
