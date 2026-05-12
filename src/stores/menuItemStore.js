import { defineStore } from 'pinia'

export const useMenuItemStore = defineStore('menuItem', {
  state: () => ({
    menu_items: [
      {
        id: 1,
        name: 'Carrot Cake',
        category: 'Desserts',
        price: 24.99,
        available: true,
        image: 'images/carrot_1.jpg',
      },
    ],
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
  },
})
