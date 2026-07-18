<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import BottomNavBar from './components/BottomNavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <main class="px-4 pt-18 pb-24">
      <RouterView />
    </main>

    <BottomNavBar />
  </div>
</template>
