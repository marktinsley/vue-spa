import superAgent from 'superagent-cache' // @see http://visionmedia.github.io/superagent/ and https://github.com/jpodwys/superagent-cache
import forEach from 'lodash.foreach'
import objectHas from 'lodash.has'
import {debug, defaultApiCacheSeconds} from '../../config'
import {UrlBuilder} from '../Helpers/UrlBuilder'
import store from '../../Vuex/store'

export class HttpClient {
  /**
   * Constructor.
   */
  constructor () {
    this._cacheSeconds = defaultApiCacheSeconds
    this._token = null
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
   * Set the token to use with the request.
   *
   * @param token
   *
   * @returns {HttpClient}
   */
  withToken (token) {
    this._token = token

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
  post (uri, params = {}) {
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
        .on('error', () => {
          window.alert('An error occurred.')
        })
        .end((error, response) => {
          let messageIndicatesError = objectHas(response, 'body.error') && response.body.error

          if (error || !response.ok || messageIndicatesError) {
            HttpClient._handleError(error, response)
            reject({
              error,
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
    this._checkForAuthToken()
    requestType = requestType.toLowerCase()

    if (requestType === 'delete') requestType = 'del'

    // Instantiate.
    let agent = superAgent()

    // Set the method and URL for the request.
    agent = agent[requestType](HttpClient._resolveUrl(uri))
      .accept('application/json')

    if (this._cacheSeconds > 0) {
      agent.expiration(this._cacheSeconds)
    } else {
      agent.forceUpdate()
    }

    if (this._token) {
      agent = agent.set('Authorization', `Bearer ${this._token}`)
    }

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
    let paramApproach = ['get', 'head'].indexOf(requestType) === 0
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

  /**
   * If we have an authentication token in the app's state, let's use that.
   *
   * @private
   */
  _checkForAuthToken () {
    if (store.state.authentication.token) {
      this._token = store.state.authentication.token
    }
  }
}
