---
title: "TCFC 變更記錄"
tags: [Meta, changelog]
version: "1.0"
related_id: ["INDEX"]

## [2026-04-30] — plan: 2026 年度市長盃對戰表開發計畫啟動

**背景**：115年（2026）臺中市市長盃足球錦標賽，需新增年度對戰表頁面。

**115年組別分析**（共 12 組，對比 113年）：
- 新增：公開國中女生組（4 隊）
- 改名：公開國中組 → 公開國中男生組、高年級男生組 → 公開高年級男生組、中年級男生組 → 公開中年級男生組、低年級組 → 低年級男生組
- 相同：公開高中組、學校三組、幼兒組、高年級女生組、中年級女生組

**已完成**：
- 建立「115年市長盃-學校組」（ID: `18i5CONr4CrmcIzW1snhdAPY0FcxbcJ2TLngmRGiPSQ0`）
- 建立「115年市長盃-公開組」（ID: `14KRr6MFZAR-fOxQ4Cpw3CLFF3NqiM27MeZsbE6si-9Y`）

**待完成**：公開組工作表改名（4 個）+ 新增（1 個）→ Phase 2~6

---

## [2026-04-29] — fix: v0.1.2 正式站 Google Sheets API 讀取失敗

**根本原因**：GitHub Secrets 未設定 `VITE_GOOGLE_SHEETS_API_KEY`，build 時 API Key 為空字串，Google Sheets API 回傳 403。

**修復**：在 GitHub Repository Secrets 新增 `VITE_GOOGLE_SHEETS_API_KEY`，重新部署後正常。

---

## [2026-04-29] — fix: v0.1.1 市長盃頁面空白

**根本原因**：`App.vue` transition slot 寫法在 nested routes 下導致子頁面不渲染。

**修復**：`App.vue` 改回 `<router-view />`。

---

## [2026-04-28] — refactor: 2024 WelcomePage CSS 清理

- 移除死碼 308 行（`.tabs-wrapper` 舊選擇器、重複 `.welcome-page` 宣告、`result-card::before` 漸層邊框）
- 合併兩個 `.welcome-page` 區塊為一
- `getGroupCount`、`activeTabIndex` 未使用的 script 變數移除
- media query 內聯至各元件，`background-size` 合併進 shorthand
- focus ring 改為 `rgba(#B89968, 0.3)`（與主題一致）

## [2026-04-28] — feat: 全站主色改為深藍灰 #3f4a52 + 細節修正

**主色替換**：
- `$primary-color`: `#1a2e1c` → `#3f4a52`（深藍灰，含文字色與背景色）
- 影響 7 個檔案：`_variables.scss`、`_index.scss`、`_tournament.scss`、`_footer.scss`、2024/2025 WelcomePage、BaseTournamentPage

**其他修正**：
- `tournaments__year` 顏色從 `rgba(#fff, 0.12)` → `rgba(#3f4a52, 0.1)`（淺色背景可見）
- `results__item` 日期欄寬 100px → 130px
- Google Fonts 換為 `Noto Sans TC`（原為 `Noto Sans`）
- 移除全域 `a:hover { text-decoration: underline }`
- `logo-text` 加 `Noto Serif TC` 字體

## [2026-04-28] — feat: 全站視覺重設計（字體、Tab、Footer）

**字體**：
- `index.html` 加入 Google Fonts `Noto Serif TC`（400/500/600/700/900）
- `_reset.scss` h1~h6 全套 `'Noto Serif TC', serif`

**2024 WelcomePage**：
- Tab 改為卡片式 border 按鈕（米色背景 `#f5f0e8`，頂部古銅金線）
- `view-schedule` 按鈕背景改為古銅金 `#B89968`

**Footer**：
- 上半部：淺灰白 `#f5f5f3`，四欄佈局（品牌 2fr + 導覽 + 服務 + 聯絡）
- 品牌欄：中文名 + 英文小字 + 簡介 + 社群圖示（古銅金圓形）
- 聯絡欄：label 小字母間距（PHONE/EMAIL/ADDRESS）
- 下半部：深灰 `#2e3440`，置中版權文字
- 連結 hover 變古銅金，移除舊箭頭前綴

## [2026-04-27] — feat: 2024/2025 WelcomePage hero 改為深色底圖風格

**2024 WelcomePage**：
- `.page-header` 改為深色 hero：底圖 `welcome-header.jpg` + 遮罩 `rgba(#0a0a0a, 0.55)`
- 加英文小標 `MAYORS CUP 2024`（古銅金 `#B89968`，letter-spacing 0.3em）
- 主標白色，副標 `rgba(#fff, 0.7)`

**2025 WelcomePage**：
- `.hero` 同樣改為深色底圖風格，共用 `welcome-header.jpg`
- 加英文小標 `MAYORS CUP 2025`，結構與 2024 一致

## [2026-04-27] — feat: 2024 WelcomePage page-header 加底圖

**2024 WelcomePage**：
- `.page-header` 加入 `welcome-header.jpg` 底圖（`jean-francois-jouet-bLTkkRXFb8U-unsplash.jpg`）
- 加半透明遮罩 `rgba(#f7f9f7, 0.75)` 保持文字可讀性
- 圖片複製至 `src/assets/images/welcome-header.jpg`



**Hero 視覺重設計（參考 Evolvin Football Field 風格）**：
- Task 1：大型透明背景文字 `TAICHUNG FOOTBALL COMMITTEE`（`opacity: 0.07`）
- Task 2：右側垂直標語「凝聚城市足球魂」（`writing-mode: vertical-rl`）
- Task 3：圓形旋轉 SCROLL DOWN（SVG textPath + `rotateSlow` 動畫）
- Task 4：底部全寬雙 CTA 色塊（左深森林綠「查看賽事」+ 右黃「最新比分」）

**深森林綠色系全站套用**：
- `#0a0a0a` → `#0a1a0e`（最深背景）
- `#111` → `#0f2214`（次背景）
- `#1a1a1a` → `#162d1b`（卡片背景）
- `#2ecc71` → `#4caf6e`（亮草綠強調色）
- `_variables.scss` 新增 `$bg-deepest`、`$bg-dark`、`$bg-card` 語意變數



**淘汰賽 Bracket 優化**：
- 欄位改用 `flex: 1` 均分畫面寬度，不再靠左堆疊
- 每個場次卡片底部加入時間、地點、場次資訊列（`match-meta`）
- 手機版直式排列（冠亞軍在最上，依序往下）

**資料規範統一（F → FINAL）**：
- 前端移除 `F` 作為冠亞軍標籤，改用 `FINAL`
- `BaseTournamentPage` 保留 `F` 相容邏輯（取場次號最大者），待 Apps Script 更新後移除
- `KnockoutBracket.vue` 移除 `F` key
- Apps Script `labelKnockoutStages()` labels 陣列第一個改為 `'FINAL'`
- `fixYoujiKnockout()` 的 `[15,'F']` 改為 `[15,'FINAL']`（待手動更新）

**其他**：
- `$container-width` 從 1200px 調整為 1416px
- `tcfc-ops SKILL.md` 精簡，移除非維運章節

## [2026-04-21] — feat: 淘汰賽對戰圖（橫向線圖）+ 多項 bug 修正

**淘汰賽對戰圖重構**：
- 改為橫向 bracket 線圖（QF → SF → 🥉季殿軍 → 🏆冠亞軍）
- 各階段顏色區分（金/灰/藍/綠）
- 決賽標籤改為「冠亞軍」，季殿軍獨立欄位

**Bug 修正**：
- 修正決賽(F)被過濾問題：`knockoutLabels` 明確列出 `['FINAL','F','SF','QF','R16','R32','3rd']`
- 修正 F 標籤衝突：多場 F 時只取場次號最大的為決賽（解決高年級男生組 F 小組賽衝突）
- 修正 F 標籤被誤判為小組賽：分組賽過濾排除 `F`，`hasKnockoutMatches` 改用明確標籤列表
- 移除淘汰賽下方重複的卡片列表

**新功能**：
- 單組無淘汰賽時（如高年級女生組）顯示「最終排名」🥇🥈🥉4️⃣

**學校組 Apps Script**：
- 對學校組 Sheet 執行 `labelKnockoutStages`，將「晉」改為 SF/3rd/F

**技術細節**：
- `KnockoutBracket.vue`：橫向 bracket，`mainRounds` 陣列控制順序
- `BaseTournamentPage.vue`：`knockoutOnlyLabels` 常數，分組賽過濾排除 F

## [2026-04-20] — feat: Google Sheet 淘汰賽標籤完成，準備開發對戰圖

**完成項目**：
- `labelKnockoutStages()` Apps Script 執行成功，所有 tab「晉」→ QF/SF/3rd/F
- 驗證結果（各 tab F=1, 3rd=1, SF=2，QF 依規模不同）：
  - 幼兒組：QF(2)+SF(2)+3rd(1)+F(1)
  - 中年級女生組：SF(2)+3rd(1)+F(1)
  - 公開國中組、高年級男生組、中年級男生組：QF(4)+SF(2)+3rd(1)+F(1)
  - 低年級組：R16(8)+QF(8)+SF(4)+3rd(1)+F(1)（注意：低年級組 F 欄位同時有小組賽 F 組，grep 會多筆）
- **下一步**：開發前端 KnockoutBracket.vue 對戰圖（讀取 group 欄位分層渲染）

## [2026-04-20] — feat: Apps Script labelKnockoutStages + Google Sheet 標籤規範確認

**背景**：公開組 Google Sheet 各 tab 的淘汰賽場次 C 欄全部標為「晉」，前端無法區分賽事階段。

**分析結果**：
- 各 tab 晉級場次數量：幼兒組(6)、低年級組(24)、中年級男生組(12)、中年級女生組(4)、高年級男生組(12)、公開國中組(8)
- 規則：從最後一場往前數，固定對應 F → 3rd → SF → QF → R16 → R32

**新增 Apps Script 函數 `labelKnockoutStages()`**：
- 對所有非「總覽」tab 執行
- 掃描 C 欄找出所有「晉」的列，從最後往前依序改為 F/3rd/SF/SF/QF/QF/QF/QF/R16...
- 執行後前端可直接用 group 欄位判斷賽事階段

**Google Sheet 標籤規範（確認）**：

| group 欄位 | 意義 |
|-----------|------|
| `A`/`B`/`C`... | 分組賽 |
| `R32` | 三十二強 |
| `R16` | 十六強 |
| `QF` | 八強 |
| `SF` | 四強 |
| `3rd` | 季殿軍賽 |
| `F` | 冠亞軍賽 |

**注意**：Apps Script 完整程式碼需手動貼入（Playwright 無法可靠操作 Monaco editor）

---

## [2026-04-20] — fix: KnockoutBracket 垂直排列修正

**問題**：KnockoutBracket.vue 使用 `display: flex`（預設 row），導致 SF/3rd/F 三個 round 左右並排。

**修復**：將 `.knockout-bracket` 改為 `flex-direction: column`，讓 round 由上至下垂直排列：四強(SF) → 季殿軍(3rd) → 決賽(F)。

**commit**: `3047999` → `feature/visual-redesign`
last_updated: "2026-04-11"
---

# TCFC 變更記錄

## 2026-04-13 — feature/visual-redesign 動態效果

**執行者**: linyuanchun
**分支**: feature/visual-redesign

### 變更內容
- 新增 `v-scroll-reveal` 全域 directive（`src/directives/scrollReveal.ts`）
- Hero 視差滾動 + 進場動畫（英文副標 → 主標 → CTA 依序淡入）
- 導覽列連結 hover 底線滑入效果
- Social icons hover 縮放效果
- CTA 按鈕 hover 填色從左往右掃入動畫
- 頁面切換淡入淡出過場（`src/App.vue`）
- 新增 `FixedCta.vue` 元件（備用，未啟用）
- tcfc-ops SKILL.md 加入動態效果 SOP



**執行者**: linyuanchun
**分支**: feature/visual-redesign

### 變更內容
- Hero 區塊：加入深色遮罩、中英文標題、CTA 按鈕、向下滾動箭頭動畫
- Section 標題：改為英文小標 + 中文大標雙層設計（`title__en` + `title__zh`）
- 卡片樣式：改為方角 + 左側透明邊框，hover 時顯示主色邊框
- 新增 CTA Section：頁面底部行動呼籲區塊（背景圖 + 深色遮罩）
- 色調微調：mission section 背景改為米白（`$bg-color`），summary-block 改為左線設計
- tcfc-ops SKILL.md 加入首頁視覺改版 SOP

## 2026-04-09 — v0.0.8 (release) 首頁背景圖替換

**執行者**: Boday
**分支**: release/v0.0.8 → main + develop

### 變更內容
- 首頁背景圖替換為 Gemini AI 生成貓咪插畫
- 圖片格式從 PNG 轉為 JPEG 70%（desktop 653K / mobile 216K）
- 原圖備份至 `archives/images/`

---

## 2026-04-09 — v0.0.7 (release) changelog symlink

**執行者**: Boday
**分支**: release/v0.0.7 → main + develop

### 變更內容
- 根目錄建立 `changelog.md` symlink → `docs/00_Meta/changelog.md`
- GitHub repo 首頁可直接查看變更記錄，知識庫索引不受影響

---

## 2026-04-09 — v0.0.6 (release) 知識庫治理 + README 優化

**執行者**: Boday
**分支**: release/v0.0.6 → main + develop

### 變更內容（自 v0.0.5 起）
- 優化 README.md（置中標題、badge、資料流圖、賽事組別表、結構註解）
- 修正知識庫索引路徑（專案根目錄 → docs/）
- steering v1.4 加入知識庫路徑規範、知識庫更新指令、README frontmatter 禁止規則
- 建立 `.learnings/LEARNINGS.md`（2 次 Gitflow 違規記錄）
- Gitflow 分支保護提升為全域永久規則

---

## 2026-04-08 — 修正知識庫索引路徑

**執行者**: Boday
**分支**: feature/docs-kb-path-fix → develop

### 變更內容
- 修正 knowledge base `tcfc` 索引路徑
  - 舊：`/Users/boday/工作/Kiro/tcfc`（9,888 items，含 src/node_modules 等非知識庫檔案）
  - 新：`/Users/boday/工作/Kiro/tcfc/docs`（22 items，僅知識庫文件）
- 更新 `steering/project-rules.md` 加入知識庫更新指令

---

## 2026-04-08 — 建立 Agent 錯誤記錄

**執行者**: Boday
**分支**: feature/docs-learnings → develop

### 變更內容
- 建立 `.learnings/LEARNINGS.md`
- 記錄違反 Gitflow 規範的錯誤：直接在 develop commit 並 merge 到 main
- 含根本原因分析與預防措施

---

## 2026-04-08 — 建立 Gitflow 執行記錄知識文件

**執行者**: Boday
**分支**: develop

### 變更內容
- 建立 `docs/10_Core_Knowledge/gitflow-history.md`（版本時間軸、分支流程圖、關鍵 commit、分支清理記錄、tags）
- 更新 `docs/10_Core_Knowledge/github-actions-deploy.md`（補充 #36 部署記錄）

---

## 2026-04-08 — v0.0.5 (release) Kiro CLI 工作目錄完整建置

**執行者**: Boday
**分支**: release/v0.0.5 → main + develop

### 變更內容（自 v0.0.4.01 起）
- 建立 README.md（專案說明、技術棧、Gitflow 規範）
- 建立 Kiro CLI 工作目錄結構
  - `steering/project-rules.md` v1.4（Gitflow、路徑規範、部署規則、技術規範）
  - `agents/tcfc-dev.json`（開發維運 agent，含安全防護）
  - `skills/tcfc-ops/SKILL.md`（賽事維運 SOP、部署檢查）
  - `settings/lsp.json`（TypeScript LSP）
- 知識庫目錄遷移至 `docs/`（強制路徑規範）
  - `docs/00_Meta/` — INDEX.md + changelog.md
  - `docs/10_Core_Knowledge/` — tcfc-architecture.md + github-actions-deploy.md
- 修復 deploy.yml Secret 洩漏（hotfix/v0.0.4.01 已含）

---

## 2026-04-08 — 建立 tcfc-dev agent 和 tcfc-ops skill

**執行者**: Boday
**分支**: develop

### 變更內容
- 建立 `.kiro/agents/tcfc-dev.json`
  - Vue 3 + TypeScript 開發與維運 agent
  - shell deniedCommands 防止直接 push main/develop
  - agentSpawn hook 自動顯示分支狀態
  - resources 載入 steering + 核心知識 + skills
- 建立 `.kiro/skills/tcfc-ops/SKILL.md`
  - 新增年度賽事 SOP（sheetConfig → service → view → router）
  - 本地建置驗證清單
  - 部署前/後檢查清單

---

## 2026-04-08 — v1.4 知識庫路徑遷移至 docs/

**執行者**: Boday
**分支**: develop

### 變更內容
- 搬移知識庫目錄：`00_Meta/` → `docs/00_Meta/`、`10_Core_Knowledge/` → `docs/10_Core_Knowledge/`、`20_Projects/` → `docs/20_Projects/`、`99_Archives/` → `docs/99_Archives/`
- 更新 `steering/project-rules.md` v1.3 → v1.4
  - 新增「知識庫路徑規範」段落（強制 `docs/` 前綴，含正確/錯誤引用範例）
  - 更新 Step 2 文件路徑為 `docs/` 前綴
  - 更新目錄結構圖
- 更新 `docs/00_Meta/INDEX.md` 反映新路徑
- 更新 `.gitignore` 路徑

### 影響範圍
- 後續所有知識庫操作必須使用 `docs/` 前綴路徑

---

## 2026-04-08 — v1.3 更新 steering + 建立核心知識文件

**執行者**: Boday
**分支**: develop

### 變更內容
- 更新 `steering/project-rules.md` v1.2 → v1.3
  - 移除已修復的 Debug step 洩漏警告
  - 加入知識庫名稱 `tcfc`
  - 更新當前版本號為 v0.0.4.01
- 建立 `10_Core_Knowledge/tcfc-architecture.md`
  - 資料流（Google Sheets → API → Vue 元件）
  - 元件架構（頁面/共用元件/API 層/工具）
  - 賽事組別與積分計算邏輯
  - 權限與協作（owner: realivy0730, collaborator: boday）
- 建立 `10_Core_Knowledge/github-actions-deploy.md`
  - Workflow 步驟與部署歷史
  - Node.js 20 deprecation 待辦（2026-06-02 deadline）
  - 已修復項目記錄

---

## 2026-04-08 — v0.0.4.01 (hotfix) 移除 deploy.yml Secret 洩漏

**執行者**: Boday
**分支**: hotfix/v0.0.4.01 → main + develop

### 變更內容
- 移除 `.github/workflows/deploy.yml` 中的 `Debug Environment Variables` step
- 該 step 會將 `VITE_GOOGLE_SHEETS_API_KEY` 明文印到 GitHub Actions log

### 影響範圍
- 修復安全風險：API Key 不再暴露於 CI/CD log

---

## 2026-04-08 — v1.2 加入 GitHub Actions 部署規則

**執行者**: Boday
**分支**: develop

### 變更內容
- 更新 `steering/project-rules.md` v1.1 → v1.2
  - 加入 GitHub Actions 部署觸發條件與規則
  - 加入 merge 到 main 前後的檢查清單
  - 加入 Secrets 管理表與注意事項
  - 標記 deploy.yml 中 Debug step 印出 Secret 的安全風險

---

## 2026-04-08 — 建立 README.md

**執行者**: Boday
**分支**: feature/docs-readme → develop

### 變更內容
- 建立 `README.md`：功能說明、技術棧、專案結構、Gitflow 規則、部署流程、新增年度賽事指南

---

## 2026-04-08 — v1.1 加入 Gitflow 分支規則

**執行者**: Boday

### 變更內容
- 更新 `steering/project-rules.md` v1.0 → v1.1
  - 加入 Gitflow 分支規則（main/develop/feature/hotfix/release）
  - 加入分支命名規範與版本號規則
  - 修正 Step 3 禁止直接 push 到 main 或 develop
  - 加入專案資訊（當前版本 v0.0.4、部署觸發條件）
  - 加入技術規範第 8 條（路徑別名 `@`）

### 影響範圍
- 後續所有任務必須遵循 Gitflow 工作流程

---

## 2026-04-08 — v1.0 初始化 Kiro CLI 工作目錄

**執行者**: Boday

### 變更內容
- Clone `realivy0730/tcfc` repo 至 `/Users/boday/工作/Kiro/tcfc`
- 建立知識庫目錄結構：`00_Meta/`, `10_Core_Knowledge/`, `20_Projects/`, `99_Archives/`
- 建立 `.kiro/` 配置：
  - `steering/project-rules.md` — 三階段生命週期強制規則
  - `settings/lsp.json` — TypeScript LSP 設定
- 建立 `00_Meta/INDEX.md` — 專案索引
- 建立 `00_Meta/changelog.md` — 本文件
- 更新 `.gitignore` — 排除知識庫暫存與 OS 檔案

### 影響範圍
- 新增 Kiro CLI 管理層，不影響原有 Vue 3 原始碼
