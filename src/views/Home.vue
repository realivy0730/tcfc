<template>
    <div class="home">
        <!-- 主視覺區域 -->
        <section class="hero">

        </section>

        <!-- 其他內容區域 -->
        <section class="content">
            <div class="container">
                <h2>最新消息</h2>
                <p>這裡可以放置其他內容...</p>
            </div>
        </section>
    </div>
</template>

<script setup>
// 首頁組件
</script>

<style scoped>
.hero {
    height: 100vh;
    background-image: url('../assets/images/splash.png');
    /* 請將圖片放在 assets 目錄下 */
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ffffff;
    margin-top: 80px;

}

.hero-content {
    padding: 2rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

.cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.3s;
}

.cta-button:hover {
    background: #3aa876;
}

.content {
    padding: 4rem 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

@media (max-width: 768px) {
    .hero {
        height: 100vh;
        background-image: url('../assets/images/splash_m.png');
        background-position: top right
    }

    .hero h1 {
        font-size: 2rem;
    }

    .hero p {
        font-size: 1.2rem;
    }
}
</style>
