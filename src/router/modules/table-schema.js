import RouteTransition from '@/layout/RouteTransition.vue'

const routeName = 'table-schema'

const routes = [
  {
    path: '/table-schema',
    name: routeName,
    redirect: '/table-schema-view',
    component: RouteTransition,
    meta: {
      title: 'Table-schema',
      icon: 'table',
      permission: ['dashboard'],
    },
    children: [
      {
        path: '/table-schema-view',
        name: `${routeName}-view`,
        component: RouteTransition,
        meta: {
          title: 'Table-schema',
          permission: ['dashboard'],
          keepAlive: true,
        },
        component: () => import('@/views/table-schema/table-schema.vue'),
      }
    ]
  }
]

export default routes