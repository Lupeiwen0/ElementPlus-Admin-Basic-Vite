import RouteTransition from '@/layout/RouteTransition.vue'

const routeName = 'demo'

const routes = [
  {
    path: '/demo',
    name: routeName,
    redirect: '/demo-table',
    meta: {
      title: '示例',
      icon: 'el-icon-data-board',
      permission: ['dashboard'],
    },
    component: RouteTransition,
    children: [
      {
        path: '/demo-table',
        name: `${routeName}-table`,
        component: RouteTransition,
        meta: {
          title: '表格-schema',
          permission: ['dashboard'],
          keepAlive: true,
        },
        component: () => import('@/views/table-schema/table-schema.vue'),
      },
      {
        path: '/demo-form',
        name: `${routeName}-form`,
        meta: {
          title: '表单-schema',
          permission: ['dashboard'],
          keepAlive: true,
        },
        component: () => import('@/views/form-schema/form-schema.vue'),

      }
    ]
  }
]

export default routes