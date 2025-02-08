// src/views/mayors-cup/components/BaseTournamentPage.vue
<template>
    <div class="tournament-page">
        <!-- 頁面標題區域 -->
        <div class="page-header">
            <h1>{{ year }}年度市長盃{{ categoryName }}賽程</h1>
            <div class="division-selector">
                <select v-model="selectedDivision" class="select-input">
                    <option v-for="(name, key) in divisionOptions" :key="key" :value="key">
                        {{ name }}
                    </option>
                </select>
            </div>
        </div>

        <!-- 賽事類型分頁 -->
        <div v-if="hasKnockoutMatches" class="tournament-tabs">
            <button :class="['tab-button', { active: activeTab === 'group' }]" @click="activeTab = 'group'">
                分組賽
            </button>
            <button :class="['tab-button', { active: activeTab === 'knockout' }]" @click="activeTab = 'knockout'">
                淘汰賽
            </button>
        </div>

        <!-- 分組賽內容 -->
        <div v-if="!hasKnockoutMatches || activeTab === 'group'" class="group-stage">
            <!-- 進行中提示 -->
            <div v-if="isMatchesInProgress" class="stage-status">
                <i class="fas fa-info-circle"></i>
                <span>分組賽進行中，積分榜將隨賽事進行即時更新</span>
            </div>

            <!-- 尚未開始提示 -->
            <div v-if="!hasAnyMatches" class="stage-status empty">
                <i class="fas fa-calendar"></i>
                <span>賽程尚未公布，請稍候</span>
            </div>

            <!-- 遍歷每個小組 -->
            <template v-else>
                <div v-for="group in groupMatches" :key="group.name" class="group-section">
                    <!-- 積分榜 -->
                    <div class="standings-table">
                        <h2 class="group-title">{{ group.name }}組</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th class="rank">排名</th>
                                    <th class="team-col">球隊</th>
                                    <th>賽</th>
                                    <th>勝</th>
                                    <th>平</th>
                                    <th>負</th>
                                    <th>進球</th>
                                    <th>失球</th>
                                    <th>積分</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(team, index) in group.standings" :key="team.name"
                                    :class="{ 'promotion-zone': index < 2 }">
                                    <td class="rank">{{ index + 1 }}</td>
                                    <td class="team-col">{{ team.name }}</td>
                                    <td>{{ team.played }}</td>
                                    <td>{{ team.wins }}</td>
                                    <td>{{ team.draws }}</td>
                                    <td>{{ team.losses }}</td>
                                    <td>{{ team.goalsFor }}</td>
                                    <td>{{ team.goalsAgainst }}</td>
                                    <td class="points">{{ team.points }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- 賽程展開區域 -->
                    <div class="matches-section">
                        <div class="matches-header" @click="toggleGroupMatches(group.name)">
                            <span>{{ getMatchesHeaderText(group) }}</span>
                            <i class="fas fa-chevron-down" :class="{ 'rotate': expandedGroups[group.name] }"></i>
                        </div>

                        <div v-show="expandedGroups[group.name]" class="matches-content">
                            <!-- 賽事卡片 -->
                            <div v-for="match in group.matches" :key="match.gameNumber" class="match-item"
                                :class="{ 'no-score': !hasScore(match) }">
                                <MatchCard :match="match" :show-score="hasScore(match)" :is-winner="isWinner" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 分組賽說明 -->
                <div class="group-note">
                    <p>註：各組前兩名晉級淘汰賽</p>
                </div>
            </template>
        </div>

        <!-- 淘汰賽內容 -->
        <div v-else-if="hasKnockoutMatches && activeTab === 'knockout'" class="knockout-stage">
            <div class="stage-status" v-if="!hasKnockoutScores">
                <i class="fas fa-info-circle"></i>
                <span>淘汰賽賽程已產生，比賽即將開始</span>
            </div>

            <div class="knockout-matches">
                <div v-for="match in knockoutMatches" :key="match.gameNumber" class="knockout-match"
                    :class="{ 'no-score': !hasScore(match) }">
                    <MatchCard :match="match" :show-score="hasScore(match)" :is-winner="isWinner" layout="knockout" />
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
import type { GameSchedule } from '@/api/types/gameSchedule';
import MatchCard from './MatchCard.vue';

// Props
const props = defineProps<{
    categoryName: string;
    divisionOptions: Record<string, string>;
    gameService: any;
    defaultDivision: string;
}>();

// 路由和基本狀態管理
const route = useRoute();
const year = computed(() => route.meta.year as string);
const isLoading = ref(false);
const activeTab = ref('group');
const selectedDivision = ref(props.defaultDivision);
const matches = ref<GameSchedule[]>([]);
const expandedGroups = ref<Record<string, boolean>>({});

// 賽程狀態計算
const hasAnyMatches = computed(() => matches.value.length > 0);

const hasKnockoutMatches = computed(() => {
    return matches.value.some(match => !/^[A-Z]$/.test(match.group));
});

const hasKnockoutScores = computed(() => {
    return knockoutMatches.value.some(match => hasScore(match));
});

const isMatchesInProgress = computed(() => {
    return matches.value.some(match => hasScore(match)) &&
        matches.value.some(match => !hasScore(match));
});

// 分類賽事（小組賽/淘汰賽）
const groupMatches = computed(() => {
    const groups = new Map();

    // 篩選小組賽賽事（組別為 A-Z 的英文字母）
    matches.value
        .filter(match => /^[A-Z]$/.test(match.group))
        .forEach(match => {
            if (!groups.has(match.group)) {
                groups.set(match.group, {
                    name: match.group,
                    matches: [],
                    standings: getGroupStandings(match.group)
                });
            }
            groups.get(match.group).matches.push(match);
        });

    // 排序比賽
    groups.forEach(group => {
        group.matches.sort((a: GameSchedule, b: GameSchedule) => {
            const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
            if (dateCompare !== 0) return dateCompare;
            return a.time.localeCompare(b.time);
        });
    });

    // 按組別名稱排序
    return Array.from(groups.values()).sort((a, b) => a.name.localeCompare(b.name));
});

const knockoutMatches = computed(() => {
    // 篩選淘汰賽賽事
    return matches.value
        .filter(match => !/^[A-Z]$/.test(match.group))
        .sort((a, b) => {
            const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
            if (dateCompare !== 0) return dateCompare;
            return a.time.localeCompare(b.time);
        });
});

// 工具函數
const hasScore = (match: GameSchedule): boolean => {
    return match.homeScore !== '' && match.awayScore !== '';
};

const isWinner = (match: GameSchedule, type: 'home' | 'away'): boolean => {
    if (!hasScore(match)) return false;

    const homeScore = parseInt(match.homeScore);
    const awayScore = parseInt(match.awayScore);

    if (homeScore !== awayScore) {
        return type === 'home' ? homeScore > awayScore : awayScore > homeScore;
    }

    if (match.homePK && match.awayPK) {
        return type === 'home' ? match.homePK > match.awayPK : match.awayPK > match.homePK;
    }

    return false;
};

const formatMatchDate = (date: string): string => {
    return date.replace(/\./g, '/');
};

const getMatchesHeaderText = (group: any): string => {
    const totalMatches = group.matches.length;
    const completedMatches = group.matches.filter((m: GameSchedule) => hasScore(m)).length;

    if (completedMatches === 0) {
        return `查看完整賽程（${totalMatches}場賽事）`;
    } else if (completedMatches === totalMatches) {
        return `查看完整賽程（全部完成）`;
    } else {
        return `查看完整賽程（已完成 ${completedMatches}/${totalMatches} 場）`;
    }
};

const toggleGroupMatches = (groupName: string): void => {
    expandedGroups.value[groupName] = !expandedGroups.value[groupName];
};

// 計算特定組別的積分榜
const getGroupStandings = (groupLetter: string) => {
    const groupMatches = matches.value.filter(match => match.group === groupLetter);
    const standings: Record<string, any> = {};

    // 初始化隊伍資料
    groupMatches.forEach(match => {
        [match.homeTeam, match.awayTeam].forEach(team => {
            if (!standings[team]) {
                standings[team] = {
                    name: team,
                    played: 0,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    points: 0
                };
            }
        });

        // 計算比賽結果
        if (hasScore(match)) {
            const homeScore = parseInt(match.homeScore);
            const awayScore = parseInt(match.awayScore);

            standings[match.homeTeam].played++;
            standings[match.awayTeam].played++;

            standings[match.homeTeam].goalsFor += homeScore;
            standings[match.homeTeam].goalsAgainst += awayScore;
            standings[match.awayTeam].goalsFor += awayScore;
            standings[match.awayTeam].goalsAgainst += homeScore;

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

    // 排序（依照積分和進球數）
    return Object.values(standings).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return b.goalsFor - a.goalsFor;
    });
};

// 載入賽程資料
const loadMatches = async () => {
    isLoading.value = true;
    try {
        matches.value = await props.gameService.getScheduleByDivision(selectedDivision.value);
    } catch (error) {
        console.error('載入賽程失敗:', error);
    } finally {
        isLoading.value = false;
    }
};

// 監聽分組變更
watch(selectedDivision, () => {
    loadMatches();
    expandedGroups.value = {};
});

// 監聽分頁切換
watch(activeTab, () => {
    expandedGroups.value = {};
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
    padding: 2rem;
    max-width: $container-width;
    margin: 0 auto;
    background-color: $bg-color;

    @media (max-width: $mobile-width) {
        padding: 1rem;
    }

    // 載入中狀態
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba($white-color, 0.9);
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

    // 頁面標題區域
    .page-header {
        margin-bottom: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: $mobile-width) {
            flex-direction: column;
            gap: 1rem;
        }

        h1 {
            color: $primary-color;
            font-size: 2rem;
            margin: 0;

            @media (max-width: $mobile-width) {
                font-size: 1.5rem;
            }
        }

        .division-selector {
            .select-input {
                padding: 0.75rem 1rem;
                border: 1px solid rgba($primary-color, 0.2);
                border-radius: 8px;
                font-size: 1rem;
                min-width: 200px;
                background-color: $white-color;
                color: $primary-color;
                cursor: pointer;
                transition: all 0.3s ease;

                &:focus {
                    outline: none;
                    border-color: $accent-blue;
                    box-shadow: 0 0 0 2px rgba($accent-blue, 0.1);
                }

                @media (max-width: $mobile-width) {
                    width: 100%;
                }
            }
        }
    }

    // 分頁切換
    .tournament-tabs {
        margin-bottom: 2rem;
        border-bottom: 2px solid rgba($primary-color, 0.1);
        display: flex;
        width: 100%;

        .tab-button {
            flex: 1;
            padding: 1rem 0;
            background: none;
            border: none;
            color: $gray-400;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
            text-align: center;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: -2px;
                height: 2px;
                background-color: $accent-blue;
                transform: scaleX(0);
                transition: transform 0.3s ease;
            }

            &:hover {
                color: $accent-blue;
            }

            &.active {
                color: $accent-blue;

                &::after {
                    transform: scaleX(1);
                }
            }

            // 移除最後一個按鈕的右邊框
            &:last-child {
                border-right: none;
            }
        }
    }

    // 賽事狀態提示
    .stage-status {
        background: rgba($accent-blue, 0.1);
        color: $accent-blue;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        &.empty {
            background: rgba($gray-400, 0.1);
            color: $gray-400;
        }

        i {
            font-size: 1.2rem;
        }
    }

    // 分組賽區塊
    .group-stage {
        .group-section {
            background: $white-color;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
            overflow: hidden;

            // 積分榜
            .standings-table {
                .group-title {
                    margin: 0;
                    padding: 1rem;
                    background-color: $primary-color;
                    color: $white-color;
                    font-size: 1.2rem;
                    font-weight: 600;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;

                    th,
                    td {
                        padding: 0.75rem 1rem;
                        text-align: center;
                        border-bottom: 1px solid rgba($primary-color, 0.1);

                        &.rank {
                            width: 60px;
                            color: $gray-400;
                        }

                        &.team-col {
                            text-align: left;
                            width: 30%;
                        }

                        &.points {
                            font-weight: 600;
                            color: $primary-color;
                        }

                        @media (max-width: $mobile-width) {
                            padding: 0.5rem;
                            font-size: 0.9rem;

                            &:nth-child(n+4):nth-child(-n+7) {
                                display: none;
                            }
                        }
                    }

                    th {
                        background-color: rgba($primary-color, 0.05);
                        font-weight: 600;
                        color: $primary-color;
                        white-space: nowrap;
                    }

                    tr {
                        &.promotion-zone {
                            background-color: rgba($accent-green, 0.05);

                            td {
                                color: color.adjust($accent-green, $lightness: -5%);
                                font-weight: 500;

                                &.team-col {
                                    font-weight: 600;
                                }
                            }
                        }

                        &:hover {
                            background-color: rgba($primary-color, 0.02);
                        }
                    }
                }
            }

            // 賽程展開區域
            .matches-section {
                .matches-header {
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    border-top: 1px solid rgba($primary-color, 0.1);
                    transition: background-color 0.3s ease;

                    &:hover {
                        background-color: rgba($primary-color, 0.05);
                    }

                    span {
                        color: $primary-color;
                        font-weight: 500;
                    }

                    i {
                        color: $gray-400;
                        transition: transform 0.3s ease;

                        &.rotate {
                            transform: rotate(180deg);
                        }
                    }
                }

                .matches-content {
                    border-top: 1px solid rgba($primary-color, 0.1);
                    background-color: rgba($primary-color, 0.02);

                    .match-item {
                        padding: 1rem;
                        border-bottom: 1px solid rgba($primary-color, 0.1);

                        &:last-child {
                            border-bottom: none;
                        }

                        &.no-score {
                            opacity: 0.8;
                        }
                    }
                }
            }
        }

        .group-note {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba($accent-blue, 0.1);
            border-radius: 8px;
            color: $accent-blue;
            font-size: 0.9rem;
            text-align: center;

            p {
                margin: 0;
            }
        }
    }

    // 淘汰賽區塊
    .knockout-stage {
        .knockout-matches {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

            .knockout-match {
                background: $white-color;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                overflow: hidden;

                &.no-score {
                    opacity: 0.8;
                }
            }
        }
    }

    // 動畫效果
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
}
</style>
