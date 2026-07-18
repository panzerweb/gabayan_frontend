<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/NavBar.vue'
import BottomNavBar from './components/BottomNavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-if="!$route.meta.hideNavigation" />

    <main class="px-4 pt-18 pb-24">
      <RouterView />
    </main>

    <BottomNavBar v-if="!$route.meta.hideNavigation" />
  </div>
</template>
