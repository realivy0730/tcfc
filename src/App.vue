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