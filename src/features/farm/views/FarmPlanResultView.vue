<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue'
import { useFarmPlanStore } from '@/stores/farmPlanStore'
import { storeToRefs } from 'pinia'
import type { FarmPlanResponse } from '../types/farmPlan'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useFarmPlanStore()
const { farmPlan, loading, error } = storeToRefs(store)

async function handleSaveFarmPlan(farmPlanPayload: FarmPlanResponse) {
  console.log(`Saved to Plan: ${farmPlanPayload.speciesName}`)

  router.push('/')
}
</script>

<template>
  <div class="result">
    <p v-if="loading" class="result__status">Generating your farm plan…</p>

    <p v-else-if="error" class="result__status result__status--error" role="alert">
      {{ error }}
    </p>

    <p v-else-if="!farmPlan" class="result__status">
      No farm plan yet. Go back and fill out the form to generate one.
    </p>

    <template v-else>
      <header class="result__header">
        <p class="result__eyebrow">Recommended Setup</p>
        <h3 class="result__species">{{ farmPlan.speciesName }}</h3>

        <div class="result__stats">
          <div class="stat">
            <span class="stat__value">{{
              farmPlan.recommendedStockingDensity.toLocaleString()
            }}</span>
            <span class="stat__label">Stocking Density</span>
          </div>
          <div class="stat">
            <span class="stat__value">{{ farmPlan.estimatedHarvestDays }}</span>
            <span class="stat__label">Days to Harvest</span>
          </div>
        </div>
      </header>

      <section class="result__section">
        <h4>Water Parameters</h4>
        <dl class="water-grid">
          <div class="water-grid__row">
            <dt>Salinity</dt>
            <dd>{{ farmPlan.recommendedWaterParameters.salinity }}</dd>
          </div>
          <div class="water-grid__row">
            <dt>pH</dt>
            <dd>{{ farmPlan.recommendedWaterParameters.ph }}</dd>
          </div>
          <div class="water-grid__row">
            <dt>Ammonia</dt>
            <dd>{{ farmPlan.recommendedWaterParameters.ammonia }}</dd>
          </div>
          <div class="water-grid__row">
            <dt>Nitrite</dt>
            <dd>{{ farmPlan.recommendedWaterParameters.nitrite }}</dd>
          </div>
          <div class="water-grid__row">
            <dt>Dissolved Oxygen</dt>
            <dd>{{ farmPlan.recommendedWaterParameters.dissolvedOxygen }}</dd>
          </div>
          <div class="water-grid__row">
            <dt>Water Temperature</dt>
            <dd>{{ farmPlan.recommendedWaterParameters.waterTemperature }}</dd>
          </div>
        </dl>
      </section>

      <section class="result__section">
        <h4>Recommended Equipment</h4>
        <ul class="card-list">
          <li
            v-for="equipment in farmPlan.recommendedToolsEquipments"
            :key="equipment.id"
            class="card"
          >
            <h5>{{ equipment.equipmentName }}</h5>
            <p>{{ equipment.equipmentDescription }}</p>
            <a
              class="card__link"
              :href="`https://www.google.com/maps?q=${equipment.latitude},${equipment.longitude}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ equipment.storeName }}
            </a>
          </li>
        </ul>
      </section>

      <section class="result__section">
        <h4>Recommended Feeds</h4>
        <ul class="card-list">
          <li v-for="feed in farmPlan.recommendedBrandOfFeeds" :key="feed.id" class="card">
            <h5>{{ feed.feedsName }}</h5>
            <p>{{ feed.feedsDescription }}</p>
          </li>
        </ul>
      </section>

      <section class="save_btn_wrapper flex justify-center items-center">
        <AppButton label="Save Farm Plan" v-on:on-submit="handleSaveFarmPlan(farmPlan)" />
      </section>
    </template>
  </div>
</template>

<style scoped>
.result {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  max-width: 640px;
  margin-inline: auto;
}

.result__status {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
  padding: 2rem 1rem;
}

.result__status--error {
  color: #dc2626;
}

.result__header {
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #0f766e, #0891b2);
  color: #ecfeff;
  padding: 1.5rem 1.75rem;
}

.result__eyebrow {
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
}

.result__species {
  margin: 0 0 1rem;
  font-size: 1.4rem;
}

.result__stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat__value {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat__label {
  font-size: 0.75rem;
  opacity: 0.85;
}

.result__section h4 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: #0f172a;
}

.water-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem 1.5rem;
  margin: 0;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
}

.water-grid__row {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.water-grid__row dt {
  color: #475569;
  font-size: 0.85rem;
}

.water-grid__row dd {
  margin: 0;
  font-weight: 600;
  color: #0f172a;
  font-size: 0.85rem;
}

.card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.85rem 1rem;
  background: #f8fafc;
}

.card h5 {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
  color: #0f172a;
}

.card p {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.4;
}

.card__link {
  font-size: 0.8rem;
  color: #0891b2;
  text-decoration: none;
  font-weight: 600;
}

.card__link:hover {
  text-decoration: underline;
}
</style>
