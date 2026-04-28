<template>
    <div class="home">
        <section class="hero" ref="heroRef">
            <div class="hero__overlay"></div>

            <!-- Task 1: 大型透明背景文字 -->
            <div class="hero__bg-text" aria-hidden="true">TAICHUNG FOOTBALL COMMITTEE</div>

            <!-- Task 2: 右側垂直標語 -->
            <div class="hero__vertical" aria-hidden="true">凝聚城市足球魂</div>

            <div class="hero__content">
                <p class="hero__en hero__en--animate">TAICHUNG FOOTBALL COMMITTEE</p>
                <div class="hero__line hero__line--animate"></div>
                <h1 class="hero__title hero__title--animate">臺中市體育總會<br>足球委員會</h1>
            </div>

            <!-- Task 3: 圓形旋轉 SCROLL DOWN -->
            <a href="#tournaments" class="hero__scroll-ring" aria-label="向下滾動">
                <svg viewBox="0 0 100 100" class="hero__scroll-ring__text">
                    <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none"/>
                    <text>
                        <textPath href="#circle" startOffset="0%">SCROLL DOWN · SCROLL DOWN · </textPath>
                    </text>
                </svg>
                <span class="hero__scroll-ring__arrow">↓</span>
            </a>

            <!-- Task 4: 底部雙 CTA 色塊 -->
            <div class="hero__cta-bar">
                <a href="#tournaments" class="hero__cta-bar__btn hero__cta-bar__btn--yellow">
                    查看賽事 <span>→</span>
                </a>
                <a href="#results" class="hero__cta-bar__btn hero__cta-bar__btn--green">
                    最新比分 <span>→</span>
                </a>
            </div>
        </section>
    </div>

    <!-- 賽事入口 -->
    <section id="tournaments" class="tournaments-section">
        <div class="tournaments__inner">
            <div class="tournaments__header" v-scroll-reveal>
                <p class="tournaments__en">TOURNAMENTS</p>
                <h2 class="tournaments__title">市長盃賽事</h2>
            </div>
            <div class="tournaments__cards">
                <router-link to="/mayors-cup/2025" class="tournaments__card" v-scroll-reveal="{ delay: 0 }">
                    <span class="tournaments__year">2025</span>
                    <div class="tournaments__info">
                        <h3>臺中市長盃足球錦標賽</h3>
                        <p>114 年度賽事</p>
                    </div>
                    <span class="tournaments__arrow">→</span>
                </router-link>
                <router-link to="/mayors-cup/2024" class="tournaments__card" v-scroll-reveal="{ delay: 100 }">
                    <span class="tournaments__year">2024</span>
                    <div class="tournaments__info">
                        <h3>臺中市長盃足球錦標賽</h3>
                        <p>113 年度賽事</p>
                    </div>
                    <span class="tournaments__arrow">→</span>
                </router-link>
            </div>
        </div>
    </section>

    <!-- 最新比分 -->
    <section id="results" class="results-section">
        <div class="results__inner">
            <div class="results__header" v-scroll-reveal>
                <p class="results__en">LATEST RESULTS</p>
                <h2 class="results__title">最新比分</h2>
            </div>
            <div v-if="loading" class="results__loading">載入中...</div>
            <div v-else-if="results.length === 0" class="results__empty">暫無比賽結果</div>
            <div v-else class="results__list">
                <div class="results__item" v-for="(game, i) in results" :key="i" v-scroll-reveal="{ delay: i * 60 }">
                    <span class="results__category">{{ game.category }}</span>
                    <div class="results__match">
                        <span class="results__team results__team--home">{{ game.homeTeam }}</span>
                        <span class="results__score">{{ game.homeScore }} : {{ game.awayScore }}</span>
                        <span class="results__team results__team--away">{{ game.awayTeam }}</span>
                    </div>
                    <span class="results__date">{{ game.date }}</span>
                </div>
            </div>
            <div class="results__more" v-scroll-reveal>
                <router-link to="/mayors-cup/2025" class="results__link">查看完整賽程 →</router-link>
            </div>
        </div>
    </section>

    <!-- Vision -->
    <section id="vision" class="vision-section">
        <div class="vision__inner">
            <div class="vision__header" v-scroll-reveal>
                <p class="vision__en">VISION</p>
                <h2 class="vision__headline">打造台灣足球<br><em>先驅城市</em></h2>
                <p class="vision__sub">建立一個全齡參與、專業發展、全民支持的足球環境</p>
            </div>
            <div class="vision__points">
                <div class="vision__point" v-for="(item, i) in visionPoints" :key="i" v-scroll-reveal="{ delay: i * 120 }">
                    <span class="vision__num">0{{ i + 1 }}</span>
                    <span class="vision__text">{{ item }}</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Mission -->
    <section class="mission-section">
        <div class="mission__inner">
            <div class="mission__text" v-scroll-reveal="{ direction: 'left' }">
                <p class="mission__en">MISSION</p>
                <h2 class="mission__title">使命</h2>
                <p class="mission__body">
                    我們的使命是推廣與普及足球運動，為所有年齡層提供公平且專業的足球發展機會，與政府、學校及社區緊密合作，共同打造充滿活力的足球文化。
                </p>
                <ul class="mission__list">
                    <li><i class="fas fa-check"></i>統籌推動台中市各級足球賽事</li>
                    <li><i class="fas fa-check"></i>促進青少年足球發展與培訓體系</li>
                    <li><i class="fas fa-check"></i>與政府協力推動足球政策</li>
                    <li><i class="fas fa-check"></i>加強國內外足球組織交流</li>
                    <li><i class="fas fa-check"></i>創造社區足球文化，實現全民足球</li>
                </ul>
            </div>
            <div class="mission__image" v-scroll-reveal="{ direction: 'right' }">
                <img :src="missionImage" alt="台中市足球" />
            </div>
        </div>
    </section>

    <!-- Values -->
    <section class="values-section">
        <div class="values__inner">
            <div class="values__header" v-scroll-reveal>
                <p class="values__en">CORE VALUES</p>
                <h2 class="values__title">核心價值</h2>
            </div>
            <div class="values__cards">
                <div class="values__card" v-scroll-reveal="{ delay: 0 }">
                    <div class="values__card-icon"><i class="fas fa-fire"></i></div>
                    <h3>熱情 × 平等</h3>
                    <p>以對足球的熱愛推動各項活動，提供公平參與的機會，無論年齡、性別或背景，讓每個人都有機會接觸足球。</p>
                </div>
                <div class="values__card" v-scroll-reveal="{ delay: 150 }">
                    <div class="values__card-icon"><i class="fas fa-trophy"></i></div>
                    <h3>創新 × 卓越</h3>
                    <p>持續探索新穎的訓練與管理方式，運用數位科技優化足球發展，追求卓越的比賽品質，以國際水準為目標。</p>
                </div>
                <div class="values__card" v-scroll-reveal="{ delay: 300 }">
                    <div class="values__card-icon"><i class="fas fa-hands-helping"></i></div>
                    <h3>紀律 × 團隊</h3>
                    <p>培養球員良好的紀律和競技精神，強調合作精神，透過足球建立深厚的團隊關係，共同進步，回饋社會。</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="cta-section__inner">
            <p class="cta-section__en">JOIN US</p>
            <h2 class="cta-section__title">一起推動台中足球</h2>
            <div class="cta-section__btns">
                <a href="https://www.facebook.com/groups/576604161850781" target="_blank" class="cta-section__btn cta-section__btn--primary">Facebook 社群</a>
                <a href="mailto:service@tcfc.org.tw" class="cta-section__btn cta-section__btn--outline">聯絡我們</a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import splashImage from '@/assets/images/splash.jpg'
import missionImage from '@/assets/images/mission.jpg'
import { getLatestResults } from '@/api/services/homeService'
import type { GameSchedule } from '@/api/types/gameSchedule'

const visionPoints = [
    '最具影響力的地方足球推動單位',
    '培育國際級足球人才的搖籃',
    '完善的足球基礎設施建設',
    '推廣健康、團隊合作與競技精神',
    '足球與教育社會發展相結合',
]

const heroRef = ref<HTMLElement | null>(null)
const loading = ref(true)
const results = ref<(GameSchedule & { category: string })[]>([])

function onScroll() {
    if (!heroRef.value) return
    heroRef.value.style.backgroundPositionY = `${window.scrollY * 0.4}px`
}

onMounted(async () => {
    window.addEventListener('scroll', onScroll, { passive: true })
    try {
        results.value = await getLatestResults(5)
    } catch {
        results.value = []
    } finally {
        loading.value = false
    }
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
