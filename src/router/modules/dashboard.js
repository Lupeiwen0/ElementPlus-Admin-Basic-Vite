import RouteTransition from '@/layout/RouteTransition.vue'

const routeName = 'dashboard'

const routes = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard-view',
    component: RouteTransition,
    meta: {
      title: '首页',
      icon: 'dashboard',
      permission: ['dashboard'],
    },
    children: [
      {
        path: '/dashboard-view',
        name: `${routeName}-view`,
        meta: {
          title: '首页',
          permission: ['dashboard'],
          keepAlive: true,
        },
        component: () => import('@/views/dashboard/dashboard.vue')
      }
    ]
  }
]

export default routes