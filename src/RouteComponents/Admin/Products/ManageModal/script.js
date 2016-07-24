import {Product} from '../../../../Library/DataModels/Product'
import {create, edit, resetSaved} from '../../../../Vuex/actions/admin/products'

export default {
  props: {
    product: {
      twoWay: true,
      type: Product,
      required: true
    }
  },

  vuex: {
    actions: {create, edit, resetSaved},
    getters: {
      editingProduct: state => state.adminProducts.editingProduct,
      editProductError: state => state.adminProducts.editProductError,
      editingProductComplete: state => state.adminProducts.editingProductComplete,
      creatingProductComplete: state => state.adminProducts.creatingProductComplete
    }
  },

  data () {
    return {
      showModal: false
    }
  },

  watch: {
    showModal (newValue, oldValue) {
      // Have closed.
      if (oldValue && !newValue) {
        this.resetSaved()
        this.resetProduct()
      }
    }
  },

  methods: {
    /**
     * Save the product.
     */
    save () {
      if (this.product.exists) {
        this.edit(this.product)
      } else {
        this.create(this.product)
      }
    },

    /**
     * Gives you a new empty product.
     *
     * @returns {Product}
     */
    resetProduct () {
      if (!this.product.exists) {
        this.product = new Product({})
      }
    }
  }
}
