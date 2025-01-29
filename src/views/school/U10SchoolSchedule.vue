<template>
    <div class="u10-school-schedule">
        <h1 class="page-title">{{ sheetInfo.displayName }} ({{ sheetInfo.ageGroup }})</h1>

        <!-- 載入中狀態 -->
        <div v-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>載入中...</p>
        </div>

        <!-- 錯誤訊息 -->
        <div v-else-if="error" class="error-message">
            {{ error }}
        </div>

        <!-- 賽程表 -->
        <div v-else class="schedule-table-container">
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>日期</th>
                        <th>場次</th>
                        <th>組別</th>
                        <th>時間</th>
                        <th>主場球隊</th>
                        <th>主場PK</th>
                        <th>主場比分</th>
                        <th>客場比分</th>
                        <th>客場PK</th>
                        <th>客場球隊</th>
                        <th>比賽場地</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in scheduleData" :key="game.gameNumber">
                        <td>{{ game.date }}</td>
                        <td>{{ game.gameNumber }}</td>
                        <td>{{ game.group }}</td>
                        <td>{{ game.time }}</td>
                        <td>{{ game.homeTeam }}</td>
                        <td>{{ game.homePK }}</td>
                        <td>{{ game.homeScore }}</td>
                        <td>{{ game.awayScore }}</td>
                        <td>{{ game.awayPK }}</td>
                        <td>{{ game.awayTeam }}</td>
                        <td>{{ game.venue }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getU10SchoolApi } from '@/api/services/schoolGameService';
import type { GameSchedule } from '@/api/types/gameSchedule';
import { SHEET_INFO } from '@/api/config/sheetConfig';

// 響應式狀態
const scheduleData = ref<GameSchedule[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// 使用正確的 SheetInfo 物件
const sheetInfo = SHEET_INFO.U10_SCHOOL;

// 載入資料方法
const loadScheduleData = async () => {
    try {
        isLoading.value = true;
        scheduleData.value = await getU10SchoolApi();
    } catch (err) {
        error.value = '載入賽程表時發生錯誤，請稍後再試';
        console.error('載入賽程表錯誤:', err);
    } finally {
        isLoading.value = false;
    }
};

// 組件掛載時載入資料
onMounted(() => {
    loadScheduleData();
});
</script>

<style scoped>
.u10-school-schedule {
    padding: 20px;
}

.page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.error-message {
    color: #dc3545;
    text-align: center;
    padding: 20px;
    background-color: #f8d7da;
    border-radius: 4px;
    margin: 20px 0;
}

.schedule-table-container {
    overflow-x: auto;
}

.schedule-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1000px;
}

.schedule-table th,
.schedule-table td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
}

.schedule-table th {
    background-color: #f8f9fa;
    font-weight: bold;
    white-space: nowrap;
}

.schedule-table tr:nth-child(even) {
    background-color: #f8f9fa;
}

.schedule-table tr:hover {
    background-color: #f2f2f2;
}

@media (max-width: 768px) {
    .page-title {
        font-size: 20px;
    }

    .schedule-table-container {
        margin: 0 -20px;
        padding: 0 20px;
    }
}
</style>
