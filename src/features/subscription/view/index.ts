import type { RouteRecordRaw } from 'vue-router'
import SubscriptionView from './SubscriptionView.vue'

export const subscriptionRoutes: RouteRecordRaw[] = [
  {
    path: '/subscription',
    name: 'subscription',
    component: SubscriptionView,
  },
]

export default subscriptionRoutes
