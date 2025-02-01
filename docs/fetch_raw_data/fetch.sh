#!/bin/zsh

# Google Sheets API 金鑰
API_KEY="AIzaSyBPdeJ9e91d1bjYa6t87u0XT649qcStBD4"

# Google Sheets 的 ID
SHEET_IDS=(
    "16wHkCtgAsVNnK2O-ZB-8qusmn_aOrZCGYFQhNqxQVIU"
    "1KK7sWlqxWqvzSePBrg6HUDBqnCP-WMuVQzmfhMzcTLA"
)

# 迴圈處理每個 Google Sheet
for SHEET_ID in "${SHEET_IDS[@]}"; do
    # 取得 Google Sheet 的 metadata
    METADATA_URL="https://sheets.googleapis.com/v4/spreadsheets/$SHEET_ID?key=$API_KEY"
    METADATA=$(curl -s "$METADATA_URL")

    # 解析 metadata 取得所有頁籤的名稱
    SHEET_NAMES=$(echo "$METADATA" | jq -r '.sheets[].properties.title')

    # 迴圈處理每個頁籤
    for SHEET_NAME in "${(f)SHEET_NAMES}"; do
        # 過濾含「總覽」的頁籤
        if [[ "$SHEET_NAME" == *"總覽"* ]]; then
            continue
        fi

        # 構造 API 請求 URL (實際呼叫用)
        API_URL="https://sheets.googleapis.com/v4/spreadsheets/$SHEET_ID/values/'$SHEET_NAME'!A1:K?key=$API_KEY"
        
        # 構造顯示用 URL (Markdown 內顯示用)
        DISPLAY_URL="https://sheets.googleapis.com/v4/spreadsheets/$SHEET_ID/values/'$SHEET_NAME'!A1:K?key={apikey}"

        # 下載 JSON 資料並進行 Minify
        JSON_DATA=$(curl -s "$API_URL" | jq -c '.')

        # 產生 Markdown 檔案
        OUTPUT_FILE="${SHEET_NAME}.md"
        
        # 寫入 Markdown 內容
        {
            echo "Request"
            echo "GET $DISPLAY_URL"
            echo "Response"
            echo '```json'
            echo "$JSON_DATA"
            echo '```'
        } > "$OUTPUT_FILE"

        echo "已產生: $OUTPUT_FILE"
    done
done

echo "所有頁籤資料已轉換為 Markdown 檔案！"