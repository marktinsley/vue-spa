import Base from './Base'

/**
 * If the route requires the user to be authenticated (auth: true),
 * and user is not logged in, redirect to login page.
 */
export default class AuthenticatedUsersOnly extends Base {
  /**
   * Perform the check.
   *
   * @param result
   */
  handle ({result}) {
    if (this._routeRequiresAuthentication() && this._userNotLoggedIn()) {
      return this._redirectToLogin()
    } else {
      return Promise.resolve({result})
    }
  }

  /**
   * Tells you if this route requires users to be authenticated to access it.
   *
   * @returns {boolean}
   * @private
   */
  _routeRequiresAuthentication () {
    return this._transition.to.auth || this._transition.to.admin
  }

  /**
   * The user is not currently logged in.
   *
   * @returns {boolean}
   * @private
   */
  _userNotLoggedIn () {
    return !this._router.app.userIsLoggedIn
  }

  /**
   * Redirect the user to the login page.
   *
   * @private
   */
  _redirectToLogin () {
    this._transition.redirect({name: 'login'})

    return Promise.resolve({result: false})
  }
}
