# src/views/mayors-cup/2024/WelcomePage.vue
<template>
    <div class="welcome-page">
        <!-- 頁面標題區 -->
        <header class="page-header">
            <h1>113年度 - 臺中市市長盃足球錦標賽(2024)</h1>
            <p class="subtitle">凝聚城市足球魂，打造臺中足球夢</p>
        </header>

        <!-- 主要內容區 -->
        <main class="main-content">
            <!-- 分組導覽區 -->
            <div class="group-tabs-container">
                <nav class="group-tabs" role="tablist">
                    <!-- 導覽列 -->
                    <div class="tabs-wrapper">
                        <button v-for="(tab, index) in tabs" :key="tab.id" role="tab" class="tab-button"
                            :class="{ active: activeTab === tab.id }" @click="switchTab(tab.id, index)"
                            :aria-selected="activeTab === tab.id">
                            <i :class="tab.icon"></i>
                            <span class="tab-name">{{ tab.name }}</span>
                            <span class="badge">{{ getGroupCount(tab.id) }}</span>
                        </button>
                        <!-- 移動指示器 -->
                        <div class="active-indicator" :style="{ transform: `translateX(${activeTabIndex * 100}%)` }">
                        </div>
                    </div>
                </nav>
            </div>

            <!-- 查看賽程按鈕 -->
            <div class="schedule-action">
                <router-link :to="'/mayors-cup/2024/' + activeTab" class="view-schedule">
                    <i class="fas fa-calendar-alt"></i>
                    查看完整賽程表
                </router-link>
            </div>

            <!-- 比賽結果列表 -->
            <div class="results-container">
                <TransitionGroup name="list" tag="div" class="results-grid">
                    <div v-for="group in displayGroups" :key="group.id" class="result-card">
                        <div class="card-header">
                            <h3>{{ group.name }}</h3>
                            <div class="medal-icons">
                                <i class="fas fa-medal gold"></i>
                                <i class="fas fa-medal silver"></i>
                                <i class="fas fa-medal bronze"></i>
                            </div>
                        </div>
                        <div class="team-list">
                            <div v-for="(team, index) in group.teams" :key="index" class="team-item"
                                :class="getMedalClass(index)">
                                <span class="rank">{{ index + 1 }}</span>
                                <span class="name">{{ team }}</span>
                                <span v-if="index < 3" class="medal-label">
                                    {{ getMedalLabel(index) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 分頁設定
const tabs = [
    { id: 'school', name: '學校組', icon: 'fas fa-school' },
    { id: 'open', name: '公開組', icon: 'fas fa-trophy' }
]

const activeTab = ref('school')
const activeTabIndex = ref(0)

// 組別資料
const schoolGroups = [
    {
        id: 'school-junior',
        name: '國中組',
        teams: ['福科國中', '潭秀國中', '安和國中']
    },
    {
        id: 'school-senior',
        name: '高年級組',
        teams: ['清水國小', '國安國小', '協和國小']
    },
    {
        id: 'school-middle',
        name: '中年級組',
        teams: ['協和國小', '國安國小', '清水國小', '西屯國小']
    }
]

const openGroups = [
    {
        id: 'open-high',
        name: '高中組',
        teams: ['足夢 U18A', '嶺東中學', 'FOCUS']
    },
    {
        id: 'open-junior',
        name: '國中組',
        teams: ['福科', 'FUTURO U15', '潭秀 FC', '黎明']
    },
    {
        id: 'open-senior-male',
        name: '高年級男生組',
        teams: ['足夢蜻蜓 A', 'FUTURO U12', '國安', '協和 FC']
    },
    {
        id: 'open-senior-female',
        name: '高年級女生組',
        teams: ['南屯國小', '黎明國小', '惠來國小', '惠文獵豹']
    },
    {
        id: 'open-middle-male',
        name: '中年級男生組',
        teams: ['旅人', '明道普霖斯頓飛翼', 'GAES 國安', '忠孝 U10']
    },
    {
        id: 'open-middle-female',
        name: '中年級女生組',
        teams: ['南屯國小', '足夢蜻蜓', '臺中市永隆國小', '惠來國小']
    },
    {
        id: 'open-junior',
        name: '低年級組',
        teams: ['旅人 U8', '協和國小', '國安國小', '臺中市永隆國小']
    },
    {
        id: 'open-kindergarten',
        name: '幼兒組',
        teams: ['威爾森教育機構', '小蜻蜓', '普霖斯頓']
    }
]

// 使用 computed 計算當前顯示的組別
const displayGroups = computed(() => {
    return activeTab.value === 'school' ? schoolGroups : openGroups
})

// 切換分頁
const switchTab = (tabId: string, index: number) => {
    activeTab.value = tabId
    activeTabIndex.value = index
}

// 獲取組別數量
const getGroupCount = (tabId: string) => {
    return tabId === 'school' ? schoolGroups.length : openGroups.length
}

// 獎牌相關函數
const getMedalClass = (index: number) => {
    const medals = ['gold', 'silver', 'bronze']
    return medals[index] || ''
}

const getMedalLabel = (index: number) => {
    const labels = ['冠軍', '亞軍', '季軍']
    return labels[index] || ''
}
</script>

<style lang="scss" scoped>
.welcome-page {
    min-height: 100vh;
    background-color: $bg-color;
}

.page-header {
    background: linear-gradient(135deg, $primary-color 0%, $accent-blue 100%);
    padding: 3rem 1.5rem;
    text-align: center;
    color: $white-color;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        text-shadow: 0 2px 4px rgba($gray-500-color, 0.2);

        @media (max-width: $mobile-width) {
            font-size: 1.8rem;
        }
    }

    .subtitle {
        font-size: 1.4rem;
        opacity: 0.9;
        color: $white-100-color;

        @media (max-width: $mobile-width) {
            font-size: 1.1rem;
        }
    }
}

.main-content {
    max-width: $container-width;
    margin: -2rem auto 0;
    padding: 0 1.5rem;
    position: relative;
    z-index: 1;

    @media (max-width: $mobile-width) {
        padding: 0 1rem;
        margin-top: -1.5rem;
    }
}

.group-tabs-container {
    background: $white-color;
    border-radius: 12px;
    padding: 0.75rem;
    box-shadow: 0 4px 12px rgba($primary-color, 0.1);
    margin-bottom: 2rem;
}

.tabs-wrapper {
    position: relative;
    display: flex;
    background: $white-100-color;
    border-radius: 8px;
    padding: 0.25rem;
    height: 56px;

    .tab-button {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        border: none;
        background: none;
        padding: 0.75rem;
        cursor: pointer;
        color: $gray-300-color;
        font-weight: 500;
        transition: color 0.3s ease;
        z-index: 2;

        &.active {
            color: $primary-color;
        }

        i {
            font-size: 1.2rem;
        }

        .badge {
            background: $bg-color;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.9rem;
            color: $gray-400-color;
        }

        @media (max-width: $mobile-width) {
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.5rem;

            .badge {
                padding: 0.15rem 0.5rem;
                font-size: 0.8rem;
            }
        }
    }

    .active-indicator {
        position: absolute;
        top: 0.25rem;
        left: 0.25rem;
        width: calc(50% - 0.5rem);
        height: calc(100% - 0.5rem);
        background: $white-color;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba($primary-color, 0.15);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1;
    }
}

.schedule-action {
    display: flex;
    justify-content: flex-end;
    margin: 2rem 0;

    .view-schedule {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        background: $accent-green;
        color: $white-color;
        padding: 0.875rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            background: darken($accent-green, 5%);
            transform: translateY(-2px);
        }

        i {
            font-size: 1.1rem;
        }

        @media (max-width: $mobile-width) {
            width: 100%;
            justify-content: center;
        }
    }
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    padding-bottom: 2rem;
}

// 列表動畫
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
}

.result-card {
    background: $white-color;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba($primary-color, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba($primary-color, 0.15);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem;
        background: $white-100-color;
        border-bottom: 1px solid rgba($primary-color, 0.1);

        h3 {
            margin: 0;
            color: $primary-color;
            font-size: 1.2rem;
            font-weight: 600;
        }

        .medal-icons {
            display: flex;
            gap: 0.5rem;

            .fa-medal {
                font-size: 1.2rem;

                &.gold { color: $accent-orange; }
                &.silver { color: $gray-200-color; }
                &.bronze { color: $second-color; }
            }
        }
    }

    .team-list {
        .team-item {
            display: flex;
            align-items: center;
            padding: 1rem 1.25rem;
            border-bottom: 1px solid $white-100-color;

            &:last-child {
                border-bottom: none;
            }

            .rank {
                width: 2rem;
                font-weight: 600;
                color: $gray-300-color;
            }

            .name {
                flex: 1;
                color: $text-color;
            }

            .medal-label {
                padding: 0.4rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
                color: $white-color;
            }

            &.gold .medal-label {
                background: linear-gradient(45deg, $accent-orange, lighten($accent-orange, 10%));
            }

            &.silver .medal-label {
                background: linear-gradient(45deg, $gray-200-color, $gray-100-color);
            }

            &.bronze .medal-label {
                background: linear-gradient(45deg, $second-color, lighten($second-color, 10%));
            }
        }
    }
}

// 手機版特定樣式
@media (max-width: $mobile-width) {
    .group-tabs-container {
        padding: 0.5rem;
        margin: 0 -0.5rem 1.5rem;
        border-radius: 8px;
    }

    .tabs-wrapper {
        height: 70px;

        .tab-button {
            .tab-name {
                font-size: 0.95rem;
            }
        }
    }

    .results-grid {
        gap: 1rem;
    }

    .result-card {
        .card-header {
            padding: 1rem;

            h3 {
                font-size: 1.1rem;
            }
        }

        .team-list {
            .team-item {
                padding: 0.875rem 1rem;

                .medal-label {
                    padding: 0.3rem 0.75rem;
                    font-size: 0.85rem;
                }
            }
        }
    }
}

// 觸控裝置優化
@media (hover: none) {
    .result-card {
        &:hover {
            transform: none;
            box-shadow: 0 2px 8px rgba($primary-color, 0.1);
        }
    }

    .tab-button {
        &:active {
            background: rgba($primary-color, 0.05);
        }
    }

    .view-schedule {
        &:active {
            transform: scale(0.98);
        }
    }
}
// 補充動畫效果
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.welcome-page {
    .page-header {
        position: relative;
        overflow: hidden;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: linear-gradient(to top, $bg-color, transparent);
            pointer-events: none;
        }

        h1, .subtitle {
            animation: slideIn 0.6s ease-out forwards;
        }

        .subtitle {
            animation-delay: 0.2s;
        }
    }

    .group-tabs-container {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba($accent-blue, 0.05), rgba($primary-color, 0.05));
            border-radius: 12px;
            z-index: 0;
        }
    }

    .tabs-wrapper {
        .tab-button {
            position: relative;
            overflow: hidden;

            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba($accent-blue, 0.1) 0%, transparent 70%);
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.3s ease-out;
                pointer-events: none;
            }

            &:hover::after {
                transform: translate(-50%, -50%) scale(2);
            }

            .badge {
                position: relative;
                overflow: hidden;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba($white-color, 0.2),
                        transparent
                    );
                    transition: left 0.5s ease-out;
                }

                &:hover::before {
                    left: 100%;
                }
            }
        }
    }

    .result-card {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 12px;
            padding: 2px;
            background: linear-gradient(135deg, rgba($accent-blue, 0.2), rgba($primary-color, 0.2));
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        &:hover::before {
            opacity: 1;
        }

        .team-item {
            position: relative;
            transition: all 0.3s ease;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 3px;
                background: transparent;
                transition: background-color 0.3s ease;
            }

            &:hover {
                background: rgba($primary-color, 0.02);

                &::before {
                    background: $accent-green;
                }
            }

            &.gold:hover::before {
                background: $accent-orange;
            }

            &.silver:hover::before {
                background: $gray-200-color;
            }

            &.bronze:hover::before {
                background: $second-color;
            }
        }
    }

    .schedule-action {
        .view-schedule {
            position: relative;
            overflow: hidden;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba($white-color, 0.2),
                    transparent
                );
                transition: left 0.5s ease-out;
            }

            &:hover::after {
                left: 100%;
            }
        }
    }
}

// 載入優化
.welcome-page {
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

// 無障礙支援
.tab-button:focus,
.view-schedule:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba($accent-blue, 0.3);
}
</style>
