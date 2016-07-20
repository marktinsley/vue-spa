import {ProductApi} from '../../../Library/Api/Admin/ProductApi'
import * as types from '../../mutation-types'

/**
 * Pull the products from the API.
 *
 * @param dispatch
 * @param pageNumber
 */
export const pullProducts = ({dispatch}, pageNumber) => {
  dispatch(types.PULL_PRODUCTS_REQUEST)

  new ProductApi()
    .forPage(pageNumber)
    .then(productsPaginator => dispatch(types.PULL_PRODUCTS_COMPLETE, productsPaginator))
    .catch(errorInfo => dispatch(types.PULL_PRODUCTS_FAILURE, errorInfo))
}

export const destroy = ({dispatch}, product) => {
  dispatch(types.DESTROY_PRODUCT_REQUEST)

  new ProductApi()
    .destroy(product)
    .then(() => dispatch(types.DESTROY_PRODUCT_SUCCESS, product))
    .catch(() => dispatch(types.DESTROY_PRODUCT_FAILURE, product))
}
