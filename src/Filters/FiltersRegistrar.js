import CentsToDollars from './CentsToDollars'

export class FiltersRegistrar {
  /**
   * Register all global filters.
   *
   * @param Vue
   */
  static register (Vue) {
    Vue.filter('centsToDollars', CentsToDollars)
  }
}
