let validators = {

  // Validates email addresses.
  'email' (value) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(value)
  }

}

/**
 * Registers custom validators that can be used with the vue-validator plugin.
 */
export class ValidatorsRegistrar {
  /**
   * Register all of the custom validators.
   *
   * @param Vue
   */
  static register (Vue) {
    Object.keys(validators).forEach(validatorKey => {
      Vue.validator(validatorKey, validators[validatorKey])
    })
  }
}
