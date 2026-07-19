import type { RouteRecordRaw } from 'vue-router'
import AiChatView from './views/AiChatView.vue'

export const aiChatRoutes: RouteRecordRaw[] = [
  {
    path: '/ai-chat',
    name: 'AiChat',
    component: AiChatView,
    meta: { requiresAuth: true }
  },
]

export default aiChatRoutes
