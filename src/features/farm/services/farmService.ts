import apiClient from '@/services/apiClient'
import type { FarmResponse, FarmWaterTarget } from '../types/farmPlan'

export async function fetchFarms(): Promise<FarmResponse[]> {
  const response = await apiClient.get<{ data: FarmResponse[] }>('/api/farms')
  return response.data.data
}

export async function getFarmById(farmId: string): Promise<FarmResponse | undefined> {
  const response = await apiClient.get<{ data: FarmResponse }>(`/api/farms/${farmId}`)
  return response.data.data
}

export async function getWaterTargetsByFarmId(farmId: string): Promise<FarmWaterTarget[]> {
  const response = await apiClient.get<{ data: any[] }>(`/api/farms/${farmId}/water-targets`)
  // Map backend response fields to frontend interface
  return response.data.data.map(target => ({
    id: target.id,
    parameter: target.parameter_name || target.parameter,
    minimum: target.min_value !== undefined ? target.min_value : target.minimum,
    maximum: target.max_value !== undefined ? target.max_value : target.maximum,
    unit: target.unit
  }))
}
