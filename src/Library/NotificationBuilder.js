export default class NotificationBuilder {
  /**
   * Constructor.
   *
   * @param message
   */
  constructor (message) {
    this._title = null
    this._message = message
    this._type = 'info'
    this._displayFor = 7000
    this._shortDisplay = 3000
  }

  /**
   * Build up a success message.
   *
   * @param message
   *
   * @returns {NotificationBuilder}
   */
  static success (message) {
    return new NotificationBuilder(message)
      .type('success')
  }

  /**
   * Set the message type.
   *
   * @param type
   *
   * @returns {NotificationBuilder}
   */
  type (type) {
    this._type = type

    return this
  }

  /**
   * Only close when user clicks the close button?
   *
   * @returns {NotificationBuilder}
   */
  noAutoClose () {
    return this.displayFor(false)
  }

  /**
   * Make the delay shorter.
   *
   * @returns {NotificationBuilder}
   */
  shortDisplay () {
    return this.displayFor(this._shortDisplay)
  }

  /**
   * Set the amount of time to display the notification for.
   *
   * @param length
   * @returns {NotificationBuilder}
   */
  displayFor (length) {
    this._displayFor = length

    return this
  }

  /**
   * Gives you the notification.
   *
   * @returns {Object}
   */
  get () {
    return {
      title: this._title,
      message: this._message,
      type: this._type,
      displayFor: this._displayFor
    }
  }
}
