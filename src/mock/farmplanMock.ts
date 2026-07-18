import type { FarmPlanResponse } from '@/features/farm/types/farmPlan'

export const shrimpFarmPlan: FarmPlanResponse = {
  id: 1,
  speciesName: 'Pacific White Shrimp (Litopenaeus vannamei)',

  recommendedStockingDensity: 80,

  estimatedHarvestDays: 120,

  recommendedToolsEquipments: [
    {
      id: 1,
      equipmentName: 'Heavy Duty Paddle Wheel Aerator',
      equipmentDescription:
        'Essential equipment for maintaining oxygen levels in intensive shrimp ponds.',

      storeName: 'AquaWorld Philippines',
      latitude: 10.7202,
      longitude: 122.5621,
    },
    {
      id: 2,
      equipmentName: 'Digital Refractometer',
      equipmentDescription: 'Measures salinity levels to ensure optimal shrimp farming conditions.',

      storeName: 'FarmTech Supply',
      latitude: 13.7565,
      longitude: 121.0583,
    },
  ],

  recommendedBrandOfFeeds: [
    {
      id: 1,
      feedsName: 'CP Shrimp Feed',
      feedsDescription:
        'Commercial shrimp feed formulated for high survival rate and improved growth performance.',
    },
    {
      id: 2,
      feedsName: 'Uni-President Shrimp Feed',
      feedsDescription: 'Floating shrimp pellets designed for intensive pond cultivation.',
    },
  ],

  recommendedWaterParameters: {
    salinity: '15 - 25 ppt',
    ph: '7.5 - 8.5',
    ammonia: '< 0.1 mg/L',
    nitrite: '< 0.5 mg/L',
    dissolvedOxygen: '5 - 7 mg/L',
    waterTemperature: '28 - 32°C',
  },
}
