import type { FarmPlanRequest, FarmPlanResponse } from '../types/farmPlan'

import { mockEquipments } from '@/mock/equipmentsMock'
import { mockFeeds } from '@/mock/feedsMock'

export async function generateFarmPlan(payload: FarmPlanRequest): Promise<FarmPlanResponse> {
  console.log('Mock AI POST /farm-plan', payload)

  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  /*
    Mock AI recommendation logic

    Later this will be replaced by:
    Backend AI Service
    |
    Species Analysis
    |
    Farm Condition Analysis
    |
    Recommendation Model
  */

  // Normalize once so every check below agrees with each other
  const speciesKey = payload.speciesName.trim().toLowerCase()
  const isTilapia = speciesKey === 'tilapia'

  const stockingDensityMultiplier = isTilapia ? 5 : 3

  const recommendedDensity = payload.pondSize * stockingDensityMultiplier

  /*
    Randomly select recommendations to simulate AI decision making.

    IMPORTANT: Array.prototype.sort() mutates in place. Sorting the
    imported mock arrays directly would permanently shuffle the shared
    mock data on every call. Spread into a new array first so each
    call gets its own copy to shuffle.
  */

  const recommendedEquipment = [...mockEquipments].sort(() => Math.random() - 0.5).slice(0, 4)

  const recommendedFeeds = [...mockFeeds].sort(() => Math.random() - 0.5).slice(0, 3)

  return {
    id: 1,
    speciesName: isTilapia ? 'Nile Tilapia (Oreochromis niloticus)' : payload.speciesName,

    recommendedStockingDensity: recommendedDensity,

    estimatedHarvestDays: isTilapia ? 150 : 120,

    recommendedToolsEquipments: recommendedEquipment,

    recommendedBrandOfFeeds: recommendedFeeds,

    recommendedWaterParameters: {
      salinity: isTilapia ? '0 - 5 ppt' : '15 - 25 ppt',

      ph: '6.5 - 8.5',

      ammonia: '< 0.05 mg/L',

      nitrite: '< 0.2 mg/L',

      dissolvedOxygen: '5 - 8 mg/L',

      waterTemperature: '26°C - 32°C',
    },
  }
}
