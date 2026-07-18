<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue'
import WelcomeCard from '../components/WelcomeCard.vue'
import QuickActions from '../components/QuickActions.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToGenerateView() {
  router.push('/generate')
}
</script>

<template>
  <section>
    <!-- Welcome Card -->
    <WelcomeCard />

    <!-- Button to generate farm plan, opens a new page to generate farm plan -->
    <div class="flex justify-center">
      <AppButton label="Generate Farm Plan" type="submit" v-on:on-submit="goToGenerateView" />
    </div>

    <!-- Quick Actions: (Shows list of fishes, equipments, diseases, AI chat) -->
    <QuickActions></QuickActions>
  </section>
</template>
