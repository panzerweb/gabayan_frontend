import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { FarmPlanRequest, FarmPlanResponse } from '@/features/farm/types/farmPlan'

import { useFarmPlan } from '@/features/farm/composables/useFarmPlan'

export const useFarmPlanStore = defineStore('farmPlan', () => {
  const request = ref<FarmPlanRequest | null>(null)

  const farmPlan = ref<FarmPlanResponse | null>(null)

  const loading = ref(false)

  const error = ref<string | null>(null)

  async function generatePlan(payload: FarmPlanRequest) {
    try {
      loading.value = true
      error.value = null

      request.value = payload

      const { createPlan } = useFarmPlan()

      const result = await createPlan(payload)

      farmPlan.value = result
    } catch (err: any) {
      error.value = err.message ?? 'Failed generating farm plan'
    } finally {
      loading.value = false
    }
  }

  function clearPlan() {
    request.value = null
    farmPlan.value = null
  }

  return {
    request,
    farmPlan,
    loading,
    error,

    generatePlan,
    clearPlan,
  }
})
