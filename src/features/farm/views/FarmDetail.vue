<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useFarmDetail } from '../composables/useFarmDetail.ts'
import FarmPlanSummary from './FarmPlanSummary.vue'
import RecommendationChecklist from '../components/RecommendationChecklist.vue'
import type { EquipmentResponse, FeedResponse } from '../types/farmPlan.ts'

const router = useRouter()

const props = defineProps<{
  id: string
}>()

const { farm, loading, error, notFound, getFarmDetail } = useFarmDetail()

onMounted(() => {
  getFarmDetail(Number(props.id))
})
async function toggleFeed(feed: FeedResponse) {
  console.log(`Update farm feed: ${feed.id}`, feed)
}

async function toggleEquipment(equipment: EquipmentResponse) {
  console.log(`Update farm equipment: ${equipment.id}`, equipment)
}
</script>

<template>
  <div class="detail">
    <button type="button" class="detail__back" @click="router.back()">← Back to Farm Plans</button>

    <p v-if="loading" class="detail__status">Loading farm plan…</p>

    <p v-else-if="error" class="detail__status detail__status--error" role="alert">
      {{ error }}
    </p>

    <p v-else-if="notFound" class="detail__status">
      This farm plan couldn't be found. It may have been removed.
    </p>

    <FarmPlanSummary v-else-if="farm" :plan="farm" />

    <RecommendationChecklist
      v-if="farm"
      :equipments="farm.recommendedToolsEquipments"
      :feeds="farm.recommendedBrandOfFeeds"
      @update:equipment="toggleEquipment"
      @update:feed="toggleFeed"
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
