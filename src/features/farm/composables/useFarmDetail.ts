import { ref } from 'vue'

import type { FarmResponse } from '../types/farmPlan'
import { getFarmById } from '../services/farmService'

export function useFarmDetail() {
  const farm = ref<FarmResponse | null>(null)

  const loading = ref(false)

  const error = ref<string | null>(null)

  // Distinct from `error`: the request succeeded, there's just no plan
  // with that id. Kept separate so the view can show a "not found"
  // message instead of a generic error state.
  const notFound = ref(false)

  async function getFarmDetail(id: string) {
    loading.value = true
    error.value = null
    notFound.value = false

    try {
      const result: FarmResponse | undefined = await getFarmById(id)

      if (typeof result !== 'undefined') {
        return (farm.value = result)
      }
      if (!result) {
        farm.value = null
        notFound.value = true
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to load farm plan'
    } finally {
      loading.value = false
    }
  }

  return {
    farm,
    loading,
    error,
    notFound,
    getFarmDetail,
  }
}
