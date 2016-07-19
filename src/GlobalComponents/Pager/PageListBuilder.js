import {Paginator} from '../../Library/Paginator'

export class PageListBuilder {
  /**
   * Constructor.
   *
   * @param {Paginator} paginator
   */
  constructor (paginator) {
    if (!(paginator instanceof Paginator)) {
      console.warn('Supplied paginator is not of type Paginator.')
      return
    }

    this.pages = []
    this.paginator = paginator
    this.maxPageButtons = 5
  }

  /**
   * Set the maximum number of page buttons to use.
   *
   * @param max
   *
   * @returns {PageListBuilder}
   */
  setMaxPageButtons (max) {
    this.maxPageButtons = max

    return this
  }

  /**
   * Build the list of pages.
   *
   * @returns {Array}
   */
  build () {
    this._setupPages()

    return this.pages
  }

  /**
   * Add a number of pages.
   *
   * @param startNumber The page number to start with.
   * @param upToNumbers A set of numbers to count up to; choosing whichever is smallest.
   *
   * @private
   */
  _addPages (startNumber, upToNumbers) {
    var upTo = Math.min(...upToNumbers)

    for (var i = startNumber; i <= upTo; i++) {
      if (!this._pageNumberIncluded(i)) {
        this._addPageNumber(i)
      }
    }
  }

  /**
   * Add the "..." page button to signify skipping page numbers.
   *
   * @private
   */
  _addEllipsisPage () {
    this._addPageNumber(null)
  }

  /**
   * Add a page number to the list of pages to display.
   *
   * @param number
   *
   * @private
   */
  _addPageNumber (number) {
    if (number === null) {
      this.pages.push({
        number: null
      })
    } else {
      this.pages.push({
        number: number
      })
    }
  }

  /**
   * Tells you if the given page number is in the list of pages we have.
   *
   * @param pageNumber
   *
   * @returns {boolean}
   *
   * @private
   */
  _pageNumberIncluded (pageNumber) {
    return this.pages.some(page => +page.number === +pageNumber)
  }

  /**
   * Setup the pages that we'll need to display based on the given settings.
   *
   * @private
   */
  _setupPages () {
    this.pages = []

    if (this.paginator.currentPage <= this.maxPageButtons) {
      // Current page is close to the first page.
      this._addPages(1, [this.maxPageButtons, this.paginator.total])

      if (this.paginator.total > this.maxPageButtons) {
        // The total number of pages is beyond what we have set to show.
        if (this.paginator.total > parseInt(this.maxPageButtons, 10) + 1) {
          // Last page is not just the next page, need an ellipsis.
          this._addEllipsisPage()
        }

        this._addPageNumber(this.paginator.total)
      }
    } else if (parseInt(this.paginator.total, 10) - 3 < this.paginator.currentPage) {
      // Current page is close to the last page.
      this._addPages(1, [2])
      this._addEllipsisPage()
      this._addPages(parseInt(this.paginator.total, 10) - 3, [this.paginator.total])
    } else {
      // Current page is not close to the first or last pages.
      this._addPages(1, [2])
      this._addEllipsisPage()
      this._addPageNumber(parseInt(this.paginator.currentPage, 10) - 1)
      this._addPageNumber(this.paginator.currentPage)
      this._addPageNumber(parseInt(this.paginator.currentPage, 10) + 1)
      this._addEllipsisPage()
      this._addPageNumber(this.paginator.total)
    }
  }
}
