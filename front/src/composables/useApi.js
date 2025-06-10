import { createFetch } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const useCutomFetch = createFetch({
  baseUrl: 'http://localhost:3000/api',
  combination: 'chain',
  options: {
    beforeFetch({ options }) {
      const userStore = useUserStore()
      const token = userStore.isAuthenticated
      options.headers.Authorization = `Bearer ${token}`
      options.headers.ContentType = 'application/json'
      options.credentials = 'include'
      return { options }
    },
    updateDataOnError: true,
    onFetchError: async (ctx) => {
      if (ctx.data.error) {
        ctx.error = ctx.data.error || 'An error occurred during the fetch operation'

        if (ctx.response.status === 401) {
          const response = await fetch('http://localhost:3000/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })

          const { data } = await response.json()

          if (data) {
            const userStore = useUserStore()
            userStore.setAuth(data)

            const retry = await fetch(ctx.context.url, {
              ...ctx.context.options,
              headers: {
                ...ctx.context.options.headers,
                Authorization: `Bearer ${data}`,
              },
              credentials: 'include',
            })

            ctx.data = await retry.json()
            await userStore.loadUser()
            ctx.error = null
          } else {
            ctx.error = 'Failed to refresh token. Please log in again.'

            router.push({ name: 'login' })
          }
        }
      }

      return ctx
    },
  },
  // fetchOptions: {
  //   mode: 'cors',
  // },
})

export class ApiResource {
  path = ''

  constructor(path) {
    this.path = path
  }

  get(id, params) {
    let url = `/${this.path}`
    if (id) url += `/${id}`
    if (params) {
      const query = new URLSearchParams(params).toString()
      url += `?${query}`
    }
    return useCutomFetch(url).get().json()
  }

  post(body) {
    return useCutomFetch(`/${this.path}`).post(body).json()
  }

  put(id, body) {
    return useCutomFetch(`/${this.path}/${id}`).put(body).json()
  }

  delete(id) {
    return useCutomFetch(`/${this.path}/${id}`).delete().json()
  }
}
