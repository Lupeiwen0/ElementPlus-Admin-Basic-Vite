import RouteTransition from '@/layout/RouteTransition.vue'

const routeName = 'Redirect'

const routes = [
  {
    path: '/redirect/:path*',
    name: routeName,
    component: RouteTransition,
    meta: {
      title: '刷新',
      hidden: true,
    },
    children: [
      {
        path: '',
        name: `${routeName}-view`,
        meta: {
          hidden: true,
        },
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }
]

export default routes