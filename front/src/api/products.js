import { ApiResource } from '@/composables/useApi'

class ProductsApi extends ApiResource {
  path = 'product'

  constructor(path) {
    super(path)
  }

  async getProducts(params) {
    const response = await this.get(undefined, params).json()
    return response.data.value
  }

  async getProduct(id) {
    const response = await this.get(`/${id}`).json()
    return response.data.value
  }

  async createProduct(payload) {
    const response = await this.post(payload).json()
    return response.data.value
  }

  async updateProduct(id, payload) {
    const response = await this.put(`/${id}`, payload).json()
    return response.data.value
  }

  async deleteProduct(id) {
    const response = await this.delete(`/${id}`).json()
    return response.data.value
  }
}

export default new ProductsApi()
