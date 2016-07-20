import {ServerErrorParser} from '../../../Library/Api/ServerErrorParser'

import {
  PULL_PRODUCTS_REQUEST,
  PULL_PRODUCTS_COMPLETE,
  PULL_PRODUCTS_FAILURE,
  DESTROY_PRODUCT_REQUEST,
  DESTROY_PRODUCT_SUCCESS,
  DESTROY_PRODUCT_FAILURE
} from '../../mutation-types'

// initial state
const state = {
  pullingProducts: false,
  pullingProductsErrorMessage: null,
  productsPaginator: null,
  destroyingProduct: false,
  productDestroyed: false,
  productDestroyError: null
}

const mutations = {
  // Starting to pull down the products.
  [PULL_PRODUCTS_REQUEST] (state) {
    state.pullingProducts = true
    state.productsPaginator = {}
  },

  // Products have been pulled down.
  [PULL_PRODUCTS_COMPLETE] (state, productsPaginator) {
    state.pullingProducts = false
    state.productsPaginator = productsPaginator
  },

  // Failed pulling down products.
  [PULL_PRODUCTS_FAILURE] (state, errorInfo) {
    state.pullingProducts = false

    state.pullingProductsErrorMessage = ServerErrorParser
      .parse(errorInfo)
      .prefix('Error pulling down products: ')
      .errorMessage
  },

  // A request was made to destroy a product.
  [DESTROY_PRODUCT_REQUEST] (state) {
    state.destroyingProduct = true
    state.productDestroyed = false
    state.productDestroyError = null
  },

  // Product was destroyed successfully.
  [DESTROY_PRODUCT_SUCCESS] (state, product) {
    state.destroyingProduct = false
    state.productDestroyed = true
    state.productsPaginator.data.$remove(product)
  },

  // Failed destroying a product.
  [DESTROY_PRODUCT_FAILURE] (state, product, errorInfo) {
    state.destroyingProduct = false
    state.productDestroyError = null
  }
}

export default {
  state,
  mutations
}
