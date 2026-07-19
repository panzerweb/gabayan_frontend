import dashboardRoutes from '@/features/dashboard'
import farmRoutes from '@/features/farm'
import mapRoutes from '@/features/map'
import authRoutes from '@/features/auth'
import profileRoutes from '@/features/profile'
import equipmentRoutes from '@/features/equipment'
import { createRouter, createWebHashHistory } from 'vue-router'
import subscriptionRoutes from '@/features/subscription/view'
import speciesRoutes from '@/features/species'
import diseasesRoutes from '@/features/diseases'
import logsRoutes from '@/features/logs'
import aiChatRoutes from '@/features/ai-chat'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...dashboardRoutes,
    ...farmRoutes,
    ...mapRoutes,
    ...authRoutes,
    ...profileRoutes,
    ...equipmentRoutes,
    ...subscriptionRoutes,
    ...speciesRoutes,
    ...diseasesRoutes,
    ...logsRoutes,
    ...aiChatRoutes,
  ],
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
