---
title: "TCFC 網站專案索引"
tags: [Meta, INDEX, 導航]
version: "1.2"
last_updated: "2026-04-17"
---

# TCFC 網站專案索引

## 目錄結構

```
tcfc/
├── docs/                                 文件與知識庫（強制路徑）
│   ├── 00_Meta/
│   │   ├── INDEX.md                      ← 本文件
│   │   └── changelog.md                  變更記錄
│   ├── 10_Core_Knowledge/                核心知識（AI 檢索區）
│   │   ├── tcfc-architecture.md          專案架構與元件
│   │   ├── github-actions-deploy.md      部署流程
│   │   └── gitflow-history.md            版本時間軸
│   ├── fetch_raw_data/                   原始賽程資料工具
│   │   ├── ReadMe.md                     使用說明
│   │   ├── fetch.sh                      抓取腳本
│   │   └── data/                         各組別賽程 Markdown
│   └── 115年臺中市市長盃足球賽錦標賽賽程表.pdf  2025 賽程表原始文件
│
├── src/                                  Vue 3 原始碼
│   ├── api/                              API 層（Google Sheets 串接）
│   │   ├── config/sheetConfig.ts         Sheet ID 與組別設定
│   │   ├── services/mayorsCup/           各年度賽事 Service
│   │   └── types/gameSchedule.ts         資料型別定義
│   ├── views/mayors-cup/                 市長盃頁面
│   │   ├── components/
│   │   │   ├── BaseTournamentPage.vue    分組賽/淘汰賽共用容器
│   │   │   └── MatchCard.vue             單場比賽卡片
│   │   ├── 2024/                         2024 年度頁面
│   │   └── 2025/                         2025 年度頁面
│   ├── layouts/MayorsCupLayout.vue       市長盃 Layout
│   ├── router/mayors-cup.ts              市長盃路由
│   └── assets/styles/                    SCSS 樣式
│
├── .kiro/
│   ├── steering/project-rules.md        強制規則（最高優先級）
│   └── skills/tcfc-ops/SKILL.md         維運 SOP
└── .github/workflows/deploy.yml          GitHub Pages 部署
```

## 核心知識導航

| 文件 | 說明 |
|------|------|
| [專案架構](../10_Core_Knowledge/tcfc-architecture.md) | 資料流、元件架構、API 層、積分邏輯 |
| [部署流程](../10_Core_Knowledge/github-actions-deploy.md) | GitHub Actions、Secrets、待辦 |
| [Gitflow 記錄](../10_Core_Knowledge/gitflow-history.md) | 版本時間軸、分支流程圖 |

## 專案資訊

| 項目 | 值 |
|------|-----|
| GitHub | `realivy0730/tcfc` (public) |
| 域名 | tcfc.org.tw |
| 技術棧 | Vue 3 + Vite + TypeScript + SCSS |
| 部署 | GitHub Pages（push main 觸發） |
| 資料來源 | Google Sheets API |
| 當前版本 | v0.0.9 |
| 當前分支 | `feature/visual-redesign` |

## 快速操作

```bash
npm install && npm run dev   # 開發
npm run build                # 建置
npm run preview              # 預覽
```
