---
title: "TCFC 專案架構"
tags: [architecture, vue, typescript]
version: "1.1"
related_id: ["github-actions-deploy"]
last_updated: "2026-04-28"
---

# TCFC 專案架構

## 概述

台中市體育總會足球委員會（TCFC）官方網站，主要功能為市長盃足球賽事即時賽程與積分查詢。

## 資料流

```
Google Sheets（賽程表）
    ↓ Sheets API v4
sheetFetcher.ts（axios + cache）
    ↓
baseGameService.ts（抽象服務層）
    ↓
{year}/{category}GameService.ts（年度/組別實作）
    ↓
BaseTournamentPage.vue（通用賽事頁面）
    ↓
MatchCard.vue / ScoreboardTable.vue（UI 元件）
```

## 元件架構

### 頁面 (views/)

| 頁面 | 路由 | 說明 |
|------|------|------|
| Index.vue | `/` | 首頁（願景/使命/價值觀） |
| WelcomePage.vue | `/mayors-cup/{year}` | 年度賽事總覽（2024/2025） |
| SchoolGroupPage.vue | `/mayors-cup/{year}/school` | 學校組賽程 |
| OpenGroupPage.vue | `/mayors-cup/{year}/open` | 公開組賽程 |
| NotFound.vue | `/*` | 404 頁面 |

### 共用元件 (components/)

| 元件 | 說明 |
|------|------|
| Header.vue | 頂部導覽列（Logo + 社群連結） |
| Footer.vue | 底部資訊（聯絡方式 + 快速連結） |
| BaseTournamentPage.vue | 賽事頁面通用邏輯（積分計算、分組/淘汰切換） |
| MatchCard.vue | 單場比賽卡片 |
| KnockoutBracket.vue | 淘汰賽對戰圖 |
| ScoreboardTable.vue | 計分板表格 |

### API 層 (api/)

| 檔案 | 說明 |
|------|------|
| config/sheetConfig.ts | Google Sheets ID、組別名稱對照 |
| types/gameSchedule.ts | GameSchedule 型別定義 |
| services/mayorsCup/baseGameService.ts | 抽象服務（fetchSchedule） |
| services/mayorsCup/{year}/ | 年度實作（schoolGameService / openGameService） |

### 工具 (utils/)

| 檔案 | 說明 |
|------|------|
| sheetFetcher.ts | Google Sheets API 呼叫 + 資料正規化 |
| cacheUtils.ts | 快取機制（避免重複 API 呼叫） |
| axios.ts | axios 實例設定 |
| errorHandler.ts | 錯誤處理 |

## 賽事組別

### 學校組
- U10（中年級）、U12（高年級）、U15（國中）

### 公開組
- U6（幼兒）、U8（低年級）
- U10 男/女、U12 男/女
- U15（國中）、U18（高中）

## 積分計算邏輯

BaseTournamentPage.vue 內建積分計算：
- 勝 = 3 分、平 = 1 分、負 = 0 分
- 排序：積分 → 進球數
- 各組前兩名晉級淘汰賽

## 全站色系規範

| 用途 | 色碼 |
|------|------|
| 主色（深藍灰） | `#3f4a52` |
| 強調色（古銅金） | `#B89968` |
| 主背景 | `#f7f9f7` |
| 次背景（米色） | `#f5f0e8` |
| 卡片背景 | `#ffffff` |
| 大標字體 | `'Noto Serif TC', serif` |
| body 字體 | `'Noto Sans TC', sans-serif` |

## 視覺設計規範

### 卡片風格（統一參考 result-card）
- `border: 1px solid rgba(#3f4a52, 0.08)`
- `border-top: 3px solid #B89968`（金色頂線）
- `border-radius: 8px`
- `card-header` 背景：`#f5f0e8`
- hover：`transform: translateY(-4px)`

### Tab 切換
- active 底線：`#B89968`
- 非 active 文字：`rgba(#3f4a52, 0.35)`
- 無 outline（移除瀏覽器預設藍框）

### 展開賽程（matches-content）
- 背景：`#f5f0e8`
- 左側邊線：`border-left: 3px solid #B89968`

## 修改記錄

### feature/visual-redesign 分支（共 46 commits，尚未 merge）

#### 2026-04-28 視覺重構（最新）— c0ceac9

**MatchCard.vue**
- 依 `layout` prop 分兩套配色（group 米色 / knockout 深色）
- group layout：日期 `#B89968`、時間/場地 `rgba(#3f4a52, 0.45)`
- 勝者改為加粗 + 輸者淡化，移除金色背景

**BaseTournamentPage.vue**
- `.matches-content`：背景 `#f5f0e8`、左側金色邊線
- `.group-section`：加 `border-top: 3px solid #B89968`、`group-title` 背景 `#f5f0e8`、加 hover
- Tab 按鈕加 `outline: none`

**KnockoutBracket.vue**
- 卡片白底、`border-top: 3px solid #B89968`、hover 效果
- `match-meta` 背景 `#f5f0e8`
- 輪次標籤統一 `#3f4a52` 色系，FINAL/3rd 保留金色
- 勝者加粗 + 輸者淡化

**MayorsCupLayout.vue**
- `year-navigation` 背景 `#2e3440`、文字白色系

**_index.scss**
- `.cta-section__btn--outline`：`color: #fff`
- `.cta-section__btn--primary:hover`：`color: #fff`

**project-rules.md**
- Step 2 加入 `tcfc-architecture.md` 強制更新規則

---

#### 早期 commits 摘要

| commit | 說明 |
|--------|------|
| 全站深色風格改版 | 初始深色主題 |
| BaseTournamentPage + MatchCard 深色修復 | 多次修復白字不可見問題 |
| KnockoutBracket 開發 | 支援 R32/R16/QF/SF/3rd/FINAL 全階段 |
| 2025 open/school 改用 BaseTournamentPage | 統一架構 |
| 全站主色 `#1a2e1c` → `#3f4a52` | 深藍灰取代深綠 |
| Google Fonts 換為 Noto Sans TC + Noto Serif TC | 字體統一 |
| 2024/2025 WelcomePage hero 深色底圖風格 | 頁首重設計 |
| Tab 改為卡片式 border 按鈕 | WelcomePage tab 風格 |
| Footer 改為淺色四欄佈局 | Footer 重設計 |
| result-card 配色統一米色系 | WelcomePage 卡片風格 |
| 2024 WelcomePage CSS 清理 | 移除死碼 |

## 權限與協作

| 帳號 | 角色 | 說明 |
|------|------|------|
| realivy0730 (ivylin0730) | Owner | Repo 擁有者、Secrets 管理 |
| boday | Collaborator | 開發與維運 |
