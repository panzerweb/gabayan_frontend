<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import type { FarmResponse } from '../types/farmPlan'
import { useFarm } from '../composables/useFarm'
import { globalConfirmPopup } from '@/components/popups/globalPopup'

const { farms, isLoading, getFarms, removeFarm } = useFarm()
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

async function handleDelete(id: string) {
  const isDelete = await globalConfirmPopup(
    'Delete Farm',
    'warning',
    'Delete',
    'Cancel',
    'Are you sure you want to delete this farm? This action cannot be undone.'
  )
  if (isDelete) {
    try {
      if (removeFarm) {
        await removeFarm(id)
      }
    } catch (err) {
      console.error('Failed to delete farm', err)
      alert('Failed to delete farm. Please try again.')
    }
  }
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
        <button class="plan-card__delete-btn" @click.stop="handleDelete(farm.id)" title="Delete Farm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
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

.plan-card__delete-btn {
  background: none;
  border: none;
  color: #cbd5e1;
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.plan-card__delete-btn:hover {
  background: #fee2e2;
  color: #dc2626;
}
</style>
