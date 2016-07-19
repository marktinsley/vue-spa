import {BaseRouteGateCheck} from './BaseRouteGateCheck'

export default class UserAlreadyLoggedIn extends BaseRouteGateCheck {
  /**
   * Asks the server if the user with this browser is logged in.
   *
   * If Vuex says we've already checked once, we don't ask again.
   *
   * @param result
   *
   * @returns {Promise}
   */
  handle ({result}) {
    if (this._sessionInfoAlreadyPulled()) {
      return Promise.resolve({result})
    }

    return this._askServer(result)
  }

  /**
   * Start the request and once it's done, resolve to the next handler.
   *
   * @param result
   *
   * @returns {Promise}
   * @private
   */
  _askServer (result) {
    return new Promise(resolve => {
      // Send off request for session info.
      this._router.app.pullSessionInfo()

      // Keep checking to see if we got a response before allowing the routing to proceed.
      let interval = window.setInterval(() => {
        if (!this._router.app.pullingSessionInfo) {
          clearInterval(interval)
          resolve({result})
        }
      }, 100)
    })
  }

  /**
   * Have we already pulled the session information down from the server?
   *
   * @returns {boolean}
   * @private
   */
  _sessionInfoAlreadyPulled () {
    // This is set to true in the app's initial state because it's required for booting.
    return !this._router.app.pullingSessionInfo
  }
}
