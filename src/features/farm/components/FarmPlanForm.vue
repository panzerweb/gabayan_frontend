<script setup lang="ts">
import { reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useFarmPlanStore } from '@/stores/farmPlanStore'
import type {
  FarmPlanRequest,
  FishSpecies,
  CultureSystem,
  feedPreferences as FeedPreference,
  powerInfrastructure as PowerInfrastructure,
  laborAvailability as LaborAvailability,
} from '../types/farmPlan'

const store = useFarmPlanStore()
const { loading, error } = storeToRefs(store)
const router = useRouter()

const fishSpeciesOptions: { value: FishSpecies; label: string }[] = [
  { value: 'tilapia', label: 'Tilapia' },
  { value: 'bangus', label: 'Bangus' },
  { value: 'hito', label: 'Hito' },
  { value: 'lapu-lapu', label: 'Lapu-Lapu' },
  { value: 'pasayan', label: 'Pasayan' },
]

const cultureSystemOptions: { value: CultureSystem; label: string }[] = [
  { value: 'pond', label: 'Pond' },
  { value: 'cage', label: 'Fish Cage' },
  { value: 'tank', label: 'Tank' },
]

const feedPreferenceOptions: { value: FeedPreference; label: string }[] = [
  { value: 'Commercial Pellets', label: 'Commercial Pellets' },
  { value: 'Wild Pellets', label: 'Wild Pellets' },
]

const powerInfrastructureOptions: { value: PowerInfrastructure; label: string }[] = [
  { value: 'Grid', label: 'Grid' },
  { value: 'Solar', label: 'Solar' },
]

const laborAvailabilityOptions: { value: LaborAvailability; label: string }[] = [
  { value: 'Solo / Family', label: 'Solo / Family' },
  { value: 'Hired Help', label: 'Hired Help' },
]

// Single source of truth for both the initial form state and reset —
// avoids the earlier bug where reset only touched some of the fields
// (and reset one of them to an invalid value).
function createDefaultForm(): FarmPlanRequest {
  return {
    species: 'tilapia',
    cultureSystem: 'pond',
    farmArea: 0,
    stockingDensity: 0,
    waterSource: '',
    budget: 0,
    productionGoal: '',
    targetCycleDuration: 0,
    feedPreference: 'Commercial Pellets',
    averageTemperature: 0,
    targetHarvestWeightGrams: 0,
    initialStockingWeightGrams: 0,
    feedCostPerKg: 0,
    powerInfrastructure: 'Grid',
    targetSellingPrice: 0,
    laborAvailability: 'Solo / Family',
  }
}

const form = reactive<FarmPlanRequest>(createDefaultForm())

const formErrors = reactive({
  farmArea: '',
  stockingDensity: '',
  waterSource: '',
  budget: '',
  productionGoal: '',
  targetCycleDuration: '',
  averageTemperature: '',
  initialStockingWeightGrams: '',
  targetHarvestWeightGrams: '',
  feedCostPerKg: '',
  targetSellingPrice: '',
})

function validate(): boolean {
  formErrors.farmArea = form.farmArea > 0 ? '' : 'Enter a farm area greater than 0.'
  formErrors.stockingDensity =
    form.stockingDensity > 0 ? '' : 'Enter a stocking density greater than 0.'
  formErrors.waterSource = form.waterSource.trim() ? '' : 'Water source is required.'
  formErrors.budget = form.budget > 0 ? '' : 'Enter a budget greater than 0.'
  formErrors.productionGoal = form.productionGoal.trim() ? '' : 'Production goal is required.'
  formErrors.targetCycleDuration =
    form.targetCycleDuration > 0 ? '' : 'Enter a cycle duration greater than 0.'
  formErrors.averageTemperature =
    form.averageTemperature > 0 ? '' : 'Enter an average temperature greater than 0.'
  formErrors.initialStockingWeightGrams =
    form.initialStockingWeightGrams > 0
      ? ''
      : 'Enter an initial stocking weight greater than 0.'
  formErrors.targetHarvestWeightGrams =
    form.targetHarvestWeightGrams > form.initialStockingWeightGrams
      ? ''
      : 'Target harvest weight must be greater than the initial stocking weight.'
  formErrors.feedCostPerKg = form.feedCostPerKg > 0 ? '' : 'Enter a feed cost greater than 0.'
  formErrors.targetSellingPrice =
    form.targetSellingPrice > 0 ? '' : 'Enter a target selling price greater than 0.'

  return Object.values(formErrors).every((message) => !message)
}

const isSubmitDisabled = computed(() => loading.value)

async function handleSubmit() {
  if (!validate()) return

  // The form only talks to the store's action — it has no idea the
  // store delegates to a composable, which in turn calls a mock service.
  await store.generatePlan({ ...form })

  // NOTE: adjust the route below to match your router config.
  // Only navigate if the store actually produced a plan (i.e. no error).
  if (!error.value) {
    router.push('/farm-plan/result')
  }
}

function handleReset() {
  Object.assign(form, createDefaultForm())

  Object.keys(formErrors).forEach((key) => {
    formErrors[key as keyof typeof formErrors] = ''
  })

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

      <fieldset class="fieldset">
        <legend>Farm Setup</legend>
        <div class="field-grid">
          <div class="field">
            <label for="species">Species</label>
            <select id="species" v-model="form.species">
              <option v-for="option in fishSpeciesOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="field">
            <label for="cultureSystem">Culture System</label>
            <select id="cultureSystem" v-model="form.cultureSystem">
              <option
                v-for="option in cultureSystemOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="field">
            <label for="farmArea">Farm Area (m²)</label>
            <input
              id="farmArea"
              v-model.number="form.farmArea"
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g. 500"
              :aria-invalid="!!formErrors.farmArea"
            />
            <span v-if="formErrors.farmArea" class="field__error">{{ formErrors.farmArea }}</span>
          </div>

          <div class="field">
            <label for="stockingDensity">Stocking Density (per m²)</label>
            <input
              id="stockingDensity"
              v-model.number="form.stockingDensity"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 5"
              :aria-invalid="!!formErrors.stockingDensity"
            />
            <span v-if="formErrors.stockingDensity" class="field__error">{{
              formErrors.stockingDensity
            }}</span>
          </div>

          <div class="field">
            <label for="waterSource">Water Source</label>
            <input
              id="waterSource"
              v-model="form.waterSource"
              type="text"
              placeholder="e.g. River, Well, Municipal"
              :aria-invalid="!!formErrors.waterSource"
            />
            <span v-if="formErrors.waterSource" class="field__error">{{
              formErrors.waterSource
            }}</span>
          </div>

          <div class="field">
            <label for="powerInfrastructure">Power Infrastructure</label>
            <select id="powerInfrastructure" v-model="form.powerInfrastructure">
              <option
                v-for="option in powerInfrastructureOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="field">
            <label for="laborAvailability">Labor Availability</label>
            <select id="laborAvailability" v-model="form.laborAvailability">
              <option
                v-for="option in laborAvailabilityOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend>Production Targets</legend>
        <div class="field-grid">
          <div class="field field--wide">
            <label for="productionGoal">Production Goal</label>
            <input
              id="productionGoal"
              v-model="form.productionGoal"
              type="text"
              placeholder="e.g. Food, Sale"
              :aria-invalid="!!formErrors.productionGoal"
            />
            <span v-if="formErrors.productionGoal" class="field__error">{{
              formErrors.productionGoal
            }}</span>
          </div>

          <div class="field">
            <label for="targetCycleDuration">Target Cycle Duration (days)</label>
            <input
              id="targetCycleDuration"
              v-model.number="form.targetCycleDuration"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 120"
              :aria-invalid="!!formErrors.targetCycleDuration"
            />
            <span v-if="formErrors.targetCycleDuration" class="field__error">{{
              formErrors.targetCycleDuration
            }}</span>
          </div>

          <div class="field">
            <label for="averageTemperature">Average Temperature (°C)</label>
            <input
              id="averageTemperature"
              v-model.number="form.averageTemperature"
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g. 28"
              :aria-invalid="!!formErrors.averageTemperature"
            />
            <span v-if="formErrors.averageTemperature" class="field__error">{{
              formErrors.averageTemperature
            }}</span>
          </div>

          <div class="field">
            <label for="initialStockingWeightGrams">Initial Stocking Weight (g)</label>
            <input
              id="initialStockingWeightGrams"
              v-model.number="form.initialStockingWeightGrams"
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g. 5"
              :aria-invalid="!!formErrors.initialStockingWeightGrams"
            />
            <span v-if="formErrors.initialStockingWeightGrams" class="field__error">{{
              formErrors.initialStockingWeightGrams
            }}</span>
          </div>

          <div class="field">
            <label for="targetHarvestWeightGrams">Target Harvest Weight (g)</label>
            <input
              id="targetHarvestWeightGrams"
              v-model.number="form.targetHarvestWeightGrams"
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g. 500"
              :aria-invalid="!!formErrors.targetHarvestWeightGrams"
            />
            <span v-if="formErrors.targetHarvestWeightGrams" class="field__error">{{
              formErrors.targetHarvestWeightGrams
            }}</span>
          </div>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend>Feed &amp; Budget</legend>
        <div class="field-grid">
          <div class="field">
            <label for="feedPreference">Feed Preference</label>
            <select id="feedPreference" v-model="form.feedPreference">
              <option
                v-for="option in feedPreferenceOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="field">
            <label for="feedCostPerKg">Feed Cost (PHP/kg)</label>
            <input
              id="feedCostPerKg"
              v-model.number="form.feedCostPerKg"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 55"
              :aria-invalid="!!formErrors.feedCostPerKg"
            />
            <span v-if="formErrors.feedCostPerKg" class="field__error">{{
              formErrors.feedCostPerKg
            }}</span>
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

          <div class="field">
            <label for="targetSellingPrice">Target Selling Price (PHP/kg)</label>
            <input
              id="targetSellingPrice"
              v-model.number="form.targetSellingPrice"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 130"
              :aria-invalid="!!formErrors.targetSellingPrice"
            />
            <span v-if="formErrors.targetSellingPrice" class="field__error">{{
              formErrors.targetSellingPrice
            }}</span>
          </div>
        </div>
      </fieldset>

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
  max-width: 760px;
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
  gap: 1.5rem;
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
  margin: -1rem 0 0;
  font-size: 0.875rem;
  color: #64748b;
}

.fieldset {
  border: 1px solid #e2e8f0;
  border-radius: 0.65rem;
  padding: 1.1rem 1.25rem 1.35rem;
  margin: 0;
}

.fieldset legend {
  padding: 0 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field--wide {
  grid-column: 1 / -1;
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
