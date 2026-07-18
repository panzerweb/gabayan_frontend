import type { RouteRecordRaw } from 'vue-router'
import GenerateFarmPlanView from './views/GenerateFarmPlanView.vue'
import FarmPlanResultView from './views/FarmPlanResultView.vue'

export const farmRoutes: RouteRecordRaw[] = [
  {
    path: '/generate',
    name: 'Generate',
    component: GenerateFarmPlanView,
  },
  {
    path: '/farm-plan/result',
    name: 'Farm Plan Result',
    component: FarmPlanResultView,
  },
]

export default farmRoutes
