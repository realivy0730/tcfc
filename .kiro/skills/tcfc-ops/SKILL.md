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

在`src/views/mayors-cup/{year}/` 建立：
- `WelcomePage.vue` — 年度總覽
- `SchoolGroupPage.vue` — 學校組（使用 BaseTournamentPage）
- `OpenGroupPage.vue` — 公開組（使用 BaseTournamentPage）

### Step 4: 新增路由

在 `src/router/mayors-cup.ts` 新增年度路由（參考 2024/2025 結構）。

### Step 5: 更新首頁 homeService

在 `src/api/services/homeService.ts` 的 `getLatestResults()` 加入新年度的 service 呼叫。

---

## 首頁視覺改版 SOP（v2.0 賽事風格）

首頁視覺相關檔案：
- `src/views/Index.vue` — 首頁 HTML 結構（TypeScript）
- `src/assets/styles/views/_index.scss` — 首頁樣式
- `src/api/services/homeService.ts` — 首頁最新比分資料
- `src/assets/images/splash.jpg` — 桌機 Hero 背景圖
- `src/assets/images/splash_m.jpg` — 手機 Hero 背景圖

### 目前首頁結構（v2.0 賽事風格）

```
Hero 區塊            → 全螢幕背景圖 + 深色遮罩(0.65) + 左下角大標語 + 黃線 + CTA
Tournaments Section → 深黑(#0a0a0a) + 2025/2024 賽事入口卡片（router-link）
Results Section     → 深灰(#111) + 最新比分（API 撈 2025 已完賽前 5 筆）
Vision Section      → 深色背景($primary-color) + 大標語 + 5 欄數字要點
Mission Section     → 深色(#0f0f0f) + 左文右圖 + 白字
Values Section      → 深色($primary-color) + 3 欄卡片
CTA Section         → 背景圖 + 深色遮罩 + 行動呼籲按鈕
```

### 整體色彩規範

| 用途 | 色值 |
|---|---|
| 主背景（最深） | `#0a0a0a` |
| 次背景 | `#0f0f0f` / `#111` |
| 強調色 | `#F1C40F`（黃色） |
| 主文字 | `#fff` |
| 次文字 | `rgba(#fff, 0.7)` |
| 裝飾線 | `rgba(#fff, 0.1)` |

### Hero 區塊規格

- 遮罩：`rgba(0,0,0,0.65)` 統一深色
- 排版：左下角（`align-items: flex-end`，`padding: 0 4rem 6rem`）
- 英文小標：`0.8rem`，`letter-spacing: 0.5em`，`opacity: 0.6`
- 黃線：`50px × 3px`，`#F1C40F`
- 標題：`clamp(2.8rem, 6vw, 5rem)`，`font-weight: 800`

### 修改 Hero 背景圖

直接替換 `src/assets/images/splash.jpg`（桌機）和 `splash_m.jpg`（手機），保持檔名不變。

### 最新比分資料來源

`src/api/services/homeService.ts` 的 `getLatestResults(limit)` 函式：
- 並行撈多個組別（`Promise.allSettled`）
- 過濾條件：`homeScore !== '' && awayScore !== ''`（已完賽）
- 排序：依 `date` 降序
- 預設取前 5 筆

---

## 動態效果 SOP

### 全域 Directive：v-scroll-reveal

位置：`src/directives/scrollReveal.ts`，已在 `src/main.ts` 全域註冊。

**用法：**
```html
<!-- 基本（向上淡入） -->
<div v-scroll-reveal>...</div>

<!-- 帶 delay（毫秒）和方向 -->
<div v-scroll-reveal="{ delay: 100, direction: 'left' }">...</div>
```

**參數：**
- `delay`：延遲毫秒（預設 0）
- `direction`：`up`（預設）/ `left` / `right`

### Hero 動態

- **視差滾動**：`onScroll()` 監聽滾動，背景以 0.4 倍速移動
- **進場動畫**：`@keyframes heroFadeUp`，英文副標 0.3s → 黃線 0.5s → 主標 0.7s → CTA 0.9s

---

## 市長盃內頁深色化規範

### 關鍵檔案

| 檔案 | 用途 |
|---|---|
| `src/assets/styles/components/_tournament.scss` | 全域賽程樣式（積分榜、展開項、淘汰賽卡片） |
| `src/views/mayors-cup/components/BaseTournamentPage.vue` | 分組賽/淘汰賽頁面容器（scoped 樣式） |
| `src/views/mayors-cup/components/MatchCard.vue` | 單場比賽卡片元件（scoped 樣式） |
| `src/layouts/MayorsCupLayout.vue` | 市長盃 Layout（含年度導航） |

### 深色化原則

**改背景色時，必須同步在同一容器層加 `color: #fff`**，讓 CSS 繼承自動處理所有子元素，不要事後一個一個補。

```scss
// ✅ 正確：根層設定，子元素繼承
.match-card {
    color: #fff;  // 一行搞定所有子元素
    .date { color: #F1C40F; }  // 只有特殊顏色才個別覆蓋
}

// ❌ 錯誤：事後補洞
.match-card {
    .name { color: #fff; }
    .score { color: #fff; }
    .venue { color: #fff; }  // 漏一個就出問題
}
```

### 已知深色背景容器

| 容器 | 背景 | 文字設定位置 |
|---|---|---|
| `.tournament-page` | `#0a0a0a` | `BaseTournamentPage.vue` 根層加 `color: #fff` |
| `.match-item` | `#111` | `_tournament.scss` 加 `color: #fff` |
| `.knockout-match` | `#111` | `_tournament.scss` 加 `color: #fff` |
| `.match-card` | 繼承父層 | `MatchCard.vue` 根層加 `color: #fff` |
| `.select-input` | `#1a1a1a` | `_tournament.scss` 加 `color: #fff` |
| `.main-content` | `#000` | `MayorsCupLayout.vue` 加 `background-color: #000` |

### 注意：scoped 樣式無法覆蓋全域

`BaseTournamentPage.vue` 的 scoped 樣式**無法**覆蓋 `_tournament.scss` 的全域樣式。  
若全域有 `background: $white-color`，必須直接在全域檔案修改，不能靠 scoped 覆蓋。

### 色彩規範（內頁）

| 用途 | 色值 |
|---|---|
| 卡片背景 | `#111` |
| 次要背景 | `#1a1a1a` |
| 主文字 | `#fff` |
| 次要文字 | `rgba(#fff, 0.5)` |
| 強調色（日期/標題） | `#F1C40F` |
| 勝隊文字 | `$accent-green` |

---

## 淘汰賽 Bracket 圖規劃

### 資料結構需求

淘汰賽 Bracket 圖需要 Google Sheet 的 `group` 欄位明確標示賽事階段：

| group 欄位 | 意義 | 範例 |
|-----------|------|------|
| `A`/`B`/`C`/`D`... | 分組賽 | 小組循環賽 |
| `R32` | 三十二強 | 32隊淘汰賽 |
| `R16` | 十六強 | 16隊淘汰賽 |
| `QF` | 八強賽 | A1 vs B2 |
| `SF` | 四強賽 | QF勝者 |
| `3rd` | 季殿軍賽 | SF敗者 |
| `F` | 冠亞軍賽 | SF勝者 |

> **規則**：Apps Script `labelKnockoutStages()` 從最後一場往前數自動填入，無需手動標記。

### RWD 策略

```scss
// 桌機：完整橫向 Bracket
.bracket {
  display: flex;
  gap: 4rem;
}

// 手機：允許橫向滑動
@media (max-width: 768px) {
  .bracket {
    overflow-x: auto;
    min-width: 800px;
  }
}
```

### 實作方式

- **純 CSS + Vue**：不引入額外套件，保持輕量
- **自動判斷層級**：依 `group` 欄位自動分層（八強 → 四強 → 決賽）
- **動態連線**：CSS `::before` / `::after` 畫連接線
- **勝隊高亮**：依 `homeScore` / `awayScore` 判斷勝隊，加 `.winner` class

### Apps Script 自動標記

`labelKnockoutStages()` 函數已加入 Apps Script，執行後自動將所有 tab 的「晉」改為正確標籤。

---

## 本地建置驗證

部署前必須通過以下檢查：

```bash
~/.volta/bin/npm run build
~/.volta/bin/npm run preview
```

驗證項目：
- [ ] `npm run build` 無錯誤
- [ ] 首頁正常載入，賽事入口卡片顯示
- [ ] 最新比分區塊：有資料顯示或顯示「暫無比賽結果」
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
