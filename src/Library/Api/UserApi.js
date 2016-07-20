import objectHas from 'lodash.has'
import {HttpClient} from './HttpClient'
import store from '../../Vuex/store'

export class UserApi {
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
   *
   * @returns {Promise<string>}
   */
  login (email, password) {
    return new Promise((resolve, reject) => {
      // Attempt login.
      this._client.post('api/login', {email, password})
        .catch(error => reject(error))
        .then(response => {
          let token = objectHas(response, 'body.token')
            ? response.body.token
            : null

          if (!token) {
            reject()
            return
          }

          // Retrieve user info and return token and user.
          this.authenticatedUser(token)
            .then(user => resolve({user, token}))
            .catch(error => reject(error))
        })
    })
  }

  /**
   * Send off a logout request.
   *
   * @returns {Promise}
   */
  logout () {
    return this._client.post('api/logout', {
      token: store.state.authentication.token
    })
  }

  /**
   * Gives you the currently logged in user.
   *
   * @returns {Promise}
   */
  authenticatedUser (token = null) {
    return this._client
      .withToken(token)
      .get('api/authenticated-user')
      .then(response => objectHas(response, 'body.user') ? response.body.user : null)
  }

  /**
   * Provides session info for the current browser session.
   *
   * Including the currently logged in user.
   *
   * @returns {Promise}
   */
  sessionInfo () {
    let token = window.localStorage.getItem('token')

    if (!token) {
      return Promise.resolve()
    }

    return this._client
      .withToken(token)
      .get('api/authenticated-user')
      .then(response => (objectHas(response, 'body.user')
        ? {token, user: response.body.user}
        : null))
  }
}
