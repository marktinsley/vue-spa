import ManageModal from './ManageModal/Component'
import {Paginator} from '../../../Library/Paginator'
import {Product} from '../../../Library/DataModels/Product'
import {pullProducts, destroy} from '../../../Vuex/actions/admin/products'

export default {
  components: {ManageModal},

  data () {
    return {
      newProduct: new Product({})
    }
  },

  vuex: {
    actions: {pullProducts, destroy},
    getters: {
      pullingProducts: state => state.adminProducts.pullingProducts,
      productsPaginator: state => Paginator.fromLaravelJson(state.adminProducts.productsPaginator),
      pullingProductsErrorMessage: state => state.adminProducts.pullingProductsErrorMessage,
      destroyingProduct: state => state.adminProducts.destroyingProduct
    }
  },

  ready () {
    this.pullProducts(1)
  },

  methods: {
    /**
     * Go to the given page number.
     */
    goToPage (pageNumber) {
      this.pullProducts(pageNumber)
    },

    /**
     * Delete the given product.
     *
     * @param product
     */
    confirmDestroy (product) {
      if (confirm(`Delete ${product.title}?`)) {
        this.destroy(product)
      }
    }
  }
}
