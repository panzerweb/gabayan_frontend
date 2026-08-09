import { ref } from 'vue'
import type { SlimFarmResponse } from '../types/farmPlan'
import { fetchFarms, deleteFarm } from '../services/farmService'

export function useFarm() {
  const isLoading = ref(false)
  const isDeleting = ref(false)
  const farms = ref<SlimFarmResponse[] | []>()

  async function getFarms(): Promise<SlimFarmResponse[]> {
    isLoading.value = true

    try {
      farms.value = await fetchFarms()

      return farms.value
    } finally {
      isLoading.value = false
    }
  }

  async function removeFarm(farmId: string): Promise<void> {
    isDeleting.value = true
    try {
      await deleteFarm(farmId)
      if (farms.value) {
        farms.value = farms.value.filter(f => f.id !== farmId)
      }
    } finally {
      isDeleting.value = false
    }
  }

  return { isLoading, isDeleting, farms, getFarms, removeFarm }
}
