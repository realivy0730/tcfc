<template>
    <div class="scoreboard-container">
        <!-- 積分榜標題 -->
        <h4 class="scoreboard-title">
            <span class="group-label">{{ group }}組</span>
            積分榜
        </h4>

        <!-- 桌面版積分榜 -->
        <div class="desktop-table">
            <table class="scoreboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th class="team-column">球隊</th>
                        <th>勝</th>
                        <th>和</th>
                        <th>敗</th>
                        <th>進球</th>
                        <th>失球</th>
                        <th>淨勝</th>
                        <th>積分</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(team, index) in groupTeams" :key="team.name" :class="{
                        'highlight': index < 2,
                        'winner': shouldShowWinner(index),
                        'third-fourth': shouldShowThirdFourth(index),
                        'champion': isChampion(index)
                    }">
                        <td>{{ index + 1 }}</td>
                        <td class="team-column">
                            <span v-if="isChampion(index)" class="team-icon" title="冠軍">🏆</span>
                            <span v-else-if="shouldShowTopTwo(index)" class="team-icon" title="冠亞軍組">🥇</span>
                            <span v-else-if="shouldShowThirdFourth(index)" class="team-icon" title="季殿軍組">🥉</span>
                            <span v-else-if="shouldShowWinner(index)" class="team-icon" title="晉級四強">✨</span>
                            {{ team.name }}
                        </td>
                        <td>{{ team.wins }}</td>
                        <td>{{ team.draws }}</td>
                        <td>{{ team.losses }}</td>
                        <td>{{ team.goalsFor }}</td>
                        <td>{{ team.goalsAgainst }}</td>
                        <td>{{ team.goalDifference }}</td>
                        <td class="points-column">{{ team.points }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 手機版積分榜 -->
        <div class="mobile-table">
            <div v-for="(team, index) in groupTeams" :key="team.name" class="team-card" :class="{
                'highlight': index < 2,
                'winner': shouldShowWinner(index),
                'third-fourth': shouldShowThirdFourth(index),
                'champion': isChampion(index)
            }">
                <div class="team-header">
                    <span class="rank">{{ index + 1 }}</span>
                    <span class="team-name">
                        <span v-if="isChampion(index)" class="team-icon" title="冠軍">🏆</span>
                        <span v-else-if="shouldShowTopTwo(index)" class="team-icon" title="冠亞軍組">🥇</span>
                        <span v-else-if="shouldShowThirdFourth(index)" class="team-icon" title="季殿軍組">🥉</span>
                        <span v-else-if="shouldShowWinner(index)" class="team-icon" title="晉級四強">✨</span>
                        {{ team.name }}
                    </span>
                    <span class="points">{{ team.points }}分</span>
                </div>
                <div class="team-stats">
                    <div class="stat-item">
                        <span class="stat-label">勝</span>
                        <span class="stat-value">{{ team.wins }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">和</span>
                        <span class="stat-value">{{ team.draws }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">敗</span>
                        <span class="stat-value">{{ team.losses }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">進/失</span>
                        <span class="stat-value">{{ team.goalsFor }}/{{ team.goalsAgainst }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 展開按鈕 -->
        <button class="expand-button" @click="toggleGameDetails">
            {{ isExpanded ? '收合賽程' : '展開賽程' }}
            <span class="icon">{{ isExpanded ? '▲' : '▼' }}</span>
        </button>

        <!-- 賽程明細 -->
        <GameDetails v-if="isExpanded" :games="games" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { GameSchedule } from '@/api/types/gameSchedule';
import GameDetails from './GameDetails.vue';

// 型別定義
type GameStage = 'eight' | 'semi' | 'final';

interface TeamStats {
    name: string;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}

interface Props {
    games: GameSchedule[];
    group: string;
    stage: GameStage;
}

// Props 定義
const props = defineProps<Props>();

// 狀態管理
const isExpanded = ref(false);

/**
 * 判斷是否顯示八強晉級標示
 * @param index - 球隊排名索引
 * @returns 是否顯示八強標示
 */
const shouldShowWinner = (index: number): boolean => {
    return props.stage === 'eight' && index < 4;
};

/**
 * 判斷是否顯示季殿軍組標示
 * @param index - 球隊排名索引
 * @returns 是否顯示季殿軍組標示
 */
const shouldShowThirdFourth = (index: number): boolean => {
    return props.stage === 'semi' && (index === 2 || index === 3);
};

/**
 * 判斷是否顯示冠亞軍組標示
 * @param index - 球隊排名索引
 * @returns 是否顯示冠亞軍組標示
 */
const shouldShowTopTwo = (index: number): boolean => {
    return props.stage === 'semi' && (index === 0 || index === 1);
};

/**
 * 判斷是否為冠軍
 * @param index - 球隊排名索引
 * @returns 是否為冠軍
 */
const isChampion = (index: number): boolean => {
    return props.stage === 'final' && index === 0;
};

/**
 * 建立初始化的球隊統計資料
 * @returns 初始化的球隊統計資料
 */
const createInitialTeamStats = (): Omit<TeamStats, 'name'> => ({
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0
});

/**
 * 計算比賽結果並更新球隊統計資料
 * @param game - 比賽資料
 * @param teams - 球隊統計資料Map
 */
const calculateGameResult = (
    game: GameSchedule,
    teams: Map<string, Omit<TeamStats, 'name'>>
): void => {
    const homeTeamStats = teams.get(game.homeTeam)!;
    const awayTeamStats = teams.get(game.awayTeam)!;

    const homeScore = parseInt(game.homeScore) || 0;
    const awayScore = parseInt(game.awayScore) || 0;

    // 更新進失球數
    homeTeamStats.goalsFor += homeScore;
    homeTeamStats.goalsAgainst += awayScore;
    awayTeamStats.goalsFor += awayScore;
    awayTeamStats.goalsAgainst += homeScore;

    // 判斷勝負
    if (homeScore > awayScore) {
        homeTeamStats.wins++;
        awayTeamStats.losses++;
        homeTeamStats.points += 3;
    } else if (homeScore < awayScore) {
        awayTeamStats.wins++;
        homeTeamStats.losses++;
        awayTeamStats.points += 3;
    } else {
        const homePK = parseInt(game.homePK) || 0;
        const awayPK = parseInt(game.awayPK) || 0;

        if (homePK > awayPK) {
            homeTeamStats.wins++;
            awayTeamStats.losses++;
            homeTeamStats.points += 3;
        } else if (homePK < awayPK) {
            awayTeamStats.wins++;
            homeTeamStats.losses++;
            awayTeamStats.points += 3;
        } else {
            homeTeamStats.draws++;
            awayTeamStats.draws++;
            homeTeamStats.points += 1;
            awayTeamStats.points += 1;
        }
    }

    // 計算淨勝球數
    homeTeamStats.goalDifference = homeTeamStats.goalsFor - homeTeamStats.goalsAgainst;
    awayTeamStats.goalDifference = awayTeamStats.goalsFor - awayTeamStats.goalsAgainst;
};

/**
 * 計算該組別的所有隊伍統計資料
 */
const groupTeams = computed(() => {
    const teams = new Map();

    props.games.forEach(game => {
        if (!teams.has(game.homeTeam)) {
            teams.set(game.homeTeam, createInitialTeamStats());
        }
        if (!teams.has(game.awayTeam)) {
            teams.set(game.awayTeam, createInitialTeamStats());
        }

        calculateGameResult(game, teams);
    });

    return [...teams.entries()]
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);
});

/**
 * 切換賽程明細的顯示狀態
 */
const toggleGameDetails = (): void => {
    isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.scoreboard-container {
    margin: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.scoreboard-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.group-label {
    background-color: #2c3e50;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 1rem;
}

/* 桌面版表格樣式 */
.desktop-table {
    display: block;
}

.scoreboard-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
}

.scoreboard-table th,
.scoreboard-table td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #eee;
}

.scoreboard-table th {
    background: #f8f9fa;
    color: #2c3e50;
    font-weight: 600;
}

.team-column {
    text-align: left;
    min-width: 150px;
}

.points-column {
    font-weight: bold;
    color: #2c3e50;
}

.highlight {
    background-color: #f8f9fa;
}

.highlight td {
    color: #2c3e50;
    font-weight: 500;
}

/* 手機版卡片樣式 */
.mobile-table {
    display: none;
}

.team-card {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.rank {
    background: #2c3e50;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9rem;
}

.team-name {
    font-weight: 600;
    color: #2c3e50;
}

.points {
    color: #2c3e50;
    font-weight: 600;
}

.team-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.stat-item {
    text-align: center;
}

.stat-label {
    display: block;
    font-size: 0.8rem;
    color: #666;
}

.stat-value {
    display: block;
    font-weight: 500;
    color: #2c3e50;
}

/* 展開按鈕樣式 */
.expand-button {
    width: 100%;
    padding: 12px;
    margin-top: 20px;
    background: #f8f9fa;
    border: none;
    border-radius: 8px;
    color: #2c3e50;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.3s;
}

.expand-button:hover {
    background: #e9ecef;
}

.icon {
    font-size: 0.8rem;
}

.team-icon {
    margin-right: 8px;
    font-size: 1.2em;
    vertical-align: middle;
}

/* 不同階段的強調樣式 */
.winner {
    background-color: rgba(255, 215, 0, 0.1);
}

.third-fourth {
    background-color: rgba(205, 127, 50, 0.1);
}

.champion {
    background-color: rgba(255, 215, 0, 0.2);
}

/* RWD 設定 */
@media screen and (max-width: 768px) {
    .scoreboard-container {
        margin: 10px;
        padding: 15px;
    }

    .desktop-table {
        display: none;
    }

    .mobile-table {
        display: block;
    }

    .scoreboard-title {
        font-size: 1.2rem;
    }

    .group-label {
        padding: 3px 10px;
        font-size: 0.9rem;
    }
}



/* 平板設備優化 */
@media screen and (min-width: 769px) and (max-width: 1024px) {

    .scoreboard-table th,
    .scoreboard-table td {
        padding: 10px 8px;
        font-size: 0.9rem;
    }

    .team-column {
        min-width: 120px;
    }

    .team-icon {
        font-size: 1em;
        margin-right: 4px;
    }
}
</style>
