---
name: tcfc-ops
description: TCFC 賽事系統維運，包含新增年度賽事、本地建置驗證、部署前檢查。用於擴展賽事功能或準備部署時。
---

## 新增年度賽事 SOP

當需要新增一個年度的市長盃賽事時，依序完成以下步驟：

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

在`src/views/mayors-cup/{year}/` 建立：
- `WelcomePage.vue` — 年度總覽
- `SchoolGroupPage.vue` — 學校組（使用 BaseTournamentPage）
- `OpenGroupPage.vue` — 公開組（使用 BaseTournamentPage）

### Step 4: 新增路由

在 `src/router/mayors-cup.ts` 新增年度路由（參考 2024/2025 結構）。

### Step 5: 更新首頁 homeService

在 `src/api/services/homeService.ts` 的 `getLatestResults()` 加入新年度的 service 呼叫。

---

## 淘汰賽資料規範

Google Sheet 的 `group` 欄位對照：

| group 欄位 | 意義 |
|-----------|------|
| `A`/`B`/`C`/`D`... | 分組賽 |
| `R32` | 三十二強 |
| `R16` | 十六強 |
| `QF` | 八強賽 |
| `SF` | 四強賽 |
| `3rd` | 季殿軍賽 |
| `FINAL` | 冠亞軍賽 |

> **注意**：`F` 不作為冠亞軍標籤，因為部分組別有「F 組」分組賽會衝突。一律使用 `FINAL`。

### Apps Script 自動標記

`labelKnockoutStages()` 從最後一場往前數，自動將「晉」改為正確標籤。

**注意事項**：
- 必須在「晉」標籤存在時執行，若已被 `assignGroups` 覆蓋則需先還原
- `fixYoujiKnockout()` 用於幼兒組特殊修正，冠亞軍用 `'FINAL'`（非 `'F'`）

### F 標籤衝突（已解決，2026-04-23）

低年級組、中年級男生組、高年級男生組的小組賽有 F 組，與決賽標籤衝突。

解法：
- Apps Script labels 陣列第一個為 `'FINAL'`
- 前端 `KnockoutBracket.vue` 只保留 `FINAL` key，移除 `F`
- `BaseTournamentPage.vue` 的 `F` 組視為普通分組賽

---

## 本地建置驗證

```bash
~/.volta/bin/npm run build
~/.volta/bin/npm run preview
```

驗證項目：
- [ ] `npm run build` 無錯誤
- [ ] 首頁正常載入，賽事入口卡片顯示
- [ ] 最新比分區塊有資料或顯示「暫無比賽結果」
- [ ] 市長盃各年度頁面可切換
- [ ] 組別下拉選單正常
- [ ] 賽程資料正確顯示（需 API Key）

## 部署前檢查清單

merge 到 main 前：
- [ ] 在正確的 Gitflow 分支上（release/* 或 hotfix/*）
- [ ] `npm run build` 本地建置成功
- [ ] TypeScript 無型別錯誤
- [ ] 路由正常運作
- [ ] commit message 格式正確（`type: 說明`）
- [ ] `docs/00_Meta/changelog.md` 已更新

merge 到 main 後：
- [ ] GitHub Actions 執行成功
- [ ] https://tcfc.org.tw 頁面正常
- [ ] 建立對應版本 tag
