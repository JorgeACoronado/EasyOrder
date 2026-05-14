<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const owner = {
  name: authStore.currentUser?.name || 'May Chen',
  email: authStore.currentUser?.email || 'may@example.com',
  businessName: "May's Sweets & Treats",
}

function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  router.push('/login')
}
</script>

<template>
  <main class="min-h-screen bg-stone-100 px-4 py-6">
    <div class="mx-auto w-full max-w-[400px] space-y-6">
      <header class="flex items-center justify-center">
        <h1 class="font-serif text-2xl text-stone-800">Manage Account</h1>

        <div class="w-10"></div>
      </header>

      <section class="rounded-3xl bg-white p-5 shadow-md">
        <p class="text-sm text-stone-500">Business Owner</p>
        <h2 class="mt-1 font-serif text-2xl text-stone-800">
          {{ owner.name }}
        </h2>
        <p class="mt-1 text-sm text-stone-500">{{ owner.email }}</p>

        <div class="mt-4 rounded-2xl bg-stone-100 p-4">
          <p class="text-sm text-stone-500">Business Name</p>
          <p class="mt-1 text-base font-medium text-stone-800">
            {{ owner.businessName }}
          </p>
        </div>
      </section>

      <section class="rounded-3xl bg-white p-5 shadow-md">
        <h2 class="mb-4 font-serif text-xl text-stone-800">Quick Actions</h2>

        <div class="grid gap-3">
          <RouterLink
            to="/businessSettings"
            class="rounded-2xl bg-pink-100 px-4 py-3 text-center text-stone-700"
          >
            Edit Business Settings
          </RouterLink>

          <RouterLink
            to="/viewOrders"
            class="rounded-2xl bg-amber-100 px-4 py-3 text-center text-stone-700"
          >
            View Customer Orders
          </RouterLink>

          <RouterLink
            to="/status"
            class="rounded-2xl bg-green-100 px-4 py-3 text-center text-stone-700"
          >
            View Public Order Status
          </RouterLink>
        </div>
      </section>

      <section class="rounded-3xl bg-white p-5 shadow-md">
        <h2 class="mb-4 font-serif text-xl text-stone-800">Account</h2>

        <div class="space-y-3">
          <button class="w-full rounded-2xl bg-stone-200 px-4 py-3 text-stone-700">
            Change Password
          </button>

          <button class="w-full rounded-2xl bg-stone-200 px-4 py-3 text-stone-700">
            Update Email
          </button>

          <button
            class="w-full rounded-2xl bg-rose-100 px-4 py-3 text-rose-600"
            @click="logout"
          >
            Log Out
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
