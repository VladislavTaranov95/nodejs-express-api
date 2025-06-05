import { ApiResource } from '@/composables/useApi'

class CategoryApi extends ApiResource {
  path = 'category'

  constructor(path) {
    super(path)
  }

  async getCategories() {
    const response = await this.get().json()
    return response.data.value
  }

  async createCategory(payload) {
    const response = await this.post(payload).json()
    return response.data.value
  }
}

export default new CategoryApi()
