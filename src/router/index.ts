import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
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
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/detail/index.vue'),
        meta: {
          title: '商品详情',
          goBack: true,
          hideTabBar: true,
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
        path: 'confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('@/views/confirmOrder/index.vue'),
        meta: {
          title: '订单结算',
          goBack: true,
          hideTabBar: true,
        },
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/order/index.vue'),
        meta: {
          title: '我的订单',
          goBack: true,
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
      {
        path: 'collect',
        name: 'Collect',
        component: () => import('@/views/collect/index.vue'),
        meta: {
          title: '我的收藏',
          goBack: true,
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
