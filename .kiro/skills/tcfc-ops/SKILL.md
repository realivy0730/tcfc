---
name: tcfc-ops
description: TCFC 賽事系統維運，包含新增年度賽事、本地建置驗證、部署前檢查。用於擴展賽事功能或準備部署時。
---

## 新增年度賽事 SOP

當需要新增一個年度的市長盃賽事時，依序完成以下四步驟：

### Step 1: 設定 Google Sheets

在 `src/api/config/sheetConfig.ts` 新增年度設定：

```typescript
// MAYORS_CUP_CONFIG.SHEET_IDS 新增年度
'{year}': {
    SCHOOL: "{school_sheet_id}",
    OPEN: "{open_sheet_id}",
}

// SHEET_NAMES 新增年度組別
'{year}': {
    school: { U10: '學校中年級賽程表', U12: '學校高年級賽程表', U15: '學校國中組賽程表' },
    open: { U6: '幼兒組賽程表', U8: '低年級組賽程表', ... }
}
```

### Step 2: 建立 Service

在 `src/api/services/mayorsCup/{year}/` 建立：
- `schoolGameService.ts` — 繼承 BaseGameService
- `openGameService.ts` — 繼承 BaseGameService

### Step 3: 建立頁面

在 `src/views/mayors-cup/{year}/` 建立：
- `WelcomePage.vue` — 年度總覽
- `SchoolGroupPage.vue` — 學校組（使用 BaseTournamentPage）
- `OpenGroupPage.vue` — 公開組（使用 BaseTournamentPage）

### Step 4: 新增路由

在 `src/router/mayors-cup.ts` 新增年度路由（參考 2024/2025 結構）。

## 本地建置驗證

部署前必須通過以下檢查：

```bash
# TypeScript 型別檢查 + 建置
npm run build

# 預覽建置結果
npm run preview
```

驗證項目：
- [ ] `npm run build` 無錯誤
- [ ] 首頁正常載入
- [ ] 市長盃各年度頁面可切換
- [ ] 組別下拉選單正常
- [ ] 賽程資料正確顯示（需 API Key）

## 部署前檢查清單

merge 到 main 前必須確認：

- [ ] 在正確的 Gitflow 分支上（release/* 或 hotfix/*）
- [ ] `npm run build` 本地建置成功
- [ ] TypeScript 無型別錯誤
- [ ] 路由正常運作
- [ ] commit message 格式正確（`type: 說明`）
- [ ] `docs/00_Meta/changelog.md` 已更新

merge 到 main 後必須確認：

- [ ] GitHub Actions 執行成功
- [ ] https://tcfc.org.tw 頁面正常
- [ ] 建立對應版本 tag
