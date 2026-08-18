---
title: "勝利聯賽架構參考（GAS 後端參照）"
tags: [reference, gas, google-apps-script, sheets, architecture, ci-cd]
version: "1.0"
related_id: ["cloudflare-pages-migration-plan", "issue-6"]
last_updated: "2026-08-15"
---

# 勝利聯賽架構參考（GAS 後端參照）

> 狀態：**有效參照** — 勝利聯賽（`/Users/linyuanchun/WorkPlace/work/勝利聯賽`）為 TCFC 的「後端代理」官方參照專案（2026-08-15 調查）。
> 背景：TCFC 未來將導入 GAS 後端（裁判寫入等），決策「完全參考勝利聯賽架構」。

## 一、勝利聯賽架構全貌

```
瀏覽器（Vue 3 SPA）──▶ script.google.com/macros/s/{id}/exec（GAS Web App）
                              │ 憑證在伺服器端（executeAs: USER_DEPLOYING）
                              ▼
                         Google Sheets「報名資料」單表
```

| 面向 | 內容 |
|---|---|
| 前端 | Vue 3 + Vite，build 輸出 `.cloudflare-dist`，**零 API key、零 VITE_ env** |
| 後端 | GAS Web App（`backend/程式碼.js`，293 行）+ `backend/appsscript.json` |
| `appsscript.json` | `timeZone: Asia/Taipei`、`runtimeVersion: V8`、`executeAs: USER_DEPLOYING`、`access: ANYONE_ANONYMOUS` |
| URL | `https://script.google.com/macros/s/AKfycbx4In2YGNNGKPhWHBOTFZjTvYJBhRYYMQVeanfd2K36fuA-RH3he0HttS9ch8GcbQ/exec`（GAS `scriptId` 詳見 `.clasp.json`） |
| 部署 | Git integration 無關——CI 用 `clasp push`（`deploy-gas.yml`） |

## 二、GAS 端點行為（doGet / doPost）

- **doGet（讀取，參數 `action`）**：
  - `action=verify`：單筆身分核對（姓名 + 身分證字號），**單筆回傳、不洩漏其他球員資料**
  - 預設（名冊）：全體名冊，但姓名經 `maskName()` 遮蔽、**不含身分證等敏感欄位**
  - 全部經 `ContentService.createTextOutput(JSON).setMimeType(JSON)` 回傳
- **doPost（寫入）**：
  - 匯款回填（idempotent 回傳 `{idempotent: true}`）、報名新增（回傳 `recordId`）
  - **冪等鍵防護**：前端送 `idempotency_key`，工作表「冪等鍵」欄位比對，重送不重複寫入
  - 錯誤回傳 `{result:"error", error:...}`，嚴謹 try/catch
- **前端呼叫模式**：寫入用 `mode: 'no-cors'`（fire-and-forget）；讀取 doGet 匿名部署支援 CORS 讀回應

## 三、CI / Secrets 架構（Secret family，ISSUE-096）

**雙 workflow**：
| Workflow | 觸發 | 動作 | Secrets |
|---|---|---|---|
| `deploy-gas.yml` | push main + `paths: backend/**` | `clasp push -f` | `GOOGLE_SHEETS_CREDENTIALS`（OAuth JSON）→ `echo '...' > ~/.clasprc.json` |
| `deploy-pages.yml` | push main | `npx wrangler pages deploy .cloudflare-dist` | `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` |

**Secret family 鐵律（檔頭註解明載）**：
- Google family：`GOOGLE_SHEETS_CREDENTIALS` 保持**單一 JSON**，供 GAS 部署
- Cloudflare family：**分拆**（ACCOUNT_ID / API_TOKEN / R2 各自獨立）
- 兩家族不可混用；Dev/Prod 環境分離；憑證輪替由 Owner 直接更新
- 本地開發憑證只放本機（`~/.kiro/.../credentials/jersey-stats-key.json`），**永不進 CI/Repo**

## 四、安全性模型（勝利聯賽的取捨）

| 面向 | 勝利聯賽設計 | 評估 |
|---|---|---|
| URL 保密 | 第一道牆 | ⚠️ 前端 bundle 公開 → 「保密」只是假設，需二線防禦 |
| 認證 | **無真認證**：匿名可寫（ANYONE_ANONYMOUS） | 靠表單欄位驗證 + 冪等鍵抵擋重複/濫寫，非身份驗證 |
| 寫入防護 | idempotency_key + 欄位檢查 + maskName | 防「重複」不防「冒名」 |
| 讀取防護 | 單筆核對（verify）+ 遮蔽（roster） | 隱私滴水不漏：絕不整表回傳 |

> **事實更正（2026-08-15 調查）**：勝利聯賽 `scripts/` 僅有 `release-guardrails.js`——**不存在 `roster-sync.js` 與 `fee-calc.js`**（此前分層圖曾誤列）。GAS 後端不經 Sheets API，直接 `SpreadsheetApp` 原生化操作。

## 五、配額與限制（GAS consumer 帳號）

| 資源 | 上限 | TCFC 意義 |
|---|---|---|
| URL Fetch | ~20,000 calls/日 | 公開賽程站若讀取也過 GAS，高峰日有觸頂風險 |
| 執行時間 | ~90 分鐘/日 | 每個 doGet 啟動皆計次 |
| 回應大小 | 有限制 | 大表需分頁/遮蔽 |

**結論**：GAS 適合「寫入 + 小量讀取」；**大量公開讀取應維持直讀 Sheets**（見遷移計劃決策記錄 D1）。

## 六、TCFC 採用要點（差異對照）

| 面向 | 勝利聯賽（可搬） | TCFC（要改） |
|---|---|---|
| 資料規模 | 單表（報名資料） | **多年度 × 多組別**（2 年 × ~20 sheet 名，RANGE `A2:K`）→ GAS 需參數化（`year`+`sheetName`） |
| 讀取路徑 | roster/verify 過 GAS | 現況直讀（`src/utils/sheetFetcher.ts` 單點 + `sheetConfig.ts` 集中設定）→ **讀/寫拆分決策 D1** |
| 寫入需求 | 報名+匯款 | 裁判寫入（市長盃 2024/2025）→ 可完全沿用 doPost + 冪等鍵模式 |
| 認證強度 | 匿名可寫 | 官方網站建議加白名單護欄（**決策 D2**） |
| 部署身份 | USER_DEPLOYING（個人帳號） | 可接受（寫入授權掛單一 Google 帳號，審計歸個人） |
| CI | 雙 workflow + Secret family | 沿用；遷移期另加 `VITE_GOOGLE_SHEETS_API_KEY` 相關（Phase 5 後移除） |

## 七、評估結論

1. **架構方向正確**：GAS 優於 Pages Functions（免 Service Account / OAuth 同意畫面、與 Sheets 同生態、勝利聯賽實戰驗證、知識重用）。
2. **讀寫全過 GAS（決策 D1=② 已定案）**：不採「讀維持直讀」的拆分案；配額風險（URL Fetch ~20k/日）以遷移計劃第八章的四項緩解因應（前端快取、直讀 fallback 開關、執行記錄監控、pages.dev 先驗證）。
3. **認證要加護欄**：官方網站不得僅靠 URL 保密（成本 ~0.5 工作天）。
4. **時序**：GAS 引入屬 Phase 5 範圍，另開 Issue，不併入本次平台遷移（Issue #6）。

> 決策記錄（D1-D3 已定案：D1=② 讀寫全過 GAS、D2=② 白名單護欄、D3=① 另開 Issue #7）→ 見 `cloudflare-pages-migration-plan.md` 第八章。