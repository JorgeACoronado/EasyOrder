<script setup>
const cartItems = [
  {
    id: 1,
    name: 'Chocolate Croissant',
    price: 3.5,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1555507036-ab794f4ade0a?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Strawberry Cream Danish',
    price: 4.25,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1519869325930-281384150729?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Carrot Cake',
    price: 5.0,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60',
  },
]

const subtotal = cartItems.reduce((total, item) => {
  return total + item.price * item.quantity
}, 0)
</script>

<template>
  <main class="min-h-screen bg-stone-200 p-4">
    <div class="mx-auto w-full max-w-[400px]">
      <aside class="flex min-h-[700px] flex-col rounded-3xl bg-white p-4 shadow-xl">
        <div class="mb-4 border-b pb-3">
          <h2 class="font-serif text-2xl text-stone-800">Your Cart</h2>
          <p class="text-sm text-stone-500">Review your treats before checkout</p>
        </div>

        <div class="flex-1 space-y-4 overflow-y-auto">
          <div
            v-if="cartItems.length === 0"
            class="rounded-2xl bg-stone-100 p-4 text-center text-stone-500"
          >
            Your cart is empty
          </div>

          <article
            v-for="item in cartItems"
            :key="item.id"
            class="rounded-2xl border border-stone-200 p-3"
          >
            <div class="flex gap-3">
              <img
                :src="item.image"
                :alt="item.name"
                class="h-20 w-20 rounded-xl object-cover"
              />

              <div class="flex flex-1 flex-col justify-between">
                <div>
                  <h3 class="text-sm font-semibold text-stone-800">
                    {{ item.name }}
                  </h3>
                  <p class="mt-1 text-sm text-stone-500">${{ item.price.toFixed(2) }} each</p>
                </div>

                <div class="mt-3 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <button
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-stone-800"
                    >
                      -
                    </button>

                    <span class="min-w-[24px] text-center text-sm font-medium text-stone-800">
                      {{ item.quantity }}
                    </span>

                    <button
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-400 text-white"
                    >
                      +
                    </button>
                  </div>

                  <button class="text-sm text-rose-500">Remove</button>
                </div>
              </div>
            </div>

            <div class="mt-3 text-right text-sm font-semibold text-stone-800">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </article>
        </div>

        <div class="mt-4">
          <RouterLink
            to="/menu"
            class="text-sm text-pink-500 underline"
          >
            + Add more items
          </RouterLink>
        </div>

        <div class="mt-4 border-t pt-4">
          <label class="mb-2 block text-sm font-medium text-stone-700">Order Notes</label>
          <textarea
            rows="3"
            class="w-full rounded-2xl border border-stone-300 p-3 text-sm outline-none"
            placeholder="Add pickup notes, allergies, or special instructions..."
          />

          <div
            class="mt-4 flex items-center justify-between text-base font-semibold text-stone-800"
          >
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>

          <button class="mt-4 w-full rounded-full bg-pink-400 px-4 py-3 font-medium text-white">
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </div>
  </main>
</template>
