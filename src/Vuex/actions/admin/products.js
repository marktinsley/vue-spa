import {ProductApi} from '../../../Library/Api/Admin/ProductApi'
import * as types from '../../mutation-types'

/**
* Pull the products from the API.
*
* @param dispatch
* @param notification
*/
export const pullProducts = ({dispatch}, pageNumber) => {
  dispatch(types.PULL_PRODUCTS_REQUEST)

  new ProductApi()
    .forPage(pageNumber)
    .then(productsPaginator => dispatch(types.PULL_PRODUCTS_COMPLETE, productsPaginator))
    .catch(errorInfo => dispatch(types.PULL_PRODUCTS_FAILURE, errorInfo))
}
