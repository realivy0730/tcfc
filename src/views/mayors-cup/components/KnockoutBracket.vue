<!-- src/views/mayors-cup/components/KnockoutBracket.vue -->
<template>
  <div class="bracket-wrapper">
    <!-- 桌面版：橫向 -->
    <div class="bracket-scroll desktop-bracket">
      <div class="bracket-columns">
        <template v-for="round in mainRounds" :key="round.key">
          <div v-if="rounds[round.key]?.length" class="bracket-col" :class="`col-${round.key}`">
            <div class="col-header">{{ round.label }}</div>
            <div class="col-matches" :style="{ '--match-count': rounds[round.key].length }">
              <div
                v-for="m in rounds[round.key]"
                :key="m.gameNumber"
                class="bracket-match"
                :class="{ 'has-connector': round.key !== 'FINAL' && round.key !== '3rd' }"
              >
                <BracketTeam :team="m.homeTeam" :score="m.homeScore" :pk="m.homePK" :winner="isWinner(m,'home')" :medal="medalClass(m,'home')" />
                <BracketTeam :team="m.awayTeam" :score="m.awayScore" :pk="m.awayPK" :winner="isWinner(m,'away')" :medal="medalClass(m,'away')" />
                <div class="match-meta">
                  <span>📅 {{ m.date.slice(5) }}</span>
                  <span>⏰ {{ m.time }}</span>
                  <span>📍 {{ m.venue }}</span>
                  <span>#{{ m.gameNumber }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 手機版：直式，冠亞軍在最上 -->
    <div class="mobile-bracket">
      <div v-for="round in mobileRounds" :key="round.key" class="mobile-round" :class="`col-${round.key}`">
        <div class="col-header">{{ round.label }}</div>
        <div class="mobile-matches">
          <div v-for="m in rounds[round.key]" :key="m.gameNumber" class="bracket-match">
            <BracketTeam :team="m.homeTeam" :score="m.homeScore" :pk="m.homePK" :winner="isWinner(m,'home')" :medal="medalClass(m,'home')" />
            <BracketTeam :team="m.awayTeam" :score="m.awayScore" :pk="m.awayPK" :winner="isWinner(m,'away')" :medal="medalClass(m,'away')" />
            <div class="match-meta">
              <span>📅 {{ m.date.slice(5) }}</span>
              <span>⏰ {{ m.time }}</span>
              <span>📍 {{ m.venue }}</span>
              <span>#{{ m.gameNumber }}</span>
            </div>
          </div>
        </div>
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
  { key: '3rd',   label: '🥉 季殿軍' },
  { key: 'FINAL', label: '🏆 冠亞軍' },
];

const rounds = computed(() => {
  const r: Record<string, GameSchedule[]> = {};
  for (const m of props.knockoutMatches) {
    if (!r[m.group]) r[m.group] = [];
    r[m.group].push(m);
  }
  return r;
});

// 手機版直式：FINAL 在最上，依序反轉
const mobileRounds = computed(() =>
  [...mainRounds].reverse().filter(r => rounds.value[r.key]?.length)
);

const isWinner = (m: GameSchedule, side: 'home' | 'away') => {
  if (m.homeScore === '' || m.awayScore === '') return false;
  const h = parseInt(m.homeScore), a = parseInt(m.awayScore);
  if (h !== a) return side === 'home' ? h > a : a > h;
  if (m.homePK && m.awayPK) return side === 'home' ? m.homePK > m.awayPK : m.awayPK > m.homePK;
  return false;
};

const medalClass = (m: GameSchedule, side: 'home' | 'away'): string => {
  if (!(['FINAL', '3rd'].includes(m.group))) return '';
  const won = isWinner(m, side);
  if (m.group === '3rd') return won ? 'bronze' : '';
  return won ? 'gold' : 'silver';
};

const medalColor: Record<string, string> = { gold: '#B89968', silver: '#bdc3c7', bronze: '#cd7f32' };

const BracketTeam = defineComponent({
  props: { team: String, score: String, pk: Number, winner: Boolean, medal: String },
  setup(p) {
    return () => h('div', { class: ['bracket-team', p.winner && 'winner'] }, [
      p.medal ? h('i', { class: ['fas', 'fa-medal', 'medal-icon'], style: { color: medalColor[p.medal], fontSize: '0.8rem', flexShrink: '0' } }) : null,
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

/* ── 桌面版 ── */
.desktop-bracket {
  overflow-x: auto;
  padding-bottom: 0.5rem;
  @media (max-width: 768px) { display: none; }
}

.bracket-columns {
  display: flex;
  gap: 0;
  width: 100%;
  align-items: center;
}

.bracket-col {
  flex: 1;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .col-header {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 0.3rem 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    white-space: nowrap;
  }

  &.col-FINAL .col-header,
  &.col-F .col-header   { background: rgba(#B89968, 0.12); color: #B89968; border: 1px solid rgba(#B89968, 0.35); }
  &.col-3rd .col-header { background: rgba(#B89968, 0.06); color: rgba(#B89968, 0.7); border: 1px solid rgba(#B89968, 0.2); }
  &.col-SF .col-header  { background: rgba(#3f4a52, 0.06); color: rgba(#3f4a52, 0.6); border: 1px solid rgba(#3f4a52, 0.15); }
  &.col-QF .col-header  { background: rgba(#3f4a52, 0.06); color: rgba(#3f4a52, 0.6); border: 1px solid rgba(#3f4a52, 0.15); }
  &.col-R16 .col-header,
  &.col-R32 .col-header { background: rgba(#3f4a52, 0.04); color: rgba(#3f4a52, 0.45); border: 1px solid rgba(#3f4a52, 0.1); }

  .col-matches {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    gap: calc(var(--match-count, 1) * 0.5rem + 1rem);
  }
}

.bracket-col:not(:last-child) { margin-right: 20px; }

/* ── 手機版 ── */
.mobile-bracket {
  display: none;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) { display: flex; }
}

.mobile-round {
  .col-header {
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.4rem 0.75rem;
    border-radius: 4px;
    margin-bottom: 0.75rem;
    display: inline-block;
  }

  &.col-FINAL .col-header,
  &.col-F .col-header   { background: rgba(#B89968, 0.12); color: #B89968; border: 1px solid rgba(#B89968, 0.35); }
  &.col-3rd .col-header { background: rgba(#B89968, 0.06); color: rgba(#B89968, 0.7); border: 1px solid rgba(#B89968, 0.2); }
  &.col-SF .col-header  { background: rgba(#3f4a52, 0.06); color: rgba(#3f4a52, 0.6); border: 1px solid rgba(#3f4a52, 0.15); }
  &.col-QF .col-header  { background: rgba(#3f4a52, 0.06); color: rgba(#3f4a52, 0.6); border: 1px solid rgba(#3f4a52, 0.15); }
  &.col-R16 .col-header,
  &.col-R32 .col-header { background: rgba(#3f4a52, 0.04); color: rgba(#3f4a52, 0.45); border: 1px solid rgba(#3f4a52, 0.1); }

  .mobile-matches {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
}

/* ── 共用：場次卡片 ── */
.bracket-match {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(#3f4a52, 0.08);
  border-top: 3px solid #B89968;
  border-radius: 6px;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
  transition: transform 0.3s ease;

  &:hover { transform: translateY(-4px); }

  &.has-connector::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 50%;
    width: 20px;
    height: 1px;
    background: rgba(#3f4a52, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
  }
}

/* ── 共用：隊伍行 ── */
.bracket-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid rgba(#3f4a52, 0.06);
  color: #3f4a52;
  gap: 0.4rem;

  &:last-child { border-bottom: none; }

  &.winner {
    .team-name { font-weight: 700; }
    .team-score { font-weight: 700; }
  }

  &:not(.winner) {
    .team-name { color: rgba(#3f4a52, 0.4); }
    .team-score { color: rgba(#3f4a52, 0.4); }
  }

  .team-name {
    flex: 1;
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .team-score {
    font-weight: 600;
    font-size: 0.95rem;
    min-width: 1.5rem;
    text-align: right;
    flex-shrink: 0;

    &.pending { color: rgba(#3f4a52, 0.25); }

    .pk {
      font-size: 0.7rem;
      color: rgba(#3f4a52, 0.5);
      margin-left: 0.2rem;
    }
  }
}
/* ── match-meta ── */
.match-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.6rem;
  padding: 0.35rem 0.75rem;
  background: #f5f0e8;
  border-top: 1px solid rgba(#3f4a52, 0.06);
  font-size: 0.7rem;
  color: rgba(#3f4a52, 0.45);
}
</style>
