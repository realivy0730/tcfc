<template>
    <div class="schedule-viewer">
        <!-- 載入中狀態 -->
        <div v-if="isLoading" class="loading">
            <p>載入賽程表中...</p>
        </div>

        <!-- 錯誤訊息 -->
        <div v-else-if="error" class="error">
            <p>{{ error }}</p>
            <button @click="fetchAllSchedules">重新載入</button>
        </div>

        <!-- 賽程表內容 -->
        <div v-else class="schedule-content">
            <!-- 學校組賽程表 -->
            <section class="schedule-section">
                <h2>{{ competitionNames.SCHOOL }}</h2>
                <div v-for="[category, schedules] in schoolSchedules" :key="category">
                    <h3>{{ category }}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>時間</th>
                                <th>場地</th>
                                <th>組別</th>
                                <th>隊伍A</th>
                                <th>隊伍B</th>
                                <th>比分</th>
                                <th>勝方</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(schedule, index) in schedules" :key="index">
                                <td>{{ schedule.time }}</td>
                                <td>{{ schedule.court }}</td>
                                <td>{{ schedule.category }}</td>
                                <td>{{ schedule.teamA }}</td>
                                <td>{{ schedule.teamB }}</td>
                                <td>{{ schedule.score }}</td>
                                <td>{{ schedule.winner }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 公開組賽程表 -->
            <section class="schedule-section">
                <h2>{{ competitionNames.PUBLIC }}</h2>
                <div v-for="[category, schedules] in publicSchedules" :key="category">
                    <h3>{{ category }}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>時間</th>
                                <th>場地</th>
                                <th>組別</th>
                                <th>隊伍A</th>
                                <th>隊伍B</th>
                                <th>比分</th>
                                <th>勝方</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(schedule, index) in schedules" :key="index">
                                <td>{{ schedule.time }}</td>
                                <td>{{ schedule.court }}</td>
                                <td>{{ schedule.category }}</td>
                                <td>{{ schedule.teamA }}</td>
                                <td>{{ schedule.teamB }}</td>
                                <td>{{ schedule.score }}</td>
                                <td>{{ schedule.winner }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ScheduleService } from '@/services/scheduleService';
import {
    CompetitionGroup,
    Schedule
} from '@/api/types/schedule';
import { API_CONFIG } from '@/api/config';

// 定義響應式狀態
const isLoading = ref(true);
const error = ref<string | null>(null);
const schoolSchedules = ref<Map<string, Schedule[]>>(new Map());
const publicSchedules = ref<Map<string, Schedule[]>>(new Map());
const competitionNames = API_CONFIG.COMPETITION_NAMES;

/**
 * 取得所有賽程表資料
 */
const fetchAllSchedules = async () => {
    try {
        isLoading.value = true;
        error.value = null;

        // 並行取得學校組和公開組賽程表
        const [schoolData, publicData] = await Promise.all([
            ScheduleService.getAllSchedules(CompetitionGroup.SCHOOL),
            ScheduleService.getAllSchedules(CompetitionGroup.PUBLIC)
        ]);

        schoolSchedules.value = schoolData;
        publicSchedules.value = publicData;
    } catch (err) {
        error.value = '取得賽程表資料失敗，請稍後再試';
        console.error('取得賽程表失敗:', err);
    } finally {
        isLoading.value = false;
    }
};

// 元件掛載時載入資料
onMounted(() => {
    fetchAllSchedules();
});
</script>

<style scoped>
.schedule-viewer {
    padding: 20px;
}

.loading,
.error {
    text-align: center;
    padding: 20px;
}

.schedule-section {
    margin-bottom: 40px;
}

h2 {
    color: #2c3e50;
    margin-bottom: 20px;
}

h3 {
    color: #42b983;
    margin: 15px 0;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

button {
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #3aa876;
}
</style>
