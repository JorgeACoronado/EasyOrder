<script setup>
import { ref, computed } from 'vue'
import ItemCard from '@/components/ItemCard.vue'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import { useOrderStore } from '@/stores/orderStore'
import { useMenuItemStore } from '@/stores/menuItemStore'

const router = useRouter()
const customerStore = useCustomerStore()
const orderStore = useOrderStore()
const menuItemStore = useMenuItemStore()

const categories = computed(() => {
  return [...new Set(menuItemStore.menu_items.map((item) => item.category))]
})

// Category's section refs for smooth scrolling will be made dynamically using the state from the menuItemStore
const categoryRefs = ref({})
menuItemStore.menu_items.forEach((item) => {
  if (!categoryRefs.value[item.category]) {
    categoryRefs.value[item.category] = ref(null)
  }
})

// Scroll to the category section when a dynamic category button is clicked
function scrollToCategory(category) {
  if (!categoryRefs.value[category]) {
    console.warn(`No ref found for category: ${category}`)
    return
  }

  categoryRefs.value[category].scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function goToCart() {
  router.push('/cart')
}
</script>

<template>
  <main class="flex min-h-screen justify-center bg-stone-200 px-4 py-6">
    <div
      class="relative h-[95dvh] max-h-[800px] w-full max-w-[400px] overflow-hidden rounded-3xl bg-stone-200"
    >
      <div class="no-scrollbar h-full overflow-y-auto px-2 pb-24">
        <header class="mb-6">
          <h1 class="mb-4 font-serif text-4xl text-stone-800">May’s Sweets & Treats</h1>

          <div class="mt-2 flex items-center justify-between text-sm text-stone-500">
            <span>Order# {{ customerStore.order_number }}</span>
            <RouterLink to="/">Cancel</RouterLink>
          </div>

          <div class="mt-4 flex flex-wrap justify-between gap-0.5">
            <button
              v-for="category in Object.keys(categoryRefs)"
              :key="category"
              class="rounded-full bg-pink-100 px-2 py-1 text-sm text-stone-700"
              @click="scrollToCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </header>

        <section
          v-for="category in categories"
          :id="category"
          :key="category"
          :ref="(el) => (categoryRefs[category] = el)"
          class="mb-10"
        >
          <h2 class="mb-4 font-serif text-3xl text-stone-800">{{ category }}</h2>
          <div class="grid grid-cols-2 gap-4">
            <ItemCard
              v-for="item in menuItemStore.itemsByCategory(category)"
              :key="item.id"
              :item="item"
              @add-to-cart="orderStore.addItem"
            />
          </div>
        </section>
      </div>

      <button
        class="absolute right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink-400 text-2xl text-white shadow-lg"
        @click="goToCart"
      >
        🛒
        <span
          class="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-stone-800 text-xs text-white"
        >
          {{ orderStore.cartQuantity }}
        </span>
      </button>
    </div>
  </main>
</template>
