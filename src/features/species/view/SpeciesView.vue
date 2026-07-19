<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { aquaticSpecies } from '../data/speciesData'
import type { AquaticSpecies } from '../types'

const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref<'All' | AquaticSpecies['category']>('All')

const categories = [
  'All',
  'Fish',
  'Crustacean',
  'Mollusk',
  'Seaweed',
]

const filteredSpecies = computed(() => {
  return aquaticSpecies.filter((species) => {
    const matchesSearch =
      species.commonName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      species.scientificName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === 'All' ||
      species.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})


function openSpecies(id: number) {
  router.push({
    name: 'species-detail',
    params: {
      id,
    },
  })
}


function difficultyColor(
  difficulty: AquaticSpecies['farmingDifficulty']
) {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-700'

    case 'Intermediate':
      return 'bg-orange-100 text-orange-700'

    case 'Advanced':
      return 'bg-red-100 text-red-700'
  }
}


function waterColor(
  water: AquaticSpecies['waterType']
) {
  switch (water) {
    case 'Freshwater':
      return 'bg-blue-100 text-blue-700'

    case 'Brackish Water':
      return 'bg-teal-100 text-teal-700'

    case 'Saltwater':
      return 'bg-indigo-100 text-indigo-700'
  }
}
</script>


<template>
  <div class="min-h-screen bg-green-50">

    <div class="mx-auto max-w-7xl px-5 py-10">


      <!-- Header -->
      <section class="mb-10 text-center">

        <div class="mb-4 text-6xl">
          🐟
        </div>

        <h1 class="text-3xl font-bold text-green-900">
          Aquatic Species Encyclopedia
        </h1>

        <p class="mx-auto mt-3 max-w-xl text-gray-600">
          Learn about different fish, shrimp, crabs,
          mollusks, and seaweed species commonly
          raised in aquaculture.
        </p>

      </section>



      <!-- Search -->
      <div class="mb-6">

        <div
          class="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm"
        >

          <span class="text-xl">
            🔍
          </span>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search species..."
            class="w-full bg-transparent text-lg outline-none"
          />

        </div>

      </div>



      <!-- Category Filter -->
      <div class="mb-8 flex gap-3 overflow-x-auto pb-2">

        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category as any"
          class="whitespace-nowrap rounded-full px-5 py-3 font-medium transition"
          :class="
            selectedCategory === category
              ? 'bg-green-700 text-white'
              : 'bg-white text-gray-700 hover:bg-green-100'
          "
        >
          {{ category }}
        </button>

      </div>



      <!-- Species Count -->
      <div class="mb-5">

        <p class="text-gray-600">
          Showing
          <strong>
            {{ filteredSpecies.length }}
          </strong>
          species
        </p>

      </div>



      <!-- Encyclopedia Grid -->
      <div
        v-if="filteredSpecies.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >

        <article
          v-for="species in filteredSpecies"
          :key="species.id"
          @click="openSpecies(species.id)"
          class="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >


          <!-- Image -->
          <div
            class="flex h-48 items-center justify-center bg-green-100"
          >

            <img
              v-if="species.imageUrl"
              :src="species.imageUrl"
              :alt="species.commonName"
              class="h-full w-full object-cover"
            />

            <span
              v-else
              class="text-6xl"
            >
              🐟
            </span>

          </div>



          <!-- Content -->
          <div class="p-6">


            <div class="mb-2">

              <h2
                class="text-xl font-bold text-gray-900"
              >
                {{ species.commonName }}
              </h2>

              <p
                class="italic text-gray-500"
              >
                {{ species.scientificName }}
              </p>

            </div>



            <!-- Badges -->
            <div class="mb-4 flex flex-wrap gap-2">


              <span
                class="rounded-full px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700"
              >
                {{ species.category }}
              </span>


              <span
                class="rounded-full px-3 py-1 text-sm font-medium"
                :class="
                  difficultyColor(
                    species.farmingDifficulty
                  )
                "
              >
                {{ species.farmingDifficulty }}
              </span>


              <span
                class="rounded-full px-3 py-1 text-sm font-medium"
                :class="
                  waterColor(
                    species.waterType
                  )
                "
              >
                {{ species.waterType }}
              </span>


            </div>




            <!-- Description -->
            <p
              class="line-clamp-3 leading-relaxed text-gray-600"
            >
              {{ species.description }}
            </p>




            <!-- Footer -->
            <div
              class="mt-5 flex items-center justify-between border-t pt-4"
            >

              <div>

                <p class="text-xs text-gray-500">
                  Market Value
                </p>

                <p
                  class="font-semibold text-green-700"
                >
                  {{ species.marketValue }}
                </p>

              </div>


              <span
                class="font-semibold text-green-700"
              >
                Learn More →
              </span>


            </div>


          </div>

        </article>

      </div>



      <!-- Empty State -->
      <div
        v-else
        class="rounded-3xl bg-white p-10 text-center shadow"
      >

        <div class="text-5xl">
          🔎
        </div>

        <h3
          class="mt-4 text-xl font-bold"
        >
          No species found
        </h3>

        <p class="mt-2 text-gray-600">
          Try searching another species or category.
        </p>

      </div>


    </div>

  </div>
</template>
