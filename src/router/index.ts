import dashboardRoutes from '@/features/dashboard'
import farmRoutes from '@/features/farm'
import mapRoutes from '@/features/map'
import authRoutes from '@/features/auth'
import profileRoutes from '@/features/profile'
import equipmentRoutes from '@/features/equipment'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...dashboardRoutes, ...farmRoutes, ...mapRoutes, ...authRoutes, ...profileRoutes, ...equipmentRoutes],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })
  } else if ((to.name === 'Login' || to.name === 'Register') && token) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
