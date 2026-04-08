---
title: "TCFC 網站專案 — 強制規則"
tags: [steering, rules, tcfc]
version: "1.0"
related_id: []
last_updated: "2026-04-08"
---

# TCFC 網站專案 — 強制規則

## 專案資訊

| 項目 | 值 |
|------|-----|
| GitHub Repo | `realivy0730/tcfc` (public) |
| 分支 | `main` |
| 域名 | `tcfc.org.tw` |
| 技術棧 | Vue 3 + Vite + TypeScript + SCSS |
| 部署 | GitHub Pages |
| 資料來源 | Google Sheets API |

## 強制任務生命週期（Mandatory — 不可繞過）

所有產生檔案變更的任務，必須依照以下**三步驟單向流程**完成。
Agent 在回報「任務完成」前，必須逐項確認三個步驟皆已執行。

```
Step 1: 執行任務 (Execute Task)
    ↓
Step 2: 更新知識庫 (Update Knowledge Base)
    ↓
Step 3: git commit & push (Version Control Sync)
```

### Step 1: 執行任務

- 完成程式碼修改、功能開發或問題修復
- 每個步驟必須有明確的驗收標準
- 驗收通過後才進入 Step 2

### Step 2: 更新知識庫

依變更範圍更新以下文件（至少更新 changelog）：

| 文件 | 更新條件 |
|------|----------|
| `00_Meta/changelog.md` | **每次必更新** — 記錄變更項目 |
| `10_Core_Knowledge/` | 架構/元件/API 有變動時 |
| `00_Meta/INDEX.md` | 目錄結構有變動時 |

### Step 3: git commit & push

- commit message 格式：`type: 說明為什麼改`
- type: `feat` / `fix` / `docs` / `refactor` / `style`
- 推送到 `realivy0730/tcfc` main 分支
- 禁止無意義訊息（如 auto-sync、update）

### 完成確認檢查表

任務回報前，Agent 必須輸出以下確認：

```
✅ Step 1: [任務名稱] — 驗收通過
✅ Step 2: [已更新的知識庫文件列表]
✅ Step 3: [commit hash] 已推送到 realivy0730/tcfc
```

若任一步驟未完成，禁止回報任務完成。

---

## 觸發條件

| 情境 | 執行流程 |
|------|----------|
| 新增/修改程式碼 | Step 1 → Step 2 → Step 3 |
| 僅修改知識庫文件 | Step 2 → Step 3 |
| 純查詢/分析/討論 | 不觸發 |

## 知識庫目錄結構

```
tcfc/
├── 00_Meta/           索引與變更記錄
├── 10_Core_Knowledge/ 核心知識（AI 檢索區）
├── 20_Projects/       進行中專案
├── 99_Archives/       封存區（不檢索）
├── src/               Vue 3 原始碼
├── docs/              GitHub Pages 產出
├── public/            靜態資源
└── .kiro/
    ├── steering/      ← 本文件（最高優先級規則）
    ├── skills/        專案級 Skill
    └── settings/      LSP 設定
```

## 技術規範

1. Vue 3 Composition API + TypeScript，禁止 Options API
2. 樣式使用 SCSS，遵循 BEM 命名
3. 路由使用 vue-router 4
4. 狀態管理使用 Pinia
5. HTTP 請求使用 axios
6. 圖示使用 Font Awesome（已安裝）
7. 建置前必須通過 TypeScript 型別檢查
