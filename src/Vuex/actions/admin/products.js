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

/**
 * Create a product.
 *
 * @param dispatch
 * @param {Product} product
 */
export const create = ({dispatch}, product) => {
  dispatch(types.CREATE_PRODUCT_REQUEST)

  new ProductApi()
    .store(product)
    .then(createdProduct => dispatch(types.CREATE_PRODUCT_SUCCESS, createdProduct))
    .catch(error => dispatch(types.CREATE_PRODUCT_FAILURE, error))
}

/**
 * Edit a product.
 *
 * @param dispatch
 * @param {Product} product
 */
export const edit = ({dispatch}, product) => {
  dispatch(types.EDIT_PRODUCT_REQUEST)

  new ProductApi()
    .update(product)
    .then(() => dispatch(types.EDIT_PRODUCT_SUCCESS, product))
    .catch(error => dispatch(types.EDIT_PRODUCT_FAILURE, error))
}

/**
 * Reset the saved flag.
 *
 * @param dispatch
 */
export const resetSaved = ({dispatch}) => {
  dispatch(types.PRODUCT_SAVED_RESET)
}

/**
 * Delete a product.
 *
 * @param dispatch
 * @param product
 */
export const destroy = ({dispatch}, product) => {
  dispatch(types.DESTROY_PRODUCT_REQUEST)

  new ProductApi()
    .destroy(product)
    .then(() => dispatch(types.DESTROY_PRODUCT_SUCCESS, product))
    .catch(error => dispatch(types.DESTROY_PRODUCT_FAILURE, error))
}
