export default {
  props: {
    /**
     * The message to display to the user
     */
    message: {
      type: String,
      required: true
    },

    /**
     * A list of associated errors to list below the message.
     */
    list: {
      type: Array,
      default: () => []
    }
  }
}
