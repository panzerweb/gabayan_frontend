<script setup lang="ts">
import FarmPlanForm from '../components/FarmPlanForm.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold">Generate Farm Plan</h1>

      <p class="text-slate-500 mt-2 mb-8">
        Let AI create an optimized aquaculture farming strategy.
      </p>

      <FarmPlanForm />
    </div>
  </div>
</template>
