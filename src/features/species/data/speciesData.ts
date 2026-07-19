import type { AquaticSpecies } from "../types";

export const aquaticSpecies: AquaticSpecies[] = [
  {
    id: 1,
    commonName: 'Nile Tilapia',
    scientificName: 'Oreochromis niloticus',
    category: 'Fish',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Oreochromis_niloticus.jpg',
    description:
      'One of the most commonly farmed freshwater fish due to its rapid growth and adaptability.',
    habitat: 'Ponds, cages, lakes, and reservoirs',
    waterType: 'Freshwater',
    averageLifespan: '6–8 years',
    averageSize: '30–60 cm',
    farmingDifficulty: 'Beginner',
    idealTemperature: '25–30°C',
    idealPH: '6.5–8.5',
    diet: 'Omnivore',
    marketValue: 'High',
    tags: ['Tilapia', 'Freshwater', 'Fast Growing']
  },

  {
    id: 2,
    commonName: 'Milkfish (Bangus)',
    scientificName: 'Chanos chanos',
    category: 'Fish',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Chanos_chanos.jpg',
    description:
      'The national fish of the Philippines and a major aquaculture species.',
    habitat: 'Fish ponds, coastal lagoons, marine cages',
    waterType: 'Brackish Water',
    averageLifespan: '15 years',
    averageSize: '50–100 cm',
    farmingDifficulty: 'Intermediate',
    idealTemperature: '26–32°C',
    idealPH: '7.5–8.5',
    diet: 'Herbivore',
    marketValue: 'High',
    tags: ['Bangus', 'Brackish', 'Commercial']
  },

  {
    id: 3,
    commonName: 'Tiger Shrimp',
    scientificName: 'Penaeus monodon',
    category: 'Crustacean',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Penaeus_monodon.jpg',
    description:
      'A premium shrimp species widely cultured throughout Southeast Asia.',
    habitat: 'Coastal ponds',
    waterType: 'Brackish Water',
    averageLifespan: '2 years',
    averageSize: '20–35 cm',
    farmingDifficulty: 'Advanced',
    idealTemperature: '28–31°C',
    idealPH: '7.8–8.5',
    diet: 'Omnivore',
    marketValue: 'High',
    tags: ['Shrimp', 'Export', 'Premium']
  },

  {
    id: 4,
    commonName: 'African Catfish',
    scientificName: 'Clarias gariepinus',
    category: 'Fish',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Clarias_gariepinus.jpg',
    description:
      'A hardy freshwater fish known for fast growth and tolerance to low oxygen.',
    habitat: 'Earthen ponds and tanks',
    waterType: 'Freshwater',
    averageLifespan: '8 years',
    averageSize: '70–100 cm',
    farmingDifficulty: 'Beginner',
    idealTemperature: '26–30°C',
    idealPH: '6.5–8.0',
    diet: 'Carnivore',
    marketValue: 'Medium',
    tags: ['Catfish', 'Freshwater']
  },

  {
    id: 5,
    commonName: 'Mud Crab',
    scientificName: 'Scylla serrata',
    category: 'Crustacean',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Scylla_serrata.jpg',
    description:
      'A high-value crab species commonly farmed in mangrove and estuarine areas.',
    habitat: 'Mangroves and crab ponds',
    waterType: 'Brackish Water',
    averageLifespan: '4 years',
    averageSize: '20–25 cm',
    farmingDifficulty: 'Intermediate',
    idealTemperature: '26–31°C',
    idealPH: '7.5–8.5',
    diet: 'Carnivore',
    marketValue: 'High',
    tags: ['Crab', 'Mangrove']
  },

  {
    id: 6,
    commonName: 'Pacific White Shrimp',
    scientificName: 'Litopenaeus vannamei',
    category: 'Crustacean',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Litopenaeus_vannamei.jpg',
    description:
      'A fast-growing shrimp species widely farmed for commercial production.',
    habitat: 'Lined ponds and raceways',
    waterType: 'Brackish Water',
    averageLifespan: '2 years',
    averageSize: '18–23 cm',
    farmingDifficulty: 'Intermediate',
    idealTemperature: '27–30°C',
    idealPH: '7.5–8.5',
    diet: 'Omnivore',
    marketValue: 'High',
    tags: ['Vannamei', 'Shrimp']
  },

  {
    id: 7,
    commonName: 'Sea Bass (Barramundi)',
    scientificName: 'Lates calcarifer',
    category: 'Fish',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lates_calcarifer.jpg',
    description:
      'Also known as Barramundi, valued for its firm meat and export potential.',
    habitat: 'Marine cages and estuaries',
    waterType: 'Saltwater',
    averageLifespan: '20 years',
    averageSize: '60–120 cm',
    farmingDifficulty: 'Advanced',
    idealTemperature: '26–30°C',
    idealPH: '7.8–8.5',
    diet: 'Carnivore',
    marketValue: 'High',
    tags: ['Barramundi', 'Marine']
  },

  {
    id: 8,
    commonName: 'Green Mussel',
    scientificName: 'Perna viridis',
    category: 'Mollusk',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Perna_viridis.jpg',
    description:
      'A filter-feeding shellfish commonly cultured using rope and stake methods.',
    habitat: 'Coastal waters',
    waterType: 'Saltwater',
    averageLifespan: '3 years',
    averageSize: '10–15 cm',
    farmingDifficulty: 'Beginner',
    idealTemperature: '24–30°C',
    idealPH: '7.8–8.5',
    diet: 'Plankton',
    marketValue: 'Medium',
    tags: ['Shellfish']
  },

  {
    id: 9,
    commonName: 'Red Seaweed',
    scientificName: 'Kappaphycus alvarezii',
    category: 'Seaweed',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kappaphycus_alvarezii.jpg',
    description:
      'One of the most important seaweeds cultivated for carrageenan production.',
    habitat: 'Coastal farms',
    waterType: 'Saltwater',
    averageLifespan: '45 days per culture cycle',
    averageSize: '30–100 cm',
    farmingDifficulty: 'Beginner',
    idealTemperature: '26–30°C',
    idealPH: '8.0–8.3',
    diet: 'Photosynthesis',
    marketValue: 'Medium',
    tags: ['Seaweed', 'Carrageenan']
  }
];
