import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],
    currentUser: null,
    isLoggedIn: false,
  }),

  actions: {
    createUser(userData) {
      const existingUser = this.users.find((user) => user.email === userData.email)

      if (existingUser) {
        return {
          success: false,
          message: 'Email already exists',
        }
      }

      this.users.push(userData)

      return {
        success: true,
        message: 'Account created',
      }
    },

    login(email, password) {
      const foundUser = this.users.find(
        (user) => user.email === email && user.password === password,
      )

      if (!foundUser) {
        return false
      }

      this.currentUser = foundUser
      this.isLoggedIn = true

      return true
    },

    logout() {
      this.currentUser = null
      this.isLoggedIn = false
    },
  },
})
