import type { RouteRecordRaw } from 'vue-router'
import DashboardView from './views/DashboardView.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
]

export default authRoutes
