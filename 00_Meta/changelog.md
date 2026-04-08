---
title: "TCFC 變更記錄"
tags: [Meta, changelog]
version: "1.0"
related_id: ["INDEX"]
last_updated: "2026-04-08"
---

# TCFC 變更記錄

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
