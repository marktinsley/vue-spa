export default {
  // model -> view
  read (cents) {
    return (+cents / 100).toFixed(2)
  },

  // view -> model
  write (dollars) {
    return Math.floor(+dollars * 100)
  }
}
