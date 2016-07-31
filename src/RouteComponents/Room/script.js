import objectHas from 'lodash.has'
import {Auction} from '../../Library/DataModels/Auction'
import {Product} from '../../Library/DataModels/Product'
import {pullAuctionInfo, placeBid, pullConciseAuctionInfo} from '../../Vuex/actions/auctionRooms'
import {Currency} from '../../Library/Helpers/Currency'
import socket from 'socket.io-client'
import {UrlBuilder} from "../../Library/Helpers/UrlBuilder";

export default {
  vuex: {
    actions: {pullAuctionInfo, placeBid, pullConciseAuctionInfo},
    getters: {
      pullingAuctionInfo: state => state.auctionRooms.pullingAuctionInfo,
      auctions: state => state.auctionRooms.auctions,
      placingBid: state => state.auctionRooms.placingBid
    }
  },

  route: {
    activate () {
      this.pullAuctionInfo(this.auctionId)

      let socketClient = socket('http://192.168.10.10:3000')

      socketClient.on('gottanabit-public:App\\Events\\Auctions\\BidPlaced', ({latestBids}) => {
        this.latestBids = latestBids
      })
    },

    deactivate () {
      window.clearInterval(this.conciseInfoInterval)
    }
  },

  data () {
    return {
      conciseInfoInterval: null,
      latestBids: []
    }
  },

  computed: {
    /**
     * The ID of the auction.
     *
     * @returns {string}
     */
    auctionId () {
      return this.$route.params.auction_id
    },

    /**
     * The auction that was pulled down.
     *
     * @returns {Auction|null}
     */
    auction () {
      return objectHas(this.auctions, this.auctionId)
        ? this.auctions[this.auctionId]
        : new Auction({product: new Product({})})
    },

    auctionImage () {
      if (this.auction) {
        return new UrlBuilder()
          .uri('api/product/image/' + this.auction.product.id)
          .build()
      }
    },

    /**
     * Are we currently pulling information about the auction?
     *
     * @returns {boolean}
     */
    pullingInfo () {
      return objectHas(this.pullingAuctionInfo, this.auctionId) &&
        this.pullingAuctionInfo[this.auctionId]
    },

    /**
     * Are we currently placing a bid?
     *
     * @returns {boolean}
     */
    placingBidForAuction () {
      return objectHas(this.placingBid, this.auctionId) &&
        this.placingBid[this.auctionId]
    },

    currentPrice () {
      return (this.auction
        ? Currency.centsToDollars(this.auction.current_price)
        : '')
    }
  },

  ready () {
    this.conciseInfoInterval = window.setInterval(() => {
      this.pullConciseAuctionInfo(this.auctionId)
    }, 1000)
  },

  methods: {
    /**
     * Place a bid for the given amount.
     *
     * @param {number} amount
     */
    placeBidAmount (amount) {
      this.placeBid(this.auction.id, amount)
    }
  }
}
