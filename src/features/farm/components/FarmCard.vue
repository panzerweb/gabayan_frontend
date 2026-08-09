<script lang="ts" setup>
import type { SlimFarmResponse } from '../types/farmPlan';


const props = defineProps<{
  farm: SlimFarmResponse
}>();

const emit = defineEmits<{
  handleDelete: []
}>();

function handleDelete() {
  emit("handleDelete");
}

// Helper methods
function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

function capitalize(value: string) {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
</script>

<template>
  <article
    class="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
  >
    <!-- Decorative accent -->
    <div
      class="absolute left-0 top-0 h-full w-1 bg-emerald-500 transition-all duration-200 group-hover:w-1.5"
    />

    <div class="p-5">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <div class="flex min-w-0 items-center gap-3">
          <!-- Farm Icon -->
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 22V12" />
              <path d="M12 12C7 12 4 9 4 4c5 0 8 3 8 8Z" />
              <path d="M12 17c0-5 3-8 8-8 0 5-3 8-8 8Z" />
            </svg>
          </div>

          <div class="min-w-0">
            <p class="mb-0.5 text-xs font-medium uppercase tracking-wider text-gray-400">
              Farm Plan
            </p>

            <h2
              class="truncate text-lg font-bold text-gray-900"
              :title="props.farm.species"
            >
              {{ capitalize(props.farm.species) }}
            </h2>
          </div>
        </div>

        <!-- Delete Button -->
        <button
          type="button"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          @click.stop="handleDelete"
          title="Delete Farm"
          aria-label="Delete Farm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            />
          </svg>
        </button>
      </div>

      <!-- Divider -->
      <div class="my-5 h-px bg-gray-100" />

      <!-- Farm Details -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Culture System -->
        <div class="rounded-xl bg-gray-50 p-3">
          <div class="mb-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-blue-500"
            >
              <path d="M12 2v20" />
              <path d="M2 12h20" />
              <path d="M4.93 4.93l14.14 14.14" />
              <path d="M19.07 4.93L4.93 19.07" />
            </svg>

            <span class="text-xs font-medium text-gray-500">
              System
            </span>
          </div>

          <p class="truncate text-sm font-semibold text-gray-800">
            {{ capitalize(props.farm.culture_system) }}
          </p>
        </div>

        <!-- Equipment -->
        <div class="rounded-xl bg-gray-50 p-3">
          <div class="mb-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-amber-500"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.2-3.2a6 6 0 0 1-7.6 7.6L7 20a2.8 2.8 0 1 1-4-4l6.3-6.3a6 6 0 0 1 7.6-7.6l-3.2 3.2Z"
              />
            </svg>

            <span class="text-xs font-medium text-gray-500">
              Equipment
            </span>
          </div>

          <p class="text-sm font-semibold text-gray-800">
            {{ props.farm.equipment_count }} items
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-5 flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>

          <span>
            Created {{ formatDate(props.farm.created_at) }}
          </span>
        </div>

        <!-- View indicator -->
        <span
          class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 transition-transform duration-200 group-hover:translate-x-0.5"
        >
          View plan

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </div>
    </div>
  </article>
</template>
