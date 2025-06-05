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
      throw new Error(error.value.message)
    }

    loadUser()
  }

  async function loadUser() {
    const response = await UserApi.getUser()

    setAuth(true)
    setState(true)
    setUser(response)
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
    setAuth,
    setState,
    setUser,
    loadUser,
  }
})
