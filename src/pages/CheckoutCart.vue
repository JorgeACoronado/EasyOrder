<template>
  <main>
    <RouterLink
      to="/menu"
      class=""
    >
      Add more items
    </RouterLink>

    <button
      class="rounded bg-green-500 px-4 py-2 text-white"
      @click="$router.push('/thank-you')"
    >
      Place Order
    </button>
  </main>
</template>
