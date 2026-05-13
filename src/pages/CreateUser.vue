<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/services/api'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const userCreated = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)

async function createUser() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await registerUser(name.value, email.value, password.value)

    userCreated.value = true
    password.value = ''
  } catch (error) {
    console.error(error)
    errorMessage.value = error?.error?.message || error?.message || 'Could not create user.'
  } finally {
    isLoading.value = false
  }
}

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <main class="min-h-screen bg-[#f6efeb] px-4 py-6">
    <div class="mx-auto w-full max-w-[400px]">
      <!-- This is the initial State -->
      <div
        v-if="!userCreated"
        class="space-y-6 rounded-3xl bg-white p-6 shadow-md"
      >
        <h1 class="text-center font-serif text-2xl text-stone-700">Create Account</h1>

        <div class="space-y-4">
          <div>
            <label class="text-sm text-stone-500">Name</label>
            <input
              v-model="name"
              type="text"
              class="mt-1 w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label class="text-sm text-stone-500">Email</label>
            <input
              v-model="email"
              type="email"
              class="mt-1 w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label class="text-sm text-stone-500">Password</label>
            <input
              v-model="password"
              type="password"
              class="mt-1 w-full rounded-xl border p-3"
            />
          </div>
        </div>

        <button
          class="w-full rounded-full bg-pink-400 py-3 text-white"
          @click="createUser"
        >
          Create Account
        </button>

        <RouterLink
          to="/login"
          class="mt-6 block text-center text-sm text-stone-400 hover:underline"
        >
          Already have an account? Log in
        </RouterLink>
      </div>

      <!-- After the user is created -->
      <div
        v-else
        class="space-y-6 rounded-3xl bg-white p-6 text-center shadow-md"
      >
        <h2 class="font-serif text-2xl text-green-500">🎉 User Created!</h2>

        <p class="text-sm text-stone-500">Your account has been successfully created.</p>

        <button
          class="w-full rounded-full bg-pink-400 py-3 text-white"
          @click="goToLogin"
        >
          Log In
        </button>
      </div>
    </div>
  </main>
</template>
