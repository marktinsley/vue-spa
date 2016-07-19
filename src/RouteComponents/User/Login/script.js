import {NotificationBuilder} from '../../../Library/NotificationBuilder'
import {notify} from '../../../Vuex/actions/global'
import {login} from '../../../Vuex/actions/authentication'

export default {
  data () {
    return {
      formData: defaultFormData()
    }
  },

  vuex: {
    actions: {notify, login},
    getters: {
      loading: state => state.authentication.processingLogin,

      userIsLoggedIn: state => state.authentication.userIsLoggedIn,

      errorMessage: state => state.authentication.loginErrorMessage,

      errorList: state => state.authentication.loginErrorList
    }
  },

  route: {
    activate ({next}) {
      // We don't need to visit this page if a user is already logged in.
      (this.userIsLoggedIn)
        ? this.$route.router.go('/')
        : next()
    },
    deactivate ({next}) {
      this.formData = defaultFormData()
      next()
    }
  },

  watch: {
    userIsLoggedIn (isLoggedIn) {
      if (isLoggedIn) {
        this.notify(NotificationBuilder
          .success('You have logged in.')
          .shortDisplay())

        this.$route.router.go('/')
      }
    }
  },

  methods: {
    submit () {
      this.login(this.formData.email, this.formData.password)
    }
  }
}

function defaultFormData () {
  return {
    email: '',
    password: ''
  }
}
