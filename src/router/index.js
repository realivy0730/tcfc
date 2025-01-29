
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Index.vue'),
            meta: {
                title: '首頁'
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/views/NotFound.vue'),
            meta: {
                title: '頁面不存在'
            }
        },
        // 學校組路由
        {
            path: '/school/u10',
            name: 'SchoolU10Schedule',
            component: () => import('@/views/school/U10SchoolSchedule.vue'),
            meta: { title: '學校中年級賽程表' }
        },
        // {
        //     path: '/school/u12',
        //     name: 'SchoolU12Schedule',
        //     component: () => import('@/views/school/U12SchoolSchedule.vue'),
        //     meta: { title: '學校高年級賽程表' }
        // },
        // {
        //     path: '/school/u15',
        //     name: 'SchoolU15Schedule',
        //     component: () => import('@/views/school/U15SchoolSchedule.vue'),
        //     meta: { title: '學校國中組賽程表' }
        // },

        // 公開組路由
        // {
        //     path: '/public/u6',
        //     name: 'PublicU6Schedule',
        //     component: () => import('@/views/public/U6PublicSchedule.vue'),
        //     meta: { title: '幼兒組賽程表' }
        // },
        // {
        //     path: '/public/u8',
        //     name: 'PublicU8Schedule',
        //     component: () => import('@/views/public/U8PublicSchedule.vue'),
        //     meta: { title: '低年級組賽程表' }
        // },
        // {
        //     path: '/public/u10-boy',
        //     name: 'PublicU10BoySchedule',
        //     component: () => import('@/views/public/U10PublicBoySchedule.vue'),
        //     meta: { title: '中年級男生組賽程表' }
        // },
        // {
        //     path: '/public/u10-girl',
        //     name: 'PublicU10GirlSchedule',
        //     component: () => import('@/views/public/U10PublicGirlSchedule.vue'),
        //     meta: { title: '中年級女生組賽程表' }
        // },
        // {
        //     path: '/public/u12-boy',
        //     name: 'PublicU12BoySchedule',
        //     component: () => import('@/views/public/U12PublicBoySchedule.vue'),
        //     meta: { title: '高年級男生組賽程表' }
        // },
        // {
        //     path: '/public/u12-girl',
        //     name: 'PublicU12GirlSchedule',
        //     component: () => import('@/views/public/U12PublicGirlSchedule.vue'),
        //     meta: { title: '高年級女生組賽程表' }
        // },
        // {
        //     path: '/public/u15',
        //     name: 'PublicU15Schedule',
        //     component: () => import('@/views/public/U15PublicSchedule.vue'),
        //     meta: { title: '公開國中組賽程表' }
        // },
        // {
        //     path: '/public/u18',
        //     name: 'PublicU18Schedule',
        //     component: () => import('@/views/public/U18PublicSchedule.vue'),
        //     meta: { title: '公開高中組賽程表' }
        // }
    ]
});
router.beforeEach((to, from, next) => {
    // 設定網頁標題
    const title = to.meta.title;
    if (title) {
        document.title = `${to.meta.title} - TCFC` || 'TCFC'
    }
    next();
});


export default router;


