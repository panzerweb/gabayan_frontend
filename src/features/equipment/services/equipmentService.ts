import apiClient from '@/services/apiClient'
import type { FarmEquipment } from '@/features/farm/types/farmPlan'

export async function getEquipmentById(equipmentId: string): Promise<FarmEquipment | undefined> {
  try {
    const response = await apiClient.get<{ data: FarmEquipment }>(`/api/equipments/${equipmentId}`)
    return response.data.data
  } catch (error) {
    // Fallback mock data if endpoint doesn't exist yet
    console.warn(`Failed to fetch equipment ${equipmentId} from API, using mock data`, error)
    return {
      id: equipmentId,
      name: "Water Pump (Centrifugal, 2-3 HP)",
      purpose: "To draw water from the river source and maintain water levels during dry seasons.",
      importance: "High",
      estimatedCost: 6500,
      diyAlternative: null,
      sourcing: {
        recommendedChannel: "Local Physical Store",
        storeName: "Local Agricultural Hardware Depot / CitiHardware",
        addressOrPlatform: "Provincial Highway Commercial District (Nearest Municipal Hardware)",
        coordinates: {
          latitude: 16.3251, 
          longitude: 121.1685
        },
        searchQueryOrUrl: "Agricultural water pump dealer hardware",
        buyingTip: "Check if the pump includes a brass impeller (more durable for turbid river water) and check local availability of replacement seals."
      }
    }
  }
}
