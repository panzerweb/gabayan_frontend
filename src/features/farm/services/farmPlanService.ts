import type { FarmPlanRequest, FarmPlanResponse, FarmPlanAPIResponse } from '../types/farmPlan'
import apiClient from '@/services/apiClient'

export async function generateFarmPlan(payload: FarmPlanRequest): Promise<FarmPlanResponse> {
  const response = await apiClient.post<FarmPlanAPIResponse>('/api/farm-plan', payload)
  return response.data.farmPlan
}

