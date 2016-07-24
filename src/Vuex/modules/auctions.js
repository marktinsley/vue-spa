import {Auction} from '../../Library/DataModels/Auction'
import {ServerErrorParser} from '../../Library/Api/ServerErrorParser'

import {
  PULL_CURRENT_OPT_IN_SUCCESS,
  PULL_CURRENT_OPT_IN_FAILURE,
  PULL_CURRENT_OPT_IN_REQUEST,
  REGISTER_FOR_AUCTION_REQUEST,
  REGISTER_FOR_AUCTION_SUCCESS,
  REGISTER_FOR_AUCTION_FAILURE
} from '../mutation-types'

// initial state
const state = {
  pullingOptInAuction: true,
  pullingOptInAuctionComplete: false,
  pullOptInAuctionError: null,
  optInAuction: null,
  userIsRegisteredForCurrentOptIn: false,

  registeringForAuction: false,
  registeringForAuctionComplete: false,
  registeringForAuctionError: null
}

const mutations = {
  // Starting to pull down the opt-in auction.
  [PULL_CURRENT_OPT_IN_REQUEST] (state) {
    state.pullingOptInAuction = true
    state.pullingOptInAuctionComplete = false
    state.pullOptInAuctionError = null
  },

  // Opt-in auction has been pulled down.
  [PULL_CURRENT_OPT_IN_SUCCESS] (state, {auction, currentUserIsRegistered}) {
    state.pullingOptInAuction = false
    state.pullingOptInAuctionComplete = true
    state.userIsRegisteredForCurrentOptIn = currentUserIsRegistered

    if (auction instanceof Auction) {
      state.optInAuction = auction
    } else {
      state.optInAuction = null
    }
  },

  // Failed pulling down opt-in auction.
  [PULL_CURRENT_OPT_IN_FAILURE] (state, errorInfo) {
    state.pullingOptInAuction = false
    state.pullingOptInAuctionComplete = true

    state.pullOptInAuctionError = ServerErrorParser
      .parse(errorInfo)
      .prefix('Error pulling down auction: ')
      .errorMessage
  },

  // Starting to register for an auction.
  [REGISTER_FOR_AUCTION_REQUEST] (state) {
    state.registeringForAuction = true
    state.registeringForAuctionComplete = false
    state.registeringForAuctionError = null
  },

  // Successfully registered for auction
  [REGISTER_FOR_AUCTION_SUCCESS] (state) {
    state.registeringForAuction = false
    state.registeringForAuctionComplete = true
    state.userIsRegisteredForCurrentOptIn = true
  },

  // Failed registering for auction
  [REGISTER_FOR_AUCTION_FAILURE] (state, errorInfo) {
    state.registeringForAuction = false
    state.registeringForAuctionComplete = true
    state.userIsRegisteredForCurrentOptIn = false

    state.registeringForAuctionError = ServerErrorParser
      .parse(errorInfo)
      .prefix('Error pulling down auction: ')
      .errorMessage
  }
}

export default {
  state,
  mutations
}
