import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouterGuards } from './router-guards'

import common from './common'

export const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    meta: { title: '首页' },
    component: () => import('@/layout/BasicLayout.vue'),
    children: common
  }
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes
})


export function setupRouter (app) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}
export default router
