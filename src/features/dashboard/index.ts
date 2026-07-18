import type { RouteRecordRaw } from 'vue-router'
import DashboardView from './views/DashboardView.vue'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
]

export default dashboardRoutes
