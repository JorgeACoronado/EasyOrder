<script setup>
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import { useOrderStore } from '@/stores/orderStore'
import { createOrder } from '@/services/api'

const router = useRouter()
const customerStore = useCustomerStore()
const orderStore = useOrderStore()

const taxRate = 0.0825

const tax = computed(() => {
  return customerStore.subtotal * taxRate
})

const total = computed(() => {
  return customerStore.subtotal + tax.value
})

async function submitOrder() {
  try {
    await createOrder({
      customerName: customerStore.name,
      customerPhone: customerStore.phone,
      orderType: customerStore.orderType || 'pickup',
      itemsJson: JSON.stringify(orderStore.cart),
      total: Number(total.value),
    })

    orderStore.clearCart()
    router.push('/thank-you')
  } catch (error) {
    console.error(error)
    alert(error?.error?.message || 'Could not submit order.')
  }
}
</script>

<template>
  <main class="min-h-screen bg-stone-200 p-4">
    <div class="mx-auto flex min-h-screen w-full max-w-[400px] items-center">
      <section class="w-full rounded-3xl bg-white p-6 shadow-xl">
        <RouterLink
          to="/cart"
          class="mb-4 block text-sm text-pink-500 underline"
        >
          ← Go back to cart
        </RouterLink>

        <h1 class="font-serif text-3xl text-stone-800">Payment Summary</h1>

        <p class="mt-1 text-sm text-stone-500">Review your order before submitting.</p>

        <div class="mt-6 space-y-3 rounded-2xl bg-stone-100 p-4">
          <div class="flex justify-between text-sm text-stone-700">
            <span>Subtotal</span>
            <span>${{ customerStore.subtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between text-sm text-stone-700">
            <span>Tax</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>

          <div class="border-t border-stone-300 pt-3">
            <div class="flex justify-between text-lg font-semibold text-stone-900">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div class="mt-5 rounded-2xl border border-stone-200 p-4">
          <p class="text-sm font-medium text-stone-700">Payment Method</p>

          <p class="mt-1 text-sm text-stone-500">Cash at counter</p>
        </div>

        <div
          v-if="customerStore.notes"
          class="mt-5 rounded-2xl border border-stone-200 p-4"
        >
          <p class="text-sm font-medium text-stone-700">Order Notes</p>

          <p class="mt-1 text-sm text-stone-500">
            {{ customerStore.notes }}
          </p>
        </div>

        <button
          class="mt-6 w-full rounded-full bg-pink-400 px-4 py-3 font-medium text-white"
          @click="submitOrder"
        >
          Submit Order
        </button>
      </section>
    </div>
  </main>
</template>
