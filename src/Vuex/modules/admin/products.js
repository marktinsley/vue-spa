import {ServerErrorParser} from '../../../Library/Api/ServerErrorParser'

import {
  PULL_PRODUCTS_REQUEST,
  PULL_PRODUCTS_COMPLETE,
  PULL_PRODUCTS_FAILURE
} from '../../mutation-types'

// initial state
const state = {
  pullingProducts: false,
  pullingProductsErrorMessage: null,
  productsPaginator: null
}

const mutations = {
  // Starting to pull down the products.
  [PULL_PRODUCTS_REQUEST] () {
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
  }
}

export default {
  state,
  mutations
}
