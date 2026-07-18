<script setup lang="ts">
import type { EquipmentResponse, FeedResponse } from '../types/farmPlan'

defineProps<{
  equipments: EquipmentResponse[]
  feeds: FeedResponse[]
}>()

const emit = defineEmits<{
  (e: 'update:equipment', equipment: EquipmentResponse): void

  (e: 'update:feed', feed: FeedResponse): void
}>()

function toggleEquipment(equipment: EquipmentResponse) {
  emit('update:equipment', {
    ...equipment,
    isBought: !equipment.isBought,
  })
}

function toggleFeed(feed: FeedResponse) {
  emit('update:feed', {
    ...feed,
    isBought: !feed.isBought,
  })
}
</script>

<template>
  <section class="recommendation">
    <h2 class="recommendation__title">Recommended Equipment</h2>

    <div
      v-for="equipment in equipments"
      :key="equipment.id"
      class="item"
      :class="{ bought: equipment.isBought }"
    >
      <label class="item__check">
        <input type="checkbox" :checked="equipment.isBought" @change="toggleEquipment(equipment)" />

        <span>
          {{ equipment.equipmentName }}
        </span>
      </label>

      <p>
        {{ equipment.equipmentDescription }}
      </p>

      <small>
        Store:
        {{ equipment.storeName }}
      </small>

      <span v-if="equipment.isBought" class="badge"> ✓ Bought </span>
    </div>

    <h2 class="recommendation__title">Recommended Feeds</h2>

    <div v-for="feed in feeds" :key="feed.id" class="item" :class="{ bought: feed.isBought }">
      <label class="item__check">
        <input type="checkbox" :checked="feed.isBought" @change="toggleFeed(feed)" />

        <span>
          {{ feed.feedsName }}
        </span>
      </label>

      <p>
        {{ feed.feedsDescription }}
      </p>

      <span v-if="feed.isBought" class="badge"> ✓ Bought </span>
    </div>
  </section>
</template>

<style scoped>
.recommendation {
  margin-top: 1.5rem;
}

.recommendation__title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #0f172a;
}

.item {
  position: relative;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  padding: 1rem;

  margin-bottom: 0.75rem;

  transition: 0.2s;
}

.item.bought {
  border-color: #16a34a;
  background: #f0fdf4;
}

.item__check {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-weight: 600;

  cursor: pointer;
}

.item p {
  margin: 0.5rem 0;

  color: #475569;
  font-size: 0.9rem;
}

.item small {
  color: #64748b;
}

.badge {
  display: inline-block;

  margin-top: 0.5rem;

  background: #16a34a;

  color: white;

  padding: 0.25rem 0.6rem;

  border-radius: 999px;

  font-size: 0.75rem;
}
</style>
