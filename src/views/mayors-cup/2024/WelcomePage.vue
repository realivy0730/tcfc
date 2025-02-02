# src/views/mayors-cup/2024/WelcomePage.vue
<template>
    <div class="welcome-page">
        <section class="hero">
            <div class="hero-content">
                <h1>113年度 - 臺中市市長盃足球錦標賽(2024)</h1>
                <p>凝聚城市足球魂，打造臺中足球夢</p>
            </div>
        </section>

        <div class="tournament-section">
            <div class="container">
                <!-- 學校組區塊 -->
                <div class="group-section">
                    <div class="group-header">
                        <i class="fas fa-school"></i>
                        <h2>學校組</h2>
                    </div>

                    <div class="cards-grid">
                        <!-- 學校國中組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>學校國中組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">福科國中</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">潭秀國中</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">安和國中</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/school'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>

                        <!-- 學校高年級組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>學校高年級組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">清水國小</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">國安國小</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">協和國小</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/school'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>

                        <!-- 學校中年級組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>學校中年級組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">協和國小</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">國安國小</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">清水國小</span>
                                </div>
                                <div class="rank fourth">
                                    <span class="rank-label">殿軍</span>
                                    <span class="team-name">西屯國小</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/school'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- 公開組區塊 -->
                <div class="group-section">
                    <div class="group-header">
                        <i class="fas fa-trophy"></i>
                        <h2>公開組</h2>
                    </div>

                    <div class="cards-grid">
                        <!-- 公開高中組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>公開高中組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">足夢 U18A</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">嶺東中學</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">FOCUS</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/open'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>

                        <!-- 公開國中組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>公開國中組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">福科</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">FUTURO U15</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">潭秀 FC</span>
                                </div>
                                <div class="rank fourth">
                                    <span class="rank-label">殿軍</span>
                                    <span class="team-name">黎明</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/open'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>

                        <!-- 其他公開組別 -->
                        <!-- 公開高年級男生組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>公開高年級男生組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">足夢蜻蜓 A</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">FUTURO U12</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">國安</span>
                                </div>
                                <div class="rank fourth">
                                    <span class="rank-label">殿軍</span>
                                    <span class="team-name">協和 FC</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/open'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>
                        <!-- 公開高年級女生組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>公開高年級女生組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">南屯國小</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">黎明國小</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">惠來國小</span>
                                </div>
                                <div class="rank fourth">
                                    <span class="rank-label">殿軍</span>
                                    <span class="team-name">惠文獵豹</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/open'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>

                        <!-- 公開中年級男生組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>公開中年級男生組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">旅人</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">明道普霖斯頓飛翼</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">GAES 國安</span>
                                </div>
                                <div class="rank fourth">
                                    <span class="rank-label">殿軍</span>
                                    <span class="team-name">忠孝 U10</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/open'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>

                        <!-- 公開中年級女生組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>公開中年級女生組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">南屯國小</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">足夢蜻蜓</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">臺中市永隆國小</span>
                                </div>
                                <div class="rank fourth">
                                    <span class="rank-label">殿軍</span>
                                    <span class="team-name">惠來國小</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/open'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>

                        <!-- 低年級組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>低年級組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">旅人 U8</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">協和國小</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">國安國小</span>
                                </div>
                                <div class="rank fourth">
                                    <span class="rank-label">殿軍</span>
                                    <span class="team-name">臺中市永隆國小</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/open'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>

                        <!-- 幼兒組 -->
                        <div class="tournament-card">
                            <div class="card-header">
                                <h3>幼兒組</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="ranking-list">
                                <div class="rank champion">
                                    <span class="rank-label">冠軍</span>
                                    <span class="team-name">威爾森教育機構</span>
                                </div>
                                <div class="rank second">
                                    <span class="rank-label">亞軍</span>
                                    <span class="team-name">小蜻蜓</span>
                                </div>
                                <div class="rank third">
                                    <span class="rank-label">季軍</span>
                                    <span class="team-name">普霖斯頓</span>
                                </div>
                            </div>
                            <router-link :to="'/mayors-cup/2024/open'" class="view-more">
                                查看完整賽程
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    window.scrollTo(0, 0)
})
</script>

<style lang="scss" scoped>
.welcome-page {
    .hero {
        height: 60vh;
        background: linear-gradient(45deg, $primary-color, $accent-blue);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: $white-color;
        position: relative;

        &-content {
            z-index: 1;
            padding: 0 $spacing-unit;

            h1 {
                font-size: 3rem;
                margin-bottom: 1.5rem;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

                @media (max-width: $mobile-width) {
                    font-size: 2rem;
                }
            }

            p {
                font-size: 1.5rem;
                opacity: 0.9;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

                @media (max-width: $mobile-width) {
                    font-size: 1.2rem;
                }
            }
        }
    }

    .container {
        max-width: $container-width;
        margin: 0 auto;
        padding: 0 $spacing-unit;
    }

    .tournament-section {
        padding: 4rem 0;
        background-color: $bg-color;
    }

    .group-section {
        margin-bottom: 4rem;

        &:last-child {
            margin-bottom: 0;
        }

        .group-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;

            i {
                font-size: 2rem;
                color: $accent-orange;
            }

            h2 {
                color: $primary-color;
                font-size: 2rem;
                margin: 0;
            }
        }
    }

    .cards-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        @media (max-width: 1200px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: $mobile-width) {
            grid-template-columns: 1fr;
        }
    }

    .tournament-card {
        background: $white-color;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        transition: transform 0.3s ease;

        &:hover {
            transform: translateY(-5px);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba($primary-color, 0.1);

            h3 {
                color: $primary-color;
                font-size: 1.2rem;
                margin: 0;
            }

            i {
                color: $accent-orange;
                font-size: 1.5rem;
            }
        }

        .ranking-list {
            .rank {
                display: flex;
                align-items: center;
                padding: 0.8rem;
                margin-bottom: 0.5rem;
                border-radius: 8px;
                transition: background-color 0.3s ease;

                &:hover {
                    background-color: rgba($primary-color, 0.05);
                }

                .rank-label {
                    font-size: 0.9rem;
                    font-weight: 500;
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    margin-right: 1rem;
                    min-width: 60px;
                    text-align: center;
                    color: $white-color;
                }

                .team-name {
                    flex: 1;
                    color: $gray-400-color;
                }

                &.champion .rank-label {
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                }

                &.second .rank-label {
                    background: linear-gradient(45deg, #C0C0C0, #A0A0A0);
                }

                &.third .rank-label {
                    background: linear-gradient(45deg, #CD7F32, #8B4513);
                }

                &.fourth .rank-label {
                    background: $accent-blue;
                }
            }
        }

        .view-more {
            display: block;
            text-align: center;
            margin-top: 1.5rem;
            padding: 0.8rem;
            color: $primary-color;
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.3s ease;
            border: 1px solid rgba($primary-color, 0.1);

            &:hover {
                background-color: $primary-color;
                color: $white-color;
            }
        }
    }
}
</style>
