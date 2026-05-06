import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customer_name: '',
    customer_phone: '',
    selected_payment_method: 'counter',
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
  },

  getters: {
    isCustomerValid: (state) => {
      return state.customer_name.trim() !== '' && state.customer_phone.trim() !== ''
    },
  },
})
