# 環境資訊
 - Vite latest
 - Vue  latest
 - Automating and deploying workflows with GitHub Actions
 - Macbook M1 use command line on zsh

請記得我跟你的所有的交涉一律都是使用正體中文的台灣用語喔

# 如果需要產程式碼其規範如下
1. 遵循 Clean Code 開發原則。
2. 採用該程式語言的最新命名與設計規範。
3. 所有程式片段與重要函數需標準化註解，註解使用正體中文台灣用語。
4. 修改內容若超過 20 行，需提供完整程式碼；如程式碼過長，也需提供完整內容。
5. 少一點說明跟範例直接給程式碼，裡面有註解了

# 如果需要架構設計
1. 資料夾架構應依照原框架建議（若有提供）。
2. 如需使用流程圖輔助表達，請善用「箭頭符號」進行標示。
3. 盡可能用 MarkDown 的格式呈現

# 關鍵資訊
## 錯誤訊息需要修正
```
❯ npm run build

> tcfc.org.tw@0.0.1 build
> cross-env VITE_GOOGLE_SHEETS_API_KEY=AIzaSyBPdeJ9e91d1bjYa6t87u0XT649qcStBD4 vite build

VITE_GOOGLE_SHEETS_API_KEY: AIzaSyBPdeJ9e91d1bjYa6t87u0XT649qcStBD4
vite v6.1.0 building for production...
transforming (22) node_modules/@vue/devtools-api/lib/esm/env.jsDeprecation Warning [global-builtin]: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
Use color.adjust instead.

More info and automated migrator: https://sass-lang.com/d/import

    ╷
141 │             background: darken($accent-green, 5%);
    │                         ^^^^^^^^^^^^^^^^^^^^^^^^^
    ╵
    src/views/mayors-cup/2024/WelcomePage.vue 141:25  root stylesheet

Deprecation Warning [color-functions]: darken() is deprecated. Suggestions:

color.scale($color, $lightness: -9.6958174905%)
color.adjust($color, $lightness: -5%)

More info: https://sass-lang.com/d/color-functions

    ╷
141 │             background: darken($accent-green, 5%);
    │                         ^^^^^^^^^^^^^^^^^^^^^^^^^
    ╵
    src/views/mayors-cup/2024/WelcomePage.vue 141:25  root stylesheet

Deprecation Warning [global-builtin]: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
Use color.adjust instead.

More info and automated migrator: https://sass-lang.com/d/import

    ╷
260 │                 background: linear-gradient(45deg, $accent-orange, lighten($accent-orange, 10%));
    │                                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ╵
    src/views/mayors-cup/2024/WelcomePage.vue 260:68  root stylesheet

Deprecation Warning [color-functions]: lighten() is deprecated. Suggestions:

color.scale($color, $lightness: 22.1739130435%)
color.adjust($color, $lightness: 10%)

More info: https://sass-lang.com/d/color-functions

    ╷
260 │                 background: linear-gradient(45deg, $accent-orange, lighten($accent-orange, 10%));
    │                                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ╵
    src/views/mayors-cup/2024/WelcomePage.vue 260:68  root stylesheet

Deprecation Warning [global-builtin]: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
Use color.adjust instead.

More info and automated migrator: https://sass-lang.com/d/import

    ╷
268 │                 background: linear-gradient(45deg, $second-color, lighten($second-color, 10%));
    │                                                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ╵
    src/views/mayors-cup/2024/WelcomePage.vue 268:67  root stylesheet

Deprecation Warning [color-functions]: lighten() is deprecated. Suggestions:

color.scale($color, $lightness: 14.0883977901%)
color.adjust($color, $lightness: 10%)

More info: https://sass-lang.com/d/color-functions

    ╷
268 │                 background: linear-gradient(45deg, $second-color, lighten($second-color, 10%));
    │                                                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ╵
    src/views/mayors-cup/2024/WelcomePage.vue 268:67  root stylesheet
```


# 附加檔案

## src/assets/styles/_settings.scss
```
@use "sass:color";
@forward 'base/variables' show
$primary-color,
$second-color,
$text-color,
$gray-500,
$gray-400,
$gray-300,
$gray-200,
$gray-100,
$white,
$white-100,
$white-color,
$bg-color,
$accent,
$accent-blue,
$accent-green,
$accent-orange,
$breakpoints,
$spacing-unit,
$container-width,
$mobile-width,
get-accent,
get-breakpoint,
color-variant;


```

## src/assets/styles/base/_reset.scss
```
@use '../settings' as *;
/* 重置樣式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Noto Sans TC", "Rubik",'Libre Baskerville','Century Gothic', Arial;
    line-height: 1.6;
    margin: 0;
}

/* 主要內容區域樣式 */
.main-content {
    margin-top: 72px;
    @media (max-width: get-breakpoint("mobile"))  {
        margin-top:43px;
    }
}

/* 全域連結樣式 */
a {
    color: $primary-color;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

```

## src/assets/styles/base/_variables.scss
```
@use "sass:color";
@use "sass:map";

// === 主要色系 ===
$primary-color: #103c5d;
$second-color: #870D0E;
$accent-blue: #4A90E2;  // 新增
$accent-green: #50B794; // 新增
$accent-orange: #F5A623; // 新增
// === 文字色系 ===
$text-color: #333;
$white-color: #ffffff;  // 新增

// === 灰階色系 ===
$gray-500: #272828;
$gray-400: #5f5f5f;
$gray-300: #929292;
$gray-200: #D1D1D1;
$gray-100: #BFBFBF;

// === 白色系列 ===
$white: #ffffff;
$white-100: #F8F0E5;

// === 背景色系 ===
$bg-color: #F9F6F0;

// === 輔助色系 ===
$accent: (
  "blue": #4A90E2,
  "green": #50B794,
  "orange": #F5A623
);

// === 響應式斷點 ===
// 先定義 breakpoints map
$breakpoints: (
  "mobile": 768px,
  "tablet": 992px,
  "desktop": 1200px
);

// 再定義基於 breakpoints 的變數
$mobile-width: 768px;
$tablet-width: 992px;
$desktop-width: 1200px;
$container-width: 1200px;

// === 間距單位 ===
$spacing-unit: 1rem;

// === 輔助函數 ===
@function get-accent($color) {
  @return map.get($accent, $color);
}

@function get-breakpoint($point) {
  @return map.get($breakpoints, $point);
}

// === 顏色調整輔助混入 ===
@mixin color-variant($color, $lightness: 10%) {
    background: linear-gradient(45deg, $color, color.adjust($color, $lightness: $lightness));
  }

  // === 響應式設計混入 ===
  @mixin respond-to($breakpoint) {
      @if map.has-key($breakpoints, $breakpoint) {
          @media (max-width: map.get($breakpoints, $breakpoint)) {
              @content;
          }
      } @else {
          @warn "無效的斷點: #{$breakpoint}。可用的斷點是: #{map.keys($breakpoints)}";
      }
  }

```

## src/assets/styles/components/_footer.scss
```
@use "sass:color";
@use '../settings' as *;

.footer {
    background-color:#1f1f17;
    padding: 60px 0 20px;
    color: $white-color;

    &-content {
        max-width: $container-width;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 29px;
        padding: 0 $spacing-unit;
    }

    &-section {
        h2 {
            font-size: 24px;
            margin-bottom: 15px;
            color: $white-color;
        }
    }

    &-links {
        list-style: none;
        padding: 0;

        li {
            margin-bottom: 12px;
        }

        a {
            color: $white-color;
            text-decoration: none;
            transition: color 0.3s;
            display: flex;
            align-items: center;

            &:before {
                content: "›";
                margin-right: 10px;
                color: $accent-green;
            }

            &:hover {
                color: $accent-green;
            }
        }
    }

    &-bottom {
        max-width: $container-width;
        margin: 40px auto 0;
        padding: $spacing-unit;
        border-top: 1px solid rgba($white-color, 0.1);
        display: flex;
        justify-content: space-between;
    }
}

.green-line {
    width: 40px;
    height: 3px;
    background-color: $accent-green;
    margin-bottom: 20px;
}

.about-text {
    margin-bottom: 20px;
    line-height: 1.6;
}

.social {
    &-links {
        display: flex;
        gap: 15px;
    }

    &-icon {
        background-color: $accent-green;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $white-color;
        transition: background-color 0.3s;

        &:hover {
            background-color: color.adjust($accent-green, $lightness: -10%);
            text-decoration: none;
        }
    }
}

.contact-info {
    a{
        color: #fff;
    }
    p {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }
}

.gold-icon {
    color: $accent-orange;
    margin-right: 10px;
    width: 20px;
}

.newsletter {
    display: flex;
    margin-top: 20px;
}

.email-input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 25px 0 0 25px;
}

.submit-btn {
    background-color: $accent-green;
    border: none;
    color: $white-color;
    padding: 10px 20px;
    border-radius: 0 25px 25px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: color.adjust($accent-green, $lightness: -10%);
    }
}

// 響應式設計
@media (max-width: 1024px) {
    .footer-content {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: $mobile-width) {
    .footer {
        &-content {
            grid-template-columns: 1fr;
        }

        &-bottom {
            flex-direction: column;
            text-align: center;
            gap: 10px;
        }
    }
}

```

## src/assets/styles/components/_header.scss
```
@use "sass:color";
@use '../settings' as *;

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: $white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    &-container {
        max-width: $container-width;
        margin: 0 auto;
        padding: $spacing-unit;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.logo {
    // 基本設定
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $text-color;
    font-size: 1.2rem;
    font-weight: 600;
    transition: opacity 0.3s ease;

    // Logo 圖片設定
    img {
        height: 40px;
        width: auto;
        margin-right: $spacing-unit;

        // 確保圖片不會被壓縮
        object-fit: contain;
    }

    // Hover 效果
    &:hover {
        opacity: 0.85;
        text-decoration: none;

    }

    // 響應式設計
    @media (max-width: $mobile-width)  {
        font-size: 1rem;

        img {
            height: 32px;
            margin-right: calc($spacing-unit / 2);
        }
    }

    // 超小螢幕設定
    @media (max-width: 375px) {
        // 只顯示 Logo，隱藏文字
        img {
            height: 28px;
            margin-right: 0;
        }

        // 隱藏文字
        span {
            display: none;
        }
    }
}

// 如果需要文字特別樣式，可以加入以下設定
.logo-text {
    // 防止文字換行
    white-space: nowrap;

    // 漸層文字效果（選用）
    background: linear-gradient(45deg, $primary-color, $accent-blue);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    // 確保在某些瀏覽器中文字不會消失
    @supports not (background-clip: text) {
        background: none;
        color: $primary-color;
    }
}

.nav-menu {
    display: flex;
    gap: 2rem;

    a {
        text-decoration: none;
        color: $text-color;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
            color: $accent-green;
        }

        &.router-link-active {
            color: $accent-green;
        }
    }
}

// 漢堡選單
.menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}

.hamburger {
    width: 24px;
    height: 20px;
    position: relative;

    span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: $text-color;
        position: absolute;
        transition: all 0.3s;

        &:nth-child(1) { top: 0; }
        &:nth-child(2) { top: 9px; }
        &:nth-child(3) { top: 18px; }
    }

    &.is-active {
        span {
            &:nth-child(1) {
                transform: rotate(45deg);
                top: 9px;
            }
            &:nth-child(2) {
                opacity: 0;
            }
            &:nth-child(3) {
                transform: rotate(-45deg);
                top: 9px;
            }
        }
    }
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.right-menu-group {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.social-links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.social-link {
    color: $text-color;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
        color: $accent-blue;
    }
}

// 響應式設計
@media (max-width: $mobile-width)  {
    .right-menu-group {
        display: block;
    }

    .menu-toggle {
        display: block;
        position: absolute;
        right: $spacing-unit;
        top: 50%;
        transform: translateY(-50%);
    }

    .nav-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: $white;
        flex-direction: column;
        padding: $spacing-unit;
        gap: $spacing-unit;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;

        &.is-open {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        a {
            padding: calc($spacing-unit / 2) 0;
        }
    }

    .header {
        .social-links {
            position: absolute;
            right: calc($spacing-unit * 2);
            top: 50%;
            transform: translateY(-50%);
            right: 1rem;
        }

        &-container {
            padding: calc($spacing-unit / 2);
        }
    }
}

```

## src/assets/styles/components/_navigation.scss
```
@use "sass:color";

@use '../settings' as *;

// 原有內容...

```

## src/assets/styles/components/_tournament.scss
```
// src/assets/styles/components/_tournament.scss
@use "sass:color";
@use '../settings' as *;

.tournament-page {
  min-height: calc(100vh - 72px);
  padding: 2rem;
  background-color: $bg-color;

  @media (max-width: $mobile-width) {
    padding: 1rem;
    min-height: calc(100vh - 60px);
  }

  // 頁面標題區塊
  .page-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba($primary-color, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media (max-width: $mobile-width) {
      flex-direction: column;
      align-items: stretch;
    }

    h1 {
      color: $primary-color;
      font-size: 1.8rem;
      margin: 0;

      @media (max-width: $mobile-width) {
        font-size: 1.4rem;
        text-align: center;
      }
    }
  }

  // 組別選擇器
  .group-selector {
    position: relative;
    min-width: 200px;

    @media (max-width: $mobile-width) {
      width: 100%;
    }

    .select-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid rgba($primary-color, 0.2);
      border-radius: 8px;
      font-size: 1rem;
      color: $primary-color;
      background-color: $white-color;
      appearance: none;
      cursor: pointer;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: $accent-blue;
        box-shadow: 0 0 0 2px rgba($accent-blue, 0.1);
      }
    }

    &::after {
      content: '\25BC';
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: $primary-color;
      pointer-events: none;
      font-size: 0.8rem;
    }
  }

  // 分頁切換區
  .tab-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid rgba($primary-color, 0.1);

    .tab-button {
        padding: 0.75rem 1.5rem;
        background: none;
        border: none;
        color: $gray-400;
        font-weight: 500;
        cursor: pointer;
        position: relative;
        transition: color 0.3s ease;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: $primary-color;
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      &:hover {
        color: $primary-color;
      }

      &.active {
        color: $primary-color;

        &::after {
          transform: scaleX(1);
        }
      }
    }
  }

  // 賽程表格區塊
  .standings-table {
    background: $white-color;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    overflow: hidden;

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 1rem;
        text-align: center;
        border-bottom: 1px solid rgba($primary-color, 0.1);

        @media (max-width: $mobile-width) {
          padding: 0.5rem;
          font-size: 0.9rem;

          &:nth-child(n+4):nth-child(-n+7) {
            display: none;
          }
        }

        &:first-child {
          text-align: left;
          padding-left: 1.5rem;
        }
      }

      th {
        background-color: $primary-color;
        color: $white-color;
        font-weight: 500;
        white-space: nowrap;
      }

      tbody {
        tr {
          &:hover {
            background-color: rgba($primary-color, 0.05);
          }

          &:last-child td {
            border-bottom: none;
          }
        }
      }
    }
  }

  // 賽程展開區塊
  .matches-accordion {
    .match-item {
      background: $white-color;
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .match-header {
        padding: 1rem 1.5rem;
        background-color: rgba($primary-color, 0.05);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        color: $primary-color;
        transition: background-color 0.3s ease;

        @media (max-width: $mobile-width) {
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
        }

        &:hover {
          background-color: rgba($primary-color, 0.1);
        }
      }

      .match-details {
        padding: 1.5rem;
        border-top: 1px solid rgba($primary-color, 0.1);

        @media (max-width: $mobile-width) {
          padding: 1rem;
        }

        .team {
          display: flex;
          align-items: center;
          padding: 0.5rem 0;

          .team-name {
            flex: 1;
          }

          .score {
            font-weight: bold;
            min-width: 30px;
            text-align: center;
          }

          .pk {
            color: $accent-orange;
            font-size: 0.9rem;
            margin-left: 0.5rem;
          }
        }

        .venue {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba($primary-color, 0.1);
          color: $gray-400;
          font-size: 0.9rem;

          &::before {
            content: '比賽場地：';
            color: $primary-color;
          }
        }
      }
    }
  }

  // 淘汰賽賽程區塊
  .knockout-matches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;

    @media (max-width: $mobile-width) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .knockout-match {
      background: $white-color;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-2px);
      }

      .match-header {
        background: $primary-color;
        color: $white-color;
        padding: 0.75rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
      }

      .match-content {
        padding: 1rem;

        .team {
          padding: 0.75rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          border-bottom: 1px solid rgba($primary-color, 0.1);

          &:last-of-type {
            border-bottom: none;
          }

          .team-name {
            flex: 1;
          }

          .score {
            font-weight: bold;
            min-width: 30px;
            text-align: center;
          }

          .pk {
            color: $accent-orange;
            font-size: 0.9rem;
          }
        }

        .venue {
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba($primary-color, 0.1);
          color: $gray-400;
          font-size: 0.9rem;
        }
      }
    }
  }
}

```

## src/assets/styles/main.scss
```
// src/assets/styles/main.scss

@use 'settings' as *;
// 基礎樣式
@use 'base/reset';

// 元件樣式
@use 'components/header';
@use 'components/footer';
@use 'components/navigation';
@use 'components/tournament';

// 頁面樣式
@use 'views/index';
@use 'views/not-found';

```

## src/assets/styles/views/_index.scss
```
@use "sass:color";
@use '../settings' as *;


// 主要變數
$transition-time: 0.3s;
$border-radius: 15px;
$box-shadow: 0 10px 30px rgba($primary-color, 0.1);
$primary-light: color.adjust($primary-color, $lightness: 15%);  // 較亮的主色
$primary-dark: color.adjust($primary-color, $lightness: -10%);    // 較暗的主色
$accent-color: #fff;      // 輔助色（白色）
$text-light: #e6e6e6;    // 淺色文字
$border-radius: 12px;     // 圓角

// Hero 區塊
.hero {
    position: relative;
    height: 100vh;
    width: 100%;
    background: url('@/assets/images/splash.png') no-repeat center center;
    background-size: cover;
    margin-top: 0;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 150px;
        background: linear-gradient(to top, #fff, transparent);
    }

    @media (max-width: $mobile-width) {
        background-image: url('@/assets/images/splash_m.png');
        height: 80vh;
    }
}

// 共用的區塊樣式
.section-common {
    padding: 6rem 2rem;
    margin: 0 auto;
    .contanter{
        max-width: 1200px;
        margin: auto;
        .title {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 4rem;
            color: $primary-color;
            position: relative;
            font-weight: 600;
            span{
                margin: auto;
                position: relative;
            &::after,
            &::before {
                content: "";
                width: 86px;
                height: 4px;
                background-color: $primary-color;
                position: absolute;
                top: 50%;
                transform: translateX(-50%);
            }
            &::after {
                right: 100% // Moves the line below the text
            }

            &::before {
                right: -100% // Moves the line above the text
            }

            }

        }
        .d-flex {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .block {
            background-color: $white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }

            .subtitle {
                color: $primary-color;
                font-size: 1.8rem;
                margin-bottom: 1.5rem;
                padding-bottom: 0.8rem;
                border-bottom: 2px solid rgba($primary-color, 0.2);
                display: flex;
                align-items: center;

                &::before {
                    font-family: 'Font Awesome 5 Free';
                    font-weight: 900;
                    margin-right: 1rem;
                    color: #F1C40F;
                }

                // 為每個標題加入對應的圖示

            }

            .content {
                line-height: 1.8;
                color: $text-color;
                font-size: 1.1rem;
                text-align: justify;
            }
        }

        .summary-block {
            background-color: $primary-dark;
            color: $white;
            padding: 3rem;
            border-radius: 12px;
            margin-top: 4rem;
            position: relative;

            .content {
                color: $white;
                font-size: 1.2rem;
                line-height: 1.8;
                text-align: justify;
            }
        }
    }

}

@media (max-width: 1200px) {
    .section-common {
        .contanter {
            .d-flex {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }
}

@media (max-width: 768px) {
    .section-common {
        padding: 2rem;
        .contanter {
            .d-flex {
                grid-template-columns: 1fr;
            }
            .title {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                span{
                    &::after,
                    &::before {
                        width: 20px;
                        height: 2px;
                    }
                    &::after {
                        right: 100% // Moves the line below the text
                    }

                    &::before {
                        right: -40% // Moves the line above the text
                    }
                }

            }
            .block {
                padding: 1.5rem;

                .subtitle {
                    font-size: 1.2rem;
                }

                .content {
                    font-size: 1rem;
                }
            }

            .summary-block {
                padding: 2rem;

                .content {
                    font-size: 1.1rem;
                }
            }
        }
    }
}

// 願景區塊樣式
.vision-section {
    @extend .section-common;
    background-color: $primary-color;
    .contanter{
        .title {
            color: $white;
            span{
                &::after,
                &::before {
                    background-color: $white;
                }
            }
        }
        .block {
            .subtitle {
                &.core::before { content: '\f05b'; }         // 核心定位
                    &.promote::before { content: '\f0ac'; }      // 推廣與國際化
                    &.infra::before { content: '\f1ad'; }        // 基礎建設
                    &.coop::before { content: '\f2b5'; }         // 合作發展
                    &.sustain::before { content: '\f06c'; }      // 永續發展
                    &.social::before { content: '\f0c0'; }       // 社會影響
            }
        }

    }
}


// 使命區塊樣式

.mission-section {
    @extend .section-common;
    background-color: $white;
    .contanter{
        .title {
            color: $primary-color;
            span{
                &::after,
                &::before {
                    background-color: $primary-color;
                }
            }
        }
        .block {
            .subtitle {
                &.core::before { content: '\f521'; }      // 核心使命
                &.edu::before { content: '\f549'; }       // 文化與教育
                &.community::before { content: '\f0c0'; }  // 社區發展
                &.global::before { content: '\f0ac'; }     // 國際化發展
                &.talent::before { content: '\f501'; }     // 專業人才
                &.industry::before { content: '\f54f'; }   // 產業發展
            }
        }
        .summary-block {
            background:linear-gradient(45deg, #103c5d, #4A90E2);

            .content {
               color: $white
            }
        }

    }
}


.values-section {
    @extend .section-common;
    background-color: $primary-color;
    .contanter{
        .title {
            color: $white;
            span{
                &::after,
                &::before {
                    background-color: $white;
                }
            }
        }
        .block {
            .subtitle {
                &.integrity::before { content: '\f64f'; }    // 誠信
                &.unity::before { content: '\f0c0'; }       // 團結
                &.innovation::before { content: '\f0eb'; }   // 創新
                &.sustainability::before { content: '\f06c'; } // 永續
                &.inclusivity::before { content: '\f500'; }  // 社會共融
                &.development::before { content: '\f19d'; }  // 教育與成長
            }
        }

    }
}


// 動畫效果
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
}

// 滾動顯示動畫
.scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;

    &.revealed {
        opacity: 1;
        transform: translateY(0);
    }
}

```

## src/assets/styles/views/_not-found.scss
```
@use "sass:color";
@use '../settings' as *;

.not-found {
    min-height: calc(100vh - 72px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $primary-color, $accent-blue);
    padding: 2rem;

    &__container {
        text-align: center;
        max-width: 600px;
        background: rgba($white-color, 0.95);
        padding: 3rem 2rem;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        animation: fadeInUp 0.8s ease-out;
    }

    &__title {
        font-size: 8rem;
        font-weight: 700;
        color: $primary-color;
        margin: 0;
        line-height: 1;

        @media (max-width: $mobile-width) {
            font-size: 6rem;
        }
    }

    &__subtitle {
        font-size: 2rem;
        color: $accent-blue;
        margin: 1rem 0 2rem;

        @media (max-width: $mobile-width) {
            font-size: 1.5rem;
        }
    }

    &__text {
        color: $gray-400;
        margin-bottom: 2rem;
        font-size: 1.1rem;
        line-height: 1.6;
    }

    &__button {
        display: inline-block;
        padding: 1rem 2rem;
        background-color: $accent-green;
        color: $white-color;
        border-radius: 50px;
        text-decoration: none;
        transition: all 0.3s ease;
        font-weight: 500;

        &:hover {
            background-color: color.adjust($accent-green, $lightness: -10%);
            transform: translateY(-2px);
            text-decoration: none;
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// 添加浮動元素動畫
.floating {
    animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
}

```
