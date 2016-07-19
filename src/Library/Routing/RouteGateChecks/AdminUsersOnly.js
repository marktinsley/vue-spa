import {BaseRouteGateCheck} from './BaseRouteGateCheck'

/**
 * Checks to see if the route requires the user to be authenticated.
 *
 * If so, and the user is not logged in, we'll redirect to the login page.
 */
export default class AdminUsersOnly extends BaseRouteGateCheck {
  /**
   * Perform the check.
   *
   * @param result
   */
  handle ({result}) {
    if (this._routeForAdminsOnly() && this._userNotAnAdmin()) {
      return this._redirectToHomepage()
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
  _routeForAdminsOnly () {
    return this._transition.to.admin
  }

  /**
   * The user is not an administrator.
   *
   * @returns {boolean}
   * @private
   */
  _userNotAnAdmin () {
    return !this._router.app.user.is_admin
  }

  /**
   * Redirect the user to the home page.
   *
   * @private
   */
  _redirectToHomepage () {
    this._transition.redirect('/')

    return Promise.resolve({result: false})
  }
}
