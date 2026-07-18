<script setup lang="ts">
// import { useRouter } from "vue-router";

// const router = useRouter();

const goToProfile = () => {
  // router.push("/profile");
  console.log('Hi!')
}
</script>

<template>
  <nav
    class="fixed w-full z-49 top-0 flex items-center justify-between px-6 py-4 bg-white shadow-sm"
  >
    <!-- Logo -->
    <div class="flex items-center">
      <img src="#" alt="Gabayan Logo" class="h-10 w-auto object-contain" />
    </div>

    <!-- Profile Avatar -->
    <button
      @click="goToProfile"
      class="h-10 w-10 rounded-full overflow-hidden border border-gray-200 hover:ring-2 hover:ring-blue-500 transition"
    >
      <img src="#" alt="Profile" class="h-full w-full object-cover" />
    </button>
  </nav>
</template>
