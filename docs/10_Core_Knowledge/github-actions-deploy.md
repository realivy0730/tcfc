---
title: "GitHub Actions 部署"
tags: [deploy, github-actions, ci-cd]
version: "1.0"
related_id: ["tcfc-architecture"]
last_updated: "2026-04-08"
---

# GitHub Actions 部署

## Workflow 概要

- 檔案：`.github/workflows/deploy.yml`
- 名稱：Deploy to GitHub Pages
- 觸發：push 到 `main` 分支
- Runner：`ubuntu-latest`
- Node.js：20

## 部署步驟

```
1. Checkout 原始碼
2. Setup Node.js 20
3. npm install
4. 注入 VITE_GOOGLE_SHEETS_API_KEY（GitHub Secrets）
5. npm run build
6. cp dist/index.html dist/404.html（SPA 路由支援）
7. Upload artifact → Deploy to GitHub Pages
```

## 部署歷史

| Run | Commit | Tag | 說明 | 狀態 |
|-----|--------|-----|------|------|
| #36 | 0e7b957 | v0.0.5 | release/v0.0.5 Kiro CLI 工作目錄完整建置 | ✅ Success (1m 18s) |
| #35 | 7d9c619 | v0.0.4.01 | hotfix/v0.0.4.01 移除 Debug step | ✅ Success (1m 23s) |
| #34 | fe12d69 | — | 初始化 Kiro CLI 工作目錄 | ✅ Success (1m 18s) |

## 已知問題與待辦

### ⚠️ Node.js 20 Deprecation（優先度：中）

GitHub Actions 警告：
- `actions/checkout@v4`、`actions/configure-pages@v4`、`actions/deploy-pages@v4`、`actions/setup-node@v4`、`actions/upload-pages-artifact@v3` 使用 Node.js 20
- **2026-06-02** 起強制使用 Node.js 24
- **2026-09-16** 移除 Node.js 20

建議修復：
```yaml
# 升級到支援 Node.js 24 的版本
actions/checkout@v5          # 待確認是否已發布
actions/setup-node@v5
actions/configure-pages@v5
actions/upload-pages-artifact@v4
actions/deploy-pages@v5
```

### ✅ 已修復：Debug Step 洩漏 Secret（v0.0.4.01）

- 原本 deploy.yml 有 `Debug Environment Variables` step 會將 API Key 明文印到 log
- 已在 hotfix/v0.0.4.01 移除

## Concurrency 設定

```yaml
concurrency:
  group: pages
  cancel-in-progress: false  # 不會取消進行中的部署
```

## Secrets

| Secret | 用途 | 注入方式 |
|--------|------|----------|
| `VITE_GOOGLE_SHEETS_API_KEY` | Google Sheets API | `$GITHUB_ENV` + build env |

管理者：repo owner（realivy0730）
