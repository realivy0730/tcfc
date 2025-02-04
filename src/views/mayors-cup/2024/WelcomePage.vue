# src/views/mayors-cup/2024/WelcomePage.vue
<template>
    <div class="welcome-page">
        <!-- 頁面頂部 -->
        <header class="page-header">
            <h1>113年度 - 臺中市市長盃足球錦標賽(2024)</h1>
            <p class="subtitle">凝聚城市足球魂，打造臺中足球夢</p>
        </header>

        <!-- 主要內容區 -->
        <main class="main-content">
            <!-- 導覽標籤頁 -->
            <div class="nav-tabs" ref="tabsContainer">
                <button v-for="tab in tabs" :key="tab.id" :class="['tab-button', { active: activeTab === tab.id }]"
                    @click="switchTab(tab.id)">
                    <i :class="tab.icon"></i>
                    {{ tab.name }}
                    <span class="team-count">({{ getGroupCount(tab.id) }})</span>
                </button>
            </div>

            <!-- 賽程快速連結 -->
            <div class="schedule-links">
                <router-link :to="'/mayors-cup/2024/' + activeTab" class="schedule-button">
                    <i class="fas fa-calendar-alt"></i>
                    查看完整賽程表
                </router-link>
            </div>

            <!-- 比賽結果列表 -->
            <div class="results-container">
                <div v-for="group in getCurrentGroups()" :key="group.id" class="result-card">
                    <div class="result-header">
                        <h3>{{ group.name }}</h3>
                        <div class="medal-icons">
                            <i class="fas fa-medal gold"></i>
                            <i class="fas fa-medal silver"></i>
                            <i class="fas fa-medal bronze"></i>
                        </div>
                    </div>
                    <div class="team-list">
                        <div v-for="(team, index) in group.teams" :key="index" class="team-row">
                            <span class="rank-number">{{ index + 1 }}</span>
                            <span class="team-name">{{ team }}</span>
                            <span v-if="index < 3" :class="['medal-badge', getMedalClass(index)]">
                                {{ getMedalLabel(index) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 定義分頁
const tabs = [
    { id: 'school', name: '學校組', icon: 'fas fa-school' },
    { id: 'open', name: '公開組', icon: 'fas fa-trophy' }
]

// 活動分頁狀態
const activeTab = ref('school')

// 賽事資料
const schoolGroups = [
    {
        id: 'junior',
        name: '國中組',
        teams: ['福科國中', '潭秀國中', '安和國中']
    },
    {
        id: 'senior',
        name: '高年級組',
        teams: ['清水國小', '國安國小', '協和國小']
    },
    {
        id: 'middle',
        name: '中年級組',
        teams: ['協和國小', '國安國小', '清水國小', '西屯國小']
    }
]

const openGroups = [
    {
        id: 'high',
        name: '高中組',
        teams: ['足夢 U18A', '嶺東中學', 'FOCUS']
    },
    {
        id: 'junior',
        name: '國中組',
        teams: ['福科', 'FUTURO U15', '潭秀 FC', '黎明']
    },
    {
        id: 'senior-male',
        name: '高年級男生組',
        teams: ['足夢蜻蜓 A', 'FUTURO U12', '國安', '協和 FC']
    },
    {
        id: 'senior-female',
        name: '高年級女生組',
        teams: ['南屯國小', '黎明國小', '惠來國小', '惠文獵豹']
    },
    {
        id: 'middle-male',
        name: '中年級男生組',
        teams: ['旅人', '明道普霖斯頓飛翼', 'GAES 國安', '忠孝 U10']
    },
    {
        id: 'middle-female',
        name: '中年級女生組',
        teams: ['南屯國小', '足夢蜻蜓', '臺中市永隆國小', '惠來國小']
    },
    {
        id: 'junior',
        name: '低年級組',
        teams: ['旅人 U8', '協和國小', '國安國小', '臺中市永隆國小']
    },
    {
        id: 'kindergarten',
        name: '幼兒組',
        teams: ['威爾森教育機構', '小蜻蜓', '普霖斯頓']
    }
]

// 切換分頁
const switchTab = (tabId: string) => {
    activeTab.value = tabId
}

// 獲取當前分頁的組別資料
const getCurrentGroups = () => {
    return activeTab.value === 'school' ? schoolGroups : openGroups
}

// 獲取組別數量
const getGroupCount = (tabId: string) => {
    return tabId === 'school' ? schoolGroups.length : openGroups.length
}

// 獲取獎牌樣式
const getMedalClass = (index: number) => {
    const medals = ['gold', 'silver', 'bronze']
    return medals[index] || ''
}

// 獲取獎牌文字
const getMedalLabel = (index: number) => {
    const labels = ['冠軍', '亞軍', '季軍']
    return labels[index] || ''
}

onMounted(() => {
    window.scrollTo(0, 0)
})
</script>

<style lang="scss" scoped>
.welcome-page {
    min-height: 100vh;
    background-color: #f5f6fa;
}

.page-header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    padding: 2rem 1rem;
    text-align: center;
    color: white;

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;

        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }

    .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;

        @media (max-width: 768px) {
            font-size: 1rem;
        }
    }
}

.main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
}

.nav-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #e1e4e8;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(#1e3c72, 0.2);
        border-radius: 2px;
    }

    .tab-button {
        padding: 1rem 1.5rem;
        border: none;
        background: none;
        color: #4a5568;
        font-size: 1.1rem;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        border-bottom: 3px solid transparent;
        transition: all 0.3s ease;

        &:hover {
            color: #2a5298;
        }

        &.active {
            color: #1e3c72;
            border-bottom-color: #1e3c72;
        }

        i {
            margin-right: 0.5rem;
        }

        .team-count {
            margin-left: 0.5rem;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    }
}

.schedule-links {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;

    .schedule-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1.5rem;
        background-color: #1e3c72;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
            background-color: #2a5298;
            transform: translateY(-2px);
        }

        i {
            font-size: 1.1rem;
        }
    }
}

.results-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.result-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;

    .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #f8fafc;
        border-bottom: 1px solid #e1e4e8;

        h3 {
            margin: 0;
            color: #2d3748;
            font-size: 1.2rem;
        }

        .medal-icons {
            display: flex;
            gap: 0.5rem;

            .fa-medal {
                font-size: 1.2rem;

                &.gold {
                    color: #ffd700;
                }

                &.silver {
                    color: #c0c0c0;
                }

                &.bronze {
                    color: #cd7f32;
                }
            }
        }
    }

    .team-list {
        .team-row {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #f0f2f5;

            &:last-child {
                border-bottom: none;
            }

            .rank-number {
                width: 30px;
                font-weight: 600;
                color: #4a5568;
            }

            .team-name {
                flex: 1;
                color: #2d3748;
            }

            .medal-badge {
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.9rem;
                color: white;

                &.gold {
                    background: linear-gradient(45deg, #ffd700, #ffa500);
                }

                &.silver {
                    background: linear-gradient(45deg, #c0c0c0, #a0a0a0);
                }

                &.bronze {
                    background: linear-gradient(45deg, #cd7f32, #8b4513);
                }
            }
        }
    }
}
</style>
