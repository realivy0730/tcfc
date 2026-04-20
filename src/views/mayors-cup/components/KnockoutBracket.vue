<!-- src/views/mayors-cup/components/KnockoutBracket.vue -->
<template>
  <div class="knockout-bracket">
    <!-- SF 四強 -->
    <div v-if="rounds.SF?.length" class="round">
      <h3 class="round-title">四強</h3>
      <div class="matches">
        <div v-for="m in rounds.SF" :key="m.gameNumber" class="bracket-match">
          <BracketTeam :team="m.homeTeam" :score="m.homeScore" :pk="m.homePK" :winner="isWinner(m,'home')" />
          <BracketTeam :team="m.awayTeam" :score="m.awayScore" :pk="m.awayPK" :winner="isWinner(m,'away')" />
        </div>
      </div>
    </div>

    <!-- 3rd 季殿軍 -->
    <div v-if="rounds['3rd']?.length" class="round">
      <h3 class="round-title">季殿軍</h3>
      <div class="matches">
        <div v-for="m in rounds['3rd']" :key="m.gameNumber" class="bracket-match">
          <BracketTeam :team="m.homeTeam" :score="m.homeScore" :pk="m.homePK" :winner="isWinner(m,'home')" />
          <BracketTeam :team="m.awayTeam" :score="m.awayScore" :pk="m.awayPK" :winner="isWinner(m,'away')" />
        </div>
      </div>
    </div>

    <!-- F 決賽 -->
    <div v-if="rounds.F?.length" class="round">
      <h3 class="round-title">決賽</h3>
      <div class="matches">
        <div v-for="m in rounds.F" :key="m.gameNumber" class="bracket-match">
          <BracketTeam :team="m.homeTeam" :score="m.homeScore" :pk="m.homePK" :winner="isWinner(m,'home')" />
          <BracketTeam :team="m.awayTeam" :score="m.awayScore" :pk="m.awayPK" :winner="isWinner(m,'away')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue';
import type { GameSchedule } from '@/api/types/gameSchedule';

const props = defineProps<{ knockoutMatches: GameSchedule[] }>();

// 依 group 分層
const rounds = computed(() => {
  const r: Record<string, GameSchedule[]> = {};
  for (const m of props.knockoutMatches) {
    if (!r[m.group]) r[m.group] = [];
    r[m.group].push(m);
  }
  return r;
});

const isWinner = (m: GameSchedule, side: 'home' | 'away') => {
  if (m.homeScore === '' || m.awayScore === '') return false;
  const h = parseInt(m.homeScore), a = parseInt(m.awayScore);
  if (h !== a) return side === 'home' ? h > a : a > h;
  if (m.homePK && m.awayPK) return side === 'home' ? m.homePK > m.awayPK : m.awayPK > m.homePK;
  return false;
};

// 內嵌小元件：單一隊伍行
const BracketTeam = defineComponent({
  props: { team: String, score: String, pk: Number, winner: Boolean },
  setup(p) {
    return () => h('div', { class: ['bracket-team', p.winner && 'winner'] }, [
      h('span', { class: 'team-name' }, p.team),
      p.score !== ''
        ? h('span', { class: 'team-score' }, [
            p.score,
            p.pk ? h('span', { class: 'pk' }, `(${p.pk})`) : null
          ])
        : h('span', { class: 'team-score pending' }, '-')
    ]);
  }
});
</script>

<style lang="scss" scoped>
.knockout-bracket {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;

  @media (max-width: $mobile-width) {
    flex-direction: column;
  }

  .round {
    flex: 1;
    min-width: 200px;

    .round-title {
      text-align: center;
      color: #F1C40F;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(#F1C40F, 0.3);
    }

    .matches {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: center;
      height: calc(100% - 3rem);
    }
  }

  .bracket-match {
    background: #111;
    border: 1px solid rgba(#fff, 0.1);
    border-radius: 6px;
    overflow: hidden;
  }

  .bracket-team {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid rgba(#fff, 0.06);
    color: rgba(#fff, 0.7);

    &:last-child { border-bottom: none; }

    &.winner {
      background: rgba(#2ecc71, 0.08);
      color: #2ecc71;
      font-weight: 600;
    }

    .team-name { flex: 1; font-size: 0.9rem; }

    .team-score {
      font-weight: 700;
      font-size: 1rem;
      min-width: 1.5rem;
      text-align: right;

      &.pending { color: rgba(#fff, 0.25); }

      .pk {
        font-size: 0.75rem;
        color: #e67e22;
        margin-left: 0.25rem;
      }
    }
  }
}
</style>
