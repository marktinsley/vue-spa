export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  data () {
    return {timer: null}
  },

  computed: {
    class () {
      return (this.notification.type)
        ? 'alert-' + this.notification.type
        : 'alert-info'
    }
  },

  ready () {
    if (this.notification.displayFor) {
      this.timer = setTimeout(() => {
        this.triggerClose()
      }, this.notification.displayFor)
    }
  },

  methods: {
    triggerClose () {
      clearTimeout(this.timer)
      this.$dispatch('close-notification', this.notification)
    }
  }
}
