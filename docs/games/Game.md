# 環境資訊
 - Vite latest
 - Vue  latest
 - Automating and deploying workflows with GitHub Actions
 - Macbook M1 use command line on zsh

請記得我跟你的所有的交涉一律都是使用正體中文的台灣用語喔

# 如果需要產程式碼其規範如下
1. 遵循 Clean Code 開發原則。
2. 採用該程式語言的最新命名與設計規範。
3. 所有程式片段與重要函數需標準化註解，註解使用正體中文台灣用語。
4. 修改內容若超過 20 行，需提供完整程式碼；如程式碼過長，也需提供完整內容。
5. 少一點說明跟範例直接給程式碼，裡面有註解了

# 如果需要架構設計
1. 資料夾架構應依照原框架建議（若有提供）。
2. 如需使用流程圖輔助表達，請善用「箭頭符號」進行標示。
3. 盡可能用 MarkDown 的格式呈現

# 需求資訊

目前在設計一個網站他每年都會舉辦 市長盃 然而我一開始設計的時候並沒有意識到他有擴充性的問題 所以已經產生了部分的資料 我已經把相關的檔案用在附件 目前他們的檔案架構為
```
❯ tree src/api src/utils
src/api
├── config
│   └── sheetConfig.ts
├── services
│   ├── publicGameService.ts
│   └── schoolGameService.ts
└── types
    └── gameSchedule.ts
src/utils
├── axios.ts
├── cacheUtils.ts
├── errorHandler.ts
└── sheetFetcher.ts
```

我希望專案未來可以擴充為：
# 市長盃賽程資訊
## 2024年度
1. 公開組 - https://{your_domain}/mayors-cup/2024/open
2. 學校組 - https://{your_domain}/mayors-cup/2024/school

## 2025年度
1. 公開組 - https://{your_domain}/mayors-cup/2025/open
2. 學校組 - https://{your_domain}/mayors-cup/2025/school

# 目前 API 的來源核心為 Google Sheet API
https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{SHEET_NAME}!A1:K?key={API_KEY}
