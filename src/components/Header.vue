<template>
    <header class="header">
        <div class="header-container">
            <!-- Logo -->
            <router-link to="/" class="logo">
                <img src="@/assets/images/logo.png" alt="TCFC Logo" />
            </router-link>

            <!-- 右側選單群組 -->
            <div class="right-menu-group">
                <!-- 導覽選單 -->
                <nav v-if="showNavMenu" class="nav-menu" :class="{ 'is-open': isMenuOpen }">
                    <router-link to="/" @click="closeMenu">首頁</router-link>
                    <router-link to="/score" @click="closeMenu">計分板</router-link>
                    <router-link to="/u10" @click="closeMenu">U10賽程</router-link>
                </nav>

                <!-- 社群媒體連結 -->
                <div class="social-links">
                    <a href="https://www.facebook.com/groups/576604161850781" target="_blank" class="social-link">
                        <i class="fab fa-facebook-f" aria-label="Facebook"></i>
                    </a>
                    <a href="https://line.me/ti/p/@677ciirx" target="_blank" class="social-link">
                        <i class="fab fa-line" aria-label="Line"></i>
                    </a>
                    <a href="mailto:service@tcfc.org.tw" class="social-link">
                        <i class="fas fa-envelope" aria-label="Email"></i>
                    </a>
                </div>
            </div>

            <!-- 漢堡選單按鈕 (手機版) -->
            <button v-if="showNavMenu" class="menu-toggle" @click="isMenuOpen = !isMenuOpen"
                :aria-expanded="isMenuOpen">
                <span class="sr-only">選單</span>
                <div class="hamburger" :class="{ 'is-active': isMenuOpen }">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false,
            showNavMenu: false // 控制導覽選單的顯示

        }
    },
    methods: {
        closeMenu() {
            this.isMenuOpen = false
        }
    }
}
</script>
