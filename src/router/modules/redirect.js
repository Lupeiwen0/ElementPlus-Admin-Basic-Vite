import RouteTransition from '@/layout/RouteTransition.vue'

const routeName = 'Redirect'

const routes = [
  {
    path: '/redirect/:path*',
    name: routeName,
    hidden: true,
    component: RouteTransition,
    meta: {
      title: '刷新'
    },
    children: [
      {
        path: '',
        name: `${routeName}-view`,
        hidden: true,
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }
]

export default routes