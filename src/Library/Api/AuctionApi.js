import objectHas from 'lodash.has'
import {HttpClient} from './HttpClient'
import {Auction} from '../DataModels/Auction'

export class AuctionApi {
  /**
   * Constructor.
   */
  constructor () {
    this._client = new HttpClient()
  }

  /**
   * Pull the current opt-in auction from the API.
   *
   * @returns {Promise}
   */
  currentOptIn () {
    return this._client.noCache()
      .get('api/auction/opt-in-auction')
      .then(response => {
        let result = {
          auction: null,
          currentUserIsRegistered: null
        }

        if (objectHas(response, 'body.auction')) {
          result.auction = new Auction(response.body.auction)
          result.currentUserIsRegistered = !!response.body.currentUserIsRegistered
        }

        return result
      })
  }

  /**
   * Pull information about an auction from the API.
   *
   * @param {number} auctionId
   *
   * @returns {Promise}
   */
  info (auctionId) {
    return this._client.noCache()
      .get(`api/auction/info/${auctionId}`)
      .then(response => objectHas(response, 'body.auction')
        ? new Auction(response.body.auction)
        : null)
  }

  /**
   * Pull concise information about an auction from the API.
   *
   * Primarily for getting updated auction status and time.
   *
   * @param {number} auctionId
   *
   * @returns {Promise}
   */
  conciseInfo (auctionId) {
    return this._client.noCache()
      .get(`api/auction/concise-info/${auctionId}`)
      .then(response => objectHas(response, 'body.auction')
        ? response.body.auction
        : null)
  }

  /**
   * Register for an auction.
   *
   * @param {Auction} auction
   *
   * @returns {Promise}
   */
  registerFor (auction) {
    return this._client.post(`api/auction/register/${auction.id}`)
  }

  /**
   * Place a bid on an auction.
   *
   * @param {number} auctionId
   * @param {number} amount
   *
   * @returns {Promise}
   */
  placeBid (auctionId, amount) {
    return this._client.post(`api/auction/bid/${auctionId}`, {
      amount
    })
  }

  /**
   *
   */
  checkForRunningAuction () {
    return this._client.noCache()
      .get('api/auction/in-running-auction')
      .then(({body}) => {
        if (objectHas(body, 'auctions')) {
          return body.auctions.map(auctionInfo => {
            return new Auction(auctionInfo)
          })
        } else {
          return []
        }
      })
  }
}
