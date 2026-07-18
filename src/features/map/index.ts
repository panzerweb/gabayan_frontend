import type { RouteRecordRaw } from 'vue-router'
import MapView from './view/MapView.vue'

export const mapRoutes: RouteRecordRaw[] = [
  {
    path: '/map',
    name: 'map',
    component: MapView,
  },
]

export default mapRoutes
