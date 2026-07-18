import authRoutes from '@/features/dashboard'
import farmRoutes from '@/features/farm'
import mapRoutes from '@/features/map'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...farmRoutes, ...mapRoutes],
})

export default router
