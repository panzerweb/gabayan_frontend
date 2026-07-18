import { ref } from 'vue'
import type { FarmResponse } from '../types/farmPlan'
import { fetchFarms } from '../services/farmService'

export function useFarm() {
  const isLoading = ref(false)
  const farms = ref<FarmResponse[] | []>()

  async function getFarms(): Promise<FarmResponse[]> {
    isLoading.value = true

    try {
      farms.value = await fetchFarms()

      return farms.value
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, farms, getFarms }
}
