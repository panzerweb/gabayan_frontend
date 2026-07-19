export interface AquaticSpecies {
  id: number

  commonName: string
  scientificName: string

  category: 'Fish' | 'Crustacean' | 'Mollusk' | 'Seaweed'

  imageUrl: string

  description: string

  habitat: string
  waterType: 'Freshwater' | 'Brackish Water' | 'Saltwater'

  averageLifespan: string
  averageSize: string

  farmingDifficulty: 'Beginner' | 'Intermediate' | 'Advanced'

  idealTemperature: string
  idealPH: string

  diet: string

  marketValue: 'Low' | 'Medium' | 'High'

  tags: string[]
}
