# src/views/mayors-cup/2025/WelcomePage.vue
<template>
    <div class="welcome-page">
        <section class="hero">
            <div class="hero-content">
                <p class="hero-en">MAYORS CUP 2025</p>
                <h1>114年度 臺中市市長盃足球錦標賽</h1>
                <p>賽事籌備中，敬請期待</p>
            </div>
        </section>

        <div class="preparation-section">
            <div class="container">
                <div class="preparation-content">
                    <div class="status-icon">
                        <i class="fas fa-futbol"></i>
                    </div>
                    <h2>活動籌備中</h2>
                    <p>2025年度賽事規劃進行中，將為您帶來更精彩的賽事</p>

                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="time-point"></div>
                            <div class="content">
                                <h4>2024 Q4</h4>
                                <div class="item-content">
                                    <h5>賽制公告</h5>
                                    <p>公布各組別賽制規則</p>
                                </div>
                            </div>
                        </div>

                        <div class="timeline-item">
                            <div class="time-point"></div>
                            <div class="content">
                                <h4>2025 Q1</h4>
                                <div class="item-content">
                                    <h5>開放報名</h5>
                                    <p>各組別開始接受報名</p>
                                </div>
                            </div>
                        </div>

                        <div class="timeline-item">
                            <div class="time-point"></div>
                            <div class="content">
                                <h4>2025 Q2</h4>
                                <div class="item-content">
                                    <h5>正式開賽</h5>
                                    <p>各組別陸續展開賽事</p>
                                </div>
                            </div>
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
        background: url('@/assets/images/welcome-header.jpg') no-repeat center center;
        background-size: cover;
        position: relative;
        min-height: 420px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(#0a0a0a, 0.55);
        }

        &-content {
            position: relative;
            z-index: 1;
            padding: 0 $spacing-unit;
        }

        &-en {
            font-size: 0.85rem;
            font-weight: 500;
            letter-spacing: 0.3em;
            color: #B89968;
            margin-bottom: 1.25rem;
            text-transform: uppercase;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1rem;

            @media (max-width: $mobile-width) {
                font-size: 1.8rem;
            }
        }

        p {
            font-size: 1.1rem;
            color: rgba(#ffffff, 0.7);

            @media (max-width: $mobile-width) {
                font-size: 1rem;
            }
        }
    }

    .container {
        max-width: $container-width;
        margin: 0 auto;
        padding: 0 $spacing-unit;
    }

    .preparation-section {
        padding: 4rem 0;
        background-color: #f7f9f7;

        .preparation-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;

            .status-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 2rem;
                background: rgba(#3f4a52, 0.05);
                border: 1px solid rgba(#3f4a52, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;

                i {
                    font-size: 2.5rem;
                    color: #B89968;
                }
            }

            h2 {
                color: #3f4a52;
                font-size: 2rem;
                font-weight: 800;
                margin-bottom: 1rem;
            }

            p {
                color: rgba(#3f4a52, 0.45);
                font-size: 1.1rem;
                margin-bottom: 4rem;
            }
        }

        .timeline {
            position: relative;
            padding: 2rem 0;

            &::before {
                content: '';
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 1px;
                height: 100%;
                background-color: rgba(#3f4a52, 0.1);

                @media (max-width: $mobile-width) {
                    left: 20px;
                }
            }

            .timeline-item {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                margin-bottom: 3rem;
                position: relative;

                @media (max-width: $mobile-width) {
                    justify-content: flex-start;
                    margin-left: 20px;
                }

                .time-point {
                    width: 12px;
                    height: 12px;
                    background-color: #B89968;
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1;

                    @media (max-width: $mobile-width) {
                        left: 20px;
                    }
                }

                .content {
                    width: 300px;
                    background: #ffffff;
                    border: 1px solid rgba(#3f4a52, 0.08);
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-left: 3rem;

                    h4 {
                        color: #B89968;
                        font-size: 1rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                    }

                    .item-content {
                        h5 {
                            color: #3f4a52;
                            margin-bottom: 0.5rem;
                        }

                        p {
                            color: rgba(#3f4a52, 0.45);
                            font-size: 0.9rem;
                            margin-bottom: 0;
                        }
                    }
                }

                &:nth-child(odd) {
                    .content {
                        margin-left: 0;
                        margin-right: 3rem;
                        text-align: right;

                        @media (max-width: $mobile-width) {
                            margin-left: 3rem;
                            margin-right: 0;
                            text-align: left;
                        }
                    }
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
