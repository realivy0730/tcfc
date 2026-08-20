---
title: "Cloudflare Pages 遷移計劃"
tags: [deploy, cloudflare-pages, migration, plan, google-sheets]
version: "1.1"
related_id: ["github-actions-deploy", "tcfc-architecture", "victory-league-architecture-reference", "issue-6"]
last_updated: "2026-08-15"
---

# Cloudflare Pages 遷移計劃

> 狀態：**計劃階段（Phase 0）** — 追蹤 Issue：[#6](https://github.com/realivy0730/tcfc/issues/6)
> 動機：借鏡 Family Lock（boday/boday-family）「Cloudflare Pages + Pages Functions + private repo」架構。

## 一、現況盤點：TCFC vs Family Lock

| 面向 | Family Lock（目標） | TCFC（現況） |
|---|---|---|
| 框架 | Vue 3 + Vite + PWA | Vue 3 + Vite + TypeScript |
| 託管 | Cloudflare Pages | GitHub Pages |
| 網域 | family.chiyu.idv.tw（Cloudflare DNS） | tcfc.org.tw — **DNS 已在 Cloudflare**（NS: sureena/chris.cloudflare.com），A 紀錄指 GitHub Pages IP（185.199.108-111.153） |
| 部署 | 本機 `wrangler pages deploy` | GitHub Actions `deploy.yml`（push main 觸發） |
| repo 可見性 | private | public |
| 後端 | Pages Functions（`/api/*`）+ JWT | 無（Sheets 直讀） |
| 憑證位置 | Pages env（服務端） | ⚠️ API key 明碼在 `package.json` build script + 打包進前端 JS |

## 二、關鍵決策與結論

### Q1：改用 Cloudflare Pages 後，GitHub 的角色？repo 可設 private 嗎？

- GitHub 退位為「程式碼倉庫 + Issue/PR 治理」，不再負責部署。
- **private 完全可行**：部署後網站活在 Cloudflare edge，與 repo 可見性零關係（Family Lock 已實證：repo 不公開、網站正常）。
- Cloudflare Git integration 授權 GitHub App 時勾選該 repo 即可，private 也能讀取。
- 建議設 private：避免 sheet ID、API key 設定細節外洩（目前 API key 明碼在 package.json）。

### Q2：Sheets 直讀，API key 會公開嗎？

- **現在就是公開的**：key 經 Vite `define` 打包進 JS bundle，任何人 DevTools 可見；Sheets API key 只能設 referrer 限制減緩濫用，無法隱藏。
- **純讀取**：sheet 設「知道連結者可檢視」時，key 公開無實質風險 → 加 referrer 限制 + 配額即可。
- **多位裁判寫入**：API key 不能寫入 Sheets → 必須 Service Account + 後端代理（Phase 5）。

### Q3：部署方式建議

- 建議 **Cloudflare Pages Git integration（GitHub App）**：push main 自動 build + deploy（與現況體驗一致）、private repo 支援、內建 deployment history 一鍵回滾、不需管理 API token secret。
- UAT 可綁 branch（借鏡 Family Lock 的 uat branch 模式）。

## 三、目標架構

```
GitHub repo（private）──Cloudflare GitHub App──▶ Cloudflare Pages（tcfc）
  │ push main 自動 build+deploy                    ├─ 靜態 SPA（dist/）
  │                                                └─ Pages Functions（Phase 5: /api/schedule）
  │                                                       │ env 內存 key / service account
  ▼                                                       ▼
Google Sheets（公開讀取）                        tcfc.org.tw（DNS 已在 Cloudflare）
```

## 四、執行步驟（Phase 0-5）

### Phase 0 — 前置檢查（30 分）

- 確認 Cloudflare 帳號與 tcfc.org.tw zone 存取權（✅ 已確認 DNS NS 指向 Cloudflare）
- 確認 GCP Sheets API 已啟用
- 開 Issue 追蹤（✅ Issue #6）
- 知識庫同步（計劃階段）✅

### Phase 1 — 建立 Pages 專案（需 Cloudflare dashboard）

1. Workers & Pages → Create → Pages → Connect to Git → 選 realivy0730/tcfc
2. Build 設定：framework Vue、build command `npm run build`、output `dist`
3. Env vars：`VITE_GOOGLE_SHEETS_API_KEY`（production + preview）
4. 移除 `package.json` build script 明碼 key（改由 Pages env 注入）

### Phase 2 — SPA fallback

- 新增 `public/_redirects`：`/* /index.html 200`
- GitHub Pages 的 `cp dist/index.html dist/404.html` 不再需要

### Phase 3 — 網域切換（需 Cloudflare dashboard，DNS 已在 Cloudflare）

1. Pages → Custom Domains → 綁定 tcfc.org.tw（Cloudflare 自動補 DNS 紀錄、自動發 SSL）
2. 驗證 SSL 與訪問
3. 回滾：改回 A 紀錄指 GitHub Pages（185.199.108-111.153），秒級生效

### Phase 4 — 驗證與收尾

- 驗證清單：`tcfc.pages.dev` → `tcfc.org.tw`、深連結（/mayors-cup/2025）、RWD、賽程資料、DevTools 確認 key 位置
- 移除 `.github/workflows/deploy.yml`
- 一週後關閉 GitHub Pages 專案
- repo 設 private（GitHub → Settings → Danger Zone）
- 知識庫同步（執行/完成階段）：重寫 `github-actions-deploy.md`、更新 INDEX 專案資訊、README 部署章節

## 四之二、零影響策略（計畫書 v0.2 核心章節）

> **鐵律：任何步驟不得中斷 tcfc.org.tw 現行服務（零停機、可回滾）。**
> 策略：雙軌並行（tcfc.pages.dev 試行）→ 驗證通過 → 才切換網域 → 可秒回滾。

| Phase | 動作 | 對現行網站影響 | 附註 |
|---|---|---|---|
| 0 前置 | 盤點、Issue #6、知識庫（計劃） | 🟢 零影響 | ✅ 已完成 |
| 1 建 Pages 專案 | Git integration + env vars（API key 注入） | 🟢 零影響 | 部署到 pages.dev 試行網域，**不碰 DNS** |
| 2 SPA fallback | `public/_redirects`（`/* /index.html 200`） | 🟢 零影響 | ✅ 檔案已備妥，僅 build 生效 |
| 3 雙軌驗證 | 在 `tcfc.pages.dev` 跑完整驗證清單 | 🟢 零影響 | **硬性 gate：全部通過才准 Phase 4** |
| 4 網域切換 | Custom Domains 綁定 `tcfc.org.tw`（Cloudflare 自動補紀錄 + SSL） | 🟡 秒級切換 | 唯一有風險時刻；回滾＝移除 CNAME 改回 GitHub Pages A 紀錄（185.199.108-111.153） |
| 5 穩定期 | 觀察 1–2 週（SSL、深連結、CDN 快取） | 🟢 正常運作 | 期間保留 GitHub Actions |
| 6 收尾 | 移除 `deploy.yml`、關閉 GitHub Pages、repo 設 private | 🟢 零影響（先驗證後刪） | boday-family 實證：repo private 與網站運作無關 |
| 7 Phase 5（選擇性） | GAS 代理寫入（勝利聯賽架構，見第八章決策） | 🟢 零影響 | 加在既有讀取路徑之上；另開 Issue |

**驗收清單（Phase 4 切換前的硬性前置條件）**
- [ ] `tcfc.pages.dev` 首頁正常、RWD 正常
- [ ] 深連結 `/mayors-cup/2025` 直開正常（SPA fallback 生效）
- [ ] 賽程資料正確載入（兩年度）
- [ ] DevTools 確認 API key 位置（切換後移至 Pages env，移除 build script 明碼）
- [ ] SSL 憑證有效（Cloudflare 自動簽發）

**回滾對策**
- DNS 異常：Cloudflare DNS 內移除 CNAME → 回 GitHub Pages A 紀錄（秒級）
- 新部署有 bug：Pages deployment history 一鍵回滾；穩定期結束前 GitHub Actions 保留

### Phase 5（選擇性）— GAS 代理（裁判寫入才需要，另開 Issue；勝利聯賽架構）

詳見下方專章與 `victory-league-architecture-reference.md`。

## 五、風險與成本

| 風險 | 緩解 |
|---|---|
| DNS 切換失誤 | DNS 在 Cloudflare 內操作，可即時回滾 |
| API key 已外洩（現況） | Phase 1 移除明碼 + referrer 限制；Phase 5 移入服務端 |
| private 後 CI 失效 | 部署移交 Cloudflare，PR check 屬內部團隊無影響 |

成本：Cloudflare Pages 免費方案足夠（500 builds/月、Functions 10 萬次請求/日免費）。

## 六、Phase 5 專章：後端代理詳解

### 6.0 架構決策更新（2026-08-15）：Functions → GAS 代理

> 調查勝利聯賽（`victory-league-architecture-reference.md`）後，Phase 5 後端由「Cloudflare Pages Functions」**改為「GAS Web App」**（完全參考勝利聯賽架構）。

| 比較 | Pages Functions（原案，已棄） | GAS Web App（現案，勝利聯賽實證） |
|---|---|---|
| 身份 | 需建 GCP Service Account + OAuth 同意畫面 | `executeAs: USER_DEPLOYING`（部署者帳號，零 GCP 設定） |
| Sheets 操作 | URL Fetch 打 Sheets API | 原生 `SpreadsheetApp`（快、無 API 限制） |
| 冪等防護 | 自寫 | 勝利聯賽已實證（idempotency_key 模式） |
| 知識重用 | Family Lock 參照（boday-family） | **勝利聯賽同專案家族**，程式碼可參考 `backend/程式碼.js` |
| 配額 | Functions 10 萬請求/日 | GAS URL Fetch ~20k/日（**寫入用綽綽有餘，公開讀取會觸頂）** |

**因此：讀寫皆走 GAS**（決策 D1=② 已定案）— 配額風險緩解見第八章；內部仍保留直讀 fallback 開關作為觸頂降級路徑。

### 6.1 為什麼需要

> 📌 6.1–6.4 保留原「Pages Functions 案」設計細節，作為**對照**（6.0 已定案改 GAS）；實作以 6.5 為準。

現況：瀏覽器直打 `sheets.googleapis.com`，key 公開且只能讀、不能寫。裁判寫入賽程 → 需要後端代理。

```
瀏覽器 ──打自己的 /api/*──▶ Cloudflare Pages Functions（伺服器端）
                                   │ 憑證藏在 env，外界看不到
                                   ▼
                              Google Sheets（讀 + 寫）
```

### 6.2 名詞解釋

- **Cloudflare Pages Functions**：專案內 `functions/` 資料夾的檔案自動變成伺服器端程式碼，跑在 Cloudflare edge，與網站同網域（`/api/*`）無 CORS 問題。Family Lock 的 `/api/fortune`、`/api/media` 即此模式。
- **GCP Service Account**：Google Cloud 的「機器人帳號」（有 email 與憑證）。把 Sheet 編輯權分享給它的 email，Functions 就能以機器人身份讀寫，不需任何人密碼。Family Lock 的 `scripts/sync-catalog.js` 以此掃描 Google Drive。

### 6.3 三塊拼圖

**① GET：前端讀賽程（key 藏進 env）**

現況 `src/utils/sheetFetcher.ts`：`?key=${API_KEY}`（公開）→ 改打自家後端：

```js
// functions/api/schedule.js
export async function onRequestGet(context) {
  const { env } = context;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.SHEET_ID}/values/...`;
  const res = await fetch(url + `?key=${env.GOOGLE_SHEETS_API_KEY}`);
  return Response.json(await res.json());
}
```

**② POST：裁判寫賽程（Service Account 身份）**

```js
export async function onRequestPost(context) {
  // 1. 驗證 JWT（白名單裁判）
  // 2. 用 Service Account 換 Google 存取憑證（env.GOOGLE_SERVICE_ACCOUNT_JSON）
  // 3. 以機器人身份寫入 Sheets（google.sheets spreadsheets.values.update）
}
```

**③ 認證：確認「是裁判本人」在寫（複製 Family Lock 的 `functions/api/auth/google.js`）**

```
1. 裁判按「用 Google 登入」→ Google 驗證身份
2. 前端 POST /api/auth/google
3. Functions 驗證憑證 + 檢查 email 是否在白名單（如裁判 email 清單）
4. 是 → 簽發 JWT（含 email，14 天效期，密鑰 JWT_SECRET 藏 env）
5. 之後每次寫入請求帶 JWT → Functions 驗證有效才允許寫入
```

JWT = 伺服器發的簽名入場券，密鑰只有伺服器知道，無法偽造。Family Lock 白名單 4 個家庭 email、token 存 `localStorage.family_token`。

### 6.4 成本與工作量

| 項目 | 說明 |
|---|---|
| 新增檔案 | `functions/api/schedule.js` + `functions/api/auth/google.js`（約 100 行，可借 Family Lock） |
| GCP 設定 | 開 Service Account（免費）+ Sheet 分享編輯權 |
| Google Cloud Console | 啟用 Sheets API + OAuth 同意畫面（白名單裁判 email） |
| 前端改動 | `sheetFetcher.ts` 改打 `/api/*` + 新增登入流程 |
| 不做 | 維持公開讀取（key 公開但只讀），裁判寫入另用人工對帳 |

### 6.5 GAS 版實作要點（勝利聯賽參照）

- **單檔後端**：`backend/程式碼.js` + `appsscript.json`；本專案需**參數化**（`action` + `year` + `sheetName`，因 TCFC 多年度 × 多組別，勝利聯賽僅單表）
- **doGet（讀）**：單筆核對 / 遮蔽名冊模式可沿用；讀取全過 GAS（D1=②），配額靠第八章緩解 + 直讀 fallback 開關
- **doPost（寫）**：裁判回填沿用冪等鍵防重複 + 欄位驗證；認證強度視決策 D2
- **CI**：新增 `deploy-gas.yml`（clasp push，`GOOGLE_SHEETS_CREDENTIALS` secret）；沿用 Secret family 註解（ISSUE-096）
- **知識來源**：`/Users/linyuanchun/WorkPlace/work/勝利聯賽/backend/程式碼.js`（293 行範本）

## 七、知識庫三階段同步點（知識庫同步鐵律）

| 階段 | 動作 | 狀態 |
|---|---|---|
| 計劃 | 本文件 + INDEX + changelog | ✅ 2026-08-14 |
| 執行 | 重寫 `github-actions-deploy.md`（deprecated → 新部署方式） | ⏳ 待 Phase 1-4 執行 |
| 完成 | INDEX 專案資訊、README 部署章節 | ⏳ 待 Phase 4 |

> Kiro-side knowledge index rebuild 記為 follow-up（本文件不修改 .kiro）。

## 八、決策記錄（Decision Log，2026-08-15）

> 本節記錄本專案後端/部署調查的**有效對話結論**，供後續協作（Codex/Gemini/Antigravity/Kiro）直接取用。

### D0 ✅ 已定案 — 部署方案：Option B（CI + API Token，不綁 Git integration）

- **不綁** Cloudflare Git integration（GitHub App）。GitHub 純當 code repo + Issue/PR 治理（GitHub-only，不串 Redmine）。
- 部署機制：GitHub Actions `dispatch` → checkout → `npm ci` → build → `npx wrangler pages deploy dist --project-name tcfc`，token 走 `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets（Victory League `deploy-pages.yml` 模式）。
- 本機 `wrangler login` **不需要**（CI 用 token）；查過 boday-family 的「純手動 wrangler deploy」模式，已排除（無自動化）。
- 綁定優劣比較結論：綁定 = 少管 secret 但授權 GitHub App 存取 repo；不綁 = GitHub 完全退位部署、由 CI token 掌控，repo 可安全設 private。

### D0.1 ⏳ 執行時確認 — CI 內 API key 寫法（調查結論：勝利聯賽根本沒有 API key）

- 勝利聯賽前端**零 API key**（前端 never 碰 Sheets，全走 GAS 代理）→ 「寫入式」架構下無 key 問題。
- TCFC 現況「key 打包進 bundle」**本質公開**（`sheetFetcher.ts:17` `?key=${API_KEY}`）——寫法無法改變公開事實，只能選存放位置。
- 建議：**b = 放 GitHub secrets** 引用（`VITE_GOOGLE_SHEETS_API_KEY`），workflow 檔頭加「Secret family」註解說明此 key 公開屬預期；Phase 5（GAS）後整個移除。a（明文寫 workflow）= 最快但違反 Secret family 慣例；c（GAS 代理）＝真正的品質解但屬 Phase 5。

### D1-D3 ✅ 已定案（2026-08-15）— GAS 引入決策（參考 `victory-league-architecture-reference.md`）

| # | 決策 | 定案 | 附註 |
|---|---|---|---|
| D1 | 讀取路徑 | **② 讀寫全過 GAS** | 用戶拍板。**最小風險要求**：雙軌驗證 → gate → 可回滾（沿用零影響鐵律）；配額風險緩解見下 |
| D2 | 裁判寫入認證 | **② 白名單護欄** | email / header secret 驗證（成本 ~0.5 工作天） |
| D3 | 導入時序 | **① 另開 Issue #7** | 追蹤：[#7](https://github.com/realivy0730/tcfc/issues/7)，掛 Phase 5，#6 完成後執行 |

**配額風險緩解（D1=② 的最小風險前提）**
- GAS consumer 配額：URL Fetch ~20k/日、執行 ~90 分鐘/日 —— 公開賽程站高峰有觸頂風險
- 緩解①：前端回應快取（short TTL）降低 GAS 呼叫量
- 緩解②：直讀 fallback 開關（env 切換回直讀 Sheets），觸頂時計畫內降級
- 緩解③：GAS 執行記錄監控（Apps Script 用量追蹤）
- 緩解④：全程 pages.dev 先驗證（不直接碰正式網域），Gate 未過不切換

### 已排除方案（調查結論）

- ❌ Cloudflare Git integration（GitHub App）——D0 定案不綁
- ❌ boday-family 手動 wrangler 部署模式（`npm run cf-deploy`）——無自動化
- ❌ Pages Functions 代理（原 Phase 5 案）——6.0 改為 GAS 代理（成本更低、知識重用勝利聯賽）
- ❌ GitHub Pages 部署（現況）——本次遷移對象
- ❌ 勝利聯賽 `scripts/roster-sync.js` / `fee-calc.js`——**不存在**（僅 release-guardrails.js；此更正已入參考檔第五章）

### 待辦關聯

- Issue #6：本次平台遷移（Phase 0–7 零影響策略執行）
- Issue #7：GAS 後端導入（✅ 已建立：D1=② D2=② D3=①，Phase 5 執行）
