<div align="center">

# ⚽ TCFC 臺中市體育總會足球委員會

### Taichung City Football Committee

市長盃足球賽事即時賽程查詢系統 — 從 Google Sheets 同步賽程，自動計算積分榜

[![Version](https://img.shields.io/badge/version-0.0.6-blue)]()
[![Vue](https://img.shields.io/badge/Vue-3-42b883)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)]()
[![Deploy](https://img.shields.io/badge/deploy-GitHub_Pages-222)]()
[![Website](https://img.shields.io/badge/🌐-tcfc.org.tw-green)](https://tcfc.org.tw)

</div>

---

## 概述

TCFC 官方網站，提供組織介紹與市長盃足球賽事即時賽程查詢。賽程資料從 Google Sheets 即時同步，前端自動計算積分榜與淘汰賽對戰表。

```
Google Sheets（賽程表）
        ↓ Sheets API v4
  ┌─────────────────────────────┐
  │  sheetFetcher → Service層   │
  │  → 積分計算 → 元件渲染      │
  └─────────────────────────────┘
        ↓
  即時賽程 / 積分榜 / 淘汰賽（RWD）
```

---

## 核心功能

- **市長盃賽事系統** — 2024 / 2025 年度，學校組 + 公開組共 11 個組別
- **即時積分榜** — 勝 3 分 / 平 1 分 / 負 0 分，自動排序
- **分組賽 + 淘汰賽** — 分頁切換，各組前兩名晉級
- **Google Sheets 同步** — 賽程資料即時更新，無需重新部署
- **RWD 響應式** — 桌面 / 平板 / 手機自適應

---

## 賽事組別

| 類別 | 組別 |
|------|------|
| 學校組 | U10（中年級）、U12（高年級）、U15（國中） |
| 公開組 | U6（幼兒）、U8（低年級）、U10 男/女、U12 男/女、U15（國中）、U18（高中） |

---

## 技術棧

| 項目 | 技術 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 建置 | Vite |
| 語言 | TypeScript |
| 樣式 | SCSS (BEM) |
| 路由 | vue-router 4 |
| 狀態管理 | Pinia |
| HTTP | axios |
| 圖示 | Font Awesome |
| 部署 | GitHub Pages |
| 資料來源 | Google Sheets API v4 |

---

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器 (http://localhost:3000)
npm run dev

# 建置正式版本
npm run build

# 預覽建置結果
npm run preview
```

---

## 專案結構

```
tcfc/
├── src/
│   ├── api/                        # API 層
│   │   ├── config/sheetConfig.ts   #   Google Sheets ID + 組別設定
│   │   ├── types/gameSchedule.ts   #   TypeScript 型別
│   │   └── services/mayorsCup/     #   賽事服務（按年度分層）
│   ├── views/                      # 頁面
│   │   ├── Index.vue               #   首頁（願景/使命/價值觀）
│   │   └── mayors-cup/             #   市長盃（2024/2025）
│   │       └── components/         #     BaseTournamentPage / MatchCard
│   ├── components/                 # Header / Footer
│   ├── router/                     # 路由（含 mayors-cup.ts）
│   ├── utils/                      # sheetFetcher / cacheUtils / axios
│   └── assets/                     # SCSS + 圖片
│
├── docs/                           # 知識庫
│   ├── 00_Meta/                    #   INDEX + changelog
│   └── 10_Core_Knowledge/         #   架構 / 部署 / Gitflow 記錄
│
├── .kiro/                          # AI Agent 配置
│   ├── agents/tcfc-dev.json        #   開發維運 Agent
│   ├── skills/tcfc-ops/            #   賽事維運 Skill
│   └── steering/project-rules.md   #   專案強制規則
│
├── .github/workflows/deploy.yml    # GitHub Pages 部署
└── public/                         # 靜態資源
```

---

## Git Flow

本專案採用 **Gitflow** 工作流程，所有變更必須透過 feature / hotfix 分支。

```
新功能：develop → feature/* → develop → release/* → main
緊急修復：main → hotfix/* → main + develop
```

| 分支 | 用途 |
|------|------|
| `main` | 正式環境（push 觸發 GitHub Pages 部署） |
| `develop` | 開發整合 |
| `feature/*` | 新功能 / 文件變更 |
| `hotfix/v*` | 緊急修復 |
| `release/v*` | 版本發布 |

版本號：`v{major}.{minor}.{patch}`，hotfix 加 `.{序號}`

---

## 部署

Push 到 `main` 分支自動觸發 GitHub Actions → GitHub Pages。

```
npm install → npm run build → dist/ → GitHub Pages
```

> API Key 透過 GitHub Secrets 注入（`VITE_GOOGLE_SHEETS_API_KEY`）

---

## 新增年度賽事

1. `src/api/config/sheetConfig.ts` — 新增年度 Sheet ID + 組別
2. `src/api/services/mayorsCup/{year}/` — 建立 Service
3. `src/views/mayors-cup/{year}/` — 建立頁面
4. `src/router/mayors-cup.ts` — 新增路由

詳見 [`.kiro/skills/tcfc-ops/SKILL.md`](.kiro/skills/tcfc-ops/SKILL.md)

---

## 聯絡資訊

| 管道 | 連結 |
|------|------|
| 📧 Email | service@tcfc.org.tw |
| 📞 電話 | 04-2258-8185 |
| 📍 地址 | 407027 台中市西屯區朝馬路 108 號 |
| Facebook | [TCFC 社團](https://www.facebook.com/groups/576604161850781) |
| LINE | [@677ciirx](https://line.me/ti/p/@677ciirx) |
