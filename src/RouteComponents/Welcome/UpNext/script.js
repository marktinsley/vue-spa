import {UrlBuilder} from '../../../Library/Helpers/UrlBuilder'
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
      initialPullComplete: false,
      pullInterval: null
    }
  },

  computed: {
    auctionImage () {
      if (this.auction) {
        return new UrlBuilder()
          .uri('api/product/image/' + this.auction.product.id)
          .build()
      }
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

    this.pullInterval = window.setInterval(() => {
      if (this.pullingOptInAuctionComplete) {
        this.pullOptInAuction()
      }
    }, 1000)
  },

  destroyed () {
    window.clearInterval(this.pullInterval)
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
