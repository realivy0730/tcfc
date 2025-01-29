<!-- src/components/scoreboard/GameDetails.vue -->
<template>
    <div class="game-details">
      <div v-for="game in games" :key="game.gameNumber" class="game-item">
        <div class="game-date">{{ game.date }} {{ game.time }}</div>
        <div class="game-score">
          <span>{{ game.homeTeam }}</span>
          <span class="score">{{ getDisplayScore(game) }}</span>
          <span>{{ game.awayTeam }}</span>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import type { GameSchedule } from '@/api/types/gameSchedule';

  interface Props {
    games: GameSchedule[];
  }

  defineProps<Props>();

  const getDisplayScore = (game: GameSchedule): string => {
    if (game.homeScore === game.awayScore && game.homePK && game.awayPK) {
      return `${game.homeScore}:${game.awayScore} (PK ${game.homePK}:${game.awayPK})`;
    }
    return `${game.homeScore}:${game.awayScore}`;
  };
  </script>

  <style scoped>
  .game-details {
    margin-top: 10px;
    padding: 10px;
    background-color: #f9f9f9;
  }

  .game-item {
    margin-bottom: 10px;
    padding: 5px;
    border-bottom: 1px solid #eee;
  }

  .game-date {
    font-size: 0.9em;
    color: #666;
  }

  .game-score {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
  }

  .score {
    font-weight: bold;
  }
  </style>
