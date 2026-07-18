<script setup lang="ts">
import { reactive } from 'vue'

import type { FarmPlanRequest } from '../types/farmPlan'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  submit: [payload: FarmPlanRequest]
}>()

const form = reactive<FarmPlanRequest>({
  speciesId: 1,
  pondSize: 100,
  waterType: 'Freshwater',
  budget: 50000,
})

const species = [
  {
    id: 1,
    name: 'Tilapia',
    icon: '🐟',
    description: 'Freshwater farming',
  },
  {
    id: 2,
    name: 'Bangus',
    icon: '🐠',
    description: 'Milkfish farming',
  },
]

const waterTypes = [
  {
    name: 'Freshwater',
    icon: '💧',
    description: 'Pond, lake, or river water',
  },
  {
    name: 'Saltwater',
    icon: '🌊',
    description: 'Coastal or marine farming',
  },
]

function submitForm() {
  emit('submit', {
    ...form,
  })
}
</script>

<template>
  <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
    <!-- Header -->

    <div class="mb-8">
      <h2 class="text-2xl font-bold text-slate-800">Farm Information</h2>

      <p class="text-slate-500 mt-2">
        Tell us about your farm and we will create an AI farming plan.
      </p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Fish Species -->

      <div>
        <label class="block font-semibold text-slate-700 mb-3">
          🐟 What fish are you farming?
        </label>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            v-for="item in species"
            :key="item.id"
            type="button"
            @click="form.speciesId = item.id"
            class="rounded-2xl border p-5 text-left transition"
            :class="
              form.speciesId === item.id
                ? 'border-teal-600 bg-teal-50'
                : 'border-slate-200 hover:border-teal-300'
            "
          >
            <div class="text-4xl mb-3">
              {{ item.icon }}
            </div>

            <h3 class="font-semibold text-slate-800">
              {{ item.name }}
            </h3>

            <p class="text-sm text-slate-500">
              {{ item.description }}
            </p>
          </button>
        </div>
      </div>

      <!-- Pond Size -->

      <div>
        <label class="block font-semibold text-slate-700 mb-3"> 📏 How big is your pond? </label>

        <div class="relative">
          <input
            v-model.number="form.pondSize"
            type="number"
            class="w-full rounded-xl border border-slate-300 px-4 py-4 text-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none pr-20"
          />

          <span class="absolute right-4 top-4 text-slate-400"> sqm </span>
        </div>

        <p class="text-sm text-slate-500 mt-2">Example: 100 sqm backyard pond</p>
      </div>

      <!-- Water Type -->

      <div>
        <label class="block font-semibold text-slate-700 mb-3">
          🌊 What type of water do you use?
        </label>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            v-for="water in waterTypes"
            :key="water.name"
            type="button"
            @click="form.waterType = water.name"
            class="rounded-2xl border p-5 text-left transition"
            :class="
              form.waterType === water.name
                ? 'border-teal-600 bg-teal-50'
                : 'border-slate-200 hover:border-teal-300'
            "
          >
            <div class="text-3xl mb-2">
              {{ water.icon }}
            </div>

            <h3 class="font-semibold">
              {{ water.name }}
            </h3>

            <p class="text-sm text-slate-500">
              {{ water.description }}
            </p>
          </button>
        </div>
      </div>

      <!-- Budget -->

      <div>
        <label class="block font-semibold text-slate-700 mb-3"> 💰 Farming Budget </label>

        <div class="relative">
          <span class="absolute left-4 top-4 text-slate-400"> ₱ </span>

          <input
            v-model.number="form.budget"
            type="number"
            class="w-full rounded-xl border border-slate-300 pl-10 px-4 py-4 text-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
          />
        </div>
      </div>

      <!-- Submit -->

      <button
        class="w-full rounded-xl bg-teal-600 py-4 text-white font-semibold text-lg transition hover:bg-teal-700 disabled:opacity-50"
        :disabled="loading"
      >
        <span v-if="loading"> ⏳ Creating your farm plan... </span>

        <span v-else> ✨ Generate Farm Plan </span>
      </button>
    </form>
  </div>
</template>
