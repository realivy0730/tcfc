---
title: "TCFC 網站專案 — 強制規則"
tags: [steering, rules, tcfc]
version: "1.4"
related_id: []
last_updated: "2026-04-17"
---

# TCFC 網站專案 — 強制規則

## 專案資訊

| 項目 | 值 |
|------|-----|
| GitHub Repo | `realivy0730/tcfc` (public) |
| 分支策略 | **Gitflow**（見下方規則） |
| 域名 | `tcfc.org.tw` |
| 技術棧 | Vue 3 + Vite + TypeScript + SCSS |
| 部署 | GitHub Pages（push main 觸發） |
| 資料來源 | Google Sheets API |
| 當前版本 | v0.0.9 |
| 知識庫名稱 | `tcfc` |
| 知識庫路徑 | `docs/`（禁止指向專案根目錄） |
| 知識庫更新 | `knowledge update --name tcfc --path /Users/boday/工作/Kiro/tcfc/docs` |

## 知識庫路徑規範（強制）

**所有知識庫文件必須放在 `docs/` 目錄下，禁止在專案根目錄建立 `00_Meta/`、`10_Core_Knowledge/`、`20_Projects/`、`99_Archives/`。**

```
docs/                          ← 知識庫根目錄（強制前綴）
├── 00_Meta/                   索引與變更記錄
│   ├── INDEX.md
│   └── changelog.md
├── 10_Core_Knowledge/         核心知識（AI 檢索區）
├── 20_Projects/               進行中專案
├── 99_Archives/               封存區（不檢索）
├── fetch_raw_data/            原始賽程資料
└── games/                     賽事文件
```

引用範例：
- ✅ `docs/00_Meta/changelog.md`
- ✅ `docs/10_Core_Knowledge/tcfc-architecture.md`
- ❌ `00_Meta/changelog.md`（禁止）
- ❌ `10_Core_Knowledge/`（禁止在根目錄）

## Git Flow 分支規則（強制）

本專案採用 **Gitflow** 工作流程，所有程式碼變更必須遵循以下分支策略。

### 分支結構

| 分支 | 用途 | 可直接 push |
|------|------|-------------|
| `main` | 正式環境（觸發 GitHub Pages 部署） | ❌ 僅透過 merge |
| `develop` | 開發整合分支 | ❌ 僅透過 merge |
| `feature/*` | 新功能開發 | ✅ |
| `hotfix/*` | 緊急修復 | ✅ |
| `release/*` | 版本發布準備 | ✅ |

### 分支命名規範

```
feature/{描述}          — 新功能（如 feature/2026-mayors-cup）
hotfix/v{版本號}        — 緊急修復（如 hotfix/v0.0.4.01）
release/v{版本號}       — 發布準備（如 release/v0.0.5）
```

### 工作流程

```
1. 新功能：develop → feature/* → develop → release/* → main + develop
2. 緊急修復：main → hotfix/* → main + develop
3. 文件/知識庫：develop → feature/docs-* → develop（不影響部署可直接 merge）
```

### 版本號規則

- 格式：`v{major}.{minor}.{patch}.{hotfix}`
- 範例：v0.0.4 → v0.0.4.01（hotfix）→ v0.0.5（下個 release）
- Tag 必須在 merge 到 main 後建立

## 強制任務生命週期（Mandatory — 不可繞過）

所有產生檔案變更的任務，必須依照以下**三步驟單向流程**完成。

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
| `docs/00_Meta/changelog.md` | **每次必更新** — 記錄變更項目 |
| `docs/10_Core_Knowledge/` | 架構/元件/API 有變動時 |
| `docs/00_Meta/INDEX.md` | 目錄結構有變動時 |

### Step 3: git commit & push

- 在正確的分支上操作（遵循 Gitflow）
- commit message 格式：`type: 說明為什麼改`
- type: `feat` / `fix` / `docs` / `refactor` / `style`
- 禁止無意義訊息（如 auto-sync、update）
- **禁止直接 push 到 main 或 develop**

### 完成確認檢查表

```
✅ Step 1: [任務名稱] — 驗收通過
✅ Step 2: [已更新的知識庫文件列表]
✅ Step 3: [commit hash] 已推送到 [分支名稱]
```

## 觸發條件

| 情境 | 執行流程 |
|------|----------|
| 新增/修改程式碼 | feature/* → Step 1 → Step 2 → Step 3 |
| 僅修改知識庫文件 | Step 2 → Step 3（可在 develop 或 feature/docs-*） |
| 純查詢/分析/討論 | 不觸發 |

## 專案目錄結構

```
tcfc/
├── src/               Vue 3 原始碼
├── docs/              文件與知識庫（強制路徑）
│   ├── 00_Meta/       索引與變更記錄
│   ├── 10_Core_Knowledge/ 核心知識
│   ├── 20_Projects/   進行中專案
│   └── 99_Archives/   封存區
├── public/            靜態資源
├── archives/          舊版 HTML 頁面
└── .kiro/
    ├── steering/      ← 本文件（最高優先級規則）
    ├── skills/        專案級 Skill
    └── settings/      LSP 設定
```

## GitHub Actions 部署（強制注意）

### 觸發條件
- **push 到 `main` 分支即觸發部署**（`.github/workflows/deploy.yml`）
- 部署流程：`npm install` → `npm run build` → GitHub Pages
- API Key 透過 GitHub Secrets 注入（`VITE_GOOGLE_SHEETS_API_KEY`）

### 部署規則
1. **禁止直接 push 到 main** — 必須透過 Gitflow merge（release/* 或 hotfix/*）
2. merge 到 main 前必須確認：
   - `npm run build` 本地建置成功
   - TypeScript 無型別錯誤
   - 路由正常運作
3. merge 到 main 後必須：
   - 確認 GitHub Actions 執行成功
   - 驗證 https://tcfc.org.tw 頁面正常
   - 建立對應版本 tag
4. 部署失敗時：
   - 檢查 Actions log
   - 若為 Secrets 問題，需 repo owner（realivy0730）處理
   - 若為建置錯誤，建立 hotfix 分支修復

### Secrets 管理
| Secret | 用途 | 管理者 |
|--------|------|--------|
| `VITE_GOOGLE_SHEETS_API_KEY` | Google Sheets API 存取 | repo owner |

### ⚠️ 注意事項
- 404 頁面由 `cp dist/index.html dist/404.html` 自動產生（SPA 路由支援）
- concurrency 設定 `cancel-in-progress: false`，不會取消進行中的部署

## 技術規範

1. Vue 3 Composition API + TypeScript，禁止 Options API
2. 樣式使用 SCSS，遵循 BEM 命名
3. 路由使用 vue-router 4
4. 狀態管理使用 Pinia
5. HTTP 請求使用 axios
6. 圖示使用 Font Awesome（已安裝）
7. 建置前必須通過 TypeScript 型別檢查
8. 路徑別名使用 `@` 指向 `src/`
9. **README.md 禁止加 YAML frontmatter**（`---` 區塊），GitHub 會原樣顯示導致排版錯誤
