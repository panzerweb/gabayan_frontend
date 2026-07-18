export type CultureSystem = 'pond' | 'cage' | 'tank';
export type FishSpecies = 'tilapia' | 'bangus' | 'hito' | 'lapu-lapu' | 'pasayan'
export type feedPreferences = 'Commercial Pellets' | 'Wild Pellets'
export type powerInfrastructure = 'Grid' | 'Solar'
export type laborAvailability = 'Solo / Family' | 'Hired Help'

export interface FarmPlanRequest {
  species: FishSpecies
  cultureSystem: CultureSystem
  farmArea: number
  stockingDensity: number
  waterSource: string
  budget: number
  productionGoal: string
  targetCycleDuration: number,
  feedPreference: feedPreferences,
  averageTemperature: number,
  targetHarvestWeightGrams: number,
  initialStockingWeightGrams: number,
  feedCostPerKg: number,
  powerInfrastructure: powerInfrastructure,
  targetSellingPrice: number,
  laborAvailability: laborAvailability
}

export interface WaterParameter {
  minimum?: number
  maximum?: number
  unit?: string
}

export interface WaterParameters {
  temperature?: WaterParameter
  salinity?: WaterParameter
  ph?: WaterParameter
  dissolvedOxygen?: WaterParameter
  ammonia?: WaterParameter
}

export interface FarmPreparation {
  step: number
  title: string
  description: string
}

export interface Management {
  feeding: {
    frequency: string
    feedType: string
  }
  waterChange: {
    frequency: string
  }
  dailyMonitoring: string[]
}

export interface EquipmentRecommendation {
  id: number
  name: string
  purpose: string
  importance: string
}

export interface CompatibleSpecies {
  name: string
  reason: string
}

export interface Disease {
  name: string
  symptoms: string[]
  prevention: string[]
}

export interface RiskAssessment {
  overallRisk: string
  reasons: string[]
  recommendations: string[]
}

export interface FarmPlanResponse {
  species: string
  waterParameters: WaterParameters
  farmPreparation: FarmPreparation[]
  management: Management
  equipment: EquipmentRecommendation[]
  compatibleSpecies: CompatibleSpecies[]
  diseases: Disease[]
  riskAssessment: RiskAssessment
  financialProjections: FinancialProjections
}

export interface FinancialProjections {
  estimatedFCR: number,
  estimatedSurvivalRate: number,
  estimatedTotalFeedCost: number,
  projectedRevenue: number,
  netProfit: number,
  estimatedROI: number
}

export interface FarmPlanPayload {
  request_inputs: FarmPlanRequest
  plan_data: FarmPlanResponse
}

export interface FarmPlanAPIResponse {
  farmPlan: FarmPlanResponse
}

export interface FarmTask {
  id: string
  title: string
  description?: string
  status?: string
}

export interface FarmWaterTarget {
  id: string
  parameter: string
  minimum?: number
  maximum?: number
  unit?: string
}

export interface EquipmentSourcing {
  recommendedChannel?: string
  storeName?: string
  addressOrPlatform?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  searchQueryOrUrl?: string
  buyingTip?: string
}

export interface FarmEquipment {
  id: string
  name: string
  purpose?: string
  importance?: string
  estimatedCost?: number
  diyAlternative?: string | null
  sourcing?: EquipmentSourcing
}

export interface FarmResponse {
  id: string
  user_id: string
  species: string
  culture_system: string
  created_at: string
  tasks: FarmTask[]
  water_targets: FarmWaterTarget[]
  equipments: FarmEquipment[]
  diseases?: Disease[]
  compatible_species?: CompatibleSpecies[]
  financial_projections?: FinancialProjections
  risk_assessment?: RiskAssessment
  recommendation?: string
  plan_data?: FarmPlanResponse
}

