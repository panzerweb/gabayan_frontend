import authRoutes from '@/features/dashboard'
import farmRoutes from '@/features/farm'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...farmRoutes],
})

export default router
