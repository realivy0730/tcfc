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

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    display: block;
}

.logo img {
    height: 40px;
    width: auto;
}

.nav-menu {
    display: flex;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: #42b983;
}

.nav-menu a.router-link-active {
    color: #42b983;
}

/* 漢堡選單按鈕 */
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
}

.hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #333;
    position: absolute;
    transition: all 0.3s;
}

.hamburger span:nth-child(1) {
    top: 0;
}

.hamburger span:nth-child(2) {
    top: 9px;
}

.hamburger span:nth-child(3) {
    top: 18px;
}

.hamburger.is-active span:nth-child(1) {
    transform: rotate(45deg);
    top: 9px;
}

.hamburger.is-active span:nth-child(2) {
    opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
    transform: rotate(-45deg);
    top: 9px;
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

/* RWD 設定 */
@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #ffffff;
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
    }

    .nav-menu.is-open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }
}
</style>
