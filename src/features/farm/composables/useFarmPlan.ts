import { ref } from 'vue'
import { generateFarmPlan, saveFarmPlanEndpoint } from '../services/farmPlanService'
import type { FarmPlanPayload, FarmPlanRequest, FarmPlanResponse } from '../types/farmPlan'

export function useFarmPlan() {
  const loading = ref(false)

  const farmPlan = ref<FarmPlanPayload | null>(null)

  async function saveFarmPlan(payload: FarmPlanPayload): Promise<boolean> {
    loading.value = true;

    try {
      const result = await saveFarmPlanEndpoint(payload);

      if (result) {
        return true;
      }

      throw Error("Can't save farm plan!")
    } catch (error) {
      console.log(error);
      return false;
    }finally {
      loading.value = false
    }
  }

  async function createPlan(payload: FarmPlanRequest): Promise<FarmPlanPayload> {
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
    saveFarmPlan,
  }
}
