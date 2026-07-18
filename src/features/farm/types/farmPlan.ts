export interface FarmPlanRequest {
  speciesId: number
  pondSize: number
  waterType: string
  budget: number
}

export interface FarmPlanResponse {
  species: string
  recommendedStockingDensity: number
  estimatedHarvestDays: number
  recommendedFeeds: string[]
  equipment: string[]
  waterParameters: {
    ph: string
    temperature: string
    oxygen: string
  }
}
