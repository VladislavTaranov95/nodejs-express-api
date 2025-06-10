import { ApiResource } from '@/composables/useApi'

class UserApi extends ApiResource {
  path = ''

  constructor(path) {
    super(path)
  }

  getUser() {
    this.path = 'user'
    return this.get()
  }

  getMe() {
    this.path = 'user/me'
    return this.get()
  }

  login(payload) {
    this.path = 'auth/login'
    return this.post(payload)
  }

  register(payload) {
    this.path = 'auth/register'
    return this.post(payload)
  }

  logout() {
    this.path = 'auth/logout'
    return this.post()
  }

  refresh() {
    this.path = 'auth/refresh'
    return this.post()
  }
}

export default new UserApi()
