import type { RouteRecordRaw } from 'vue-router'
import EquipmentView from './views/EquipmentView.vue'
import EquipmentDetailView from './views/EquipmentDetailView.vue'
import EquipmentOrderView from './views/EquipmentOrderView.vue'

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
  },
  {
    path: '/equipment/:id/order',
    name: 'equipment-order',
    component: EquipmentOrderView,
    meta: { requiresAuth: true }
  }
]

export default equipmentRoutes
