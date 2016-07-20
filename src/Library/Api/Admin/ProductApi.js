import objectHas from 'lodash.has'
import {HttpClient} from '../HttpClient'
import {Product} from '../../DataModels/Product'

export class ProductApi {
  /**
   * Constructor.
   */
  constructor () {
    this._client = new HttpClient()
  }

  /**
   * Pull down all of the products, paginated.
   *
   * @param {Number} page
   *
   * @returns {Promise}
   */
  forPage (page = 1) {
    return this._client.get('api/admin/products', {page})
      .then(response => (objectHas(response, 'body') ? response.body : null))
  }

  /**
   * Create a product.
   *
   * @param {Product} product
   *
   * @return {Promise}
   */
  create (product) {
    if (product instanceof Product) {
      return this._client.post('api/admin/products', {product})
    }

    console.warn('In order to create a product, you must supply a value of type Product.')
  }

  /**
   * Delete a product.
   *
   * @param {Product} product
   *
   * @returns {Promise}
   */
  destroy (product) {
    return this._client.deleteIt('api/admin/products/' + product.id)
  }
}
