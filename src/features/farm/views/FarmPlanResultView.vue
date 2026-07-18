<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useFarmPlanStore } from '@/stores/farmPlanStore'

const store = useFarmPlanStore()

const { farmPlan } = storeToRefs(store)

const activeTab = ref('overview')

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
  },
  {
    id: 'water',
    label: 'Water Parameters',
  },
  {
    id: 'feeds',
    label: 'Recommended Feeds',
  },
  {
    id: 'equipment',
    label: 'Equipment',
  },
]
</script>

<template>
  <div class="min-h-screen w-full overflow-x-hidden bg-slate-50 p-4 sm:p-8">
    <div v-if="farmPlan" class="mx-auto w-full max-w-5xl">
      <!-- Header -->

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800">AI Farm Plan</h1>

        <p class="mt-2 text-slate-500">
          Generated recommendation for
          <span class="font-medium text-slate-700">
            {{ farmPlan.species }}
          </span>
        </p>
      </div>

      <!-- Tabs -->

      <div class="mb-6 flex gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white p-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition"
          :class="
            activeTab === tab.id ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          "
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Content -->

      <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <!-- Overview -->

        <div v-if="activeTab === 'overview'" class="space-y-5">
          <h2 class="text-xl font-semibold text-slate-800">Farm Overview</h2>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-sm text-slate-500">Species</p>

              <h3 class="mt-2 text-lg font-semibold text-slate-800">🐟 {{ farmPlan.species }}</h3>
            </div>

            <div class="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-sm text-slate-500">Stocking Density</p>

              <h3 class="mt-2 text-lg font-semibold text-slate-800">
                {{ farmPlan.recommendedStockingDensity }}
              </h3>
            </div>

            <div class="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-sm text-slate-500">Harvest Time</p>

              <h3 class="mt-2 text-lg font-semibold text-slate-800">
                {{ farmPlan.estimatedHarvestDays }} days
              </h3>
            </div>
          </div>
        </div>

        <!-- Water Parameters -->

        <div v-if="activeTab === 'water'" class="space-y-5">
          <h2 class="text-xl font-semibold text-slate-800">Water Parameters</h2>

          <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-sm text-slate-500">pH</p>

              <h3 class="mt-2 text-lg font-semibold">
                {{ farmPlan.waterParameters.ph }}
              </h3>
            </div>

            <div class="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-sm text-slate-500">Temperature</p>

              <h3 class="mt-2 text-lg font-semibold">
                {{ farmPlan.waterParameters.temperature }}
              </h3>
            </div>

            <div class="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-sm text-slate-500">Oxygen</p>

              <h3 class="mt-2 text-lg font-semibold">
                {{ farmPlan.waterParameters.oxygen }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Feeds -->

        <div v-if="activeTab === 'feeds'" class="space-y-5">
          <h2 class="text-xl font-semibold text-slate-800">Recommended Feeds</h2>

          <div class="space-y-3">
            <div
              v-for="feed in farmPlan.recommendedFeeds"
              :key="feed"
              class="wrap-break-word rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              {{ feed }}
            </div>
          </div>
        </div>

        <!-- Equipment -->

        <div v-if="activeTab === 'equipment'" class="space-y-5">
          <h2 class="text-xl font-semibold text-slate-800">Equipment</h2>

          <div class="flex flex-wrap gap-3">
            <span
              v-for="item in farmPlan.equipment"
              :key="item"
              class="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->

    <div v-else class="flex min-h-75 items-center justify-center text-slate-500">
      No generated farm plan.
    </div>
  </div>
</template>
