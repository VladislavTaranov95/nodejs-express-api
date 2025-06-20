import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import UserApi from '@/api/user'

const defaultUser = {
  auth: false,
  bootstrapped: false,
}

export const useUserStore = defineStore('user', () => {
  let user = reactive({
    ...defaultUser,
  })

  const isAuthenticated = computed(() => user.auth)
  const isBootstrapped = computed(() => user.bootstrapped)

  function setAuth(payload) {
    user.auth = payload
  }

  function setState(payload) {
    user.bootstrapped = payload
  }

  function setUser(payload) {
    user = Object.assign(user, payload)
  }

  async function login(payload) {
    const { data, error } = await UserApi.login({
      email: payload.email,
      password: payload.password,
    })

    if (error.value) {
      throw error.value
    }

    setAuth(data.value.data.accessToken)

    await loadUser()
  }

  async function register(payload) {
    const { data, error } = await UserApi.register(payload)

    if (error.value) {
      throw error.value
    }

    setAuth(data.value.data.accessToken)

    await loadUser()
  }

  async function loadUser() {
    const { data, error } = await UserApi.getMe()

    if (error.value) {
      throw new Error(error.value.message)
    }

    setUser(data.value)
  }

  async function logout() {
    await UserApi.logout()

    Object.assign(user, { ...defaultUser })
  }

  return {
    user,
    isAuthenticated,
    isBootstrapped,
    logout,
    login,
    register,
    setAuth,
    setState,
    setUser,
    loadUser,
  }
})
