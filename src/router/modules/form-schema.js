import RouteTransition from '@/layout/RouteTransition.vue'

const routeName = 'form-schema'

const routes = [
  {
    path: '/form-schema',
    name: routeName,
    redirect: '/form-schema-view',
    component: RouteTransition,
    meta: {
      title: '表单',
      icon: 'form',
      permission: ['dashboard'],
    },
    children: [
      {
        path: '/form-schema-view',
        name: `${routeName}-view`,
        meta: {
          title: '表单',
          permission: ['dashboard'],
          keepAlive: true,
        },
        component: () => import('@/views/form-schema/form-schema.vue'),

      }
    ]
  },
]

export default routes