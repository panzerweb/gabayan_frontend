<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

interface NavItem {
  name: string
  icon: string
  route: string
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    route: '/',
  },
  {
    name: 'Farm Plan',
    icon: 'agriculture',
    route: '/farms',
  },
  {
    name: 'Profile',
    icon: 'account_box',
    route: '/profile',
  },
  {
    name: 'Premium',
    icon: 'diamond',
    route: '/subscription',
  },
]

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-2 shadow-lg"
  >
    <div class="flex justify-around">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.route"
        class="flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs transition"
        :class="isActive(item.route) ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'"
      >
        <span class="text-xl material-icons">
          {{ item.icon }}
        </span>

        <span class="font-medium">
          {{ item.name }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>
