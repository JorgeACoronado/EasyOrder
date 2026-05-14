<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()

onMounted(async () => {
  await orderStore.loadOrders()
})
</script>

<template>
  <main class="min-h-screen bg-stone-200 p-4">
    <div class="mx-auto max-w-[500px] rounded-3xl bg-white p-6 shadow-xl">
      <h1 class="font-serif text-3xl text-stone-800">Customer Orders</h1>

      <p class="mt-1 text-sm text-stone-500">Live incoming orders from EasyOrder</p>

      <div class="mt-6 space-y-4">
        <p
          v-if="orderStore.isLoading"
          class="text-sm text-stone-500"
        >
          Loading orders...
        </p>

        <p
          v-else-if="orderStore.errorMessage"
          class="text-sm text-red-500"
        >
          {{ orderStore.errorMessage }}
        </p>

        <div
          v-else-if="orderStore.orders.length === 0"
          class="rounded-2xl bg-stone-100 p-4 text-sm text-stone-500"
        >
          No orders yet.
        </div>

        <div
          v-for="order in orderStore.orders"
          :key="order.id"
          class="rounded-2xl border border-stone-200 p-4"
        >
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-stone-800">Order #{{ order.id }}</h2>

            <span class="rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-600">
              {{ order.status }}
            </span>
          </div>

          <div class="mt-3 space-y-1 text-sm text-stone-600">
            <p>
              <span class="font-medium">Customer:</span>
              {{ order.customerName }}
            </p>

            <p>
              <span class="font-medium">Phone:</span>
              {{ order.customerPhone }}
            </p>

            <p>
              <span class="font-medium">Order Type:</span>
              {{ order.orderType }}
            </p>

            <p>
              <span class="font-medium">Total:</span>
              ${{ Number(order.total).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <RouterLink to="/management">
        <button class="mt-6 w-full rounded-full bg-pink-400 py-3 text-white">
          Back to management
        </button>
      </RouterLink>
    </div>
  </main>
</template>
