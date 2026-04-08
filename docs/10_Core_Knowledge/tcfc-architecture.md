---
title: "TCFC 專案架構"
tags: [architecture, vue, typescript]
version: "1.0"
related_id: ["github-actions-deploy"]
last_updated: "2026-04-08"
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

## 權限與協作

| 帳號 | 角色 | 說明 |
|------|------|------|
| realivy0730 (ivylin0730) | Owner | Repo 擁有者、Secrets 管理 |
| boday | Collaborator | 開發與維運 |
