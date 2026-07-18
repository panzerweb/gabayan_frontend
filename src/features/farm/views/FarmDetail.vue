<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useFarmDetail } from '../composables/useFarmDetail.ts'
import FarmPlanSummary from './FarmPlanSummary.vue'
import RecommendationChecklist from '../components/RecommendationChecklist.vue'
import type { FarmEquipment } from '../types/farmPlan.ts'

const router = useRouter()

const props = defineProps<{
  id: string
}>()

const { farm, loading, error, notFound, getFarmDetail } = useFarmDetail()

onMounted(() => {
  getFarmDetail(props.id)
})

async function toggleEquipment(equipment: FarmEquipment) {
  console.log(`Update farm equipment: ${equipment.id}`, equipment)
}
</script>

<template>
  <div class="detail">
    <button type="button" class="detail__back" @click="router.back()">← Back to Farms</button>

    <p v-if="loading" class="detail__status">Loading farm…</p>

    <p v-else-if="error" class="detail__status detail__status--error" role="alert">
      {{ error }}
    </p>

    <p v-else-if="notFound" class="detail__status">
      This farm couldn't be found. It may have been removed.
    </p>

    <FarmPlanSummary v-else-if="farm" :plan="farm" />

    <RecommendationChecklist
      v-if="farm"
      :equipments="farm.equipments"
      @update:equipment="toggleEquipment"
    />
  </div>
</template>

<style scoped>
.detail {
  max-width: 640px;
  margin: 2rem auto 0;
}

.detail__back {
  background: none;
  border: none;
  color: #0891b2;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0 0 1.25rem;
}

.detail__back:hover {
  text-decoration: underline;
}

.detail__status {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
  padding: 2rem 1rem;
}

.detail__status--error {
  color: #dc2626;
}
</style>
