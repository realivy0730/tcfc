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

    .match-info {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .venue {
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .match-teams .team {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-radius: 6px;

        .name { flex: 1; font-weight: 500; }

        .score {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            .pk {
                font-size: 0.9rem;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
            }
        }

        .match-status {
            font-size: 0.9rem;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
        }
    }

    // ── group layout（米色背景）──
    &.group {
        color: #3f4a52;

        .date   { color: #B89968; font-weight: 500; }
        .time   { color: rgba(#3f4a52, 0.45); }
        .number { color: rgba(#3f4a52, 0.6); }
        .venue  { color: rgba(#3f4a52, 0.45); i { color: rgba(#3f4a52, 0.4); } }

        .match-teams .team {
            &.winner {
                .name  { font-weight: 700; }
                .score { font-weight: 700; }
            }
            &:not(.winner) {
                .name  { color: rgba(#3f4a52, 0.4); }
                .score { color: rgba(#3f4a52, 0.4); }
            }
            .score .pk {
                color: rgba(#3f4a52, 0.6);
                background: rgba(#3f4a52, 0.08);
            }
            .match-status {
                color: rgba(#3f4a52, 0.4);
                background: rgba(#3f4a52, 0.06);
            }
        }
    }

    // ── knockout layout（深色背景）──
    &.knockout {
        color: #fff;

        .match-header {
            padding: 1rem;
            background-color: $primary-color;
            .round { font-weight: 600; font-size: 1.1rem; margin-right: 1rem; }
            .date, .time { font-size: 0.9rem; opacity: 0.9; }
        }

        .date   { color: #F1C40F; font-weight: 500; }
        .time   { color: rgba(#fff, 0.5); }
        .number { color: $accent-blue; }
        .venue  { color: rgba(#fff, 0.5); i { color: $accent-orange; } }

        .match-teams .team {
            &.winner {
                background: rgba($accent-green, 0.05);
                .name  { color: $accent-green; font-weight: 600; }
                .score { color: $accent-green; }
            }
            .score .pk {
                color: $accent-orange;
                background: rgba($accent-orange, 0.1);
            }
            .match-status {
                color: rgba(#fff, 0.4);
                background: rgba(#fff, 0.08);
            }
        }
    }
}
</style>
