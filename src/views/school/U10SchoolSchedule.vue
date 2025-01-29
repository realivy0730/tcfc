<!-- src/views/SchoolU10View.vue -->
<template>
    <div class="schedule-container">
        <h2 class="schedule-title">U10 學校組賽程</h2>

        <div v-if="isLoading" class="loading-state">
            載入賽程資料中...
        </div>

        <div v-else-if="error" class="error-message">
            {{ error }}
        </div>

        <div v-else class="schedule-content">
            <template v-for="(groupData, index) in sortedGroups" :key="index">
                <ScoreboardTable :games="groupData.games" :group="groupData.name" :stage="groupData.stage" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getU12SchoolApi } from '@/api/services/schoolGameService';
import type { GameSchedule } from '@/api/types/gameSchedule';
import ScoreboardTable from '@/components/scoreboard/ScoreboardTable.vue';

const games = ref<GameSchedule[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

/**
 * 判斷比賽階段
 * @param groupName - 組別名稱
 * @returns 比賽階段
 */
const getStageByGroupName = (groupName: string): 'group' | 'eight' | 'semi' | 'final' => {
    // 使用正則表達式判斷是否為字母組別
    if (/^[A-Z]$/.test(groupName)) return 'group';

    // 根據組別名稱判斷階段
    if (groupName.includes('強')) return 'eight';
    if (groupName.includes('四強') || groupName.includes('季殿')) return 'semi';
    if (groupName.includes('決賽')) return 'final';

    return 'group';
};

/**
 * 取得組別排序權重
 * @param groupName - 組別名稱
 * @returns 排序權重
 */
const getGroupWeight = (groupName: string): number => {
    // 字母組別權重 (A=1, B=2, ...)
    if (/^[A-Z]$/.test(groupName)) {
        return groupName.charCodeAt(0) - 64;
    }

    // 其他階段權重
    const stageWeights: Record<string, number> = {
        '十六強': 100,
        '八強': 200,
        '四強': 300,
        '季殿': 400,
        '決賽': 500
    };

    return stageWeights[groupName] || 999;
};

/**
 * 整理並排序組別資料
 */
const sortedGroups = computed(() => {
    // 依組別分組
    const groupMap = games.value.reduce((acc, game) => {
        if (!acc.has(game.group)) {
            acc.set(game.group, {
                name: game.group,
                games: [],
                stage: getStageByGroupName(game.group)
            });
        }
        acc.get(game.group).games.push(game);
        return acc;
    }, new Map());

    // 轉換為陣列並排序
    return Array.from(groupMap.values()).sort((a, b) =>
        getGroupWeight(a.name) - getGroupWeight(b.name)
    );
});

/**
 * 載入賽程資料
 */
const loadGames = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        games.value = await getU12SchoolApi();
    } catch (err) {
        error.value = '載入賽程資料失敗，請稍後再試';
        console.error('載入賽程資料失敗:', err);
    } finally {
        isLoading.value = false;
    }
};

onMounted(loadGames);
</script>

<style scoped>
.schedule-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}

.schedule-title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2rem;
}

.loading-state {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.error-message {
    text-align: center;
    padding: 2rem;
    color: #dc3545;
    background-color: #f8d7da;
    border-radius: 4px;
}

.schedule-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>
