<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEquipmentById } from '../services/equipmentService'
import type { FarmEquipment } from '@/features/farm/types/farmPlan'

const route = useRoute()
const router = useRouter()
const equipment = ref<FarmEquipment | null>(null)
const isLoading = ref(true)
const isOrdering = ref(false)
const orderSuccess = ref(false)

onMounted(async () => {
  const id = route.params.id as string
  if (id) {
    equipment.value = await getEquipmentById(id) || null
  }
  isLoading.value = false
})

function goBack() {
  router.back()
}

function placeOrder() {
  isOrdering.value = true
  setTimeout(() => {
    isOrdering.value = false
    orderSuccess.value = true
  }, 1500)
}
</script>

<template>
  <div class="order-page">
    <button class="back-btn" @click="goBack" v-if="!orderSuccess">
      ← Back
    </button>

    <div v-if="isLoading" class="status-msg">
      Loading order details...
    </div>

    <div v-else-if="!equipment" class="status-msg">
      Equipment not found.
    </div>

    <div v-else-if="orderSuccess" class="success-container">
      <div class="success-icon">✅</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for ordering <strong>{{ equipment.name }}</strong>.</p>
      <p>A confirmation receipt has been sent to your email.</p>
      <button class="btn-primary" @click="router.push({ name: 'equipment' })">Return to Equipment</button>
    </div>

    <div v-else class="order-container">
      <header class="header">
        <h2>Order Summary</h2>
      </header>

      <section class="summary-section">
        <div class="summary-item">
          <span class="label">Item</span>
          <span class="value">{{ equipment.name }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Quantity</span>
          <span class="value">1</span>
        </div>
        <div class="summary-item total">
          <span class="label">Total Estimated Cost</span>
          <span class="value cost">₱{{ equipment.estimatedCost?.toLocaleString() || 'N/A' }}</span>
        </div>
      </section>

      <section class="shipping-section">
        <h3>Shipping Information</h3>
        <p class="placeholder-text">Shipping details will use your profile's default address.</p>
      </section>

      <button 
        class="btn-primary place-order-btn" 
        @click="placeOrder" 
        :disabled="isOrdering"
      >
        {{ isOrdering ? 'Processing...' : 'Confirm & Place Order' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.order-page {
  max-width: 600px;
  margin: 2rem auto 0;
  padding: 0 1rem 3rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.back-btn {
  background: none;
  border: none;
  color: #64748b;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: #0f172a;
}

.status-msg {
  text-align: center;
  color: #64748b;
  padding: 3rem 1rem;
}

.order-container {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
}

.summary-item.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #cbd5e1;
  font-weight: 700;
  font-size: 1.25rem;
}

.summary-item .label {
  color: #475569;
}

.summary-item .value {
  color: #0f172a;
}

.summary-item .cost {
  color: #16a34a;
}

.shipping-section {
  margin-bottom: 2rem;
}

.shipping-section h3 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
  color: #1e293b;
}

.placeholder-text {
  color: #64748b;
  font-size: 0.95rem;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.btn-primary {
  width: 100%;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.btn-primary:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.success-container {
  text-align: center;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 3rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-container h2 {
  color: #16a34a;
  margin: 0 0 1rem;
}

.success-container p {
  color: #475569;
  margin: 0 0 0.5rem;
}

.success-container .btn-primary {
  margin-top: 2rem;
  width: auto;
  padding: 0.75rem 1.5rem;
}
</style>
