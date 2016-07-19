import {Paginator} from '../../Library/Paginator'

export default {
  props: {
    /**
     * The paginator to build the pager from.
     */
    paginator: {
      type: Paginator,
      required: true
    },

    /**
     * Produce just a simple paginator (no clickable page numbers)?
     */
    simple: {
      type: Boolean,
      default: false
    },

    /**
     * A function to call when user requests to go to a different page.
     */
    goToPage: {
      type: Function,
      required: true
    }
  },

  computed: {
    havePreviousPage () {
      return this.paginator.prevPageUrl
    },

    haveNextPage () {
      return this.paginator.nextPageUrl
    }
  },

  methods: {
    /**
     * Go to the previous page.
     */
    previousPage () {
      if (this.havePreviousPage) {
        this.goToPage(this.paginator.currentPage - 1)
      }
    },

    /**
     * Go to the next page.
     */
    nextPage () {
      if (this.haveNextPage) {
        this.goToPage(this.paginator.currentPage + 1)
      }
    }
  }
}
