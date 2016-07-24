import objectHas from 'lodash.has'
import {HttpClient} from '../HttpClient'
import {Paginator} from '../../Paginator'
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
   * @returns {Promise<Paginator|null>}
   */
  forPage (page = 1) {
    return this._client.get('api/admin/products', {page})
      .then(response => (objectHas(response, 'body')
        ? Paginator.fromLaravelJson(response.body)
        : null))
  }

  /**
   * Create a product.
   *
   * @param {Product} product
   *
   * @return {Promise<Product|null>}
   */
  store (product) {
    return this._client.post('api/admin/products', product)
      .then(result => {
        if (objectHas(result, 'body.product')) {
          return new Product(result.body.product)
        }

        return null
      })
  }

  /**
   * Update a product.
   *
   * @param {Product} product
   *
   * @return {Promise}
   */
  update (product) {
    return this._client.put('api/admin/products/' + product.id, product)
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
