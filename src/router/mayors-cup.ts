// src/router/mayors-cup.ts
import type { RouteRecordRaw } from 'vue-router';

/**
 * 市長盃路由設定
 * @description 包含所有市長盃相關的路由配置
 */
export const mayorsCupRoutes: RouteRecordRaw[] = [
  {
    path: '/mayors-cup',
    component: () => import('@/layouts/MayorsCupLayout.vue'),
    children: [
      // 2024 年度路由
      {
        path: '2024',
        component: () => import('@/views/mayors-cup/2024/WelcomePage.vue'),
        meta: {
          title: '2024年度市長盃',
          year: '2024'
        }
      },
    //   {
    //     path: '2024/open',
    //     component: () => import('@/views/mayors-cup/2024/OpenGroupPage.vue'),
    //     meta: {
    //       title: '2024年度市長盃公開組',
    //       year: '2024',
    //       category: 'open'
    //     }
    //   },
    //   {
    //     path: '2024/school',
    //     component: () => import('@/views/mayors-cup/2024/SchoolGroupPage.vue'),
    //     meta: {
    //       title: '2024年度市長盃學校組',
    //       year: '2024',
    //       category: 'school'
    //     }
    //   },
      // 2025 年度路由
      {
        path: '2025',
        component: () => import('@/views/mayors-cup/2025/WelcomePage.vue'),
        meta: {
          title: '2025年度市長盃',
          year: '2025'
        }
      },
    //   {
    //     path: '2025/open',
    //     component: () => import('@/views/mayors-cup/2025/OpenGroupPage.vue'),
    //     meta: {
    //       title: '2025年度市長盃公開組',
    //       year: '2025',
    //       category: 'open'
    //     }
    //   },
    //   {
    //     path: '2025/school',
    //     component: () => import('@/views/mayors-cup/2025/SchoolGroupPage.vue'),
    //     meta: {
    //       title: '2025年度市長盃學校組',
    //       year: '2025',
    //       category: 'school'
    //     }
    //   }
    ]
  }
];
