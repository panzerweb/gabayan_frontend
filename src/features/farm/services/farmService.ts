import { mockFarms } from '@/mock/farmsMock'
import type { FarmResponse } from '../types/farmPlan'

export async function fetchFarms(): Promise<FarmResponse[]> {
  console.log('Mock AI GET /farm-plan')

  await new Promise((resolve) => setTimeout(resolve, 1500))

  const result: FarmResponse[] = mockFarms
  console.log(result)

  return result
}

export async function getFarmById(farmId: number): Promise<FarmResponse | undefined> {
  console.log('Mock GET /farm-plan/{farmId}')

  await new Promise((resolve) => setTimeout(resolve, 1500))

  const result: FarmResponse | undefined = mockFarms.find((farm) => farm.id == farmId)

  return result
}
