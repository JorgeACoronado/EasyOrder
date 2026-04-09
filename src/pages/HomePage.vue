<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SiteFooter from '@/components/SiteFooter.vue'

const router = useRouter()

const name = ref('')
const phone = ref('')

function startOrder() {
  const order = {
    name: name.value,
    phone: phone.value,
    curbside: false,
    counter: false,
    table: false,
  }

  router.push({
    path: '/menu',
    state: order,
  })
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-pink-50 p-6">
    <div
      class="flex h-[95dvh] max-h-[800px] w-full max-w-[400px] flex-col overflow-hidden rounded-3xl bg-pink-300 px-6 shadow-2xl"
    >
      <div class="flex-1">
        <form
          class="flex flex-col gap-1 pt-10"
          @submit.prevent="startOrder"
        >
          <h2 class="text-center text-2xl tracking-widest">May's Sweets & Treats</h2>

          <label class="mt-10 text-sm font-medium">Name</label>
          <input
            v-model="name"
            type="text"
            class="h-10 border"
          />

          <label class="mt-6 text-sm font-medium">Phone#</label>
          <input
            v-model="phone"
            type="text"
            class="h-10 border"
          />

          <div class="mt-6 flex w-full items-center justify-between">
            <label class="flex items-center gap-1">
              <input type="checkbox" />
              <span class="text-sm tracking-widest">Curbside</span>
            </label>

            <label class="flex items-center gap-1">
              <input type="checkbox" />
              <span class="text-sm tracking-widest">Counter</span>
            </label>

            <label class="flex items-center gap-1">
              <input type="checkbox" />
              <span class="text-sm tracking-widest">Table</span>
            </label>
          </div>

          <button
            type="submit"
            class="mt-6 w-1/4 rounded-lg border bg-pink-500 p-2 text-xs font-medium text-white"
          >
            Start Order
          </button>
        </form>

        <button
          class="mx-auto mt-15 flex w-3/4 justify-center rounded-lg border bg-white p-2 text-center text-sm font-medium text-black"
          type="submit"
        >
          <RouterLink
            to="/status"
            class="w-full"
          >
            Check Order Status
          </RouterLink>
        </button>

        <RouterLink
          to="/login"
          class="mt-15 flex justify-center text-sm text-gray-500 underline-offset-4 transition-colors duration-200 hover:text-gray-700 hover:underline"
          >Account Login
        </RouterLink>
      </div>

      <SiteFooter class="pb-6" />
    </div>
  </main>
</template>
