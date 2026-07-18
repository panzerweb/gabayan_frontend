<script setup lang="ts">
import { reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useFarmPlanStore } from '@/stores/farmPlanStore'
import type { CultureSystem, FarmPlanRequest } from '../types/farmPlan'

const store = useFarmPlanStore()
const { loading, error } = storeToRefs(store)
const router = useRouter()

const cultureSystemOptions: { value: CultureSystem; label: string }[] = [
  { value: 'pond', label: 'Pond' },
  { value: 'fish_cage', label: 'Fish Cage' },
  { value: 'tank', label: 'Tank' },
]

const form = reactive<FarmPlanRequest>({
  speciesName: '',
  cultureSystem: 'pond',
  pondSize: 0,
  budget: 0,
})

const formErrors = reactive({
  speciesName: '',
  pondSize: '',
  budget: '',
})

function validate(): boolean {
  formErrors.speciesName = form.speciesName.trim() ? '' : 'Species name is required.'
  formErrors.pondSize = form.pondSize > 0 ? '' : 'Enter a size greater than 0.'
  formErrors.budget = form.budget > 0 ? '' : 'Enter a budget greater than 0.'

  return !formErrors.speciesName && !formErrors.pondSize && !formErrors.budget
}

const isSubmitDisabled = computed(() => loading.value)

async function handleSubmit() {
  if (!validate()) return

  // The form only talks to the store's action — it has no idea the
  // store delegates to a composable, which in turn calls a mock service.
  await store.generatePlan({ ...form })

  // NOTE: adjust the route name/path below to match your router config.
  // Only navigate if the store actually produced a plan (i.e. no error).
  if (!error.value) {
    router.push('/farm-plan/result')
  }
}

function handleReset() {
  form.speciesName = ''
  form.cultureSystem = 'pond'
  form.pondSize = 0
  form.budget = 0

  formErrors.speciesName = ''
  formErrors.pondSize = ''
  formErrors.budget = ''

  store.clearPlan()
}
</script>

<template>
  <div class="farm-plan">
    <form class="farm-plan__form" novalidate @submit.prevent="handleSubmit">
      <h2 class="farm-plan__title">Generate Farm Plan</h2>
      <p class="farm-plan__subtitle">
        Tell us about your setup and we’ll recommend a stocking plan, feeds, equipment, and water
        parameters.
      </p>

      <div class="field">
        <label for="speciesName">Species Name</label>
        <input
          id="speciesName"
          v-model="form.speciesName"
          type="text"
          placeholder="e.g. Tilapia, Milkfish, Shrimp"
          :aria-invalid="!!formErrors.speciesName"
        />
        <span v-if="formErrors.speciesName" class="field__error">{{ formErrors.speciesName }}</span>
      </div>

      <div class="field">
        <label for="cultureSystem">Culture System</label>
        <select id="cultureSystem" v-model="form.cultureSystem">
          <option v-for="option in cultureSystemOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="field">
        <label for="pondSize">Size (m³ / m²)</label>
        <input
          id="pondSize"
          v-model.number="form.pondSize"
          type="number"
          min="0"
          step="0.1"
          placeholder="e.g. 100"
          :aria-invalid="!!formErrors.pondSize"
        />
        <span v-if="formErrors.pondSize" class="field__error">{{ formErrors.pondSize }}</span>
      </div>

      <div class="field">
        <label for="budget">Budget (PHP)</label>
        <input
          id="budget"
          v-model.number="form.budget"
          type="number"
          min="0"
          step="100"
          placeholder="e.g. 50000"
          :aria-invalid="!!formErrors.budget"
        />
        <span v-if="formErrors.budget" class="field__error">{{ formErrors.budget }}</span>
      </div>

      <div class="farm-plan__actions">
        <button type="submit" class="btn btn--primary" :disabled="isSubmitDisabled">
          {{ loading ? 'Generating…' : 'Generate Plan' }}
        </button>
        <button type="button" class="btn btn--ghost" :disabled="loading" @click="handleReset">
          Reset
        </button>
      </div>

      <p v-if="error" class="farm-plan__error" role="alert">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.farm-plan {
  max-width: 640px;
  margin: 0 auto;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

.farm-plan__form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 1.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.85rem;
  background: #ffffff;
}

.farm-plan__title {
  margin: 0;
  font-size: 1.35rem;
  color: #0f172a;
}

.farm-plan__subtitle {
  margin: -0.5rem 0 0.25rem;
  font-size: 0.875rem;
  color: #64748b;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
}

.field input,
.field select {
  padding: 0.55rem 0.7rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #0f172a;
  background: #f8fafc;
}

.field input:focus,
.field select:focus {
  outline: 2px solid #0891b2;
  outline-offset: 1px;
}

.field input[aria-invalid='true'] {
  border-color: #dc2626;
}

.field__error {
  font-size: 0.75rem;
  color: #dc2626;
}

.farm-plan__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.btn {
  border: none;
  border-radius: 0.5rem;
  padding: 0.6rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--primary {
  background: #0f766e;
  color: #ffffff;
}

.btn--ghost {
  background: transparent;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.farm-plan__error {
  margin: 0;
  font-size: 0.85rem;
  color: #dc2626;
}
</style>
