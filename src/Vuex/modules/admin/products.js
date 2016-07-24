import {Paginator} from '../../../Library/Paginator'
import {Product} from '../../../Library/DataModels/Product'
import {ServerErrorParser} from '../../../Library/Api/ServerErrorParser'

import {
  PULL_PRODUCTS_REQUEST,
  PULL_PRODUCTS_COMPLETE,
  PULL_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  PRODUCT_SAVED_RESET,
  DESTROY_PRODUCT_REQUEST,
  DESTROY_PRODUCT_SUCCESS,
  DESTROY_PRODUCT_FAILURE
} from '../../mutation-types'

// initial state
const state = {
  pullingProducts: false,
  pullingProductsErrorMessage: null,
  productsPaginator: null,

  creatingProduct: true,
  createProductError: null,
  creatingProductComplete: false,

  editingProduct: false,
  editProductError: null,
  editingProductComplete: false,

  destroyingProduct: false,
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

    if (productsPaginator instanceof Paginator) {
      state.productsPaginator = productsPaginator
        .mapDataInPlace(productData => {
          return new Product(productData)
        })
    }
  },

  // Failed pulling down products.
  [PULL_PRODUCTS_FAILURE] (state, errorInfo) {
    state.pullingProducts = false

    state.pullingProductsErrorMessage = ServerErrorParser
      .parse(errorInfo)
      .prefix('Error pulling down products: ')
      .errorMessage
  },

  // A request was made to create a product.
  [CREATE_PRODUCT_REQUEST] (state) {
    state.creatingProduct = true
    state.createProductError = null
    state.creatingProductComplete = false
  },

  // Product was created successfully.
  [CREATE_PRODUCT_SUCCESS] (state, product) {
    state.creatingProduct = false
    state.creatingProductComplete = true

    if (product instanceof Product) {
      state.productsPaginator.data.unshift(product)
    }
  },

  // Failed creating a product.
  [CREATE_PRODUCT_FAILURE] (state, errorInfo) {
    state.creatingProduct = false
    state.createProductError = errorInfo
  },

  // A request was made to edit a product.
  [EDIT_PRODUCT_REQUEST] (state) {
    state.editingProduct = true
    state.editProductError = null
    state.editingProductComplete = false
  },

  // Product was edited successfully.
  [EDIT_PRODUCT_SUCCESS] (state, product) {
    state.editingProduct = false
    state.editingProductComplete = true

    let index = state.productsPaginator.data.indexOf(product)
    state.productsPaginator.data[index] = product
  },

  // Failed editing a product.
  [EDIT_PRODUCT_FAILURE] (state, errorInfo) {
    state.editingProduct = false
    state.editProductError = errorInfo
  },

  // Reset product saved status
  [PRODUCT_SAVED_RESET] (state) {
    state.editingProductComplete = false
    state.creatingProductComplete = false
  },

  // A request was made to destroy a product.
  [DESTROY_PRODUCT_REQUEST] (state) {
    state.destroyingProduct = true
    state.productDestroyError = null
  },

  // Product was destroyed successfully.
  [DESTROY_PRODUCT_SUCCESS] (state, product) {
    state.destroyingProduct = false
    state.productsPaginator.data.$remove(product)
  },

  // Failed destroying a product.
  [DESTROY_PRODUCT_FAILURE] (state, errorInfo) {
    state.destroyingProduct = false
    state.productDestroyError = errorInfo
  }
}

export default {
  state,
  mutations
}
