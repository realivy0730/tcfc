// src/views/mayors-cup/2024/OpenGroupPage.vue
<template>
    <BaseTournamentPage category-name="公開組" :division-options="divisions" :game-service="gameService"
        default-division="U18" />
</template>

<script setup lang="ts">
import BaseTournamentPage from '../components/BaseTournamentPage.vue';
import { OpenGameService2024 } from '@/api/services/mayorsCup/2024/openGameService';

// 組別定義
const divisions = {
    'U18': '公開高中組',
    'U15': '公開國中組',
    'U12_BOY': '公開高年級男生組',
    'U12_GIRL': '公開高年級女生組',
    'U10_BOY': '公開中年級男生組',
    'U10_GIRL': '公開中年級女生組',
    'U8': '低年級組',
    'U6': '幼兒組'
};

// 服務實例
const gameService = {
    getScheduleByDivision: async (division: string) => {
        const service = new OpenGameService2024();
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
    }
};
</script>
