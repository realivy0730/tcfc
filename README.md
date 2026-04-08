# TCFC 臺中市體育總會足球委員會

臺中市體育總會足球委員會官方網站，提供組織介紹、市長盃足球賽事即時賽程與積分查詢。

🌐 **https://tcfc.org.tw**

## 功能

- 組織願景、使命與價值觀介紹
- 市長盃足球賽事系統（2024 / 2025 年度）
  - 學校組（U10 / U12 / U15）
  - 公開組（U6 / U8 / U10 男女 / U12 男女 / U15 / U18）
- 分組賽積分榜即時計算
- 淘汰賽賽程與比分
- 賽程資料從 Google Sheets 即時同步
- RWD 響應式設計（桌面 / 手機）

## 技術棧

| 項目 | 技術 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 建置 | Vite |
| 語言 | TypeScript |
| 樣式 | SCSS (BEM) |
| 路由 | vue-router 4 |
| 狀態管理 | Pinia |
| HTTP | axios |
| 圖示 | Font Awesome 6 |
| 部署 | GitHub Pages |
| 資料來源 | Google Sheets API v4 |

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器 (http://localhost:3000)
npm run dev

# 建置正式版本
npm run build

# 預覽建置結果
npm run preview
```

## 專案結構

```
tcfc/
├── src/
│   ├── api/                    # API 層
│   │   ├── config/             # Google Sheets 設定
│   │   ├── types/              # TypeScript 型別定義
│   │   └── services/           # 賽事資料服務
│   │       └── mayorsCup/      # 市長盃（按年度分層）
│   ├── views/                  # 頁面
│   │   ├── Index.vue           # 首頁
│   │   ├── NotFound.vue        # 404
│   │   └── mayors-cup/         # 市長盃頁面
│   │       ├── components/     # 賽事共用元件
│   │       ├── 2024/           # 2024 年度
│   │       └── 2025/           # 2025 年度
│   ├── components/             # 全域共用元件
│   ├── layouts/                # 版面配置
│   ├── router/                 # 路由設定
│   ├── utils/                  # 工具函式
│   └── assets/                 # 靜態資源與 SCSS
├── public/                     # 靜態檔案
├── archives/                   # 舊版 HTML 頁面
├── docs/                       # 文件與原始資料
└── .github/workflows/          # CI/CD
```

## Git Flow

本專案採用 **Gitflow** 工作流程。

### 分支

| 分支 | 用途 |
|------|------|
| `main` | 正式環境（push 觸發 GitHub Pages 部署） |
| `develop` | 開發整合 |
| `feature/*` | 新功能開發 |
| `hotfix/v*` | 緊急修復 |
| `release/v*` | 版本發布準備 |

### 工作流程

```
新功能：develop → feature/* → develop → release/* → main
緊急修復：main → hotfix/* → main + develop
```

### 版本號

格式：`v{major}.{minor}.{patch}`，hotfix 加 `.{序號}`

```
v0.0.4 → v0.0.4.01 (hotfix) → v0.0.5 (release)
```

## 部署

Push 到 `main` 分支會自動觸發 GitHub Actions 部署至 GitHub Pages。

部署流程：`npm install` → `npm run build` → 上傳 `dist/` → GitHub Pages

## 新增年度賽事

1. 在 `src/api/config/sheetConfig.ts` 新增年度的 Sheet ID 與組別設定
2. 在 `src/api/services/mayorsCup/` 建立該年度的 Service
3. 在 `src/views/mayors-cup/` 建立該年度的頁面
4. 在 `src/router/mayors-cup.ts` 新增路由

## 聯絡資訊

- 📧 service@tcfc.org.tw
- 📞 04-2258-8185
- 📍 407027 台中市西屯區朝馬路 108 號
- [Facebook](https://www.facebook.com/groups/576604161850781)
- [LINE](https://line.me/ti/p/@677ciirx)
