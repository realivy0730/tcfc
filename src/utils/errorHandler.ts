// src/utils/errorHandler.ts

/**
 * 錯誤處理工具
 * 用於統一處理應用程式中的錯誤情況
 * @param error - 錯誤物件
 * @param context - 錯誤發生的上下文描述
 * @returns void
 */
export const handleError = (error: unknown, context: string): void => {
    // 取得錯誤訊息
    const errorMessage = error instanceof Error
        ? error.message
        : '未知錯誤';

    // 輸出錯誤日誌
    console.error(`[${context}] 錯誤: ${errorMessage}`);

    // 如果是開發環境，輸出完整錯誤堆疊
    if (process.env.NODE_ENV === 'development') {
        console.error('詳細錯誤資訊:', error);
    }
};
