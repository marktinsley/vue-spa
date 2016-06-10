export default {
  vuex: {
    getters: {
      user: state => state.authentication.user,
      userIsLoggedIn: state => state.authentication.userIsLoggedIn
    }
  }
}
