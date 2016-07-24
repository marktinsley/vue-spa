import * as types from '../mutation-types'
import {AuctionApi} from '../../Library/Api/AuctionApi'

/**
 * Pull the current opt-in auction from the API.
 *
 * @param dispatch
 */
export const pullOptInAuction = ({dispatch}) => {
  dispatch(types.PULL_CURRENT_OPT_IN_REQUEST)

  new AuctionApi()
    .currentOptIn()
    .then(auction => dispatch(types.PULL_CURRENT_OPT_IN_SUCCESS, auction))
    .catch(errorInfo => dispatch(types.PULL_CURRENT_OPT_IN_FAILURE, errorInfo))
}

/**
 * Register for an auction.
 *
 * @param dispatch
 * @param {Auction} auction
 */
export const registerFor = ({dispatch}, auction) => {
  dispatch(types.REGISTER_FOR_AUCTION_REQUEST)

  new AuctionApi()
    .registerFor(auction)
    .then(() => dispatch(types.REGISTER_FOR_AUCTION_SUCCESS))
    .catch(errorInfo => dispatch(types.REGISTER_FOR_AUCTION_FAILURE, errorInfo))
}
