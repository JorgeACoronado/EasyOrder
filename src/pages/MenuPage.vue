<template>
  <main>
    <button
      class="rounded bg-green-500 px-4 py-2 text-white"
      @click="$router.push('/cart')"
    >
      Checkout
    </button>
    <RouterLink
      to="/"
      class=""
    >
      Cancel
    </RouterLink>
  </main>
</template>
