import type { RouteRecordRaw } from 'vue-router'
import LogsFormView from './views/LogsFormView.vue'

export const logsRoutes: RouteRecordRaw[] = [
  {
    path: '/logs/create',
    name: 'CreateLogs',
    component: LogsFormView,
    meta: { requiresAuth: true }
  },
]

export default logsRoutes
