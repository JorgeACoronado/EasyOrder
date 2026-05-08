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

    isCartEmpty: (state) => {
      return state.cart.length === 0
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

    increaseQuantity(id) {
      const item = this.cart.find((item) => item.id === id)

      if (item) {
        item.quantity++
      }
    },

    decreaseQuantity(id) {
      const item = this.cart.find((item) => item.id === id)

      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          this.removeFromCart(id)
        }
      }
    },

    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id)
    },
  },
})
