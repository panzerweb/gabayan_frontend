import type { RouteRecordRaw } from 'vue-router'
import GenerateFarmPlanView from './views/GenerateFarmPlanView.vue'
import FarmPlanResultView from './views/FarmPlanResultView.vue'
import FarmsView from './views/FarmsView.vue'
import FarmDetail from './views/FarmDetail.vue'

export const farmRoutes: RouteRecordRaw[] = [
  {
    path: '/generate',
    name: 'Generate',
    component: GenerateFarmPlanView,
  },
  {
    path: '/farm-plan/result',
    name: 'farm-plan-result',
    component: FarmPlanResultView,
  },
  {
    path: '/farms',
    name: 'farms',
    component: FarmsView,
  },
  {
    path: '/farms/:id',
    name: 'farm-detail',
    component: FarmDetail,
    props: true,
  },
]

export default farmRoutes
