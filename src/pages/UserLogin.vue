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
  <main class="flex min-h-screen flex-col items-center space-y-6 p-6">
    <h1 class="flex justify-center text-3xl font-bold">EasyOrder</h1>
    <div class="space-y-2 rounded-lg bg-amber-100 p-6 shadow-md">
      <h2 class="text-lg font-medium">Admin Login</h2>
      <div>
        <form
          class="space-y-6"
          @submit.prevent="Login"
        >
          <label class="">
            <span class="text-sm font-medium">Username</span>
            <input
              v-model="username"
              type="text"
              class="h-10 w-full border"
            />
          </label>

          <label class="">
            <span class="text-sm font-medium">Password</span>
            <input
              v-model="password"
              type="password"
              class="h-10 w-full border"
            />
          </label>

          <button
            type="submit"
            class="mt-6 w-full rounded-lg border bg-pink-500 p-2 text-xs font-medium text-white"
          >
            Login
          </button>

          <RouterLink
            to="/create-user"
            class="block text-center text-sm text-gray-500 underline-offset-4 transition-colors duration-200 hover:text-gray-700 hover:underline"
          >
            Create A Username
          </RouterLink>
        </form>
      </div>
    </div>
    <RouterLink
      to="/"
      class="block self-start text-sm text-gray-300 underline-offset-4 transition-colors duration-200 hover:text-[#4cc9f0] hover:underline"
      >👈 Back to home
    </RouterLink>
  </main>
  <SiteFooter class="pb-6" />
</template>
