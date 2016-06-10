export default class BaseRouteGateCheck {
  /**
   * Constructor.
   *
   * @param router An instance of the app's router.
   * @param transition The router transition that has been requested.
   */
  constructor (router, transition) {
    this._router = router
    this._transition = transition
  }
}
