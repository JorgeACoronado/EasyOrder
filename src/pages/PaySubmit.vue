<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function ThankYouPage() {
  router.push('/thank-you')
}
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center">
    <RouterLink
      to="/cart"
      class="mb-4 block text-2xl text-blue-500 hover:underline"
    >
      go back
    </RouterLink>

    <button
      class="btn btn-primary mt-6 text-3xl"
      @click="ThankYouPage()"
    >
      Submit Payment
    </button>
  </main>
</template>
