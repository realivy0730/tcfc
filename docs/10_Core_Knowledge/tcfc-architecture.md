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

### 2026-04-28 視覺重構

#### MatchCard.vue
- 重構 style，依 `layout` prop 分兩套配色
- `&.group`（米色背景）：日期 `#B89968`、時間/場地 `rgba(#3f4a52, 0.45)`、勝者加粗+輸者淡化
- `&.knockout`（深色背景）：保留原深色配色
- 移除勝者金色背景，改為字體加粗 + 輸者 `rgba(#3f4a52, 0.4)` 淡化

#### BaseTournamentPage.vue
- `.matches-content`：背景 `#f5f0e8`、左側金色邊線
- `.group-section`：加 `border-top: 3px solid #B89968`、`group-title` 背景改 `#f5f0e8`、加 hover
- Tab 按鈕加 `outline: none`

#### KnockoutBracket.vue
- 卡片背景 `#eef2ee` → `#ffffff`
- 加 `border-top: 3px solid #B89968`、hover 效果
- `match-meta` 背景改 `#f5f0e8`
- 輪次標籤統一用 `#3f4a52` 色系，FINAL/3rd 保留金色層次
- 勝者改為加粗+輸者淡化（與 MatchCard 一致）

#### MayorsCupLayout.vue
- `year-navigation` 背景改為 `#2e3440`
- 文字改為白色系（`rgba(#fff, 0.45)`）、hover `rgba(#fff, 0.8)`
- active 保留金色 `#B89968`

#### src/assets/styles/views/_index.scss
- `.cta-section__btn--outline`：加 `color: #fff`
- `.cta-section__btn--primary:hover`：加 `color: #fff`

## 權限與協作

| 帳號 | 角色 | 說明 |
|------|------|------|
| realivy0730 (ivylin0730) | Owner | Repo 擁有者、Secrets 管理 |
| boday | Collaborator | 開發與維運 |
