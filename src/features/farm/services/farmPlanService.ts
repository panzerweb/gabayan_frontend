import type { FarmPlanRequest, FarmPlanResponse } from '../types/farmPlan'

export async function generateFarmPlan(payload: FarmPlanRequest): Promise<FarmPlanResponse> {
  console.log('Mock POST /farm-plan', payload)

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    species: 'Tilapia',

    recommendedStockingDensity: 50 * payload.pondSize,

    estimatedHarvestDays: 180,

    recommendedFeeds: ['Starter Feed', 'Grower Feed', 'Finisher Feed'],

    equipment: ['Aerator', 'Water Testing Kit', 'Automatic Feeder'],

    waterParameters: {
      ph: '6.5 - 8.5',
      temperature: '26°C - 30°C',
      oxygen: '5mg/L+',
    },
  }
}
