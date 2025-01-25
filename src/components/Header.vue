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
                    <a href="https://www.facebook.com/yourpage" target="_blank" class="social-link">
                        <i class="fab fa-facebook-f" aria-label="Facebook"></i>
                    </a>
                    <a href="https://line.me/yourpage" target="_blank" class="social-link">
                        <i class="fab fa-line" aria-label="Line"></i>
                    </a>
                    <a href="mailto:your@email.com" class="social-link">
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

<style scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    /* 為手機版選單定位提供參考點 */
}

.right-menu-group {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-menu {
    display: flex;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: #007bff;
}

.social-links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.social-link {
    color: #333;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: #007bff;
}

.menu-toggle {
    display: none;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .right-menu-group {
        /* 移除 desktop 版本的 flex 設定 */
        display: block;
    }

    .menu-toggle {
        display: block;
    }

    .nav-menu {
        display: none;
        /* 預設隱藏導覽選單 */
    }

    .nav-menu.is-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .nav-menu a {
        padding: 0.5rem 0;
    }

    .social-links {
        /* 社群連結固定在右上方 */
        position: absolute;
        right: 4rem;
        /* 為漢堡選單按鈕預留空間 */
        top: 50%;
        transform: translateY(-50%);
    }

    .menu-toggle {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>

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
