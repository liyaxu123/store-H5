import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '主页',
        },
      },
      {
        path: 'discover',
        name: 'Discover',
        component: () => import('@/views/discover/index.vue'),
        meta: {
          title: '发现',
        },
      },
      {
        path: 'shoppingCar',
        name: 'ShoppingCar',
        component: () => import('@/views/shoppingCar/index.vue'),
        meta: {
          title: '购物车',
        },
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/my/index.vue'),
        meta: {
          title: '我的',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string
    noCache?: boolean
  }
}

// 路由前置守卫
router.beforeEach((to: toRouteType, from, next) => {
  next()
})

export default router
