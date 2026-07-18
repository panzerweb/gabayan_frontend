<script setup lang="ts">
import type { FarmEquipment } from '../types/farmPlan'

defineProps<{
  equipments: FarmEquipment[]
}>()

const emit = defineEmits<{
  (e: 'update:equipment', equipment: FarmEquipment): void
}>()

function toggleEquipment(equipment: FarmEquipment) {
  emit('update:equipment', {
    ...equipment,
    // Assuming isBought might be added dynamically or stored elsewhere
    // We cast it if needed, or update the interface if backend adds it
  })
}
</script>

<template>
  <section class="recommendation">
    <h2 class="recommendation__title">Recommended Equipment</h2>

    <template v-if="equipments?.length">
      <div
        v-for="equipment in equipments"
        :key="equipment.id"
        class="item"
      >
        <label class="item__check">
          <input type="checkbox" @change="toggleEquipment(equipment)" />

          <span>
            {{ equipment.name }}
          </span>
        </label>

        <p>
          {{ equipment.purpose }}
        </p>

        <span 
          class="badge"
          :class="{
            'badge--high': equipment.importance?.toLowerCase() === 'high',
            'badge--medium': equipment.importance?.toLowerCase() === 'medium',
            'badge--low': equipment.importance?.toLowerCase() === 'low'
          }"
        > 
          {{ equipment.importance }} Importance 
        </span>
      </div>
    </template>
    
    <p v-else class="empty-state">No recommended equipment available.</p>

  </section>
</template>

<style scoped>
.recommendation {
  margin-top: 1.5rem;
}

.recommendation__title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #0f172a;
}

.item {
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: 0.2s;
}

.item.bought {
  border-color: #16a34a;
  background: #f0fdf4;
}

.item__check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.item p {
  margin: 0.5rem 0;
  color: #475569;
  font-size: 0.9rem;
}

.item small {
  color: #64748b;
}

.badge {
  display: inline-block;
  margin-top: 0.5rem;
  background: #e2e8f0;
  color: #334155;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge--high {
  background: #fee2e2;
  color: #b91c1c;
}

.badge--medium {
  background: #fef08a;
  color: #a16207;
}

.badge--low {
  background: #dcfce7;
  color: #15803d;
}

.empty-state {
  color: #64748b;
  font-style: italic;
  font-size: 0.9rem;
  padding: 1rem 0;
}
</style>
