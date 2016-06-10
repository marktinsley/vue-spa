import urlHelper from 'url' // @see https://nodejs.org/api/url.html
import {apiBaseUrl} from '../../config'

export default class UrlBuilder {
  /**
   * Constructor.
   */
  constructor () {
    this._setDefaults()
  }

  /**
   * Set the default values for a URL (using the default base URL).
   *
   * @private
   */
  _setDefaults () {
    let parsedBase = urlHelper.parse(apiBaseUrl)

    this.urlDefinition = {
      protocol: parsedBase.protocol,
      host: parsedBase.host,
      slashes: parsedBase.slashes,
      pathname: parsedBase.pathname
    }
  }

  /**
   * Set the URI. If just a path (no host), we'll prepend the 'apiBaseUrl' config value to the final URL.
   *
   * @param {String} uri
   *
   * @returns {UrlBuilder}
   */
  uri (uri) {
    let parseUri = urlHelper.parse(uri)

    this.urlDefinition.pathname = parseUri.pathname

    if (parseUri.protocol) {
      this.urlDefinition.protocol = parseUri.protocol
      this.urlDefinition.host = parseUri.host
      this.urlDefinition.slashes = parseUri.slashes
    }

    return this
  }

  /**
   * Build the final URL.
   *
   * @returns {String}
   */
  build () {
    return urlHelper.format(this.urlDefinition)
  }
}

