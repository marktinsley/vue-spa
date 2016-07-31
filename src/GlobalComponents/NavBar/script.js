export default {
  vuex: {
    getters: {
      user: state => state.authentication.user,
      userIsLoggedIn: state => state.authentication.userIsLoggedIn,

      runningAuctions: state => state.auctionRooms.inRunningAuctions
    }
  },

  computed: {
    runningAuction () {
      return Array.isArray(this.runningAuctions) && this.runningAuctions.length > 0
        ? this.runningAuctions[this.runningAuctions.length - 1]
        : null
    }
  }
}
