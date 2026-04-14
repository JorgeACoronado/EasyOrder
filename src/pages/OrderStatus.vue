<script setup>
const completedOrders = ['#1001', '#1002', '#1010', '#1020']
const inProgressOrders = ['#1027', '#1051', '#1066', '#1003']
</script>

<template>
  <main class="min-h-screen bg-[#f6efeb] px-4 py-6">
    <div class="mx-auto w-full max-w-[400px]">
      <header class="mb-6 flex items-center justify-between">
        <RouterLink
          to="/"
          class="text-sm text-stone-400"
        >
          ← back
        </RouterLink>

        <h1 class="font-serif text-[1.25rem] text-stone-700">May’s Sweets & Treats</h1>

        <div class="w-10"></div>
      </header>

      <section class="mb-6 rounded-[22px] bg-white p-4 shadow-md">
        <h2 class="mb-4 font-serif text-4xl text-green-500">Completed</h2>

        <div class="flex flex-wrap gap-4">
          <span
            v-for="order in completedOrders"
            :key="order"
            class="rounded-xl bg-green-100 px-5 py-3 text-xl text-green-700"
          >
            {{ order }}
          </span>
        </div>
      </section>

      <section class="rounded-[22px] bg-white p-4 shadow-md">
        <h2 class="mb-4 font-serif text-4xl text-amber-400">In Progress</h2>

        <div class="flex flex-wrap gap-4">
          <span
            v-for="order in inProgressOrders"
            :key="order"
            class="rounded-xl bg-orange-50 px-5 py-3 text-xl text-orange-500"
          >
            {{ order }}
          </span>
        </div>
      </section>
    </div>
  </main>
</template>
