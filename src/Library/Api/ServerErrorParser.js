import forEach from 'lodash.foreach'
import objectHas from 'lodash.has'

export class ServerErrorParser {
  /**
   * Constructor.
   *
   * @param {Object} errorInfo
   */
  constructor (errorInfo) {
    this._errorInfo = errorInfo
    this._messagePrefix = ''
    this.defaultErrorMessage('An error occurred.')
    this._parseErrorMessage()
    this._parseErrorList()
  }

  /**
   * Named constructor.
   *
   * @param {Object} errorInfo
   *
   * @returns {ServerErrorParser}
   */
  static parse (errorInfo) {
    return new ServerErrorParser(errorInfo)
  }

  /**
   * Prefix the message, if any, with this bit of text.
   *
   * @param {String}
   */
  prefix (messagePrefix) {
    this._messagePrefix = messagePrefix

    return this
  }

  /**
   * Parse out the error message from the error info given.
   *
   * @private
   */
  _parseErrorMessage () {
    let message = this._checkForMessageInBody()

    if (!message) {
      message = this._checkForMessageInErrorObject()
    }

    this._errorMessage = message || this._defaultErrorMessage
  }

  /**
   * Check to see if there is an error message in the response body.
   *
   * @return {String|null}
   */
  _checkForMessageInBody () {
    let result = null

    if (objectHas(this._errorInfo, 'body.message')) {
      result = this._errorInfo.body.message
    }

    return result
  }

  /**
   * Check to see if there is an error message in an error object.
   *
   * @return {String|null}
   */
  _checkForMessageInErrorObject () {
    let result = null

    if (objectHas(this._errorInfo, 'error.message')) {
      result = this._errorInfo.error.message
    }

    return result
  }

  /**
   * Parse out the error list from the error info given.
   *
   * @private
   */
  _parseErrorList () {
    this._errorList = []

    if (objectHas(this._errorInfo, 'body.errors')) {
      /*
       * Messages from server look like:
       * {
       *  'email': ['This email is just bad.', 'And, another message about the email.'],
       *  'password': ['This password is just bad.']
       * }
       *
       * I want them to look like:
       * [
       *  {
       *    key: 'email',
       *    message: 'This email is just bad.'
       *  },
       *  {
       *    key: 'email',
       *    message: 'And, another message about the email.'
       *  }
       * ]
       */
      forEach(this._errorInfo.body.errors, (errors, key) => {
        forEach(errors, errorMessage => {
          this._errorList.push({
            key: key,
            message: errorMessage
          })
        })
      })
    }
  }

  /**
   * Gives you the error message.
   *
   * @returns {String}
   */
  get errorMessage () {
    let message = this._errorMessage

    return (this._messagePrefix && message)
      ? this._messagePrefix + ' ' + message
      : message
  }

  /**
   * Gives you the list of errors associated with this message, if any, without their keys.
   *
   * e.g.['message one', 'message two']
   *
   * @returns {Array}
   */
  get errorList () {
    return this.errorListByKey.map(messageWithKey => {
      return messageWithKey.message
    })
  }

  /**
   * Gives you the list of errors associated with this message, if any, grouped by their key.
   *
   * @returns {Array}
   */
  get errorListByKey () {
    return this._errorList
  }

  /**
   * Customize the default error message for a given context.
   *
   * @param {String} message
   *
   * @returns {ServerErrorParser}
   */
  defaultErrorMessage (message) {
    this._defaultErrorMessage = message

    return this
  }
}
