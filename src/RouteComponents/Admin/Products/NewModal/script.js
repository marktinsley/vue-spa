import {Product} from '../../../../Library/DataModels/Product'
import {ProductApi} from '../../../../Library/Api/Admin/ProductApi'

export default {
  name: 'new-modal',

  data () {
    return {
      title: null,
      price: null,
      description: null,
      showModal: false
    }
  },

  methods: {
    save () {
      let product = new Product({
        title: this.title,
        price: this.price,
        description: this.description
      })

      new ProductApi().create(product)
    }
  }
}
