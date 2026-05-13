import { getOrders, createOrder } from '@/services/api'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    cart: [],
    orders: [],
    isLoading: false,
    errorMessage: '',
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
    async loadOrders() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const result = await getOrders()
        this.orders = result.data || result
      } catch (error) {
        console.error(error)
        this.errorMessage = 'Could not load orders.'
      } finally {
        this.isLoading = false
      }
    }

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

    clearCart() {
      this.cart = []
    },

    async submitOrder(orderData) {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const result = await createOrder(orderData)

        this.clearCart()

        return {
          success: true,
          data: result.data || result,
        }
      } catch (error) {
        console.error(error)

        this.errorMessage = error?.error?.message || error?.message || 'Could not submit order.'

        return {
          success: false,
          message: this.errorMessage,
        }
      } finally {
        this.isLoading = false
      }
    },
  },
})
