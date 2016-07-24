import {Currency} from '../../Library/Helpers/Currency'

export class Product {
  /**
   * Constructor.
   */
  constructor ({id, title, price, description, is_active}) {
    this.id = id
    this.title = title
    this.price = price
    this.description = description
    this.is_active = is_active
  }

  /**
   * Does this product exist?
   *
   * @returns {boolean}
   */
  get exists () {
    return this.id > 0
  }

  /**
   * Gives you the price for this product in a dollar value.
   *
   * @returns {string}
   */
  get priceInDollars () {
    return Currency.centsToDollars(this.price)
  }

  /**
   * Gives you the price for this product in a dollar value.
   *
   * @param {string} dollars
   */
  set priceInDollars (dollars) {
    this.price = Currency.dollarsToCents(dollars)
  }
}
