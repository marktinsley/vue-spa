import {Product} from './Product'

export class Auction {
  /**
   * Constructor.
   */
  constructor ({
    id = null, product_id = null, winner_id = null,
    min_seats = null, max_seats = null, seat_price = null,
    regular_price = null, max_price = null, current_price = null,
    opt_in_ends_at = null, original_ends_at = null, ends_at = null,
    closed_at = null, opt_in_ends_in = null, ends_in = null,
    is_open = null, product = null
  }) {
    this.id = id
    this.product_id = product_id
    this.winner_id = winner_id
    this.min_seats = min_seats
    this.max_seats = max_seats
    this.seat_price = seat_price
    this.regular_price = regular_price
    this.max_price = max_price
    this.current_price = current_price
    this.opt_in_ends_at = opt_in_ends_at
    this.original_ends_at = original_ends_at
    this.ends_at = ends_at
    this.closed_at = closed_at
    this.opt_in_ends_in = opt_in_ends_in
    this.ends_in = ends_in
    this.is_open = is_open

    this.product = product
      ? new Product(product)
      : null
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
   * Update the ends in date.
   *
   * @param {string} endsIn
   *
   * @returns {Auction}
   */
  updateOptInEndsIn (endsIn) {
    this.opt_in_ends_in = endsIn

    return this
  }
}
