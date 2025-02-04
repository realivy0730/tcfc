# src/views/mayors-cup/2025/WelcomePage.vue
<template>
  <div class="welcome-page">
    <section class="hero">
      <div class="hero-content">
        <h1>114年度 - 臺中市市長盃足球錦標賽(2025)</h1>
        <p>賽事籌備中，敬請期待</p>
      </div>
    </section>

    <div class="preparation-section">
      <div class="container">
        <div class="preparation-content">
          <div class="status-icon">
            <i class="fas fa-futbol"></i>
          </div>
          <h2>活動籌備中</h2>
          <p>2025年度賽事規劃進行中，將為您帶來更精彩的賽事</p>

          <div class="timeline">
            <div class="timeline-item">
              <div class="time-point"></div>
              <div class="content">
                <h4>2024 Q4</h4>
                <div class="item-content">
                  <h5>賽制公告</h5>
                  <p>公布各組別賽制規則</p>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="time-point"></div>
              <div class="content">
                <h4>2025 Q1</h4>
                <div class="item-content">
                  <h5>開放報名</h5>
                  <p>各組別開始接受報名</p>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="time-point"></div>
              <div class="content">
                <h4>2025 Q2</h4>
                <div class="item-content">
                  <h5>正式開賽</h5>
                  <p>各組別陸續展開賽事</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style lang="scss" scoped>
.welcome-page {
  .hero {
    height: 60vh;
    background: linear-gradient(45deg, $primary-color, $accent-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: $white-color;

    &-content {
      z-index: 1;
      padding: 0 $spacing-unit;

      h1 {
        font-size: 3rem;
        margin-bottom: 1.5rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        @media (max-width: $mobile-width) {
          font-size: 2rem;
        }
      }

      p {
        font-size: 1.5rem;
        opacity: 0.9;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

        @media (max-width: $mobile-width) {
          font-size: 1.2rem;
        }
      }
    }
  }

  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-unit;
  }

  .preparation-section {
    padding: 4rem 0;
    background-color: $bg-color;

    .preparation-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;

      .status-icon {
        width: 100px;
        height: 100px;
        margin: 0 auto 2rem;
        background: $white-color;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        i {
          font-size: 3rem;
          color: $accent-orange;
        }
      }

      h2 {
        color: $primary-color;
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      p {
        color: $gray-400-color;
        font-size: 1.2rem;
        margin-bottom: 4rem;
      }
    }

    .timeline {
      position: relative;
      padding: 2rem 0;

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 100%;
        background-color: $accent-blue;

        @media (max-width: $mobile-width) {
          left: 20px;
        }
      }

      .timeline-item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 3rem;
        position: relative;

        @media (max-width: $mobile-width) {
          justify-content: flex-start;
          margin-left: 20px;
        }

        .time-point {
          width: 16px;
          height: 16px;
          background-color: $accent-orange;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;

          @media (max-width: $mobile-width) {
            left: 20px;
          }
        }

        .content {
          width: 300px;
          background: $white-color;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-left: 3rem;

          h4 {
            color: $accent-blue;
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }

          .item-content {
            h5 {
              color: $primary-color;
              margin-bottom: 0.5rem;
            }

            p {
              color: $gray-400-color;
              font-size: 0.9rem;
              margin-bottom: 0;
            }
          }
        }

        &:nth-child(odd) {
          .content {
            margin-left: 0;
            margin-right: 3rem;
            text-align: right;

            @media (max-width: $mobile-width) {
              margin-left: 3rem;
              margin-right: 0;
              text-align: left;
            }
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
