import type { FarmResponse } from '@/features/farm/types/farmPlan'

export const mockFarms: FarmResponse[] = [
  {
    id: 1,
    speciesName: 'Nile Tilapia (Oreochromis niloticus)',

    recommendedStockingDensity: 5,

    estimatedHarvestDays: 150,

    recommendedToolsEquipments: [
      {
        id: 1,
        equipmentName: '1HP Paddle Wheel Aerator',
        equipmentDescription:
          'Provides additional oxygen circulation for pond-based tilapia production.',

        storeName: 'AquaFarm Solutions Philippines',
        latitude: 7.0731,
        longitude: 125.6128,
        isBought: false,
      },
      {
        id: 2,
        equipmentName: 'Digital Water Quality Tester',
        equipmentDescription:
          'Measures pH, temperature, and dissolved oxygen levels for daily monitoring.',

        storeName: 'Mindanao Aquaculture Supply',
        latitude: 7.0647,
        longitude: 125.6087,
        isBought: false,
      },
    ],

    recommendedBrandOfFeeds: [
      {
        id: 1,
        feedsName: 'Santeh Premium Tilapia Grower',
        feedsDescription:
          'Floating pellets formulated for improved growth and feed conversion ratio.',
        isBought: false,
      },
      {
        id: 2,
        feedsName: 'B-Meg Aqua Tilapia Feed',
        feedsDescription:
          'Locally available aquaculture feed designed for freshwater tilapia farming.',
        isBought: false,
      },
    ],

    recommendedWaterParameters: {
      salinity: '0 - 5 ppt',
      ph: '6.5 - 8.5',
      ammonia: '< 0.05 mg/L',
      nitrite: '< 0.2 mg/L',
      dissolvedOxygen: '5 - 8 mg/L',
      waterTemperature: '26 - 32°C',
    },
  },

  {
    id: 2,
    speciesName: 'Pacific White Shrimp (Litopenaeus vannamei)',

    recommendedStockingDensity: 80,

    estimatedHarvestDays: 120,

    recommendedToolsEquipments: [
      {
        id: 3,
        equipmentName: 'Heavy Duty Paddle Wheel Aerator',
        equipmentDescription: 'High-capacity aerator used in intensive shrimp pond systems.',

        storeName: 'AquaWorld Philippines',
        latitude: 10.7202,
        longitude: 122.5621,
        isBought: false,
      },
      {
        id: 4,
        equipmentName: 'Digital Refractometer',
        equipmentDescription: 'Measures water salinity levels required for shrimp cultivation.',

        storeName: 'FarmTech Supply',
        latitude: 13.7565,
        longitude: 121.0583,
        isBought: false,
      },
    ],

    recommendedBrandOfFeeds: [
      {
        id: 3,
        feedsName: 'CP Shrimp Feed',
        feedsDescription:
          'Commercial shrimp feed formulated for high survival rate and improved growth.',
        isBought: false,
      },
      {
        id: 4,
        feedsName: 'Uni-President Shrimp Feed',
        feedsDescription: 'Floating shrimp pellets designed for intensive shrimp production.',
        isBought: false,
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
  },

  {
    id: 2,
    speciesName: 'Milkfish (Chanos chanos)',

    recommendedStockingDensity: 3,

    estimatedHarvestDays: 180,

    recommendedToolsEquipments: [
      {
        id: 5,
        equipmentName: 'Solar Pond Aerator',
        equipmentDescription:
          'Solar-powered aeration system suitable for brackish fishpond operations.',

        storeName: 'GreenFarm Innovations',
        latitude: 11.004,
        longitude: 124.607,
        isBought: false,
      },
      {
        id: 6,
        equipmentName: 'Water Pump 3HP',
        equipmentDescription: 'Used for water exchange and pond preparation activities.',

        storeName: 'FarmPro Agricultural Supply',
        latitude: 15.4828,
        longitude: 120.712,
        isBought: false,
      },
    ],

    recommendedBrandOfFeeds: [
      {
        id: 5,
        feedsName: 'Grobest Marine Fish Feed',
        feedsDescription: 'Floating feed formulated for marine and brackish aquaculture species.',
        isBought: false,
      },
      {
        id: 6,
        feedsName: 'Tiger Brand Fish Feed',
        feedsDescription: 'Affordable commercial feed suitable for milkfish farming.',
        isBought: false,
      },
    ],

    recommendedWaterParameters: {
      salinity: '10 - 30 ppt',
      ph: '7.5 - 8.5',
      ammonia: '< 0.05 mg/L',
      nitrite: '< 0.2 mg/L',
      dissolvedOxygen: '4 - 7 mg/L',
      waterTemperature: '27 - 31°C',
    },
  },

  {
    id: 3,
    speciesName: 'African Catfish (Clarias gariepinus)',

    recommendedStockingDensity: 50,

    estimatedHarvestDays: 90,

    recommendedToolsEquipments: [
      {
        id: 7,
        equipmentName: 'Biofilter Tank System',
        equipmentDescription: 'Filtration equipment used for intensive catfish tank farming.',

        storeName: 'Aquaculture Engineering PH',
        latitude: 14.5547,
        longitude: 121.0244,
        isBought: false,
      },
      {
        id: 8,
        equipmentName: 'Automatic Fish Feeder',
        equipmentDescription:
          'Automated feeder that releases feeds consistently throughout the day.',

        storeName: 'Aquatic Tech Philippines',
        latitude: 14.676,
        longitude: 121.0437,
        isBought: false,
      },
    ],

    recommendedBrandOfFeeds: [
      {
        id: 7,
        feedsName: 'AquaMax Catfish Feed',
        feedsDescription: 'High-protein pellets designed for rapid catfish growth.',
        isBought: false,
      },
      {
        id: 8,
        feedsName: 'Probiotic Enhanced Fish Feed',
        feedsDescription: 'Contains probiotics that support digestion and fish immunity.',
        isBought: false,
      },
    ],

    recommendedWaterParameters: {
      salinity: '0 ppt',
      ph: '6.5 - 8.0',
      ammonia: '< 0.05 mg/L',
      nitrite: '< 0.2 mg/L',
      dissolvedOxygen: '4 - 6 mg/L',
      waterTemperature: '25 - 30°C',
    },
  },
]
