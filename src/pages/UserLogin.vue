<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SiteFooter from '@/components/SiteFooter.vue'

const router = useRouter()

const username = ref('')
const password = ref('')

function Login() {
  const account = {
    username: username.value,
    password: password.value,
  }

  router.push({
    path: '/management',
    state: account,
  })
}
</script>

<template>
  <main class="min-h-screen bg-[#f6efeb] px-4 py-6">
    <div class="mx-auto w-full max-w-[400px] space-y-6">
      <!-- Title -->
      <h1 class="text-center font-serif text-3xl text-stone-700">EasyOrder</h1>

      <!-- Card -->
      <div class="rounded-3xl bg-white p-6 shadow-md">
        <h2 class="mb-6 text-center font-serif text-xl text-stone-700">Admin Login</h2>

        <form
          class="space-y-5"
          @submit.prevent="Login"
        >
          <!-- Username -->
          <div>
            <label class="text-sm text-stone-500">Username</label>
            <input
              v-model="username"
              type="text"
              class="mt-1 w-full rounded-xl border border-stone-300 p-3 outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label class="text-sm text-stone-500">Password</label>
            <input
              v-model="password"
              type="password"
              class="mt-1 w-full rounded-xl border border-stone-300 p-3 outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <button
            type="submit"
            class="mt-4 w-full rounded-full bg-pink-400 py-3 text-white"
          >
            Log In
          </button>

          <div class="space-y-2 text-center text-sm">
            <RouterLink
              to="/create-user"
              class="text-m mt-4 block text-stone-500 underline hover:underline"
            >
              Create an account
            </RouterLink>

            <RouterLink
              to="/"
              class="mt-6 block text-stone-400 hover:underline"
            >
              Back to home
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </main>

  <SiteFooter class="pb-6" />
</template>
