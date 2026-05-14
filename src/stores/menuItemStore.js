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
    async addMenuItem(item) {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/menu-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(item),
      })

      const data = await response.json()

      if (!response.ok) {
        throw data
      }

      this.menu_items.push(data.data || data)

      return data
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
