import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/lib/axios'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<any>(null) // Replace `any` with your User type interface if available
  const isLoading = ref<boolean>(false)

  const login = async (credentials: any) => {
    isLoading.value = true
    try {
      const response = await api.post('/api/auth/login', credentials)
      const data = response.data
      console.log('Login API response:', data)
      
      // Attempt to extract token based on provided response structure
      token.value = data.data?.access || data.token || data.access_token
      
      if (!token.value) {
        throw new Error("Login succeeded but no token was found in the response. Please check the backend response structure.")
      }

      localStorage.setItem('token', token.value)
      // If there's a refresh token, we can save it too
      if (data.data?.refresh) {
        localStorage.setItem('refresh_token', data.data.refresh)
      }
      
      user.value = data.user || data.data?.user || null
      
      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
      
      return true
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed'
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: any) => {
    isLoading.value = true
    try {
      const response = await api.post('/api/auth/register', userData)
      
      Swal.fire({
        icon: 'success',
        title: 'Registered successfully',
        text: 'You can now log in.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
      
      return true
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed'
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      // Optional: Call logout endpoint if your backend requires it to invalidate tokens
      await api.post('/api/auth/logout')
    } catch (e) {
      console.error('Logout API failed', e)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      
      Swal.fire({
        icon: 'success',
        title: 'Logged out',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  const fetchUser = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/api/auth/v1/user')
      user.value = response.data?.user || response.data?.data?.user || response.data || null
      return user.value
    } catch (e) {
      console.error('Failed to fetch user', e)
      user.value = null
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    token,
    user,
    isLoading,
    login,
    register,
    logout,
    fetchUser
  }
})
