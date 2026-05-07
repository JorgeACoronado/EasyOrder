import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    orders: [],
    customer_name: '',
    customer_phone: '',
    selected_payment_method: 'counter',

    status: 'pending',

    notes: '',

    subtotal: 0,
    tax: 0,
    fees: 0,
    total: 0,

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
      this.status = 'pending'
      this.notes = ''
      this.total = 0
      this.order_number = null
    },

    generateOrderNumber() {
      this.current_order_number += 1

      if (this.current_order_number > 999) {
        this.current_order_number = 1
      }

      this.order_number = this.current_order_number
    },

    submitOrder() {
      this.generateOrderNumber()

      this.orders.push({
        order_number: this.order_number,
        status: 'in-progress',
        total: this.total,
        notes: this.notes,
        customer_name: this.customer_name,
        created_at: new Date().toISOString(),
      })
    },
  },

  getters: {
    isCustomerValid: (state) => {
      return state.customer_name.trim() !== '' && state.customer_phone.trim() !== ''
    },
  },
})
