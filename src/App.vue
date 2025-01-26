<template>
    <div id="app">
        <!-- 頁面頂部導覽列 -->
        <Header />

        <!-- 主要內容區域 -->
        <main class="main-content">
            <router-view />
        </main>

        <!-- 頁面底部資訊區 -->
        <Footer />
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
