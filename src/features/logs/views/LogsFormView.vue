<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/buttons/AppButton.vue'
import Swal from 'sweetalert2'

const router = useRouter()

const form = ref({
  salinity: null,
  ph_level: null,
  ammonia: null,
  nitrite: null,
  nitrate: null,
  dissolved_oxygen: null,
  water_temperature: null,
  personal_notes: '',
})

const isSubmitting = ref(false)

const goBack = () => {
  router.push('/')
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    Swal.fire({
      icon: 'success',
      title: 'Logs Saved',
      text: 'Your water quality logs have been successfully recorded.',
      confirmButtonColor: '#3B82F6',
    }).then(() => {
      router.push('/')
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to save logs. Please try again.',
      confirmButtonColor: '#EF4444',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <header class="bg-white px-4 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10">
      <button @click="goBack" class="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900 ml-2">Input Water Logs</h1>
    </header>

    <main class="p-4 max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
        <p class="text-gray-500 mb-6 text-sm">
          Record your current water parameters to help track the health of your farm over time.
        </p>
        
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Parameter Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Salinity -->
            <div>
              <label for="salinity" class="block text-sm font-medium text-gray-700 mb-1">Salinity (ppt)</label>
              <input
                id="salinity"
                v-model.number="form.salinity"
                type="number"
                step="0.1"
                placeholder="e.g. 35.0"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <!-- pH Level -->
            <div>
              <label for="ph_level" class="block text-sm font-medium text-gray-700 mb-1">pH Level</label>
              <input
                id="ph_level"
                v-model.number="form.ph_level"
                type="number"
                step="0.1"
                min="0"
                max="14"
                placeholder="e.g. 7.5"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <!-- Ammonia -->
            <div>
              <label for="ammonia" class="block text-sm font-medium text-gray-700 mb-1">Ammonia (ppm)</label>
              <input
                id="ammonia"
                v-model.number="form.ammonia"
                type="number"
                step="0.01"
                placeholder="e.g. 0.25"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <!-- Nitrite -->
            <div>
              <label for="nitrite" class="block text-sm font-medium text-gray-700 mb-1">Nitrite (ppm)</label>
              <input
                id="nitrite"
                v-model.number="form.nitrite"
                type="number"
                step="0.01"
                placeholder="e.g. 0.1"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <!-- Nitrate -->
            <div>
              <label for="nitrate" class="block text-sm font-medium text-gray-700 mb-1">Nitrate (ppm)</label>
              <input
                id="nitrate"
                v-model.number="form.nitrate"
                type="number"
                step="0.1"
                placeholder="e.g. 10.0"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <!-- Dissolved Oxygen -->
            <div>
              <label for="dissolved_oxygen" class="block text-sm font-medium text-gray-700 mb-1">Dissolved Oxygen (mg/L)</label>
              <input
                id="dissolved_oxygen"
                v-model.number="form.dissolved_oxygen"
                type="number"
                step="0.1"
                placeholder="e.g. 6.5"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <!-- Water Temperature -->
            <div>
              <label for="water_temperature" class="block text-sm font-medium text-gray-700 mb-1">Water Temperature (°C)</label>
              <input
                id="water_temperature"
                v-model.number="form.water_temperature"
                type="number"
                step="0.1"
                placeholder="e.g. 28.5"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <!-- Personal Notes -->
          <div class="mt-6">
            <label for="personal_notes" class="block text-sm font-medium text-gray-700 mb-1">Personal Notes</label>
            <textarea
              id="personal_notes"
              v-model="form.personal_notes"
              rows="3"
              placeholder="Add any observations or extra details..."
              class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <AppButton 
              label="Save Logs" 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full py-3.5 text-base shadow-sm"
            />
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
