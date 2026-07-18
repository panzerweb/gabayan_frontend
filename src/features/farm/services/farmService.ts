import apiClient from '@/services/apiClient'
import type { FarmResponse } from '../types/farmPlan'

export async function fetchFarms(): Promise<FarmResponse[]> {
  const response = await apiClient.get<{ data: FarmResponse[] }>('/api/farms')
  return response.data.data
}

export async function getFarmById(farmId: string): Promise<FarmResponse | undefined> {
  const response = await apiClient.get<{ data: FarmResponse }>(`/api/farms/${farmId}`)
  return response.data.data
}
