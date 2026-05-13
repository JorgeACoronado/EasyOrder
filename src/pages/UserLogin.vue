<script setup>
import { ref } from 'vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function submitLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const success = await authStore.login(email.value, password.value)

    if (!success) {
      errorMessage.value = 'Invalid email or password.'
      return
    }

    password.value = ''

    router.push('/management')
  } catch (error) {
    console.error(error)

    errorMessage.value = error?.error?.message || error?.message || 'Login failed.'
  } finally {
    isLoading.value = false
  }
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
          @submit.prevent="submitLogin"
        >
          <!-- Email -->
          <div>
            <label class="text-sm text-stone-500">Email</label>
            <input
              v-model="email"
              type="email"
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
            :disabled="isLoading"
            class="mt-4 w-full rounded-full bg-pink-400 py-3 text-white"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
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

          <p
            v-if="errorMessage"
            class="mt-2 text-sm text-red-500"
          >
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </div>
  </main>

  <SiteFooter class="pb-6" />
</template>
