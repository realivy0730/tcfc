<template>
    <header class="header">
        <div class="header-container">
            <!-- Logo -->
            <router-link to="/" class="logo">
                <img src="@/assets/images/logo.png" alt="TCFC Logo" />
            </router-link>

            <!-- 漢堡選單按鈕 (手機版) -->
            <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen" :aria-expanded="isMenuOpen">
                <span class="sr-only">選單</span>
                <div class="hamburger" :class="{ 'is-active': isMenuOpen }">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <!-- 導覽選單 -->
            <nav class="nav-menu" :class="{ 'is-open': isMenuOpen }">
                <router-link to="/" @click="closeMenu">首頁</router-link>
                <router-link to="/score" @click="closeMenu">計分板</router-link>
                <router-link to="/u10" @click="closeMenu">U10賽程</router-link>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

// 選單開關狀態
const isMenuOpen = ref(false)

// 關閉選單
const closeMenu = () => {
    isMenuOpen.value = false
}
</script>
