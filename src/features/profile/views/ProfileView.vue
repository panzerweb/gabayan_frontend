<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFarm } from '@/features/farm/composables/useFarm'

const { t } = useI18n()
const { farms, getFarms } = useFarm()

const router = useRouter()
const authStore = useAuthStore()

const { locale } = useI18n();
const selectedLanguage = ref('en')

const languages = [
  { code: 'en', label: 'English' },
  { code: 'tl', label: 'Filipino (Tagalog)' },
]

watch(selectedLanguage, (val) => {
  changeLanguage(val);
})

const changeLanguage = (lang: string) => {
  console.log(`Language Locale: ${lang}`);
  locale.value = lang
  localStorage.setItem('user-locale', lang) // Persist preference
  document.documentElement.setAttribute('lang', lang) // Accessibility
}

onMounted(async () => {
  authStore.fetchUser()
  await getFarms()

  console.log(selectedLanguage.value);
})


const user = computed(() => {
  const data = authStore.user || {}
  const fullName =
    data.name ||
    (data.first_name ? `${data.first_name} ${data.last_name || ''}`.trim() : null) ||
    'User Name'

  return {
    name: fullName,
    email: data.email || 'user@example.com',
    role: data.role || 'Farm Manager',
    joinDate: data.created_at
      ? new Date(data.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : 'January 2024',
    avatar:
      data.avatar_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0D8ABC&color=fff`,
    stats: [
      { label: 'Active Farms', value: farms.value?.length },
    ],
  }
})

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header/Profile Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Cover Image -->
      <div class="h-32 w-full bg-linear-to-r from-green-500 to-emerald-600"></div>

      <div class="px-6 pb-6 relative">
        <!-- Avatar -->
        <div class="flex justify-between items-end -mt-12 mb-4">
          <div
            class="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-md"
          >
            <img :src="user.avatar" :alt="user.name" class="h-full w-full object-cover" />
          </div>
          <button
            class="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-medium rounded-lg transition-colors text-sm border border-emerald-200"
          >
            {{ t('buttons.edit')}} profile
          </button>
        </div>


        <!-- User Info -->
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ user.name }}</h1>
          <p class="text-gray-500 flex items-center mt-1">
            <span class="inline-block w-4 h-4 mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </span>
            {{ user.email }}
          </p>
          <div class="flex gap-4 mt-4 text-sm text-gray-600">
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              {{ user.role }}
            </span>
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              Joined {{ user.joinDate }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        v-for="(stat, index) in user.stats"
        :key="index"
        class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"
      >
        <p class="text-3xl font-bold text-gray-800">{{ stat.value }}</p>
        <p class="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">
          {{ stat.label }}
        </p>
      </div>
    </div>

    <!-- Account Settings Section -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Account Settings</h2>

      <div class="space-y-4">
        <!-- Settings Item -->
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white rounded-lg shadow-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-800">Notifications</p>
              <p class="text-sm text-gray-500">Manage your alert preferences</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-400"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white rounded-lg shadow-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-800">Security</p>
              <p class="text-sm text-gray-500">Password and authentication</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-400"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        <!-- Language -->
        <div class="p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-white rounded-lg shadow-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 21l1.5-1.5M13.5 21L12 19.5M12 3v16.5M4.5 7.5h15M6 3h12"
                  />
                </svg>
              </div>

              <div>
                <p class="font-medium text-gray-800">Language</p>
                <p class="text-sm text-gray-500">Select your preferred language</p>
              </div>
            </div>

            <select
              v-model="selectedLanguage"
              class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option v-for="language in languages" :key="language.code" :value="language.code">
                {{ language.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Delete Account -->
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white rounded-lg shadow-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium text-red-600">Danger Zone</p>
              <p class="text-sm text-gray-500">Delete account or reset data</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-400"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="mt-8">
        <button
          @click="handleLogout"
          class="w-full py-3 px-4 bg-red-50 text-red-600 font-medium rounded-xl border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>
