<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const router = useRouter();
const authStore = useAuthStore();

const goToProfile = () => {
  router.push("/profile");
}

const userName = computed(() => {
  if (authStore.user) {
    return authStore.user.name || authStore.user.first_name || "User";
  }
  return "User";
});

const avatarUrl = computed(() => {
  const nameParam = encodeURIComponent(userName.value);
  return `https://ui-avatars.com/api/?name=${nameParam}&background=0D8ABC&color=fff`;
});
</script>

<template>
  <nav
    class="fixed w-full z-49 top-0 flex items-center justify-between px-6 py-4 bg-white shadow-sm"
  >
    <!-- Logo -->
    <div class="flex items-center">
      <img src="/gabayan-logo.png" alt="Gabayan Logo" class="h-10 w-auto object-contain" />
    </div>

    <!-- Profile Area -->
    <div class="flex items-center space-x-3">
      <span class="text-sm font-medium text-gray-700">{{ userName }}</span>
      <button
        @click="goToProfile"
        class="h-10 w-10 shrink-0 rounded-full overflow-hidden border border-gray-200 hover:ring-2 hover:ring-blue-500 transition"
      >
        <img :src="avatarUrl" alt="Profile" class="h-full w-full object-cover" />
      </button>
    </div>
  </nav>
</template>
