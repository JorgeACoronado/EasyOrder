<script setup>
import { RouterLink } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'

const customerStore = useCustomerStore()
</script>

<template>
  <main class="min-h-screen bg-stone-200 p-4">
    <div class="mx-auto flex min-h-screen w-full max-w-[400px] items-center">
      <section class="w-full rounded-3xl bg-white p-8 text-center shadow-xl">
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-4xl"
        >
          🍰
        </div>

        <h1 class="mt-6 font-serif text-3xl text-stone-800">Thank You for Your Order!</h1>

        <p class="mt-3 text-sm leading-relaxed text-stone-500">
          Your treats are now dancing through the kitchen ovens.
        </p>

        <div class="mt-6 rounded-2xl bg-stone-100 p-4">
          <p class="text-sm text-stone-500">Order Number</p>

          <p class="mt-1 text-3xl font-bold tracking-wider text-pink-500">
            #{{ customerStore.order_number }}
          </p>
        </div>

        <div class="mt-5 space-y-2 rounded-2xl border border-stone-200 p-4 text-left">
          <div class="flex justify-between text-sm text-stone-600">
            <span>Status</span>
            <span class="font-medium capitalize">
              {{ customerStore.status }}
            </span>
          </div>

          <div class="flex justify-between text-sm text-stone-600">
            <span>Payment Method</span>
            <span class="capitalize">
              {{ customerStore.selected_payment_method }}
            </span>
          </div>

          <div class="flex justify-between text-sm text-stone-600">
            <span>Total</span>
            <span class="font-semibold text-stone-800">
              ${{ customerStore.total.toFixed(2) }}
            </span>
          </div>
        </div>

        <RouterLink
          to="/status"
          class="mt-6 block w-full rounded-full bg-pink-400 px-4 py-3 font-medium text-white transition hover:bg-pink-500"
        >
          Check Order Status
        </RouterLink>
      </section>
    </div>
  </main>
</template>
