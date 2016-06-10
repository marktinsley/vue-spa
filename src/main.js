import {router, store} from './vue-bootstrap'
import {defineRoutes} from './routes'
import {pullSessionInfo} from './Vuex/actions'

defineRoutes(router)
  .start({
    store,
    vuex: {
      getters: {
        pullingSessionInfo: state => state.authentication.pullingSessionInfo,
        userIsLoggedIn: state => state.authentication.userIsLoggedIn,
        user: state => state.authentication.user
      },
      actions: {
        pullSessionInfo
      }
    }
  }, 'body')
