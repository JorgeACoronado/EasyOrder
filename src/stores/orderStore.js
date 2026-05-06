import {defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    cart: [],
  }),

  actions: {
    addItem(item) {
      this.cart.push(item):
    },
  },
})