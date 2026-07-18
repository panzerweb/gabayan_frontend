import { ref } from 'vue'
import { generateFarmPlan } from '../services/farmPlanService'
import type { FarmPlanRequest, FarmPlanResponse } from '../types/farmPlan'

export function useFarmPlan() {
  const loading = ref(false)

  const farmPlan = ref<FarmPlanResponse | null>(null)

  async function createPlan(payload: FarmPlanRequest): Promise<FarmPlanResponse> {
    loading.value = true

    try {
      farmPlan.value = await generateFarmPlan(payload)

      return farmPlan.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    farmPlan,
    createPlan,
  }
}
