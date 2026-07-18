<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEquipmentById } from '../services/equipmentService'
import type { FarmEquipment } from '@/features/farm/types/farmPlan'

const route = useRoute()
const router = useRouter()
const equipment = ref<FarmEquipment | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  const id = route.params.id as string
  if (id) {
    equipment.value = await getEquipmentById(id) || null
  }
  isLoading.value = false
})

const storeLink = computed(() => {
  if (!equipment.value?.sourcing) return null
  
  const sourcing = equipment.value.sourcing
  
  // 1. Prioritize searchQueryOrUrl if it exists
  if (sourcing.searchQueryOrUrl) {
    if (isUrl(sourcing.searchQueryOrUrl)) {
      return sourcing.searchQueryOrUrl
    } else {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sourcing.searchQueryOrUrl)}`
    }
  }

  // 2. Fallback to searching by store name and address
  if (sourcing.storeName) {
    const query = `${sourcing.storeName} ${sourcing.addressOrPlatform || ''}`.trim()
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
  }
  
  // 3. Last resort: use coordinates
  if (sourcing.coordinates?.latitude && sourcing.coordinates?.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${sourcing.coordinates.latitude},${sourcing.coordinates.longitude}`
  }
  
  return null
})

function isUrl(str: string): boolean {
  return /^(https?:\/\/)/i.test(str)
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="equipment-detail-page">
    <button class="back-btn" @click="goBack">
      ← Back
    </button>

    <div v-if="isLoading" class="status-msg">
      Loading equipment details...
    </div>

    <div v-else-if="!equipment" class="status-msg">
      Equipment not found.
    </div>

    <div v-else class="detail-container">
      <header class="header">
        <h2>{{ equipment.name }}</h2>
        <span class="importance-badge">{{ equipment.importance }} Importance</span>
      </header>

      <section class="info-section">
        <h3>Purpose</h3>
        <p>{{ equipment.purpose }}</p>
      </section>

      <section class="info-section grid-section">
        <div class="info-card">
          <h4>Estimated Cost</h4>
          <p class="cost">₱{{ equipment.estimatedCost?.toLocaleString() || 'N/A' }}</p>
        </div>
        <div class="info-card">
          <h4>DIY Alternative</h4>
          <p>{{ equipment.diyAlternative || 'None' }}</p>
        </div>
      </section>

      <section v-if="equipment.sourcing" class="sourcing-section">
        <h3>Sourcing Information</h3>
        
        <div class="sourcing-card">
          <div class="sourcing-item">
            <span class="label">Recommended Channel</span>
            <span class="value">{{ equipment.sourcing.recommendedChannel }}</span>
          </div>
          
          <div class="sourcing-item">
            <span class="label">Store Name</span>
            <span class="value store-name-container">
              {{ equipment.sourcing.storeName }}
              <a 
                v-if="storeLink" 
                :href="storeLink" 
                target="_blank" 
                rel="noopener noreferrer"
                class="store-link-btn"
              >
                📍 View Store
              </a>
            </span>
          </div>

          <div class="sourcing-item">
            <span class="label">Address / Platform</span>
            <span class="value">{{ equipment.sourcing.addressOrPlatform }}</span>
          </div>

          <div v-if="equipment.sourcing.searchQueryOrUrl" class="sourcing-item">
            <span class="label">Search Query / URL</span>
            <a 
              v-if="isUrl(equipment.sourcing.searchQueryOrUrl)" 
              :href="equipment.sourcing.searchQueryOrUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="value link-style"
            >
              {{ equipment.sourcing.searchQueryOrUrl }}
            </a>
            <span v-else class="value">{{ equipment.sourcing.searchQueryOrUrl }}</span>
          </div>

          <div v-if="equipment.sourcing.buyingTip" class="buying-tip">
            <strong>💡 Buying Tip:</strong> {{ equipment.sourcing.buyingTip }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.equipment-detail-page {
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 0 1rem 3rem;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

.back-btn {
  background: none;
  border: none;
  color: #64748b;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: #0f172a;
}

.status-msg {
  text-align: center;
  color: #64748b;
  padding: 3rem 1rem;
}

.detail-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;
}

.header h2 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  color: #0f172a;
}

.importance-badge {
  display: inline-block;
  background: #f1f5f9;
  color: #475569;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.info-section h3 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: #1e293b;
}

.info-section p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

.grid-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.info-card h4 {
  margin: 0 0 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-card .cost {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
}

.sourcing-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.sourcing-item {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.sourcing-item:last-child {
  border-bottom: none;
}

.sourcing-item .label {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.sourcing-item .value {
  color: #0f172a;
  font-weight: 500;
}

.store-name-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.store-link-btn {
  display: inline-flex;
  align-items: center;
  background-color: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.store-link-btn:hover {
  background-color: #dcfce7;
  color: #14532d;
  border-color: #86efac;
}

.link-style {
  color: #0284c7 !important;
}

.buying-tip {
  padding: 1.25rem 1.5rem;
  background: #fffbeb;
  color: #92400e;
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>
