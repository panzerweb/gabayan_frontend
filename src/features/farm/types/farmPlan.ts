/*
|--------------------------------------------------------------------------
| POST /farm-plan
|--------------------------------------------------------------------------
*/
export type CultureSystem = 'pond' | 'fish_cage' | 'tank'

export interface FarmPlanRequest {
  speciesName: string
  cultureSystem: CultureSystem
  pondSize: number
  budget: number
}

/*
|--------------------------------------------------------------------------
| Farm Plan Response
|--------------------------------------------------------------------------
*/

export interface FarmPlanResponse {
  id: number
  speciesName: string
  recommendedStockingDensity: number
  estimatedHarvestDays: number

  recommendedToolsEquipments: EquipmentRecommendation[]

  recommendedBrandOfFeeds: FeedRecommendation[]

  recommendedWaterParameters: WaterParameters
}

/*
|--------------------------------------------------------------------------
| Equipment
|--------------------------------------------------------------------------
*/

export interface EquipmentRecommendation {
  id: number
  equipmentName: string
  equipmentDescription: string

  storeName: string
  latitude: number
  longitude: number
}

/*
|--------------------------------------------------------------------------
| Feed Recommendation
|--------------------------------------------------------------------------
*/

export interface FeedRecommendation {
  id: number
  feedsName: string
  feedsDescription: string
}

/*
|--------------------------------------------------------------------------
| Water Parameters
|--------------------------------------------------------------------------
*/

export interface WaterParameters {
  salinity: string
  ph: string
  ammonia: string
  nitrite: string
  dissolvedOxygen: string
  waterTemperature: string
}

/*
  Actual Farm Response interfaces alongside with
*/
export interface FarmResponse {
  id: number
  speciesName: string
  recommendedStockingDensity: number
  estimatedHarvestDays: number

  recommendedToolsEquipments: EquipmentResponse[]

  recommendedBrandOfFeeds: FeedResponse[]

  recommendedWaterParameters: WaterParameters
}

export interface EquipmentResponse {
  id: number
  equipmentName: string
  equipmentDescription: string

  storeName: string
  latitude: number
  longitude: number

  isBought: boolean
}

export interface FeedResponse {
  id: number
  feedsName: string
  feedsDescription: string
  isBought: boolean
}
