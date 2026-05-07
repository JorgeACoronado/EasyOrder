import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    cart: [],
  }),

  getters: {
    cartQuantity: (state) => {
      return state.cart.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    },
  },

  actions: {
    addItem(item) {
      const existingItem = this.cart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cart.push({
          ...item,
          quantity: 1,
        })
      }
    },
  },
})
