export default {
  props: {
    /**
     * The style we want for the header.
     *
     * One of: 'default', 'info', 'primary', 'success', 'warning', 'danger' (Standard Bootstrap modifiers).
     */
    headingStyle: {
      type: String,
      default: 'default'
    }
  }
}
