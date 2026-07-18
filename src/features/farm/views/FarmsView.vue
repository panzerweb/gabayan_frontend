<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import type { FarmResponse } from '../types/farmPlan'
import { useFarm } from '../composables/useFarm'

const { farms, isLoading, getFarms } = useFarm()
const router = useRouter()

onMounted(() => {
  getFarms()
})

function goToDetail(plan: FarmResponse) {
  // NOTE: adjust the route name/param below to match your router config.
  router.push({
    name: 'farm-detail',
    params: {
      id: plan.id,
    },
  })
}
</script>

<template>
  <div class="list">
    <header class="list__header">
      <h2>Farms</h2>
      <p>Every farm you've saved, in one place.</p>
    </header>

    <p v-if="isLoading" class="list__status">Loading farms…</p>

    <!-- <p v-else-if="error" class="list__status list__status--error" role="alert">
      {{ error }}
    </p> -->

    <p v-else-if="!farms?.length" class="list__status">
      No farms yet. Save one to see it here.
    </p>

    <ul v-else class="plan-list">
      <li
        v-for="farm in farms"
        :key="farm.id"
        class="plan-card"
        tabindex="0"
        role="button"
        @click="goToDetail(farm)"
        @keydown.enter="goToDetail(farm)"
      >
        <div class="plan-card__main">
          <h3>{{ farm.species }}</h3>
          <p class="plan-card__meta">
            {{ farm.culture_system || 'Unknown System' }} ·
            {{ farm.equipments?.length || 0 }} Equipments
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list {
  max-width: 640px;
  margin: 2rem auto 0;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

.list__header h2 {
  margin: 0 0 0.25rem;
  font-size: 1.35rem;
  color: #0f172a;
}

.list__header p {
  margin: 0 0 1.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.list__status {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
  padding: 2rem 1rem;
}

.list__status--error {
  color: #dc2626;
}

.plan-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.plan-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.65rem;
  background: #ffffff;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.plan-card:hover,
.plan-card:focus-visible {
  border-color: #0891b2;
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
  outline: none;
}

.plan-card__main h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: #0f172a;
}

.plan-card__meta {
  margin: 0;
  font-size: 0.8rem;
  color: #64748b;
}

.plan-card__date {
  font-size: 0.75rem;
  color: #94a3b8;
  white-space: nowrap;
}
</style>
