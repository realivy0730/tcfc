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
❯ tree src/api src/utils src/router/ src/assets/styles src/views/mayors-cup
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
├── index.ts
└── mayors-cup.ts
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
src/views/mayors-cup
├── 2024
│   └── WelcomePage.vue
└── 2025
    └── WelcomePage.vue
```

## API 回應欄位解析
欄位索引	欄位名稱	說明	範例值
0	日期	比賽日期與星期	2024.04.27 (週六)
1	場次	比賽編號	1
2	組別	階段標示 (A-Z=小組賽/文字=淘汰賽)	A / 晉
3	時間	比賽時間	18:20
4	主場球隊	主隊名稱	小蜻蜓
5	主場PK	點球大戰結果 (空值=未進行PK)	"" / "3"
6	主場比分	主隊得分	0
7	客場比分	客隊得分	8
8	客場PK	點球大戰結果 (空值=未進行PK)	"" / "3"
9	客場球隊	客隊名稱	威爾森教育機構
10	比賽場地	場地位置	西屯 A

我希望專案未來可以擴充為：
# 市長盃賽程資訊
## 2024年度
1. 公開組 - https://{your_domain}/mayors-cup/2024/open
2. 學校組 - https://{your_domain}/mayors-cup/2024/school

# 需求說明
 1. 請幫我建立 `src/router/index.ts` 的相關資訊
 2. 上述的頁面在設計的時候，請幫我考量到 `RWD` 另外也需要幫我搭配 `src/assets/styles` 相關重點配色下去呈現
 3. 請依照 `API` 的資訊 `學校` 或 `公開` 都是透過 `下拉選單` 切換 `年齡組別` 的賽程表，且製作成搜尋下拉選單讓使用者方便操作切換
 4. 每當切換到該組別的時候，會有兩個 Tab 分別顯示 `分組賽` 與 `淘汰賽` 的內容頁面。
 5. 小組賽 以及 淘汰賽 的分水嶺要透過 `組別` 去區隔，由上往下出現 A-Z 的英文字時，為小組賽的賽程，反之為淘汰賽誤。
 6. 小組賽的部分，我希望是透過表格去做呈現，表格內容將會有：
    - 隊伍名稱
    - 勝 (表示勝幾場)
    - 和 (表示和幾場)
    - 敗 (表示敗幾場)
    - 進球  (所有賽事得分加總)
    - 失球  (所有賽事失分加總)
    - 淨進球
    - 積分 (勝=3分, 和=1分, 敗=0分)
 7. 表格下方會有可以展開的功能 展開會將會是賽事的完整資訊
