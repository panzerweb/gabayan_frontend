import type { ApiResponse } from '@/core/apiResponse'
import type { FarmPlanRequest, FarmPlanResponse, FarmPlanPayload } from '../types/farmPlan'
import apiClient from '@/services/apiClient'
import type { L } from 'vue-router/dist/index-BN0B0y8a.js'

export async function generateFarmPlan(payload: FarmPlanRequest): Promise<FarmPlanPayload> {
  console.log("Service for Farm plan hit")
  const response = await apiClient.post<ApiResponse<FarmPlanPayload>>('/api/farms/generate', payload)

  console.log(`Response from API: ${response.data.data}`)
  return response.data.data
}

export async function saveFarmPlanEndpoint(payload: FarmPlanPayload): Promise<boolean> {
  console.log("Service for save farm plan hit");

  const result = await apiClient.post<ApiResponse<FarmPlanPayload>>('/api/farms', payload);

  if (result.status == 200) {
    return true;
  }
  return false;
}

