import {Paginator} from '../../Library/Paginator'
import {PageListBuilder} from './PageListBuilder'

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
     * The maximum number of page numbers to show, loosely.
     */
    maxPageButtons: {
      default: 5
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
    /**
     * Page numbers to display.
     *
     * @returns {Array}
     */
    pages () {
      return new PageListBuilder(this.paginator).build()
    },

    /**
     * The previous page number, if any.
     *
     * @returns {Number|null}
     */
    previousPageNumber () {
      return (this.paginator.currentPage > 1
        ? parseInt(this.paginator.currentPage, 10) - 1
        : null);
    },

    /**
     * The next page number, if any.
     *
     * @returns {Number|null}
     */
    nextPageNumber () {
      return (this.paginator.currentPage == this.paginator.total
        ? null
        : parseInt(this.paginator.currentPage, 10) + 1 );
    }
  },

  methods: {
    /**
     * Prompts the user for a page to jump to and then jumps to it if it's in-range.
     */
    jumpToPage () {
      var jumpTo = null;

      do
      {
        jumpTo = parseInt(prompt(`Jump to page (1 - ${this.paginator.total}):`), 10);

        if (isNaN(jumpTo)) {
          return;
        }
      } while (jumpTo < 1 || jumpTo > this.paginator.total);

      this.goToPage(jumpTo)
    },

    /**
     * Go to the previous page.
     */
    previousPage () {
      if (this.previousPageNumber) {
        this.goToPage(this.previousPageNumber)
      }
    },

    /**
     * Go to the next page.
     */
    nextPage () {
      if (this.nextPageNumber) {
        this.goToPage(this.nextPageNumber)
      }
    }
  }
};
