<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFarm } from '@/features/farm/composables/useFarm'
import { getFarmById } from '@/features/farm/services/farmService'
import type { FarmResponse } from '@/features/farm/types/farmPlan'

const { farms, isLoading, getFarms } = useFarm()
const router = useRouter()
const detailedFarms = ref<FarmResponse[]>([])
const isFetchingDetails = ref(false)

onMounted(async () => {
  await getFarms()
  if (farms.value && farms.value.length > 0) {
    isFetchingDetails.value = true
    try {
      const details = await Promise.all(
        farms.value.map(farm => getFarmById(farm.id))
      )
      detailedFarms.value = details.filter((f): f is FarmResponse => f !== undefined)
    } finally {
      isFetchingDetails.value = false
    }
  }
})

const farmsWithEquipment = computed(() => {
  return detailedFarms.value.filter(farm => farm.equipments && farm.equipments.length > 0)
})

// Pagination logic
const currentPage = ref(1)
const itemsPerPage = 3 // Showing 3 farms per page

const totalPages = computed(() => {
  return Math.ceil(farmsWithEquipment.value.length / itemsPerPage) || 1
})

const paginatedFarms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return farmsWithEquipment.value.slice(start, end)
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function goToFarm(farm: FarmResponse) {
  router.push({
    name: 'farm-detail',
    params: {
      id: farm.id,
    },
  })
}

function goToEquipment(equipmentId: string) {
  router.push({
    name: 'equipment-detail',
    params: {
      id: equipmentId,
    },
  })
}
</script>

<template>
  <div class="equipment-page">
    <header class="header">
      <h2>Recommended Equipment</h2>
      <p>All your recommended farm equipment organized by farm.</p>
    </header>

    <div v-if="isLoading || isFetchingDetails" class="status-msg">
      Loading equipment...
    </div>

    <div v-else-if="!farmsWithEquipment.length" class="status-msg">
      No equipment found. Generate a farm plan first.
    </div>

    <div v-else class="farms-container">
      <section v-for="farm in paginatedFarms" :key="farm.id" class="farm-section">
        <div class="farm-header" @click="goToFarm(farm)" role="button" tabindex="0" @keydown.enter="goToFarm(farm)">
          <h3>Farm: {{ farm.species }}</h3>
          <span class="badge">{{ farm.culture_system }}</span>
        </div>

        <div class="equipment-grid">
          <div 
            v-for="equipment in farm.equipments" 
            :key="equipment.id" 
            class="equipment-card"
            @click="goToEquipment(equipment.id)"
            role="button"
            tabindex="0"
            @keydown.enter="goToEquipment(equipment.id)"
          >
            <h4>{{ equipment.name }}</h4>
            <p class="purpose">{{ equipment.purpose }}</p>
            <span class="importance-badge">{{ equipment.importance }} Importance</span>
          </div>
        </div>
      </section>

      <!-- Pagination Controls -->
      <nav v-if="totalPages > 1" class="pagination" aria-label="Pagination">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in totalPages" 
            :key="page"
            class="page-btn number-btn"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.equipment-page {
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 0 1rem;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

.header h2 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  color: #0f172a;
}

.header p {
  margin: 0 0 2rem;
  font-size: 0.95rem;
  color: #64748b;
}

.status-msg {
  text-align: center;
  color: #64748b;
  padding: 3rem 1rem;
}

.farms-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 3rem;
}

.farm-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.farm-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  cursor: pointer;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #cbd5e1;
}

.farm-header:hover h3 {
  color: #0ea5e9;
}

.farm-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #0f172a;
  transition: color 0.2s ease;
}

.badge {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.equipment-card {
  background: white;
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.equipment-card:hover, .equipment-card:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-color: #0ea5e9;
  outline: none;
}

.equipment-card h4 {
  margin: 0;
  font-size: 1.05rem;
  color: #1e293b;
}

.purpose {
  margin: 0;
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.4;
  flex-grow: 1;
}

.importance-badge {
  align-self: flex-start;
  background: #f1f5f9;
  color: #475569;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  background: white;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background: #f8fafc;
  color: #0f172a;
  border-color: #94a3b8;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.number-btn {
  padding: 0.5rem 0.85rem;
}

.number-btn.active {
  background: #0ea5e9;
  color: white;
  border-color: #0ea5e9;
}
</style>
