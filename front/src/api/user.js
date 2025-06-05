import { ApiResource } from '@/composables/useApi'

class UserApi extends ApiResource {
  path = ''

  constructor(path) {
    super(path)
  }

  getUser() {
    this.path = 'auth/user'
    return this.get()
  }

  login(payload) {
    this.path = 'auth/login'
    return this.post(payload)
  }

  logout() {
    this.path = 'auth/logout'
    return this.post()
  }
}

export default new UserApi()
