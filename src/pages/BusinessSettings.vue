<script setup>
import { ref } from 'vue'
import { useMenuItemStore } from '@/stores/menuItemStore'

const menuItemStore = useMenuItemStore()

const name = ref('')
const category = ref('')
const price = ref('')
const image_url = ref('')
const available = ref(true)

async function submitMenuItem() {
  try {
    await menuItemStore.addMenuItem({
      name: name.value,
      category: category.value,
      price: Number(price.value),
      available: available.value,
    })

    name.value = ''
    category.value = ''
    price.value = ''
    image_url.value = ''
    available.value = true

    alert('Menu item added!')
  } catch (error) {
    console.error(error)
    alert(error?.error?.message || 'Could not add menu item.')
  }
}

async function resetDemoData() {
  if (!confirm('Reset demo menu items?')) return

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/reset-demo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    let data = {}

    try {
      data = await response.json()
    } catch {
      data = {}
    }

    if (!response.ok) {
      throw new Error(data.message || 'Could not reset demo data.')
    }

    await menuItemStore.loadMenuItems()

    alert('Demo data reset!')
  } catch (error) {
    console.error(error)
    alert(error.message || 'Could not reset demo data.')
  }
}

async function resetOrders() {
  if (!confirm('Delete/reset all orders?')) return

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/reset-orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    let data = {}

    try {
      data = await response.json()
    } catch {
      data = {}
    }

    if (!response.ok) {
      throw new Error(data.message || 'Could not reset orders.')
    }

    alert('Orders reset!')
  } catch (error) {
    console.error(error)
    alert(error.message || 'Could not reset orders.')
  }
}
</script>

<template>
  <main class="min-h-screen bg-[#f6efeb] px-4 py-6">
    <div class="mx-auto w-full max-w-[430px]">
      <header class="mb-6">
        <h1 class="font-serif text-3xl text-stone-800">Business Settings</h1>

        <div class="flex items-center justify-between">
          <p class="text-sm text-stone-500">Add new items to your menu.</p>

          <RouterLink
            to="/management"
            class="text-sm text-stone-500 underline"
          >
            Back to Account
          </RouterLink>
        </div>
      </header>

      <form
        class="space-y-4 rounded-3xl bg-white p-5 shadow-lg"
        @submit.prevent="submitMenuItem"
      >
        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700"> Item Name </label>

          <input
            v-model="name"
            type="text"
            class="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
            placeholder="Chocolate cake"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700"> Category </label>

          <input
            v-model="category"
            type="text"
            class="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
            placeholder="Cakes"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700"> Price </label>

          <input
            v-model="price"
            type="number"
            step="0.01"
            min="0"
            class="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
            placeholder="12.99"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700"> Image URL </label>

          <input
            v-model="image_url"
            type="text"
            class="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
            placeholder="/images/cake.jpg"
          />
        </div>

        <label class="flex items-center gap-2 text-sm text-stone-700">
          <input
            v-model="available"
            type="checkbox"
            class="h-4 w-4"
          />

          Available
        </label>

        <button
          type="submit"
          class="w-full rounded-2xl bg-stone-800 py-3 font-semibold text-white shadow-md active:scale-[0.98]"
        >
          Add Menu Item
        </button>
      </form>

      <section class="mt-6 rounded-3xl bg-white p-5 shadow-lg">
        <h2 class="mb-3 font-serif text-2xl text-stone-800">Demo Tools</h2>

        <div class="space-y-3">
          <button
            type="button"
            class="w-full rounded-2xl bg-amber-500 py-3 font-semibold text-white shadow-md active:scale-[0.98]"
            @click="resetDemoData"
          >
            Reset Demo Menu
          </button>

          <button
            type="button"
            class="w-full rounded-2xl bg-red-500 py-3 font-semibold text-white shadow-md active:scale-[0.98]"
            @click="resetOrders"
          >
            Reset Orders
          </button>
        </div>
      </section>

      <section class="mt-6 rounded-3xl bg-white p-5 shadow-lg">
        <h2 class="mb-3 font-serif text-2xl text-stone-800">Current Menu Items</h2>

        <div
          v-if="menuItemStore.menu_items.length === 0"
          class="text-sm text-stone-500"
        >
          No menu items yet.
        </div>

        <div
          v-for="item in menuItemStore.menu_items"
          :key="item.id"
          class="mb-3 rounded-2xl border border-stone-200 p-3"
        >
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-stone-800">
              {{ item.name }}
            </h3>

            <span class="text-sm font-medium text-stone-600"> ${{ item.price.toFixed(2) }} </span>
          </div>

          <p class="text-sm text-stone-500">
            {{ item.category }}
          </p>

          <p class="mt-1 text-xs text-stone-400">
            {{ item.available ? 'Available' : 'Not Available' }}
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
