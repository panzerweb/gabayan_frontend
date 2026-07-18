<script setup lang="ts">
const actions = [
  {
    title: 'Species',
    icon: '🐟',
    route: '/species',
  },
  {
    title: 'Equipment',
    icon: '⚙️',
    route: '/equipment',
  },
  {
    title: 'Diseases',
    icon: '🦠',
    route: '/diseases',
  },
  {
    title: 'AI Assistant',
    icon: '🤖',
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
        class="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <div class="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
          {{ action.icon }}
        </div>

        <h3 class="text-sm font-semibold text-gray-900">
          {{ action.title }}
        </h3>
      </RouterLink>
    </div>
  </section>
</template>
