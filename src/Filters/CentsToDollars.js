import {Currency} from '../Library/Helpers/Currency'

export default {
  // model -> view
  read (cents) {
    return Currency.centsToDollars(cents)
  },

  // view -> model
  write (dollars) {
    return Currency.dollarsToCents(dollars)
  }
}
