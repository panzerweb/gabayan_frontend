import type { AquaticDisease } from "../types"


export const aquaticDiseases: AquaticDisease[] = [

  {
    id: 1,

    name: "Aeromonas Infection",

    scientificName:
      "Aeromonas hydrophila",

    affectedSpecies: [
      "Nile Tilapia",
      "African Catfish",
      "Milkfish"
    ],

    category: "Bacterial",

    severity: "High",

    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Aeromonas_hydrophila.jpg",

    description:
      "A common bacterial disease affecting freshwater fish, especially when water quality is poor or fish are stressed.",


    symptoms: [
      "Skin ulcers",
      "Red patches on body",
      "Loss of appetite",
      "Slow movement",
      "Fin damage"
    ],


    causes: [
      "Poor water quality",
      "Overcrowding",
      "High organic waste",
      "Stress"
    ],


    prevention: [
      "Maintain good water quality",
      "Avoid overcrowding",
      "Provide proper nutrition",
      "Quarantine new fish"
    ],


    treatment: [
      "Improve water conditions",
      "Remove affected fish",
      "Consult aquatic veterinarian for medication"
    ],


    affectedWaterType:
      "Freshwater",


    commonIn: [
      "Fish ponds",
      "Tanks",
      "Cages"
    ],


    tags: [
      "Bacteria",
      "Ulcer Disease",
      "Freshwater"
    ]
  },



  {
    id: 2,

    name: "White Spot Disease",

    scientificName:
      "Ichthyophthirius multifiliis",


    affectedSpecies: [
      "Tilapia",
      "Catfish",
      "Ornamental Fish"
    ],


    category:
      "Parasitic",


    severity:
      "Medium",


    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ichthyophthirius_multifiliis.jpg",


    description:
      "A parasitic infection identified by small white spots appearing on fish skin and gills.",


    symptoms: [
      "White spots on body",
      "Rubbing against surfaces",
      "Rapid breathing",
      "Reduced feeding"
    ],


    causes: [
      "Sudden temperature changes",
      "Stress",
      "Introduction of infected fish"
    ],


    prevention: [
      "Quarantine new stocks",
      "Maintain stable water temperature",
      "Regular monitoring"
    ],


    treatment: [
      "Increase water temperature carefully",
      "Use approved parasite treatments",
      "Improve water quality"
    ],


    affectedWaterType:
      "Freshwater",


    commonIn: [
      "Fish ponds",
      "Aquariums"
    ],


    tags: [
      "Parasite",
      "White Spot",
      "Common Disease"
    ]
  },



  {
    id: 3,

    name: "Early Mortality Syndrome (EMS)",

    scientificName:
      "Acute Hepatopancreatic Necrosis Disease (AHPND)",


    affectedSpecies: [
      "Pacific White Shrimp",
      "Tiger Shrimp"
    ],


    category:
      "Bacterial",


    severity:
      "Critical",


    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Shrimp_farming.jpg",


    description:
      "A serious shrimp disease that can cause high mortality during early culture stages.",


    symptoms: [
      "Sudden deaths",
      "Empty digestive tract",
      "Weak swimming",
      "Slow growth"
    ],


    causes: [
      "Pathogenic bacteria",
      "Poor pond preparation",
      "Poor biosecurity"
    ],


    prevention: [
      "Proper pond preparation",
      "Use healthy post larvae",
      "Maintain biosecurity"
    ],


    treatment: [
      "Remove affected stocks",
      "Improve pond conditions",
      "Consult specialists"
    ],


    affectedWaterType:
      "Brackish Water",


    commonIn: [
      "Shrimp ponds"
    ],


    tags: [
      "Shrimp",
      "High Risk",
      "Bacteria"
    ]
  },



  {
    id: 4,

    name: "Saprolegniasis",

    scientificName:
      "Saprolegnia spp.",


    affectedSpecies: [
      "Tilapia",
      "Milkfish",
      "Catfish"
    ],


    category:
      "Fungal",


    severity:
      "Medium",


    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Saprolegnia.jpg",


    description:
      "A fungal infection that commonly affects injured or stressed fish.",


    symptoms: [
      "Cotton-like growth on skin",
      "Skin damage",
      "Weakness"
    ],


    causes: [
      "Fish injuries",
      "Poor water quality",
      "Low immunity"
    ],


    prevention: [
      "Reduce handling stress",
      "Maintain clean water",
      "Avoid overcrowding"
    ],


    treatment: [
      "Improve water quality",
      "Remove infected fish",
      "Apply appropriate antifungal treatment"
    ],


    affectedWaterType:
      "Freshwater",


    commonIn: [
      "Ponds",
      "Hatcheries"
    ],


    tags: [
      "Fungus",
      "Skin Disease"
    ]
  },



  {
    id: 5,

    name: "Poor Water Quality Stress",

    affectedSpecies: [
      "All Fish Species"
    ],


    category:
      "Environmental",


    severity:
      "High",


    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Fish_pond.jpg",


    description:
      "Stress caused by unsuitable water parameters that weakens fish immunity and increases disease risk.",


    symptoms: [
      "Fish gasping at surface",
      "Slow growth",
      "Loss of appetite",
      "Mass mortality"
    ],


    causes: [
      "Low oxygen",
      "High ammonia",
      "Incorrect pH",
      "Overfeeding"
    ],


    prevention: [
      "Monitor water parameters",
      "Regular water exchange",
      "Proper feeding"
    ],


    treatment: [
      "Increase aeration",
      "Correct water parameters",
      "Reduce feeding temporarily"
    ],


    affectedWaterType:
      "All",


    commonIn: [
      "Ponds",
      "Cages",
      "Tanks"
    ],


    tags: [
      "Water Quality",
      "Management"
    ]
  }

]
