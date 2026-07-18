<script setup lang="ts">
import type { FarmResponse } from '../types/farmPlan'

defineProps<{
  plan: FarmResponse
}>()
</script>

<template>
  <div class="summary">
    <header class="summary__header">
      <p class="summary__eyebrow">Farm Setup</p>
      <h3 class="summary__species">{{ plan.species }}</h3>

      <div class="summary__stats">
        <div class="stat">
          <span class="stat__value">{{ plan.culture_system || 'N/A' }}</span>
          <span class="stat__label">Culture System</span>
        </div>
      </div>
    </header>

    <section class="summary__section" v-if="plan.tasks?.length">
      <h4>Tasks</h4>
      <ul class="task-list">
        <li v-for="task in plan.tasks" :key="task.id" class="task-item">
          <strong>{{ task.title }}</strong>
          <span v-if="task.status" class="badge">{{ task.status }}</span>
          <p v-if="task.description">{{ task.description }}</p>
        </li>
      </ul>
    </section>

    <section class="summary__section" v-if="plan.water_targets?.length">
      <h4>Water Targets</h4>
      <div class="table-container">
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
    </section>

    <section class="summary__section" v-if="plan.equipments?.length">
      <h4>Equipments</h4>
      <ul class="card-list">
        <li v-for="equipment in plan.equipments" :key="equipment.id" class="card">
          <h5>{{ equipment.name }}</h5>
          <p v-if="equipment.purpose">{{ equipment.purpose }}</p>
          <span v-if="equipment.importance" class="badge">{{ equipment.importance }} Importance</span>
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

.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: #e2e8f0;
  color: #334155;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  font-weight: 600;
  margin-left: 0.5rem;
}
</style>
