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
│   │   ├── github-actions-deploy.md      部署流程（GitHub Pages，已遷移 Cloudflare Pages）
│   │   ├── cloudflare-pages-migration-plan.md  Cloudflare Pages 遷移計劃（#6）
│   │   ├── victory-league-architecture-reference.md  勝利聯賽架構參照（GAS 後端）
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
└── .github/workflows/deploy.yml          Cloudflare Pages 部署（#6）
```

## 核心知識導航

| 文件 | 說明 |
|------|------|
| [專案架構](../10_Core_Knowledge/tcfc-architecture.md) | 資料流、元件架構、API 層、積分邏輯 |
| [部署流程](../10_Core_Knowledge/github-actions-deploy.md) | GitHub Actions、Secrets、待辦 |
| [Cloudflare Pages 遷移計劃](../10_Core_Knowledge/cloudflare-pages-migration-plan.md) | 遷移步驟、零影響策略、決策記錄（D0/D0.1/D0.2/D1-D3）、Phase 3-4 驗證實測與網域切換、Phase 5 GAS 版 |
| [勝利聯賽架構參照](../10_Core_Knowledge/victory-league-architecture-reference.md) | GAS 後端參照、Secret family、配額、TCFC 差異對照 |
| [Gitflow 記錄](../10_Core_Knowledge/gitflow-history.md) | 版本時間軸、分支流程圖 |
| 憑證記錄（本機私有） | 三平台鑰匙盤點 → `~/credentials/tcfc-credentials-log.md`（tcfc 為 public repo，憑證資訊不進 repo） |

## 專案資訊

| 項目 | 值 |
|------|-----|
| GitHub | `realivy0730/tcfc` (public) |
| 域名 | tcfc.org.tw |
| 技術棧 | Vue 3 + Vite + TypeScript + SCSS |
| 部署 | Cloudflare Pages（遷移中 #6：Phase 1-4 完成，Phase 5 穩定期觀察；GitHub Pages 待關閉） |
| 資料來源 | Google Sheets API |
| 當前版本 | v0.0.9 |
| 當前分支 | `feature/cloudflare-pages-migration-6` |

## 快速操作

```bash
npm install && npm run dev   # 開發
npm run build                # 建置
npm run preview              # 預覽
```
