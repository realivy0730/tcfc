// src/views/mayors-cup/2025/SchoolGroupPage.vue
<template>
    <BaseTournamentPage category-name="學校組" :division-options="divisions" :game-service="gameService"
        default-division="U15" />
</template>

<script setup lang="ts">
import BaseTournamentPage from '../components/BaseTournamentPage.vue';
import { SchoolGameService2025 } from '@/api/services/mayorsCup/2025/schoolGameService';

const divisions = {
    'U15': '學校國中組',
    'U12': '學校高年級組',
    'U10': '學校中年級組'
};

const gameService = {
    getScheduleByDivision: async (division: string) => {
        const service = new SchoolGameService2025();
        switch (division) {
            case 'U15': return await service.getU15Schedule();
            case 'U12': return await service.getU12Schedule();
            case 'U10': return await service.getU10Schedule();
            default: return [];
        }
    }
};
</script>
