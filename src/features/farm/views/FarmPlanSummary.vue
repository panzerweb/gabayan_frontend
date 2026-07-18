<script setup lang="ts">
import type { FarmPlanResponse } from '../types/farmPlan'

defineProps<{
  plan: FarmPlanResponse
}>()
</script>

<template>
  <div class="summary">
    <header class="summary__header">
      <p class="summary__eyebrow">Recommended Setup</p>
      <h3 class="summary__species">{{ plan.speciesName }}</h3>

      <div class="summary__stats">
        <div class="stat">
          <span class="stat__value">{{ plan.recommendedStockingDensity.toLocaleString() }}</span>
          <span class="stat__label">Stocking Density</span>
        </div>
        <div class="stat">
          <span class="stat__value">{{ plan.estimatedHarvestDays }}</span>
          <span class="stat__label">Days to Harvest</span>
        </div>
      </div>
    </header>

    <section class="summary__section">
      <h4>Water Parameters</h4>
      <dl class="water-grid">
        <div class="water-grid__row">
          <dt>Salinity</dt>
          <dd>{{ plan.recommendedWaterParameters.salinity }}</dd>
        </div>
        <div class="water-grid__row">
          <dt>pH</dt>
          <dd>{{ plan.recommendedWaterParameters.ph }}</dd>
        </div>
        <div class="water-grid__row">
          <dt>Ammonia</dt>
          <dd>{{ plan.recommendedWaterParameters.ammonia }}</dd>
        </div>
        <div class="water-grid__row">
          <dt>Nitrite</dt>
          <dd>{{ plan.recommendedWaterParameters.nitrite }}</dd>
        </div>
        <div class="water-grid__row">
          <dt>Dissolved Oxygen</dt>
          <dd>{{ plan.recommendedWaterParameters.dissolvedOxygen }}</dd>
        </div>
        <div class="water-grid__row">
          <dt>Water Temperature</dt>
          <dd>{{ plan.recommendedWaterParameters.waterTemperature }}</dd>
        </div>
      </dl>
    </section>

    <section class="summary__section">
      <h4>Recommended Equipment</h4>
      <ul class="card-list">
        <li v-for="equipment in plan.recommendedToolsEquipments" :key="equipment.id" class="card">
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

    <section class="summary__section">
      <h4>Recommended Feeds</h4>
      <ul class="card-list">
        <li v-for="feed in plan.recommendedBrandOfFeeds" :key="feed.id" class="card">
          <h5>{{ feed.feedsName }}</h5>
          <p>{{ feed.feedsDescription }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.summary {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.summary__header {
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #0f766e, #0891b2);
  color: #ecfeff;
  padding: 1.5rem 1.75rem;
}

.summary__eyebrow {
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
}

.summary__species {
  margin: 0 0 1rem;
  font-size: 1.4rem;
}

.summary__stats {
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

.summary__section h4 {
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
