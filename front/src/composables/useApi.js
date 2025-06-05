import { createFetch } from '@vueuse/core'

const fetch = createFetch({
  baseUrl: 'http://localhost:3000/api',
  combination: 'chain',
  options: {
    beforeFetch({ options }) {
      const token = localStorage.getItem('accessToken')
      options.headers.Authorization = `Bearer ${token}`
      options.headers.ContentType = 'application/json'
      return { options }
    },
    updateDataOnError: true,
    onFetchError: (ctx) => {
      if (ctx.data.error) {
        ctx.error = ctx.data.error || 'An error occurred during the fetch operation'
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
    return fetch(url, { throwOnFailed: true }).get().json()
  }

  post(body) {
    return fetch(`/${this.path}`).post(body).json()
  }

  put(id, body) {
    return fetch(`/${this.path}/${id}`).put(body).json()
  }

  delete(id) {
    return fetch(`/${this.path}/${id}`).delete().json()
  }
}
