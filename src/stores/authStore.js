import { defineStore } from 'pinia'
import { loginUser, registerUser } from '@/services/api'

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem('currentUser')

    if (!storedUser || storedUser === 'undefined') {
      return null
    }

    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem('currentUser')
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: getStoredUser(),
    accessToken: localStorage.getItem('accessToken'),
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },

  actions: {
    async createUser(userData) {
      try {
        const result = await registerUser(userData.name, userData.email, userData.password)

        return {
          success: true,
          message: 'Account created',
          data: result.data,
        }
      } catch (error) {
        return {
          success: false,
          message: error?.message || 'Could not create account',
        }
      }
    },

    async login(email, password) {
      try {
        const data = await loginUser(email, password)

        this.currentUser = data.user
        this.accessToken = data.accessToken

        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user))
        }

        localStorage.setItem('accessToken', data.accessToken)

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },

    logout() {
      this.currentUser = null
      this.accessToken = null

      localStorage.removeItem('currentUser')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  },
})
