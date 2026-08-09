import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { FarmPlanPayload, FarmPlanRequest } from '@/features/farm/types/farmPlan'

import { useFarmPlan } from '@/features/farm/composables/useFarmPlan'

export const useFarmPlanStore = defineStore('farmPlan', () => {
  const request = ref<FarmPlanRequest | null>(null)

  const farmPlan = ref<FarmPlanPayload | null>(null)

  const loading = ref(false)

  const error = ref<string | null>(null)

  async function generatePlan(payload: FarmPlanRequest) {
    try {
      loading.value = true
      error.value = null

      request.value = payload

      const { createPlan } = useFarmPlan()

      const result = await createPlan(payload)
      console.log(`Result: ${result}`)

      farmPlan.value = result
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed generating farm plan'
    } finally {
      loading.value = false
    }
  }

  function clearPlan() {
    request.value = null
    farmPlan.value = null
    error.value = null
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
