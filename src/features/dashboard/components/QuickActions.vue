<script setup lang="ts">
import {
  type LucideProps,
  Brain,
  Bug,
  Fish,
  Toolbox,
} from 'lucide-vue-next'
import type { FunctionalComponent } from 'vue'


interface QuickActionItem {
  title: string
  icon: FunctionalComponent<LucideProps>
  route: string
}

const actions: QuickActionItem[] = [
  {
    title: 'Species',
    icon: Fish,
    route: '/species',
  },
  {
    title: 'Equipment',
    icon: Toolbox,
    route: '/equipment',
  },
  {
    title: 'Diseases',
    icon: Bug,
    route: '/diseases',
  },
  {
    title: 'AI Assistant',
    icon: Brain,
    route: '/ai-chat',
  },
]
</script>

<template>
  <section class="mt-8 mx-4">
    <div class="mb-4">
      <h2 class="text-lg font-bold text-gray-900">Quick Actions</h2>

      <p class="text-sm text-gray-500">Access Gabayan features quickly.</p>
    </div>

    <!-- Always 2 columns -->
<div class="grid grid-cols-2 gap-3">
  <RouterLink
    v-for="action in actions"
    :key="action.title"
    :to="action.route"
    class="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
  >
    <!-- Icon -->
    <div
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100"
    >
      <component
        :is="action.icon"
        class="h-5 w-5"
      />
    </div>

    <!-- Title -->
    <div class="min-w-0">
      <h3
        class="truncate text-sm font-semibold text-gray-900 group-hover:text-emerald-700"
      >
        {{ action.title }}
      </h3>

      <p class="mt-0.5 text-xs text-gray-400">
        Open
      </p>
    </div>
  </RouterLink>
</div>
  </section>
</template>
