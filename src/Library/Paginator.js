export class Paginator {
  constructor () {
    this.data = []
    this.from = null
    this.to = null
    this.perPage = null
    this.currentPage = null
    this.lastPage = null
    this.nextPageUrl = null
    this.prevPageUrl = null
    this.total = null
  }

  /**
   * Build the object based on a Laravel paginator JSON response.
   *
   * @param json
   *
   * @returns {Paginator}
   */
  static fromLaravelJson (json) {
    let result = new Paginator()

    if (!json) {
      return result
    }

    result.data = json.data
    result.from = json.from
    result.to = json.to
    result.perPage = json.per_page
    result.currentPage = json.current_page
    result.lastPage = json.last_page
    result.nextPageUrl = json.next_page_url
    result.prevPageUrl = json.prev_page_url
    result.total = json.total

    return result
  }

  /**
   * Do we have any records to display on this page?
   *
   * @returns {boolean}
   */
  haveRecords () {
    return Array.isArray(this.data) && this.data.length > 0
  }

  /**
   *
   * @param {function} mapCallback
   *
   * @returns {Paginator}
   */
  mapDataInPlace (mapCallback) {
    this.data = this.data.map(mapCallback)

    return this
  }
}
