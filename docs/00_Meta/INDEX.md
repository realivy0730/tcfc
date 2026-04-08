---
title: "TCFC 網站專案索引"
tags: [Meta, INDEX, 導航]
version: "1.1"
related_id: ["changelog"]
last_updated: "2026-04-08"
---

# TCFC 網站專案 (tcfc.org.tw) — 專案索引 v1.1

## 目錄結構

```
tcfc/
├── docs/                                 文件與知識庫（強制路徑）
│   ├── 00_Meta/                          全域設定與索引
│   │   ├── INDEX.md                      ← 本文件
│   │   └── changelog.md                  變更記錄
│   ├── 10_Core_Knowledge/                核心知識 (AI 檢索區)
│   │   ├── tcfc-architecture.md          專案架構與元件
│   │   └── github-actions-deploy.md      部署流程與待辦
│   ├── 20_Projects/                      進行中專案
│   ├── 99_Archives/                      封存區 (不檢索)
│   ├── fetch_raw_data/                   原始賽程資料
│   └── games/                            賽事文件
│
├── src/                                  Vue 3 原始碼
│   ├── api/                              API 層（Google Sheets 串接）
│   ├── views/                            頁面（首頁 + 市長盃）
│   ├── components/                       共用元件
│   ├── layouts/                          版面配置
│   ├── router/                           路由設定
│   ├── utils/                            工具函式
│   └── assets/                           靜態資源與 SCSS
│
├── public/                               靜態資源
├── archives/                             舊版 HTML 頁面
├── .github/workflows/deploy.yml          GitHub Pages 部署
└── .kiro/                                Kiro CLI 配置
```

## 核心知識導航

| 文件 | 說明 |
|------|------|
| [專案架構](../10_Core_Knowledge/tcfc-architecture.md) | 資料流、元件架構、API 層、積分邏輯 |
| [部署流程](../10_Core_Knowledge/github-actions-deploy.md) | GitHub Actions、Secrets、待辦 |

## 專案資訊

| 項目 | 值 |
|------|-----|
| GitHub | `realivy0730/tcfc` (public) |
| 域名 | tcfc.org.tw |
| 技術棧 | Vue 3 + Vite + TypeScript + SCSS |
| 部署 | GitHub Pages |
| 當前版本 | v0.0.4.01 |
| 知識庫名稱 | `tcfc` |

## 快速操作

```bash
# 開發
npm install && npm run dev

# 建置
npm run build

# 預覽
npm run preview
```
