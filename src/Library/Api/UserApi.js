import objectHas from 'lodash.has'
import HttpClient from './HttpClient'

export default class UserApi {
  /**
   * Constructor.
   */
  constructor () {
    this._client = new HttpClient()
  }

  /**
   * Send out a request to register a user.
   *
   * @param userData
   *
   * @returns {Promise}
   */
  register (userData) {
    return this._client.post('api/register', userData)
  }

  /**
   * Send off a login request.
   *
   * @param email
   * @param password
   * @param remember
   *
   * @returns {Promise}
   */
  login (email, password, remember) {
    return this._client.post('api/login', {email, password, remember})
      .then(response => (objectHas(response, 'body.user') ? response.body.user : null))
  }

  /**
   * Send off a logout request.
   *
   * @returns {Promise}
   */
  logout () {
    return this._client.get('api/logout')
  }

  /**
   * Provides session info for the current browser session.
   *
   * Including the currently logged in user.
   *
   * @returns {Promise}
   */
  sessionInfo () {
    return this._client.get('api/session-info')
      .then(response => (objectHas(response, 'body') ? response.body : null))
  }
}
