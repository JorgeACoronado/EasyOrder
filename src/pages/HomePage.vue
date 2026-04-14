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
  <main class="min-h-screen bg-[#f6efeb]">
    <div class="mx-auto w-full max-w-[420px] px-3 py-4">
      <div
        class="flex min-h-[85vh] flex-col rounded-3xl border border-stone-200 bg-white px-5 py-6 shadow-sm"
      >
        <form
          class="flex flex-col gap-2 pt-10"
          @submit.prevent="startOrder"
        >
          <h2 class="text-center font-serif text-2xl tracking-widest text-stone-700">
            May's Sweets & Treats
          </h2>

          <label class="mt-10 text-sm text-stone-500">Name</label>
          <input
            v-model="name"
            type="text"
            class="mt-1 h-11 w-full rounded-xl border border-stone-300 px-3 outline-none focus:ring-2 focus:ring-pink-300"
          />

          <label class="mt-6 text-sm text-stone-500">Phone#</label>
          <input
            v-model="phone"
            type="text"
            class="mt-1 h-11 w-full rounded-xl border border-stone-300 px-3 outline-none focus:ring-2 focus:ring-pink-300"
          />

          <div class="mt-6 flex w-full items-center justify-between">
            <label class="flex items-center gap-1 text-sm text-stone-700">
              <input type="checkbox" />
              <span class="tracking-widest">Curbside</span>
            </label>

            <label class="flex items-center gap-1 text-sm text-stone-700">
              <input type="checkbox" />
              <span class="tracking-widest">Counter</span>
            </label>

            <label class="flex items-center gap-1 text-sm text-stone-700">
              <input type="checkbox" />
              <span class="tracking-widest">Table</span>
            </label>
          </div>

          <button
            type="submit"
            class="mt-6 w-1/4 rounded-full bg-pink-400 py-2 text-xs font-medium text-white"
          >
            Start Order
          </button>
        </form>

        <button
          class="mx-auto mt-16 flex w-3/4 justify-center rounded-full border border-pink-300 bg-white py-3 text-sm text-stone-700"
          type="button"
        >
          <RouterLink
            to="/status"
            class="w-full text-center"
          >
            Check Order Status
          </RouterLink>
        </button>

        <RouterLink
          to="/login"
          class="mt-16 flex justify-center text-sm text-stone-400 hover:underline"
        >
          Account Login
        </RouterLink>
      </div>

      <SiteFooter class="pb-6" />
    </div>
  </main>
</template>
