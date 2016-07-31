import Vue from 'vue'
import objectHas from 'lodash.has'
import assignIn from 'lodash.assignin'
import {Auction} from '../../Library/DataModels/Auction'
import {ServerErrorParser} from '../../Library/Api/ServerErrorParser'

import {
  AUCTION_ROOM_INFO_REQUEST,
  AUCTION_ROOM_INFO_SUCCESS,
  AUCTION_ROOM_INFO_FAILURE,
  AUCTION_ROOM_CONCISE_INFO_REQUEST,
  AUCTION_ROOM_CONCISE_INFO_SUCCESS,
  AUCTION_ROOM_CONCISE_INFO_FAILURE,
  CHECK_FOR_RUNNING_AUCTION_REQUEST,
  CHECK_FOR_RUNNING_AUCTION_SUCCESS,
  CHECK_FOR_RUNNING_AUCTION_FAILURE,
  PLACE_BID_REQUEST,
  PLACE_BID_SUCCESS,
  PLACE_BID_FAILURE
} from '../mutation-types'

// initial state
const state = {
  pullingAuctionInfo: {},
  pullingAuctionInfoError: {},
  auctions: {},

  placingBid: {},
  placingBidError: {},

  inRunningAuctions: []
}

const mutations = {
  // Starting to pull down information for an auction.
  [AUCTION_ROOM_INFO_REQUEST] (state, auctionId) {
    Vue.set(state.pullingAuctionInfo, auctionId, true)
    Vue.set(state.pullingAuctionInfoError, auctionId, null)

    if (!objectHas(state.auctions, auctionId)) {
      Vue.set(state.auctions, auctionId, null)
    }
  },

  // Pulled down information for an auction.
  [AUCTION_ROOM_INFO_SUCCESS] (state, auctionId, auction) {
    Vue.set(state.pullingAuctionInfo, auctionId, false)
    Vue.set(state.pullingAuctionInfoError, auctionId, null)

    if (auction instanceof Auction) {
      Vue.set(state.auctions, auctionId, auction)
    } else {
      Vue.set(state.auctions, auctionId, null)
    }
  },

  // Failed pulling down information for an auction.
  [AUCTION_ROOM_INFO_FAILURE] (state, auctionId, errorInfo) {
    Vue.set(state.pullingAuctionInfo, auctionId, false)
    Vue.set(state.auctions, auctionId, null)

    Vue.set(state.pullingAuctionInfoError, auctionId, ServerErrorParser
      .parse(errorInfo)
      .prefix('Error pulling down auction: ')
      .errorMessage)
  },

  // Starting to pull down concise information for an auction.
  [AUCTION_ROOM_CONCISE_INFO_REQUEST] (state, auctionId) {
  },

  // Pulled down concise information for an auction.
  [AUCTION_ROOM_CONCISE_INFO_SUCCESS] (state, auctionId, auctionInfo) {
    // Only update the auction if we already have one.
    if (objectHas(state.auctions, auctionId) && state.auctions[auctionId] instanceof Auction) {
      let existingAuction = JSON.parse(JSON.stringify(state.auctions[auctionId]))
      Vue.set(state.auctions, auctionId, new Auction(assignIn(existingAuction, auctionInfo)))
    }
  },

  // Failed pulling down concise information for an auction.
  [AUCTION_ROOM_CONCISE_INFO_FAILURE] (state, auctionId, errorInfo) {
  },

  // Starting to pull down concise information for an auction.
  [CHECK_FOR_RUNNING_AUCTION_REQUEST] (state) {
  },

  // Pulled down concise information for an auction.
  [CHECK_FOR_RUNNING_AUCTION_SUCCESS] (state, auctions) {
    state.inRunningAuctions = auctions
  },

  // Failed pulling down concise information for an auction.
  [CHECK_FOR_RUNNING_AUCTION_FAILURE] (state, auctionId, errorInfo) {
  },

  // Starting to place a bid.
  [PLACE_BID_REQUEST] (state, auctionId) {
    Vue.set(state.placingBid, auctionId, true)
    Vue.set(state.placingBidError, auctionId, null)
  },

  // Success placing a bid.
  [PLACE_BID_SUCCESS] (state, auctionId) {
    Vue.set(state.placingBid, auctionId, false)
  },

  // Failed placing a bid.
  [PLACE_BID_FAILURE] (state, auctionId, errorInfo) {
    Vue.set(state.placingBid, auctionId, false)
    Vue.set(state.placingBidError, auctionId, ServerErrorParser
      .parse(errorInfo)
      .prefix('Error pulling down auction: ')
      .errorMessage)
  }
}

export default {
  state,
  mutations
}
