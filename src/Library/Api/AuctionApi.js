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
   * Pull down all of the products, paginated.
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
   * Register for an auction.
   *
   * @param auction
   *
   * @returns {Promise}
   */
  registerFor (auction) {
    return this._client.post(`api/auction/register/${auction.id}`)
  }
}
