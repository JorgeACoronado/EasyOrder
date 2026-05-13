import { defineStore } from 'pinia'
import { getMenuItems } from '@/services/api'

export const useMenuItemStore = defineStore('menuItem', {
  state: () => ({
    menu_items: [],
    isLoading: false,
    errorMessage: '',
  }),

  getters: {
    availableMenuItems: (state) => {
      return state.menu_items.filter((item) => item.available)
    },

    itemsByCategory: (state) => {
      return (category) => {
        return state.menu_items.filter((item) => item.category === category && item.available)
      }
    },
  },

  actions: {
    addMenuItem(item) {
      this.menu_items.push(item)
    },

    async loadMenuItems() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const result = await getMenuItems()
        this.menu_items = result.data || result
      } catch (error) {
        console.error(error)
        this.errorMessage = 'Could not load menu items.'
      } finally {
        this.isLoading = false
      }
    },
  },
})
