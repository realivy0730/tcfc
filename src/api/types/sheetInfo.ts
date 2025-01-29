// src/api/types/sheetInfo.ts
export interface SheetInfo {
    sheetName: string;    // 工作表名稱
    ageGroup: string;     // 年齡組別
    displayName: string;  // 顯示名稱
    category: 'school' | 'public';  // 分類：學校組或公開組
    gender?: 'boy' | 'girl';       // 性別分組（選填）
}
