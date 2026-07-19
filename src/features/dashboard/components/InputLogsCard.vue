<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogsForm = () => {
  router.push('/logs/create')
}
</script>

<template>
  <div class="mx-4 mt-6">
    <div
      class="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
      @click="navigateToLogsForm"
    >
      <div class="flex items-center gap-4 relative z-10">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-bold text-gray-900">Input Logs</h2>
          <p class="text-sm text-gray-500 mt-1">Record water quality & farm metrics</p>
        </div>
      </div>
      
      <div class="relative z-10 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      <!-- Decorative background accent -->
      <div class="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-blue-50/50"></div>
    </div>
  </div>
</template>
