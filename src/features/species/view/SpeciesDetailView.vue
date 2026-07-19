<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { aquaticSpecies } from '../data/speciesData'
import type { AquaticSpecies } from '../types'

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const species = computed<AquaticSpecies | undefined>(() => {
  return aquaticSpecies.find((item) => item.id === Number(props.id))
})

onMounted(() => {
  species.value
})

function goBack() {
  router.back()
}

function difficultyColor(difficulty: AquaticSpecies['farmingDifficulty']) {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-700'

    case 'Intermediate':
      return 'bg-orange-100 text-orange-700'

    case 'Advanced':
      return 'bg-red-100 text-red-700'
  }
}

function waterColor(water: AquaticSpecies['waterType']) {
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
  <div v-if="species" class="min-h-screen bg-green-50">
    <div class="mx-auto max-w-5xl px-5 py-8">
      <!-- Back Button -->

      <button @click="goBack" class="mb-6 flex items-center gap-2 text-green-700 font-medium">
        ← Back to Species
      </button>

      <!-- Header Card -->

      <section class="overflow-hidden rounded-3xl bg-white shadow">
        <!-- Image -->

        <div class="flex h-72 items-center justify-center bg-green-100">
          <img
            v-if="species.imageUrl"
            :src="species.imageUrl"
            :alt="species.commonName"
            class="h-full w-full object-cover"
          />

          <span v-else class="text-8xl"> 🐟 </span>
        </div>

        <div class="p-7">
          <h1 class="text-3xl font-bold text-green-900">
            {{ species.commonName }}
          </h1>

          <p class="mt-1 text-lg italic text-gray-500">
            {{ species.scientificName }}
          </p>

          <div class="mt-5 flex flex-wrap gap-3">
            <span class="rounded-full bg-gray-100 px-4 py-2 font-medium">
              {{ species.category }}
            </span>

            <span
              class="rounded-full px-4 py-2 font-medium"
              :class="difficultyColor(species.farmingDifficulty)"
            >
              {{ species.farmingDifficulty }}
            </span>

            <span class="rounded-full px-4 py-2 font-medium" :class="waterColor(species.waterType)">
              {{ species.waterType }}
            </span>
          </div>
        </div>
      </section>

      <!-- About -->

      <section class="mt-6 rounded-3xl bg-white p-7 shadow">
        <h2 class="text-2xl font-bold text-green-900">About this Species</h2>

        <p class="mt-4 leading-relaxed text-gray-700">
          {{ species.description }}
        </p>
      </section>

      <!-- Quick Facts -->

      <section class="mt-6">
        <h2 class="mb-4 text-2xl font-bold text-green-900">Quick Information</h2>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl bg-white p-5 shadow">
            <p class="text-sm text-gray-500">Water Type</p>

            <p class="mt-1 text-lg font-bold">
              {{ species.waterType }}
            </p>
          </div>

          <div class="rounded-2xl bg-white p-5 shadow">
            <p class="text-sm text-gray-500">Ideal Temperature</p>

            <p class="mt-1 text-lg font-bold">
              {{ species.idealTemperature }}
            </p>
          </div>

          <div class="rounded-2xl bg-white p-5 shadow">
            <p class="text-sm text-gray-500">Ideal pH Level</p>

            <p class="mt-1 text-lg font-bold">
              {{ species.idealPH }}
            </p>
          </div>

          <div class="rounded-2xl bg-white p-5 shadow">
            <p class="text-sm text-gray-500">Diet</p>

            <p class="mt-1 text-lg font-bold">
              {{ species.diet }}
            </p>
          </div>

          <div class="rounded-2xl bg-white p-5 shadow">
            <p class="text-sm text-gray-500">Average Size</p>

            <p class="mt-1 text-lg font-bold">
              {{ species.averageSize }}
            </p>
          </div>

          <div class="rounded-2xl bg-white p-5 shadow">
            <p class="text-sm text-gray-500">Lifespan</p>

            <p class="mt-1 text-lg font-bold">
              {{ species.averageLifespan }}
            </p>
          </div>
        </div>
      </section>

      <!-- Habitat -->

      <section class="mt-6 rounded-3xl bg-white p-7 shadow">
        <h2 class="text-2xl font-bold text-green-900">Natural Habitat</h2>

        <p class="mt-4 text-gray-700 leading-relaxed">
          {{ species.habitat }}
        </p>
      </section>

      <!-- Farming Information -->

      <section class="mt-6 rounded-3xl bg-white p-7 shadow">
        <h2 class="text-2xl font-bold text-green-900">Farming Information</h2>

        <div class="mt-5 rounded-2xl bg-green-50 p-5">
          <p class="text-gray-700">
            This species has a
            <strong>
              {{ species.farmingDifficulty }}
            </strong>
            farming difficulty level.
          </p>

          <p class="mt-2 text-gray-700">
            Market value:
            <strong>
              {{ species.marketValue }}
            </strong>
          </p>
        </div>
      </section>

      <!-- Tags -->

      <section class="mt-6 rounded-3xl bg-white p-7 shadow">
        <h2 class="text-2xl font-bold text-green-900">Keywords</h2>

        <div class="mt-4 flex flex-wrap gap-3">
          <span
            v-for="tag in species.tags"
            :key="tag"
            class="rounded-full bg-green-100 px-4 py-2 text-green-700"
          >
            {{ tag }}
          </span>
        </div>
      </section>
    </div>
  </div>

  <!-- Not Found -->

  <div v-else class="flex min-h-screen items-center justify-center bg-green-50">
    <div class="rounded-3xl bg-white p-10 text-center shadow">
      <div class="text-5xl">🐟</div>

      <h2 class="mt-4 text-xl font-bold">Species Not Found</h2>

      <button @click="goBack" class="mt-5 rounded-xl bg-green-700 px-6 py-3 text-white">
        Go Back
      </button>
    </div>
  </div>
</template>
