import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customer_name: '',
    customer_phone: '',
    selected_payment_method: 'counter',

    current_order_number: 1,
    order_number: null,
  }),

  actions: {
    setCustomerInfo(name, phone) {
      this.customer_name = name
      this.customer_phone = phone
    },

    setPaymentMethod(method) {
      this.selected_payment_method = method
    },

    clearCustomer() {
      this.customer_name = ''
      this.customer_phone = ''
      this.selected_payment_method = 'counter'
    },

    generateOrderNumber() {
      this.current_order_number += 1

      if (this.current_order_number > 999) {
        this.current_order_number = 1
      }

      this.order_number = this.current_order_number
    },
  },

  getters: {
    isCustomerValid: (state) => {
      return state.customer_name.trim() !== '' && state.customer_phone.trim() !== ''
    },
  },
})
