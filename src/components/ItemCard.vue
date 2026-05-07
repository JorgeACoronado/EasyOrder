<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <article class="rounded-2xl bg-white p-2 shadow-md">
    <img
      :src="item.image"
      :alt="item.name"
      class="h-28 w-full rounded-xl object-cover"
    />

    <div class="flex min-h-[90px] flex-col items-center justify-between px-2 py-3 text-center">
      <h3 class="text-sm font-medium text-stone-800">
        {{ item.name }}
      </h3>

      <p class="mt-2 text-sm text-stone-700">${{ item.price.toFixed(2) }}</p>

      <button
        class="mt-3 rounded-full bg-pink-400 px-6 py-1 text-sm text-white"
        @click="emit('add-to-cart', item)"
      >
        + Add
      </button>
    </div>
  </article>
</template>
