// types.ts

export interface AquaticDisease {
  id: number

  name: string
  scientificName?: string

  affectedSpecies: string[]

  category:
    | 'Bacterial'
    | 'Viral'
    | 'Parasitic'
    | 'Fungal'
    | 'Environmental'

  severity:
    | 'Low'
    | 'Medium'
    | 'High'
    | 'Critical'

  imageUrl: string

  description: string

  symptoms: string[]

  causes: string[]

  prevention: string[]

  treatment: string[]

  affectedWaterType:
    | 'Freshwater'
    | 'Brackish Water'
    | 'Saltwater'
    | 'All'

  commonIn: string[]

  tags: string[]
}
