---
title: "Gitflow 執行記錄"
tags: [git, gitflow, branches, release]
version: "1.0"
related_id: ["tcfc-architecture", "github-actions-deploy"]
last_updated: "2026-04-08"
---

# Gitflow 執行記錄

## 版本時間軸

```
v0.0.1 → v0.0.1.01~04 → v0.0.2 → v0.0.2.01 → v0.0.3 → v0.0.3.01~04 → v0.0.4 → v0.0.4.01 → v0.0.5
```

## v0.0.5 Release（2026-04-08）

### 分支流程圖

```
main:    fe12d69 ──── 7d9c619 (hotfix) ──── 0e7b957 (v0.0.5) ✅ 部署
              \          /                      /
hotfix:        7a69f2c ─┘                      /
              \                               /
release:       \                   6843c09 ──┘
                \                 /
develop: a22bba1 → b0f8bc3 → ... → cb94ea0 → c8ef6c8
```

### 包含內容
- README.md
- Kiro CLI 工作目錄（steering v1.4, agent, skill, settings）
- 知識庫遷移至 docs/（強制路徑規範）
- 核心知識文件（tcfc-architecture.md, github-actions-deploy.md）
- deploy.yml Secret 洩漏修復（含 hotfix/v0.0.4.01）

### 關鍵 Commit

| Commit | 分支 | 說明 |
|--------|------|------|
| fe12d69 | main | 初始化 Kiro CLI 工作目錄 |
| a22bba1 | develop | 加入 Gitflow 分支規則 |
| 2e2e42b | feature/docs-readme | 建立 README.md |
| b0f8bc3 | develop | merge feature/docs-readme |
| 7a69f2c | hotfix/v0.0.4.01 | 移除 deploy.yml Debug step |
| 7d9c619 | main | merge hotfix/v0.0.4.01 + tag v0.0.4.01 |
| 899f9f8 | develop | 知識庫遷移至 docs/ |
| cb94ea0 | develop | 建立 tcfc-dev agent + tcfc-ops skill |
| 6843c09 | release/v0.0.5 | release commit |
| 0e7b957 | main | merge release/v0.0.5 + tag v0.0.5 |
| c8ef6c8 | develop | merge release/v0.0.5 同步 |

## 分支清理記錄

### 已刪除（2026-04-08）
- `feature/docs-readme` — 已 merge 到 develop
- `hotfix/v0.0.4.01` — 已 merge 到 main + develop
- `release/v0.0.5` — 已 merge 到 main + develop

### 歷史分支（repo owner 建立，未清理）
- `feature/boday_fix` — 早期修復分支
- `feature/mayors-cup` — 市長盃功能開發
- `feature/remove-unused-files` — 清理不必要檔案

## Tags

| Tag | 日期 | 說明 |
|-----|------|------|
| v0.0.5 | 2026-04-08 | Kiro CLI 工作目錄完整建置 |
| v0.0.4.01 | 2026-04-08 | 移除 deploy.yml Secret 洩漏 |
| v0.0.4 | 2025-02-08 | 清理不必要頁面 |
| v0.0.3~v0.0.3.04 | — | 市長盃功能 + hotfix |
| v0.0.1~v0.0.2.01 | — | 初版 + 修復 |
