import { createRouter, createWebHistory } from 'vue-router'

// 路由配置
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Index.vue'),
        meta: {
            title: '首頁'
        }
    },
    {
        path: '/score',
        name: 'Score',
        component: () => import('@/views/Score.vue'),
        meta: {
            title: '計分板'
        }
    },
    {
        path: '/u10',
        name: 'U10',
        component: () => import('@/views/U10.vue'),
        meta: {
            title: 'U10賽程'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: {
            title: '頁面不存在'
        }
    }
]

// 建立路由實例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守衛：動態修改頁面標題
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - TCFC` || 'TCFC'
    next()
})

export default router
