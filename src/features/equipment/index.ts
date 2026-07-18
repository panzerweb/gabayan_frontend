import type { RouteRecordRaw } from 'vue-router'
import EquipmentView from './views/EquipmentView.vue'
import EquipmentDetailView from './views/EquipmentDetailView.vue'

export const equipmentRoutes: RouteRecordRaw[] = [
  {
    path: '/equipment',
    name: 'equipment',
    component: EquipmentView,
    meta: { requiresAuth: true }
  },
  {
    path: '/equipment/:id',
    name: 'equipment-detail',
    component: EquipmentDetailView,
    meta: { requiresAuth: true }
  }
]

export default equipmentRoutes
