<!-- src/views/mayors-cup/components/KnockoutBracket.vue -->
<template>
  <div class="bracket-wrapper">
    <!-- 橫向線圖 -->
    <div class="bracket-scroll">
      <div class="bracket-columns">
        <template v-for="round in mainRounds" :key="round.key">
          <div v-if="rounds[round.key]?.length" class="bracket-col" :class="`col-${round.key}`">
            <div class="col-header">{{ round.label }}</div>
            <div class="col-matches" :style="{ '--match-count': rounds[round.key].length }">
              <div
                v-for="m in rounds[round.key]"
                :key="m.gameNumber"
                class="bracket-match"
                :class="{ 'has-connector': round.key !== 'F' && round.key !== '3rd' }"
              >
                <BracketTeam :team="m.homeTeam" :score="m.homeScore" :pk="m.homePK" :winner="isWinner(m,'home')" />
                <BracketTeam :team="m.awayTeam" :score="m.awayScore" :pk="m.awayPK" :winner="isWinner(m,'away')" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue';
import type { GameSchedule } from '@/api/types/gameSchedule';

const props = defineProps<{ knockoutMatches: GameSchedule[] }>();

const mainRounds = [
  { key: 'R32', label: '三十二強' },
  { key: 'R16', label: '十六強' },
  { key: 'QF',  label: '八強' },
  { key: 'SF',  label: '四強' },
  { key: '3rd', label: '🥉 季殿軍' },
  { key: 'F',   label: '🏆 冠亞軍' },
];

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
.bracket-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 橫向捲動容器 */
.bracket-scroll {
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.bracket-columns {
  display: flex;
  gap: 0;
  min-width: max-content;
  align-items: center;
}

/* 每一輪的欄位 */
.bracket-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 180px;

  .col-header {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.3rem 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    white-space: nowrap;
  }

  &.col-F .col-header   { background: rgba(#F1C40F, 0.15); color: #F1C40F; border: 1px solid rgba(#F1C40F, 0.4); }
  &.col-3rd .col-header { background: rgba(#95a5a6, 0.15); color: #bdc3c7; border: 1px solid rgba(#95a5a6, 0.4); }
  &.col-SF .col-header  { background: rgba(#3498db, 0.15); color: #5dade2; border: 1px solid rgba(#3498db, 0.4); }
  &.col-QF .col-header  { background: rgba(#2ecc71, 0.15); color: #58d68d; border: 1px solid rgba(#2ecc71, 0.4); }
  &.col-R16 .col-header,
  &.col-R32 .col-header { background: rgba(#fff, 0.05); color: rgba(#fff, 0.6); border: 1px solid rgba(#fff, 0.15); }

  .col-matches {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    /* 高度根據場次數量自動撐開 */
    gap: calc(var(--match-count, 1) * 0.5rem + 1rem);
  }
}

/* 場次卡片 + 連接線 */
.bracket-match {
  position: relative;
  background: #111;
  border: 1px solid rgba(#fff, 0.1);
  border-radius: 6px;
  overflow: hidden;
  width: 160px;
  margin: 0 auto;

  /* 右側連接線（往下一輪） */
  &.has-connector::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 50%;
    width: 20px;
    height: 1px;
    background: rgba(#fff, 0.25);
  }
}

/* 欄位之間的間距（留給連接線） */
.bracket-col:not(:last-child) {
  margin-right: 20px;
}

/* 隊伍行 */
.bracket-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid rgba(#fff, 0.06);
  color: rgba(#fff, 0.7);

  &:last-child { border-bottom: none; }

  &.winner {
    background: rgba(#2ecc71, 0.08);
    color: #2ecc71;
    font-weight: 600;
  }

  .team-name {
    flex: 1;
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
  }

  .team-score {
    font-weight: 700;
    font-size: 0.95rem;
    min-width: 1.5rem;
    text-align: right;
    flex-shrink: 0;

    &.pending { color: rgba(#fff, 0.25); }

    .pk {
      font-size: 0.7rem;
      color: #e67e22;
      margin-left: 0.2rem;
    }
  }
}


</style>
