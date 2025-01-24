<template>
    <div id="app">
        <!-- 使用 Header 元件 -->
        <Header />

        <!-- 主要內容區域 -->
        <main class="main-content">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>

<style>
/* 重置樣式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* 主要內容區域樣式 */
.main-content {
    margin-top: 72px;
}

/* 全域連結樣式 */
a {
    color: #42b983;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
