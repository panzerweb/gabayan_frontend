<script setup lang="ts">
import { computed } from 'vue'
import type { FarmResponse } from '../types/farmPlan'

const props = defineProps<{
  plan: FarmResponse
}>()

defineEmits<{
  (e: 'delete', id: string): void
}>()

const diseases = computed(() => props.plan.diseases || props.plan.plan_data?.diseases || [])
const compatibleSpecies = computed(() => props.plan.compatible_species || props.plan.plan_data?.compatibleSpecies || [])
const financialProjections = computed(() => props.plan.financial_projections || props.plan.plan_data?.financialProjections)
const riskAssessment = computed(() => props.plan.risk_assessment || props.plan.plan_data?.riskAssessment)
const recommendations = computed(() => {
  if (props.plan.recommendation) return [props.plan.recommendation]
  return riskAssessment.value?.recommendations || []
})
</script>

<template>
  <div class="summary">
    <header class="summary__header">
      <div class="summary__header-top">
        <div class="summary__header-titles">
          <p class="summary__eyebrow">Farm Setup</p>
          <h3 class="summary__species">{{ plan.species }}</h3>
        </div>
        <button class="summary__delete-btn" @click="$emit('delete', plan.id)" title="Delete Farm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>

      <div class="summary__stats">
        <div class="stat">
          <span class="stat__value">{{ plan.culture_system || 'N/A' }}</span>
          <span class="stat__label">Culture System</span>
        </div>
      </div>
    </header>

    <section class="summary__section">
      <h4>Tasks</h4>
      <ul class="task-list" v-if="plan.tasks?.length">
        <li v-for="task in plan.tasks" :key="task.id" class="task-item">
          <strong>{{ task.title }}</strong>
          <span v-if="task.status" class="badge">{{ task.status }}</span>
          <p v-if="task.description">{{ task.description }}</p>
        </li>
      </ul>
      <p v-else class="empty-state">No tasks available.</p>
    </section>

    <section class="summary__section">
      <h4>Water Targets</h4>
      <div class="table-container" v-if="plan.water_targets?.length">
        <table class="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Minimum</th>
              <th>Maximum</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="target in plan.water_targets" :key="target.id">
              <td>{{ target.parameter }}</td>
              <td>{{ target.minimum !== undefined ? target.minimum : '-' }}</td>
              <td>{{ target.maximum !== undefined ? target.maximum : '-' }}</td>
              <td>{{ target.unit || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="empty-state">No water targets available.</p>
    </section>

    <section class="summary__section" v-if="diseases.length">
      <h4>Disease Risks</h4>
      <ul class="card-list">
        <li v-for="disease in diseases" :key="disease.name" class="card card--warning">
          <h5>{{ disease.name }}</h5>
          <p><strong>Symptoms:</strong> {{ disease.symptoms.join(', ') }}</p>
          <p><strong>Prevention:</strong> {{ disease.prevention.join(', ') }}</p>
        </li>
      </ul>
    </section>

    <section class="summary__section" v-if="compatibleSpecies.length">
      <h4>Compatible Species</h4>
      <ul class="card-list">
        <li v-for="species in compatibleSpecies" :key="species.name" class="card">
          <h5>{{ species.name }}</h5>
          <p>{{ species.reason }}</p>
        </li>
      </ul>
    </section>

    <section class="summary__section" v-if="financialProjections">
      <h4>Financial Projections</h4>
      <div class="financial-grid">
        <div class="financial-item">
          <h5>Est. Total Feed Cost</h5>
          <p>₱{{ financialProjections.estimatedTotalFeedCost }}</p>
        </div>
        <div class="financial-item">
          <h5>Projected Revenue</h5>
          <p>₱{{ financialProjections.projectedRevenue }}</p>
        </div>
        <div class="financial-item">
          <h5>Net Profit</h5>
          <p>₱{{ financialProjections.netProfit }}</p>
        </div>
        <div class="financial-item">
          <h5>Est. ROI</h5>
          <p>{{ financialProjections.estimatedROI }}%</p>
        </div>
      </div>
    </section>

    <section class="summary__section" v-if="riskAssessment">
      <h4>Risk Assessment</h4>
      <div class="risk-card">
        <p><strong>Overall Risk:</strong> <span class="badge" :class="{'badge--high': riskAssessment.overallRisk.toLowerCase() === 'high', 'badge--medium': riskAssessment.overallRisk.toLowerCase() === 'medium', 'badge--low': riskAssessment.overallRisk.toLowerCase() === 'low'}">{{ riskAssessment.overallRisk }}</span></p>
        <p><strong>Reasons:</strong></p>
        <ul>
          <li v-for="(reason, index) in riskAssessment.reasons" :key="index">{{ reason }}</li>
        </ul>
      </div>
    </section>

    <section class="summary__section" v-if="recommendations.length">
      <h4>Recommendations</h4>
      <ul class="recommendation-list">
        <li v-for="(rec, index) in recommendations" :key="index">{{ rec }}</li>
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

.summary__header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.summary__header-titles {
  display: flex;
  flex-direction: column;
}

.summary__delete-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ecfeff;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.summary__delete-btn:hover {
  background: rgba(220, 38, 38, 0.8);
  color: #ffffff;
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
  text-transform: capitalize;
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

.task-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.task-item strong {
  display: inline-block;
  margin-bottom: 0.25rem;
  color: #0f172a;
}

.task-item p {
  margin: 0;
  font-size: 0.85rem;
  color: #475569;
}

.table-container {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th,
.data-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.85rem;
}

.data-table th {
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.empty-state {
  color: #64748b;
  font-style: italic;
  font-size: 0.9rem;
  padding: 1rem 0;
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

.financial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.financial-item {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.financial-item h5 {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: #475569;
}

.financial-item p {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f766e;
}

.risk-card {
  background: #f8fafc;
  padding: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.risk-card p {
  margin: 0 0 0.75rem;
  color: #334155;
}

.risk-card ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #475569;
  font-size: 0.9rem;
}

.risk-card li {
  margin-bottom: 0.25rem;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: #e2e8f0;
  color: #334155;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  font-weight: 600;
  text-transform: capitalize;
}

.badge--high {
  background: #fee2e2;
  color: #b91c1c;
}

.badge--medium {
  background: #fef3c7;
  color: #b45309;
}

.badge--low {
  background: #dcfce3;
  color: #15803d;
}

.recommendation-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #334155;
  font-size: 0.9rem;
}

.recommendation-list li {
  margin-bottom: 0.5rem;
}
</style>
