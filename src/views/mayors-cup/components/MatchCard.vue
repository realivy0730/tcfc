// src/views/mayors-cup/components/MatchCard.vue
<template>
    <div class="match-card" :class="layout">
        <!-- 比賽資訊標頭 -->
        <div class="match-header">
            <div class="match-info">
                <template v-if="layout === 'knockout'">
                    <span class="round">{{ match.group }}</span>
                </template>
                <span class="date">{{ formatMatchDate(match.date) }}</span>
                <span class="time">{{ match.time }}</span>
                <template v-if="layout === 'group'">
                    <span class="number">場次 {{ match.gameNumber }}</span>
                </template>
            </div>
            <div class="venue">
                <i class="fas fa-map-marker-alt"></i>
                {{ match.venue }}
            </div>
        </div>

        <!-- 比賽隊伍資訊 -->
        <div class="match-teams">
            <div class="team" :class="{ winner: isWinner(match, 'home') }">
                <span class="name">{{ match.homeTeam }}</span>
                <div class="score" v-if="showScore">
                    <span>{{ match.homeScore }}</span>
                    <span v-if="match.homePK" class="pk">({{ match.homePK }})</span>
                </div>
                <div v-else class="match-status">
                    <span>{{ getMatchStatus(match) }}</span>
                </div>
            </div>
            <div class="team" :class="{ winner: isWinner(match, 'away') }">
                <span class="name">{{ match.awayTeam }}</span>
                <div class="score" v-if="showScore">
                    <span>{{ match.awayScore }}</span>
                    <span v-if="match.awayPK" class="pk">({{ match.awayPK }})</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GameSchedule } from '@/api/types/gameSchedule';

// Props 定義
interface Props {
    match: GameSchedule;
    showScore: boolean;
    isWinner: (match: GameSchedule, type: 'home' | 'away') => boolean;
    layout?: 'group' | 'knockout';
}

const props = withDefaults(defineProps<Props>(), {
    layout: 'group'
});

// 工具函數
const formatMatchDate = (date: string): string => {
    return date.replace(/\./g, '/');
};

const getMatchStatus = (match: GameSchedule): string => {
    const matchDate = new Date(match.date.replace(/\./g, '-'));
    const today = new Date();

    // 設定比較用的日期（只比較年月日）
    matchDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (matchDate.getTime() === today.getTime()) {
        return '今日賽事';
    } else if (matchDate.getTime() > today.getTime()) {
        return '未開始';
    } else {
        return '比賽結束';
    }
};
</script>

<style lang="scss" scoped>
.match-card {
    &.group {
        .match-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;

            @media (max-width: $mobile-width) {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
        }
    }

    &.knockout {
        .match-header {
            padding: 1rem;
            background-color: $primary-color;
            color: $white-color;

            .match-info {
                margin-bottom: 0.5rem;

                .round {
                    font-weight: 600;
                    font-size: 1.1rem;
                    margin-right: 1rem;
                }

                .date,
                .time {
                    font-size: 0.9rem;
                    opacity: 0.9;
                }
            }
        }
    }

    .match-info {
        display: flex;
        gap: 1rem;
        align-items: center;

        .date {
            color: $primary-color;
            font-weight: 500;
        }

        .time {
            color: $gray-400-color;
        }

        .number {
            color: $accent-blue;
        }
    }

    .venue {
        color: $gray-400-color;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        i {
            color: $accent-orange;
        }
    }

    .match-teams {
        .team {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            border-radius: 6px;

            &.winner {
                background-color: rgba($accent-green, 0.05);

                .name {
                    color: $accent-green;
                    font-weight: 600;
                }

                .score {
                    color: $accent-green;
                }
            }

            .name {
                flex: 1;
                font-weight: 500;
            }

            .score {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 600;

                .pk {
                    font-size: 0.9rem;
                    color: $accent-orange;
                    padding: 0.2rem 0.5rem;
                    background: rgba($accent-orange, 0.1);
                    border-radius: 4px;
                }
            }

            .match-status {
                font-size: 0.9rem;
                color: $gray-400-color;
                padding: 0.2rem 0.5rem;
                background-color: rgba($gray-400-color, 0.1);
                border-radius: 4px;
            }
        }
    }
}
</style>
