<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()

const userName = computed(() => {
  if (authStore.user) {
    return authStore.user.name || authStore.user.first_name || 'User'
  }
  return 'User'
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg m-4"
  >
    <!-- Decorative Background -->
    <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>

    <div class="absolute -bottom-12 -left-10 h-48 w-48 rounded-full bg-white/5"></div>

    <!-- Content -->
    <div class="relative z-10">
      <p class="mb-2 text-sm font-medium text-blue-100">Welcome back 👋</p>

      <h1 class="text-3xl font-bold tracking-tight">Welcome, {{ userName }}</h1>

      <p class="mt-3 max-w-lg text-sm text-blue-100">
        Manage your aquaculture journey, monitor your farm progress, and get intelligent insights
        with Gabayan.
      </p>
    </div>
  </div>
</template>
