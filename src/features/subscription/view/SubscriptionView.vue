<script setup lang="ts">
import type { SubscriptionPlan } from '../types';


// Define 3 subscription plan hardcoded here and display it on View
const plans: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'Free',
    tagline: 'Perfect for getting started',
    price: '₱0',
    description: 'Explore Gabayan and begin managing your fish farm.',
    buttonText: 'Current Plan',
    current: true,
    features: [
      '1 Culture System',
      'Basic Farm Management Guide',
      'Limited Educational Section',
    ],
  },
  {
    id: 2,
    name: 'Pro',
    tagline: 'Recommended for growing fish farms',
    price: '₱299 / month',
    description: 'Unlock advanced farm management and educational resources.',
    buttonText: 'Upgrade to Pro',
    popular: true,
    features: [
      'Up to 10 Culture Systems',
      'Advanced Farm Management Guide',
      'Financial Projections',
      'Video Courses',
      'Unlock All Educational Content',
    ],
  },
  {
    id: 3,
    name: 'Company',
    tagline: 'Built for businesses and hatcheries',
    price: 'Contact Us',
    description: 'Manage multiple farms and business accounts with ease.',
    buttonText: 'Contact Sales',
    features: [
      'Up to 100 Culture Systems',
      'Everything in Pro',
      'Multiple Business Accounts',
      'Team Management',
    ],
  },
]

const comparison = [
  {
    feature: 'Culture Systems',
    free: '1',
    pro: '10',
    company: '100',
  },
  {
    feature: 'Basic Farm Guide',
    free: '✓',
    pro: '✓',
    company: '✓',
  },
  {
    feature: 'Advanced Guide',
    free: '—',
    pro: '✓',
    company: '✓',
  },
  {
    feature: 'Financial Projections',
    free: '—',
    pro: '✓',
    company: '✓',
  },
  {
    feature: 'Video Courses',
    free: '—',
    pro: '✓',
    company: '✓',
  },
  {
    feature: 'Educational Library',
    free: 'Limited',
    pro: 'Full',
    company: 'Full',
  },
  {
    feature: 'Business Accounts',
    free: '—',
    pro: '—',
    company: '✓',
  },
]

</script>

<template>
  <div class="min-h-screen bg-green-50">
    <div class="mx-auto max-w-7xl px-4 py-10">

      <!-- Hero -->
      <div class="mb-10 text-center">
        <div class="mb-4 text-6xl">
          🐟
        </div>

        <h1 class="text-3xl font-bold text-green-800">
          Choose Your Farming Plan
        </h1>

        <p class="mx-auto mt-3 max-w-xl text-gray-600">
          Start for free and upgrade as your aquaculture business grows.
          Choose the plan that best supports your farming journey.
        </p>
      </div>

      <!-- Cards -->
      <div class="grid gap-6 lg:grid-cols-3">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="relative rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          :class="[
            plan.popular
              ? 'border-green-600 ring-2 ring-green-200 shadow-lg'
              : 'border-gray-200'
          ]"
        >
          <!-- Popular Badge -->
          <div
            v-if="plan.popular"
            class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-4 py-1 text-sm font-semibold text-white shadow"
          >
            ⭐ Most Popular
          </div>

          <h2 class="text-2xl font-bold text-gray-800">
            {{ plan.name }}
          </h2>

          <p class="mt-1 text-sm text-green-700">
            {{ plan.tagline }}
          </p>

          <div class="mt-5">
            <div class="text-3xl font-extrabold text-green-800">
              {{ plan.price }}
            </div>
          </div>

          <p class="mt-4 text-sm leading-relaxed text-gray-600">
            {{ plan.description }}
          </p>

          <ul class="mt-6 space-y-3">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start gap-3"
            >
              <div
                class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700"
              >
                ✓
              </div>

              <span class="text-gray-700">
                {{ feature }}
              </span>
            </li>
          </ul>

          <button
            class="mt-8 w-full rounded-xl py-3 font-semibold transition"
            :class="
              plan.current
                ? 'cursor-default bg-gray-200 text-gray-600'
                : plan.popular
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'border border-green-600 text-green-700 hover:bg-green-50'
            "
          >
            {{ plan.buttonText }}
          </button>
        </div>
      </div>

      <!-- Comparison -->
      <div class="mt-14 rounded-3xl bg-white p-6 shadow">
        <h2 class="mb-6 text-center text-2xl font-bold text-green-800">
          Compare Plans
        </h2>

        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="border-b">
                <th class="px-4 py-3 text-left">
                  Feature
                </th>
                <th class="px-4 py-3 text-center">
                  Free
                </th>
                <th class="px-4 py-3 text-center">
                  Pro
                </th>
                <th class="px-4 py-3 text-center">
                  Company
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in comparison"
                :key="item.feature"
                class="border-b last:border-0"
              >
                <td class="py-4 font-medium text-gray-700">
                  {{ item.feature }}
                </td>

                <td class="py-4 text-center">
                  {{ item.free }}
                </td>

                <td class="py-4 text-center font-semibold text-green-700">
                  {{ item.pro }}
                </td>

                <td class="py-4 text-center">
                  {{ item.company }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="mt-12 rounded-3xl bg-green-700 p-8 text-center text-white">
        <h2 class="text-2xl font-bold">
          Need a custom solution?
        </h2>

        <p class="mx-auto mt-3 max-w-2xl text-green-100">
          Our Company plan is designed for hatcheries, cooperatives,
          and large aquaculture businesses managing multiple teams
          and production sites.
        </p>

        <button
          class="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-100"
        >
          Contact Us
        </button>
      </div>

    </div>
  </div>
</template>
