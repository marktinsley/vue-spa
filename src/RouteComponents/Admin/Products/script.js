import NewModal from './NewModal/Component'
import {Paginator} from '../../../Library/Paginator'
import {pullProducts} from '../../../Vuex/actions/admin/products'

export default {
  components: [NewModal],
  vuex: {
    actions: { pullProducts },
    getters: {
      pullingProducts: state => state.adminProducts.pullingProducts,
      productsPaginator: state => Paginator.fromLaravelJson(state.adminProducts.productsPaginator),
      pullingProductsErrorMessage: state => state.adminProducts.pullingProductsErrorMessage,
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
    }
  }
}
