import {logout} from '../../Vuex/actions'

export default {
  vuex: {
    actions: {
      logout
    },
    getters: {
      loading: state => state.authentication.processingLogout,

      userIsLoggedIn: state => state.authentication.userIsLoggedIn,

      errorMessage: state => state.authentication.loginErrorMessage
    }
  },

  route: {
    activate ({next}) {
      // We don't need to visit this page if a user is already logged out.
      (this.userIsLoggedIn)
        ? next()
        : this.$route.router.go('/')
    }
  },

  ready ()
  {
    this.logout()
  }
}
