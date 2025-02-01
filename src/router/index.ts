// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Index.vue'),
        meta: {
            title: '首頁'
        }
    },
    // 學校組路由
    {
        path: '/school/u10',
        name: 'SchoolU10Schedule',
        component: () => import('@/views/school/U10SchoolSchedule.vue'),
        meta: { title: '學校中年級賽程表' }
    }
   {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: {
            title: '頁面不存在'
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const title = to.meta.title as string;
    if (title) {
        document.title = `${title} - TCFC`;
    }
    next();
});

export default router;
