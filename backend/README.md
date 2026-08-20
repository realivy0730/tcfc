# GAS 後端部署指南（Issue #7）

TCFC 市長盃賽程 GAS 後端（`backend/程式碼.js`），參照勝利聯賽架構（`victory-league-architecture-reference.md`）。
讀取（D1=②）與受控寫入（D2=② 白名單護欄）皆過 GAS；CI 由 `deploy-gas.yml` 自動部署（push `backend/**` 觸發）。

> ✅ **部署狀態（2026-08-20 完成）**：scriptId 已填入 `.clasp.json`（`1LUmcnb__0fXtap1MueWrxm8ulM1d1jv-Pn6I2LsNpGOwlhgz0xJ2ogEt`）、Web App URL 已設為 GitHub secret `VITE_GAS_URL`、`AUTH_SECRET` 已寫入 Script Properties（由部署者執行 `setupAuth` 產生）。後續 push `backend/**` 即自動部署。

## 一次性前置步驟（需瀏覽器，約 10 分鐘）

### 1. 取得 clasp 憑證 → 存入 GitHub secret

```bash
npm install -g @google/clasp
clasp login   # 瀏覽器 OAuth 登入 ivy0730（部署者身份，寫入權限掛此帳號）
cat ~/.clasprc.json
```

`clasp login` 若在非互動環境無法貼碼，可用預設模式（自動開瀏覽器並在本機監聽捕獲授權）。

把 `~/.clasprc.json` 的完整內容設為 GitHub secret **`GOOGLE_SHEETS_CREDENTIALS`**
（Repo Settings → Secrets and variables → Actions）。此憑證等同 GAS 部署鑰匙，永不 commit。

### 2. 建立 GAS 專案 → 填入 scriptId

```bash
cd backend
clasp create --title "TCFC 市長盃 GAS" --type standalone
# 成功後自動寫入 backend/.clasp.json：{"scriptId":"1Xxx...","rootDir":"."}
# rootDir 若為空字串，請手動改為 "."（本 repo 已設）
```

### 3. 首次部署 → 取得 Web App URL → 存入 GitHub secret

```bash
clasp push -f
clasp deploy   # Web App 部署，取得 deployment URL（https://script.google.com/macros/s/XXXX/exec）
```

把 URL 存為 GitHub secret **`VITE_GAS_URL`**（Secret family：Google family）。
`deploy.yml` build 時注入前端；未設定則前端自動維持直讀（零影響切換）。

> 之後每次 push `backend/**` → CI `clasp push -f` 自動更新程式碼；
> **但 `clasp deploy` 不會自動建立新 deployment**——若需替換 deployment URL 請手動
> `clasp deploy` 一次，並視需要更新 `VITE_GAS_URL`。

### 4. 設定寫入護欄（Script Properties）

GAS 編輯器（script.google.com，開啟本專案）→ 專案設定 → **指令碼屬性（Script Properties）**：
新增 `AUTH_SECRET` = 一組高強度隨機字串（如 `openssl rand -hex 32`）。

護欄規則（`doPost`）：
- 請求須帶 `auth=<AUTH_SECRET>` 參數才允許寫入（白名單護欄，決策 D2=②）
- **公開前端不得攜帶此 token**（bundle 公開 = token 外洩）；僅供主辦方內部/管理工具呼叫
- 正式「裁判登入寫入」需 email 白名單 + Google 登入流程（後續 Issue，D2 延伸）

### 5. 權限確認

- 讀取：賽程試算表為「知道連結者可檢視」即可（`SpreadsheetApp.openById`）
- 寫入（`update_result`）：部署者（ivy0730）需對該試算表有**編輯權**

## 端點說明

| 方法 | action | 參數 | 說明 |
|---|---|---|---|
| GET | `schedule` | `sheetId`, `sheetName` | 回傳該 sheet `A2:K` 原始二維陣列（`{result:'success', data:[[...]]}`） |
| POST | `update_result` | `auth`, `sheetId`, `sheetName`, `gameNumber`, `homeScore`, `awayScore` | 以場次編號定位列回填比數 + 自動記錄「更新時間」（欄位自動補上） |

- 寫入天然冪等（重複送出相同資料結果相同），不需冪等鍵欄位
- 比分驗證：非負整數或空字串；「場次」欄名容錯（場次/編號/序號）

## 前端行為（配額緩解）

`src/api/config/gasConfig.ts`：
- `VITE_GAS_URL` 已設定 → 讀取走 GAS；GAS 異常（含配額觸頂）→ **自動降級直讀**（console 警示）
- `VITE_USE_GAS=false` → 強制直讀（手動降級開關）
- 兩者皆未設定 → 維持既有直讀（零影響）

## 驗證方法

```bash
# 讀取（匿名）
curl "https://script.google.com/macros/s/<URL>/exec?action=schedule&sheetId=<SHEET_ID>&sheetName=<SHEET_NAME>"
# 寫入（需護欄，僅內部）
curl -X POST "https://script.google.com/macros/s/<URL>/exec" -d "action=update_result&auth=<AUTH_SECRET>&sheetId=...&sheetName=...&gameNumber=...&homeScore=2&awayScore=1"
```