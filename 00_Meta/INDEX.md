---
title: "TCFC 網站專案索引"
tags: [Meta, INDEX, 導航]
version: "1.0"
related_id: ["changelog"]
last_updated: "2026-04-08"
---

# TCFC 網站專案 (tcfc.org.tw) — 專案索引 v1.0

## 目錄結構

```
tcfc/
├── 00_Meta/                          全域設定與索引
│   ├── INDEX.md                      ← 本文件
│   └── changelog.md                  變更記錄
│
├── 10_Core_Knowledge/                核心知識 (AI 檢索區)
│   └── (待建立)
│
├── 20_Projects/                      進行中專案
│   └── (待建立)
│
├── 99_Archives/                      封存區 (不檢索)
│
├── src/                              Vue 3 原始碼
│   ├── api/                          API 層（Google Sheets 串接）
│   │   ├── config/sheetConfig.ts     Sheets 設定
│   │   ├── types/gameSchedule.ts     型別定義
│   │   └── services/mayorsCup/       市長盃賽事服務
│   ├── views/                        頁面
│   │   ├── Index.vue                 首頁
│   │   ├── mayors-cup/               市長盃（2024/2025）
│   │   └── NotFound.vue              404
│   ├── components/                   共用元件
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── scoreboard/              計分板元件
│   ├── layouts/                      版面配置
│   ├── router/                       路由設定
│   ├── utils/                        工具函式
│   └── assets/                       靜態資源與 SCSS
│
├── docs/                             文件與原始資料
├── public/                           靜態資源
├── archives/                         舊版 HTML 頁面
│
├── .github/workflows/deploy.yml      GitHub Pages 部署
└── .kiro/
    ├── steering/project-rules.md     強制規則
    ├── skills/                       專案級 Skill
    └── settings/lsp.json             TypeScript LSP
```

## 專案資訊

| 項目 | 值 |
|------|-----|
| GitHub | `realivy0730/tcfc` (public) |
| 域名 | tcfc.org.tw |
| 技術棧 | Vue 3 + Vite + TypeScript + SCSS |
| 部署 | GitHub Pages (`.github/workflows/deploy.yml`) |
| 資料來源 | Google Sheets API |
| 主題 | 台中市足球委員會 — 市長盃賽事系統 |

## 快速操作

```bash
# 開發
npm install && npm run dev

# 建置
npm run build

# 預覽
npm run preview
```
