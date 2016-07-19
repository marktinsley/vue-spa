import {login} from '../../../Vuex/actions/authentication'
import toastr from 'toastr'

export default {
  data () {
    return {
      formData: defaultFormData()
    }
  },

  vuex: {
    actions: {login},
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
        toastr.success('You have logged in.')

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
