export class Currency {
  /**
   * Convert the given cent value to a dollar value.
   *
   * @param cents
   *
   * @returns {string}
   */
  static centsToDollars (cents) {
    return (+cents / 100).toFixed(2)
  }

  /**
   * Convert the given dollar value to a cent value.
   *
   * @param dollars
   *
   * @returns {number}
   */
  static dollarsToCents (dollars) {
    return Math.floor(+dollars * 100)
  }
}
