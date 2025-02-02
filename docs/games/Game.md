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

# 關鍵資訊
目前在設計一個網站他每年都會舉辦 市長盃 然而我一開始設計的時候並沒有意識到他有擴充性的問題 所以已經產生了部分的資料
我已經把相關的檔案用在附件 目前他們的檔案架構為
```
❯ tree src/api src/utils src/router/ src/assets/styles
src/api
├── config
│   └── sheetConfig.ts
├── services
│   └── mayorsCup
│       ├── 2024
│       │   ├── openGameService.ts
│       │   └── schoolGameService.ts
│       ├── 2025
│       │   ├── openGameService.ts
│       │   └── schoolGameService.ts
│       ├── baseGameService.ts
│       └── index.ts
└── types
    └── gameSchedule.ts
src/utils
├── axios.ts
├── cacheUtils.ts
├── errorHandler.ts
└── sheetFetcher.ts

src/router/
└── index.ts

src/assets/styles
├── _settings.scss
├── base
│   ├── _reset.scss
│   └── _variables.scss
├── components
│   ├── _footer.scss
│   ├── _header.scss
│   └── _navigation.scss
├── main.scss
└── views
    ├── _index.scss
    ├── _not-found.scss
    ├── _score.scss
    └── _u10.scss

```

我希望專案未來可以擴充為：
# 市長盃賽程資訊
## 2024年度
1. 歡迎頁 - https://{your_domain}/mayors-cup/2024
2. 公開組 - https://{your_domain}/mayors-cup/2024/open
3. 學校組 - https://{your_domain}/mayors-cup/2024/school

## 2025年度
1. 歡迎頁 - https://{your_domain}/mayors-cup/2025
2. 公開組 - https://{your_domain}/mayors-cup/2025/open
3. 學校組 - https://{your_domain}/mayors-cup/2025/school

# 需求說明
 - 請幫我建立 `src/router/index.ts` 的相關資訊
 - 請幫我建立 `views` 的相關檔案
 - 在 `歡迎頁` 的部分 2024 我希望顯示個組別的前四名 然後 2025 的部分幫我顯示籌備中
 - 上述的頁面在設計的時候，請幫我考量到 `RWD` 另外也需要幫我搭配 `src/assets/styles` 相關重點配色下去呈現
 - 再顯示顯示前四名的部分 我希望能夠搭配一些 `icon` 來突顯他們的優秀表現
 - 我們先處理 `歡迎頁` 為優先 `公開組` 與 `學校組` 晚一點我們再來處理
