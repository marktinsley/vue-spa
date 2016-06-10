import UserAlreadyLoggedIn from './RouteGateChecks/UserAlreadyLoggedIn'
import AuthenticatedUsersOnly from './RouteGateChecks/AuthenticatedUsersOnly'
import AdminUsersOnly from './RouteGateChecks/AdminUsersOnly'

export default class RouteGate {
  /**
   * Constructor.
   *
   * Defines which checks to run and in what order.
   *
   * @param router An instance of the app's router.
   * @param transition The router transition that has been requested.
   */
  constructor (router, transition) {
    this._checks = [
      new UserAlreadyLoggedIn(router, transition),
      new AuthenticatedUsersOnly(router, transition),
      new AdminUsersOnly(router, transition)
    ]
  }

  /**
   * Run through all the routing pre-route checks.
   *
   * @returns {Promise} Inevitably resolved into a true or false.
   */
  runChecks () {
    return this._checks.reduce((previousCheck, check) => {
      return previousCheck.then(resolvedValue => {
        return (resolvedValue.result)
          ? check.handle(resolvedValue) // If we still have true for the result, continue with the next check.
          : Promise.resolve(resolvedValue) // Otherwise, skip remaining checks and pass back this resolved value.
      })
    }, Promise.resolve({result: true}))
  }
}
