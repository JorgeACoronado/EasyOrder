<script setup>
import { ref } from 'vue'
import ItemCard from '@/components/ItemCard.vue'
import { useRouter } from 'vue-router'

const cartCount = ref(3)
const breadsRef = ref(null)
const pastriesRef = ref(null)
const cakesRef = ref(null)
const coffeeRef = ref(null)

const router = useRouter()

const menu = {
  breads: [
    { id: 1, name: 'Sourdough', price: 4.5, image: '...' },
    { id: 2, name: 'Baguette', price: 3.5, image: '...' },
  ],
  pastries: [
    { id: 3, name: 'Chocolate Croissant', price: 3.5, image: '...' },
    { id: 4, name: 'Danish', price: 4.0, image: '...' },
  ],
  cakes: [
    { id: 5, name: 'Carrot Cake', price: 5.0, image: '...' },
    { id: 6, name: 'Chocolate Cake', price: 5.5, image: '...' },
  ],
  coffee: [
    { id: 7, name: 'Latte', price: 2.5, image: '...' },
    { id: 8, name: 'Mocha', price: 3.0, image: '...' },
  ],
}

function scrollToCategory(category) {
  const map = {
    breads: breadsRef,
    pastries: pastriesRef,
    cakes: cakesRef,
    coffee: coffeeRef,
  }

  map[category]?.value?.scrollIntoView({
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
          <h1 class="font-serif text-2xl text-stone-800">May’s Sweets & Treats</h1>

          <div class="mt-2 flex items-center justify-between text-sm text-stone-500">
            <span>Order #1001</span>
            <RouterLink to="/">Cancel</RouterLink>
          </div>

          <div class="mt-4 flex flex-wrap justify-between gap-0.5">
            <button
              class="rounded-full bg-pink-100 px-2 py-1 text-sm text-stone-700"
              @click="scrollToCategory('breads')"
            >
              🥖 Breads
            </button>

            <button
              class="rounded-full bg-pink-100 px-2 py-1 text-sm text-stone-700"
              @click="scrollToCategory('pastries')"
            >
              🥐 Pastries
            </button>

            <button
              class="rounded-full bg-pink-100 px-2 py-1 text-sm text-stone-700"
              @click="scrollToCategory('cakes')"
            >
              🎂 Cakes
            </button>

            <button
              class="rounded-full bg-pink-100 px-2 py-1 text-sm text-stone-700"
              @click="scrollToCategory('coffee')"
            >
              ☕ Coffee
            </button>
          </div>
        </header>

        <section
          id="breads"
          ref="breadsRef"
          class="mb-10"
        >
          <h2 class="mb-4 font-serif text-3xl text-stone-800">🥖 Breads</h2>
          <div class="grid grid-cols-2 gap-4">
            <ItemCard
              v-for="item in menu.breads"
              :key="item.id"
              :item="item"
            />
          </div>
        </section>

        <section
          id="pastries"
          ref="pastriesRef"
          class="mb-10"
        >
          <h2 class="mb-4 font-serif text-3xl text-stone-800">🥐 Pastries</h2>
          <div class="grid grid-cols-2 gap-4">
            <ItemCard
              v-for="item in menu.pastries"
              :key="item.id"
              :item="item"
            />
          </div>
        </section>

        <section
          id="cakes"
          ref="cakesRef"
          class="mb-10"
        >
          <h2 class="mb-4 font-serif text-3xl text-stone-800">🎂 Cakes</h2>
          <div class="grid grid-cols-2 gap-4">
            <ItemCard
              v-for="item in menu.cakes"
              :key="item.id"
              :item="item"
            />
          </div>
        </section>

        <section
          id="coffee"
          ref="coffeeRef"
          class="mb-10"
        >
          <h2 class="mb-4 font-serif text-3xl text-stone-800">☕ Coffee</h2>
          <div class="grid grid-cols-2 gap-4">
            <ItemCard
              v-for="item in menu.coffee"
              :key="item.id"
              :item="item"
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
          {{ cartCount }}
        </span>
      </button>
    </div>
  </main>
</template>
