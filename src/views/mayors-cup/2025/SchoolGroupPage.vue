// src/views/mayors-cup/OpenGroupPage.vue
<template>
    <div class="tournament-page">
        <!-- 頁面標題區域 -->
        <div class="page-header">
            <h1>{{ year }}年度市長盃公開組賽程</h1>

            <div class="group-selector">
                <select v-model="selectedDivision" class="select-input">
                    <option v-for="(name, key) in divisions" :key="key" :value="key">
                        {{ name }}
                    </option>
                </select>
            </div>
        </div>

        <!-- 分頁切換按鈕 -->
        <div class="tab-container">
            <button :class="['tab-button', { active: activeTab === 'group' }]" @click="activeTab = 'group'">
                小組賽
            </button>
            <button :class="['tab-button', { active: activeTab === 'knockout' }]" @click="activeTab = 'knockout'">
                淘汰賽
            </button>
        </div>

        <!-- 小組賽內容區塊 -->
        <div v-if="activeTab === 'group'" class="group-stage">
            <!-- 積分榜區塊 -->
            <div class="standings-table">
                <table>
                    <thead>
                        <tr>
                            <th>隊伍名稱</th>
                            <th>勝</th>
                            <th>和</th>
                            <th>敗</th>
                            <th class="hide-mobile">進球</th>
                            <th class="hide-mobile">失球</th>
                            <th class="hide-mobile">淨進球</th>
                            <th>積分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="team in groupStandings" :key="team.name">
                            <td>{{ team.name }}</td>
                            <td>{{ team.wins }}</td>
                            <td>{{ team.draws }}</td>
                            <td>{{ team.losses }}</td>
                            <td class="hide-mobile">{{ team.goalsFor }}</td>
                            <td class="hide-mobile">{{ team.goalsAgainst }}</td>
                            <td class="hide-mobile">{{ team.goalDifference }}</td>
                            <td><strong>{{ team.points }}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 小組賽賽程列表 -->
            <div class="matches-accordion">
                <div v-for="match in groupMatches" :key="match.gameNumber" class="match-item">
                    <div class="match-header" @click="toggleMatch(match.gameNumber)">
                        <div class="match-info">
                            <span class="match-date">{{ formatMatchDate(match.date) }}</span>
                            <span class="match-time">{{ match.time }}</span>
                        </div>
                        <div class="match-number">
                            <span>場次 {{ match.gameNumber }}</span>
                            <span class="group-label">{{ match.group }}組</span>
                        </div>
                    </div>
                    <div v-show="expandedMatch === match.gameNumber" class="match-details">
                        <div class="team-container">
                            <div class="team home">
                                <span class="team-name">{{ match.homeTeam }}</span>
                                <div class="score-container">
                                    <span class="score">{{ match.homeScore }}</span>
                                    <span v-if="match.homePK" class="pk">({{ match.homePK }})</span>
                                </div>
                            </div>
                            <div class="team away">
                                <span class="team-name">{{ match.awayTeam }}</span>
                                <div class="score-container">
                                    <span class="score">{{ match.awayScore }}</span>
                                    <span v-if="match.awayPK" class="pk">({{ match.awayPK }})</span>
                                </div>
                            </div>
                        </div>
                        <div class="match-meta">
                            <div class="venue">
                                <i class="fas fa-map-marker-alt"></i>
                                {{ match.venue }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 淘汰賽內容區塊 -->
        <div v-else class="knockout-stage">
            <div class="knockout-matches">
                <div v-for="match in knockoutMatches" :key="match.gameNumber" class="knockout-match">
                    <div class="match-header">
                        <div class="round-info">
                            <span class="round-name">{{ match.group }}</span>
                            <span class="match-time">{{ match.time }}</span>
                        </div>
                        <span class="match-date">{{ formatMatchDate(match.date) }}</span>
                    </div>
                    <div class="match-content">
                        <div class="teams">
                            <div class="team" :class="{ winner: isWinner(match, 'home') }">
                                <span class="team-name">{{ match.homeTeam }}</span>
                                <div class="score-container">
                                    <span class="score">{{ match.homeScore }}</span>
                                    <span v-if="match.homePK" class="pk">({{ match.homePK }})</span>
                                </div>
                            </div>
                            <div class="team" :class="{ winner: isWinner(match, 'away') }">
                                <span class="team-name">{{ match.awayTeam }}</span>
                                <div class="score-container">
                                    <span class="score">{{ match.awayScore }}</span>
                                    <span v-if="match.awayPK" class="pk">({{ match.awayPK }})</span>
                                </div>
                            </div>
                        </div>
                        <div class="match-meta">
                            <div class="venue">
                                <i class="fas fa-map-marker-alt"></i>
                                {{ match.venue }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 載入中狀態 -->
        <div v-if="isLoading" class="loading-overlay">
            <div class="spinner"></div>
            <span>載入中...</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { OpenGameService2024 } from '@/api/services/mayorsCup/2024/openGameService';
import { OpenGameService2025 } from '@/api/services/mayorsCup/2025/openGameService';
import type { GameSchedule } from '@/api/types/gameSchedule';

// 路由和基本狀態管理
const route = useRoute();
const year = computed(() => route.meta.year as string);
const isLoading = ref(false);

// UI 狀態管理
const activeTab = ref('group');
const selectedDivision = ref('U18');
const expandedMatch = ref<string | null>(null);
const matches = ref<GameSchedule[]>([]);

// 服務實例
const gameService = computed(() => {
    return year.value === '2024' ? new OpenGameService2024() : new OpenGameService2025();
});

// 組別定義
const divisions = computed(() => ({
    'U18': '公開高中組',
    'U15': '公開國中組',
    'U12_BOY': '公開高年級男生組',
    'U12_GIRL': '公開高年級女生組',
    'U10_BOY': '公開中年級男生組',
    'U10_GIRL': '公開中年級女生組',
    'U8': '低年級組',
    'U6': '幼兒組'
}));

// 載入賽程資料
const loadMatches = async () => {
    isLoading.value = true;
    try {
        const service = gameService.value;
        matches.value = await getScheduleByDivision(service, selectedDivision.value);
    } catch (error) {
        console.error('載入賽程失敗:', error);
        // TODO: 顯示錯誤提示
    } finally {
        isLoading.value = false;
    }
};

// 根據組別取得賽程
const getScheduleByDivision = async (service: any, division: string) => {
    switch (division) {
        case 'U18':
            return await service.getU18Schedule();
        case 'U15':
            return await service.getU15Schedule();
        case 'U12_BOY':
            return await service.getU12BoySchedule();
        case 'U12_GIRL':
            return await service.getU12GirlSchedule();
        case 'U10_BOY':
            return await service.getU10BoySchedule();
        case 'U10_GIRL':
            return await service.getU10GirlSchedule();
        case 'U8':
            return await service.getU8Schedule();
        case 'U6':
            return await service.getU6Schedule();
        default:
            return [];
    }
};

// 分組與淘汰賽資料過濾
const groupMatches = computed(() => {
    return matches.value.filter(match => /^[A-Z]$/.test(match.group));
});

const knockoutMatches = computed(() => {
    return matches.value.filter(match => !/^[A-Z]$/.test(match.group));
});

// 計算積分榜
const groupStandings = computed(() => {
    const standings: Record<string, any> = {};

    // 初始化隊伍資料
    groupMatches.value.forEach(match => {
        [match.homeTeam, match.awayTeam].forEach(team => {
            if (!standings[team]) {
                standings[team] = {
                    name: team,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalDifference: 0,
                    points: 0
                };
            }
        });

        // 計算比賽結果
        if (match.homeScore !== '' && match.awayScore !== '') {
            const homeScore = parseInt(match.homeScore);
            const awayScore = parseInt(match.awayScore);

            // 更新進失球數
            standings[match.homeTeam].goalsFor += homeScore;
            standings[match.homeTeam].goalsAgainst += awayScore;
            standings[match.awayTeam].goalsFor += awayScore;
            standings[match.awayTeam].goalsAgainst += homeScore;

            // 更新勝負和積分
            if (homeScore > awayScore) {
                standings[match.homeTeam].wins++;
                standings[match.awayTeam].losses++;
                standings[match.homeTeam].points += 3;
            } else if (homeScore < awayScore) {
                standings[match.awayTeam].wins++;
                standings[match.homeTeam].losses++;
                standings[match.awayTeam].points += 3;
            } else {
                standings[match.homeTeam].draws++;
                standings[match.awayTeam].draws++;
                standings[match.homeTeam].points += 1;
                standings[match.awayTeam].points += 1;
            }
        }
    });

    // 計算淨進球數
    Object.values(standings).forEach(team => {
        team.goalDifference = team.goalsFor - team.goalsAgainst;
    });

    // 排序（積分 > 淨進球 > 進球數）
    return Object.values(standings).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
    });
});

// 判斷勝利方
const isWinner = (match: GameSchedule, type: 'home' | 'away') => {
    if (match.homeScore === '' || match.awayScore === '') return false;

    const homeScore = parseInt(match.homeScore);
    const awayScore = parseInt(match.awayScore);

    if (homeScore !== awayScore) {
        return type === 'home' ? homeScore > awayScore : awayScore > homeScore;
    }

    // 如果有PK
    if (match.homePK && match.awayPK) {
        return type === 'home' ? match.homePK > match.awayPK : match.awayPK > match.homePK;
    }

    return false;
};

// 展開/收合賽程詳情
const toggleMatch = (gameNumber: string) => {
    expandedMatch.value = expandedMatch.value === gameNumber ? null : gameNumber;
};

// 格式化日期顯示
const formatMatchDate = (date: string) => {
    return date.replace(/\./g, '/');
};

// 監聽分組變更
watch(selectedDivision, () => {
    loadMatches();
    expandedMatch.value = null;
});

// 元件掛載時載入資料
onMounted(() => {
    loadMatches();
});
</script>

<style lang="scss" scoped>
/* 在檔案頂部添加 */
@use "sass:color";
@use "@/assets/styles/components/_tournament.scss" as tournament;

.tournament-page {

    // 自定義樣式補充
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba($primary-color, 0.1);
            border-left-color: $primary-color;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }

        span {
            color: $primary-color;
            font-weight: 500;
        }
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .hide-mobile {
        @media (max-width: $mobile-width) {
            display: none;
        }
    }

    .group-stage {

        &.fade-enter-active,
        &.fade-leave-active {
            transition: opacity 0.3s ease;
        }

        &.fade-enter-from,
        &.fade-leave-to {
            opacity: 0;
        }
    }

    .match-header {
        .match-info {
            display: flex;
            gap: 1rem;
            align-items: center;

            .match-date {
                color: $primary-color;
                font-weight: 500;
            }

            .match-time {
                color: $gray-400;
            }
        }

        .match-number {
            display: flex;
            gap: 1rem;
            align-items: center;

            .group-label {
                background-color: $accent-blue;
                color: $white-color;
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
                font-size: 0.85rem;
            }
        }
    }

    .team-container {
        .team {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid rgba($primary-color, 0.1);

            &:last-child {
                border-bottom: none;
            }

            .team-name {
                font-weight: 500;
                color: $primary-color;
            }

            .score-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                .score {
                    font-size: 1.2rem;
                    font-weight: bold;
                    min-width: 2rem;
                    text-align: center;
                }

                .pk {
                    font-size: 0.9rem;
                    color: $accent-orange;
                    padding: 0.2rem 0.5rem;
                    background: rgba($accent-orange, 0.1);
                    border-radius: 4px;
                }
            }

            &.winner {
                .team-name {
                    color: $accent-green;
                }

                .score {
                    color: $accent-green;
                }
            }
        }
    }

    .match-meta {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba($primary-color, 0.1);

        .venue {
            color: $gray-400;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;

            i {
                color: $accent-orange;
            }
        }
    }

    .knockout-stage {
        .round-info {
            display: flex;
            align-items: center;
            gap: 1rem;

            .round-name {
                font-weight: 500;
            }

            .match-time {
                color: $white-color;
                opacity: 0.9;
            }
        }

        .match-date {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .teams {
            .team {
                margin: 0.5rem 0;
                padding: 0.75rem;
                border-radius: 6px;
                transition: background-color 0.3s ease;

                &:hover {
                    background-color: rgba($primary-color, 0.05);
                }

                &.winner {
                    background-color: rgba($accent-green, 0.1);

                    .team-name {
                        color: $accent-green;
                    }

                    .score {
                        color: $accent-green;
                    }
                }
            }
        }
    }
}
</style>
