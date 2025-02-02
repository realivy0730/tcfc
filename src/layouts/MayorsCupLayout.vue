# src/layouts/MayorsCupLayout.vue
<template>
  <div class="mayors-cup-layout">
    <!-- 使用現有的 Header 組件 -->
    <Header />

    <!-- 年度選擇導航 -->
    <nav class="year-navigation">
      <div class="container">
        <div class="year-selector">
          <router-link
            v-for="year in ['2024', '2025']"
            :key="year"
            :to="`/mayors-cup/${year}`"
            :class="{ active: currentYear === year }"
            class="year-link"
          >
            {{ year }}年度賽事
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 主要內容區 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()

const currentYear = computed(() => {
  const pathParts = route.path.split('/')
  const yearIndex = pathParts.indexOf('mayors-cup') + 1
  return pathParts[yearIndex] || '2024'
})
</script>

<style lang="scss" scoped>
.mayors-cup-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .year-navigation {
    background: $white-color;
    border-bottom: 1px solid rgba($primary-color, 0.1);
    position: fixed;
    width: 100%;
    top: 72px;
    z-index: 900;
    padding: 0.5rem 0;

    .container {
      max-width: $container-width;
      margin: 0 auto;
      padding: 0 $spacing-unit;
    }

    .year-selector {
      display: flex;
      gap: 1rem;
      justify-content: center;

      .year-link {
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        color: $gray-400-color;
        text-decoration: none;
        transition: all 0.3s ease;
        font-weight: 500;

        &:hover {
          color: $primary-color;
        }

        &.active {
          background-color: $primary-color;
          color: $white-color;
        }
      }
    }

    @media (max-width: $mobile-width) {
      top: 43px;
      padding: 0.3rem 0;

      .year-selector .year-link {
        padding: 0.3rem 1rem;
        font-size: 0.9rem;
      }
    }
  }

  .main-content {
    margin-top: 132px; // 72px header + 60px year navigation
    flex: 1;

    @media (max-width: $mobile-width) {
      margin-top: 83px; // 43px header + 40px year navigation
    }
  }
}
</style>
