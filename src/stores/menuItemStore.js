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
      {
        id: 2,
        name: 'Chocolate Cake',
        category: 'Desserts',
        price: 29.99,
        available: true,
        image: 'images/chocolate_1.jpg',
      },
      {
        id: 3,
        name: 'Chocolate Croissant',
        category: 'Pastries',
        price: 3.99,
        available: true,
        image: 'images/croissant_1.jpg',
      },
      {
        id: 4,
        name: 'Baguette',
        category: 'Breads',
        price: 2.99,
        available: true,
        image: 'images/baguette_1.jpg',
      },
      {
        id: 5,
        name: 'Latte',
        category: 'Beverages',
        price: 3.99,
        available: true,
        image: 'images/latte_1.jpg',
      },
      {
        id: 6,
        name: 'Sourdough',
        category: 'Breads',
        price: 4.99,
        available: false,
        image: 'images/sourdough_1.jpg',
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

  actions: {},
})
