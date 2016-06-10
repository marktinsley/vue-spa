import superAgent from 'superagent-cache' // @see http://visionmedia.github.io/superagent/ and https://github.com/jpodwys/superagent-cache
import forEach from 'lodash.foreach'
import objectHas from 'lodash.has'
import {debug, defaultApiCacheSeconds} from '../../config'
import UrlBuilder from '../Helpers/UrlBuilder'

export default class HttpClient {
  /**
  * Constructor.
  */
  constructor () {
    this._cacheSeconds = defaultApiCacheSeconds
  }

  /**
  * Set a custom number of seconds to cache the response for.
  *
  * @param {Number} seconds
  *
  * @returns {HttpClient}
  */
  cacheSeconds (seconds) {
    this._cacheSeconds = parseInt(seconds, 10)

    return this
  }

  /**
  * Turn off caching for future requests with this instance.
  *
  * @returns {HttpClient}
  */
  noCache () {
    this._cacheSeconds = 0

    return this
  }

  /**
  * Send out a GET request.
  *
  * @param {String} uri
  * @param {Object} params
  *
  * @returns {Promise}
  */
  get (uri, params = {}) {
    return this._promiseIt('get', uri, params)
  }

  /**
  * Send out a POST request.
  *
  * @param {String} uri
  * @param {Object} params
  *
  * @returns {Promise}
  */
  post (uri, params) {
    return this._promiseIt('post', uri, params)
  }

  /**
  * Send out a PUT request.
  *
  * @param {String} uri
  * @param {Object} params
  *
  * @returns {Promise}
  */
  put (uri, params = {}) {
    return this._promiseIt('put', uri, params)
  }

  /**
  * Send out a DELETE request.
  *
  * Can't use 'delete' because it's a reserved word.
  *
  * @param {String} uri
  * @param {Object} params
  *
  * @returns {Promise}
  */
  deleteIt (uri, params = {}) {
    return this._promiseIt('delete', uri, params)
  }

  /**
  * Send off the request and promise a response.
  *
  * @param requestType
  * @param uri
  * @param params
  *
  * @returns {Promise}
  * @private
  */
  _promiseIt (requestType, uri, params) {
    return new Promise((resolve, reject) => {
      this._getAgentInstance(requestType, uri, params)
      .end((error, response) => {
        let messageIndicatesError = objectHas(response, 'body.error') && response.body.error

        if (error || !response.ok || messageIndicatesError) {
          HttpClient._handleError(error, response)
          reject({
            error: error,
            body: objectHas(response, 'body') ? response.body : null
          })
        } else {
          resolve(response)
        }
      })
    })
  }

  /**
  * Resolve the given URI into a full URL.
  *
  * @param {String} uri
  *
  * @returns {String}
  * @private
  */
  static _resolveUrl (uri) {
    return new UrlBuilder().uri(uri).build()
  }

  /**
  * Build up an instance of the agent we'll use to handle the request.
  *
  * @param {String} requestType HTTP method to use (GET, POST, PUT, DELETE, HEAD)
  * @param {String} uri
  * @param {Object} params
  *
  * @returns {superAgent}
  * @private
  */
  _getAgentInstance (requestType, uri, params = {}) {
    requestType = requestType.toLowerCase()

    if (requestType === 'delete') requestType = 'del'

    // Instantiate.
    let agent = superAgent(null, {
      defaultExpiration: this._cacheSeconds
    })

    // Set the method and URL for the request.
    agent = agent[requestType](HttpClient._resolveUrl(uri))
    .accept('application/json')

    return HttpClient._addParamsToAgent(agent, requestType, params)
  }

  /**
  * Add the provided parameters to the given agent.
  *
  * @param {superAgent} agent
  * @param {String} requestType
  * @param {Object} params
  *
  * @returns {superAgent}
  * @private
  */
  static _addParamsToAgent (agent, requestType, params) {
    // Determine which way to attach parameters.
    let paramApproach = ['get', 'head'].indexOf(requestType) > 0
    ? 'query'
    : 'send'

    // Add provided params.
    forEach(params, (value, name) => {
      agent = agent[paramApproach]({
        [name]: value
      })
    })

    return agent
  }

  /**
  * Handle the given error.
  *
  * @param error
  * @param response
  *
  * @private
  */
  static _handleError (error, response) {
    if (debug) {
      console.warn(error)

      if (objectHas(response, 'body.message')) {
        console.warn(response.body.message)
      }
    }
  }
}
