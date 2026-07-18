<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue'
import { useFarmPlanStore } from '@/stores/farmPlanStore'
import { storeToRefs } from 'pinia'
import type { FarmPlanPayload } from '../types/farmPlan'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useFarmPlan } from '../composables/useFarmPlan'

const router = useRouter()

const store = useFarmPlanStore()
const { farmPlan, loading, error } = storeToRefs(store)
const {saveFarmPlan} = useFarmPlan();

async function handleSaveFarmPlan(farmPlanPayload: FarmPlanPayload) {
  console.log(`Saved to Plan: ${farmPlanPayload.request_inputs.species}`)

  const result = await saveFarmPlan(farmPlanPayload);

  if (!result) {
    return;
  }
  else{
    router.push('/')
  }
}

onMounted(() => {
  console.log(farmPlan);
})

function formatParam(param: any) {
  if (!param) return 'N/A'
  if (param.minimum !== undefined && param.maximum !== undefined) {
    return `${param.minimum} - ${param.maximum} ${param.unit || ''}`
  }
  if (param.minimum !== undefined) {
    return `Min ${param.minimum} ${param.unit || ''}`
  }
  if (param.maximum !== undefined) {
    return `Max ${param.maximum} ${param.unit || ''}`
  }
  return 'N/A'
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
        <h3 class="result__species">{{ farmPlan.request_inputs.species }}</h3>

        <div class="result__stats">
          <div class="stat">
            <span class="stat__value">{{ farmPlan.plan_data.riskAssessment?.overallRisk || 'N/A' }}</span>
            <span class="stat__label">Overall Risk</span>
          </div>
        </div>
      </header>

      <section class="result__section">
        <h4>Water Parameters</h4>
        <dl class="water-grid">
          <div class="water-grid__row" v-if="farmPlan.plan_data.waterParameters?.temperature">
            <dt>Temperature</dt>
            <dd>{{ formatParam(farmPlan.plan_data.waterParameters.temperature) }}</dd>
          </div>
          <div class="water-grid__row" v-if="farmPlan.plan_data.waterParameters?.salinity">
            <dt>Salinity</dt>
            <dd>{{ formatParam(farmPlan.plan_data.waterParameters.salinity) }}</dd>
          </div>
          <div class="water-grid__row" v-if="farmPlan.plan_data.waterParameters?.ph">
            <dt>pH</dt>
            <dd>{{ formatParam(farmPlan.plan_data.waterParameters.ph) }}</dd>
          </div>
          <div class="water-grid__row" v-if="farmPlan.plan_data.waterParameters?.dissolvedOxygen">
            <dt>Dissolved Oxygen</dt>
            <dd>{{ formatParam(farmPlan.plan_data.waterParameters.dissolvedOxygen) }}</dd>
          </div>
          <div class="water-grid__row" v-if="farmPlan.plan_data.waterParameters?.ammonia">
            <dt>Ammonia</dt>
            <dd>{{ formatParam(farmPlan.plan_data.waterParameters.ammonia) }}</dd>
          </div>
        </dl>
      </section>

      <section class="result__section">
        <h4>Farm Preparation</h4>
        <ol class="prep-list">
          <li v-for="step in farmPlan.plan_data.farmPreparation" :key="step.step">
            <strong>{{ step.title }}:</strong> {{ step.description }}
          </li>
        </ol>
      </section>

      <section class="result__section">
        <h4>Management Routine</h4>
        <div class="management-grid">
          <div class="management-item" v-if="farmPlan.plan_data.management?.feeding">
            <h5>Feeding</h5>
            <p><strong>Frequency:</strong> {{ farmPlan.plan_data.management.feeding.frequency }}</p>
            <p><strong>Type:</strong> {{ farmPlan.plan_data.management.feeding.feedType }}</p>
          </div>
          <div class="management-item" v-if="farmPlan.plan_data.management?.waterChange">
            <h5>Water Change</h5>
            <p><strong>Frequency:</strong> {{ farmPlan.plan_data.management.waterChange.frequency }}</p>
          </div>
          <div class="management-item" v-if="farmPlan.plan_data.management?.dailyMonitoring">
            <h5>Daily Monitoring</h5>
            <ul>
              <li v-for="task in farmPlan.plan_data.management.dailyMonitoring" :key="task">{{ task }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="result__section">
        <h4>Recommended Equipment</h4>
        <ul class="card-list">
          <li v-for="equipment in farmPlan.plan_data.equipment" :key="equipment.id" class="card">
            <h5>{{ equipment.name }}</h5>
            <p>{{ equipment.purpose }}</p>
            <span class="badge">{{ equipment.importance }} Importance</span>
          </li>
        </ul>
      </section>

      <section class="result__section" v-if="farmPlan.plan_data.diseases?.length">
        <h4>Disease Risks</h4>
        <ul class="card-list">
          <li v-for="disease in farmPlan.plan_data.diseases" :key="disease.name" class="card card--warning">
            <h5>{{ disease.name }}</h5>
            <p><strong>Symptoms:</strong> {{ disease.symptoms.join(', ') }}</p>
            <p><strong>Prevention:</strong> {{ disease.prevention.join(', ') }}</p>
          </li>
        </ul>
      </section>

      <section class="save_btn_wrapper flex justify-center items-center mt-6">
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
  text-transform: capitalize;
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

.prep-list {
  padding-left: 1.25rem;
  margin: 0;
  color: #334155;
  font-size: 0.9rem;
}
.prep-list li {
  margin-bottom: 0.5rem;
}

.management-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.management-item {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}
.management-item h5 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  color: #0f172a;
}
.management-item p {
  margin: 0 0 0.25rem;
  font-size: 0.85rem;
  color: #475569;
}
.management-item ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: #475569;
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
.card--warning {
  border-color: #fcd34d;
  background: #fffbeb;
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

.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: #e2e8f0;
  color: #334155;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  font-weight: 600;
}
</style>
