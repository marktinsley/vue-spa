import {pullOptInAuction, registerFor} from '../../../Vuex/actions/auctions'

export default {
  vuex: {
    actions: {pullOptInAuction, registerFor},
    getters: {
      pullingOptInAuction: state => state.auctions.pullingOptInAuction,
      pullingOptInAuctionComplete: state => state.auctions.pullingOptInAuctionComplete,
      pullOptInAuctionError: state => state.auctions.pullOptInAuctionError,
      auction: state => state.auctions.optInAuction,
      userIsRegisteredForCurrentOptIn: state => state.auctions.userIsRegisteredForCurrentOptIn,

      userIsLoggedIn: state => state.authentication.userIsLoggedIn,

      registeringForAuction: state => state.auctions.registeringForAuction,
      registeringForAuctionComplete: state => state.auctions.registeringForAuctionComplete,
      registeringForAuctionError: state => state.auctions.registeringForAuctionError
    }
  },

  data () {
    return {
      initialPullComplete: false
    }
  },

  watch: {
    /**
     *
     * @param newValue
     */
    pullingOptInAuctionComplete (newValue) {
      if (newValue && !this.initialPullComplete) {
        this.initialPullComplete = true
      }
    }
  },

  created () {
    this.pullOptInAuction()

    window.setInterval(() => {
      if (this.pullingOptInAuctionComplete) {
        this.pullOptInAuction()
      }
    }, 1000)
  },

  methods: {
    /**
     * Register for an auction.
     */
    register () {
      this.registerFor(this.auction)
    }
  }
}
