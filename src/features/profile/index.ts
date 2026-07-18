import type { RouteRecordRaw } from 'vue-router'
import ProfileView from './views/ProfileView.vue'

export const profileRoutes: RouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
]

export default profileRoutes
