export interface FarmPlanRequest {
  species: string
  cultureSystem: string
  farmArea: number
  stockingDensity: number
  waterSource: string
  budget: number
  productionGoal: string
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
  id?: number
  species: string
  waterParameters: WaterParameters
  farmPreparation: FarmPreparation[]
  management: Management
  equipment: EquipmentRecommendation[]
  compatibleSpecies: CompatibleSpecies[]
  diseases: Disease[]
  riskAssessment: RiskAssessment
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
}
