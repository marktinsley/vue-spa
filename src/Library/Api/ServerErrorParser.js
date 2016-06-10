import forEach from 'lodash.foreach'
import objectHas from 'lodash.has'

export default class ServerErrorParser {
  /**
   * Constructor.
   *
   * @param {Object} errorInfo
   */
  constructor (errorInfo) {
    this._errorInfo = errorInfo
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
   * Parse out the error message from the error info given.
   *
   * @private
   */
  _parseErrorMessage () {
    let haveMessage = objectHas(this._errorInfo, 'body.message') &&
       this._errorInfo.body.message

    this._errorMessage = (haveMessage)
       ? this._errorInfo.body.message
       : this._defaultErrorMessage
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
    return this._errorMessage
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
