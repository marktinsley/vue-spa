import * as types from '../mutation-types'
import {AuctionApi} from '../../Library/Api/AuctionApi'

/**
 * Pull information about an auction from the API.
 *
 * @param dispatch
 * @param auctionId
 */
export const pullAuctionInfo = ({dispatch}, auctionId) => {
  dispatch(types.AUCTION_ROOM_INFO_REQUEST, auctionId)

  new AuctionApi()
    .info(auctionId)
    .then(auction => dispatch(types.AUCTION_ROOM_INFO_SUCCESS, auctionId, auction))
    .catch(errorInfo => dispatch(types.AUCTION_ROOM_INFO_FAILURE, auctionId, errorInfo))
}

/**
 * Pull concise information about an auction from the API.
 *
 * @param dispatch
 * @param auctionId
 */
export const pullConciseAuctionInfo = ({dispatch}, auctionId) => {
  dispatch(types.AUCTION_ROOM_CONCISE_INFO_REQUEST, auctionId)

  new AuctionApi()
    .conciseInfo(auctionId)
    .then(info => dispatch(types.AUCTION_ROOM_CONCISE_INFO_SUCCESS, auctionId, info))
    .catch(errorInfo => dispatch(types.AUCTION_ROOM_CONCISE_INFO_FAILURE, auctionId, errorInfo))
}

/**
 * Place a bid for an auction.
 *
 * @param dispatch
 * @param auctionId
 * @param amount
 */
export const placeBid = ({dispatch}, auctionId, amount) => {
  dispatch(types.PLACE_BID_REQUEST, auctionId)

  new AuctionApi()
    .placeBid(auctionId, amount)
    .then(() => dispatch(types.PLACE_BID_SUCCESS, auctionId))
    .catch(errorInfo => dispatch(types.PLACE_BID_FAILURE, auctionId, errorInfo))
}

/**
 *
 * @param dispatch
 */
export const checkForRunningAuction = ({dispatch}) => {
  dispatch(types.CHECK_FOR_RUNNING_AUCTION_REQUEST)

  new AuctionApi()
    .checkForRunningAuction()
    .then(auctions => dispatch(types.CHECK_FOR_RUNNING_AUCTION_SUCCESS, auctions))
    .then(errorInfo => dispatch(types.CHECK_FOR_RUNNING_AUCTION_FAILURE))
}
