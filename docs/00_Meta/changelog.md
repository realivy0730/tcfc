---
title: "TCFC 變更記錄"
tags: [Meta, changelog]
version: "1.0"
related_id: ["INDEX"]
last_updated: "2026-04-11"
---

# TCFC 變更記錄

## 2026-04-13 — feature/visual-redesign 動態效果

**執行者**: linyuanchun
**分支**: feature/visual-redesign

### 變更內容
- 新增 `v-scroll-reveal` 全域 directive（`src/directives/scrollReveal.ts`）
- Hero 視差滾動 + 進場動畫（英文副標 → 主標 → CTA 依序淡入）
- 導覽列連結 hover 底線滑入效果
- Social icons hover 縮放效果
- CTA 按鈕 hover 填色從左往右掃入動畫
- 頁面切換淡入淡出過場（`src/App.vue`）
- 新增 `FixedCta.vue` 元件（備用，未啟用）
- tcfc-ops SKILL.md 加入動態效果 SOP



**執行者**: linyuanchun
**分支**: feature/visual-redesign

### 變更內容
- Hero 區塊：加入深色遮罩、中英文標題、CTA 按鈕、向下滾動箭頭動畫
- Section 標題：改為英文小標 + 中文大標雙層設計（`title__en` + `title__zh`）
- 卡片樣式：改為方角 + 左側透明邊框，hover 時顯示主色邊框
- 新增 CTA Section：頁面底部行動呼籲區塊（背景圖 + 深色遮罩）
- 色調微調：mission section 背景改為米白（`$bg-color`），summary-block 改為左線設計
- tcfc-ops SKILL.md 加入首頁視覺改版 SOP

## 2026-04-09 — v0.0.8 (release) 首頁背景圖替換

**執行者**: Boday
**分支**: release/v0.0.8 → main + develop

### 變更內容
- 首頁背景圖替換為 Gemini AI 生成貓咪插畫
- 圖片格式從 PNG 轉為 JPEG 70%（desktop 653K / mobile 216K）
- 原圖備份至 `archives/images/`

---

## 2026-04-09 — v0.0.7 (release) changelog symlink

**執行者**: Boday
**分支**: release/v0.0.7 → main + develop

### 變更內容
- 根目錄建立 `changelog.md` symlink → `docs/00_Meta/changelog.md`
- GitHub repo 首頁可直接查看變更記錄，知識庫索引不受影響

---

## 2026-04-09 — v0.0.6 (release) 知識庫治理 + README 優化

**執行者**: Boday
**分支**: release/v0.0.6 → main + develop

### 變更內容（自 v0.0.5 起）
- 優化 README.md（置中標題、badge、資料流圖、賽事組別表、結構註解）
- 修正知識庫索引路徑（專案根目錄 → docs/）
- steering v1.4 加入知識庫路徑規範、知識庫更新指令、README frontmatter 禁止規則
- 建立 `.learnings/LEARNINGS.md`（2 次 Gitflow 違規記錄）
- Gitflow 分支保護提升為全域永久規則

---

## 2026-04-08 — 修正知識庫索引路徑

**執行者**: Boday
**分支**: feature/docs-kb-path-fix → develop

### 變更內容
- 修正 knowledge base `tcfc` 索引路徑
  - 舊：`/Users/boday/工作/Kiro/tcfc`（9,888 items，含 src/node_modules 等非知識庫檔案）
  - 新：`/Users/boday/工作/Kiro/tcfc/docs`（22 items，僅知識庫文件）
- 更新 `steering/project-rules.md` 加入知識庫更新指令

---

## 2026-04-08 — 建立 Agent 錯誤記錄

**執行者**: Boday
**分支**: feature/docs-learnings → develop

### 變更內容
- 建立 `.learnings/LEARNINGS.md`
- 記錄違反 Gitflow 規範的錯誤：直接在 develop commit 並 merge 到 main
- 含根本原因分析與預防措施

---

## 2026-04-08 — 建立 Gitflow 執行記錄知識文件

**執行者**: Boday
**分支**: develop

### 變更內容
- 建立 `docs/10_Core_Knowledge/gitflow-history.md`（版本時間軸、分支流程圖、關鍵 commit、分支清理記錄、tags）
- 更新 `docs/10_Core_Knowledge/github-actions-deploy.md`（補充 #36 部署記錄）

---

## 2026-04-08 — v0.0.5 (release) Kiro CLI 工作目錄完整建置

**執行者**: Boday
**分支**: release/v0.0.5 → main + develop

### 變更內容（自 v0.0.4.01 起）
- 建立 README.md（專案說明、技術棧、Gitflow 規範）
- 建立 Kiro CLI 工作目錄結構
  - `steering/project-rules.md` v1.4（Gitflow、路徑規範、部署規則、技術規範）
  - `agents/tcfc-dev.json`（開發維運 agent，含安全防護）
  - `skills/tcfc-ops/SKILL.md`（賽事維運 SOP、部署檢查）
  - `settings/lsp.json`（TypeScript LSP）
- 知識庫目錄遷移至 `docs/`（強制路徑規範）
  - `docs/00_Meta/` — INDEX.md + changelog.md
  - `docs/10_Core_Knowledge/` — tcfc-architecture.md + github-actions-deploy.md
- 修復 deploy.yml Secret 洩漏（hotfix/v0.0.4.01 已含）

---

## 2026-04-08 — 建立 tcfc-dev agent 和 tcfc-ops skill

**執行者**: Boday
**分支**: develop

### 變更內容
- 建立 `.kiro/agents/tcfc-dev.json`
  - Vue 3 + TypeScript 開發與維運 agent
  - shell deniedCommands 防止直接 push main/develop
  - agentSpawn hook 自動顯示分支狀態
  - resources 載入 steering + 核心知識 + skills
- 建立 `.kiro/skills/tcfc-ops/SKILL.md`
  - 新增年度賽事 SOP（sheetConfig → service → view → router）
  - 本地建置驗證清單
  - 部署前/後檢查清單

---

## 2026-04-08 — v1.4 知識庫路徑遷移至 docs/

**執行者**: Boday
**分支**: develop

### 變更內容
- 搬移知識庫目錄：`00_Meta/` → `docs/00_Meta/`、`10_Core_Knowledge/` → `docs/10_Core_Knowledge/`、`20_Projects/` → `docs/20_Projects/`、`99_Archives/` → `docs/99_Archives/`
- 更新 `steering/project-rules.md` v1.3 → v1.4
  - 新增「知識庫路徑規範」段落（強制 `docs/` 前綴，含正確/錯誤引用範例）
  - 更新 Step 2 文件路徑為 `docs/` 前綴
  - 更新目錄結構圖
- 更新 `docs/00_Meta/INDEX.md` 反映新路徑
- 更新 `.gitignore` 路徑

### 影響範圍
- 後續所有知識庫操作必須使用 `docs/` 前綴路徑

---

## 2026-04-08 — v1.3 更新 steering + 建立核心知識文件

**執行者**: Boday
**分支**: develop

### 變更內容
- 更新 `steering/project-rules.md` v1.2 → v1.3
  - 移除已修復的 Debug step 洩漏警告
  - 加入知識庫名稱 `tcfc`
  - 更新當前版本號為 v0.0.4.01
- 建立 `10_Core_Knowledge/tcfc-architecture.md`
  - 資料流（Google Sheets → API → Vue 元件）
  - 元件架構（頁面/共用元件/API 層/工具）
  - 賽事組別與積分計算邏輯
  - 權限與協作（owner: realivy0730, collaborator: boday）
- 建立 `10_Core_Knowledge/github-actions-deploy.md`
  - Workflow 步驟與部署歷史
  - Node.js 20 deprecation 待辦（2026-06-02 deadline）
  - 已修復項目記錄

---

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
