import forEach from 'lodash.foreach'
import UserApi from '../../../Library/Api/UserApi'
import ServerErrorParser from '../../../Library/Api/ServerErrorParser'

export default {
  data () {
    return {
      errorMessage: '',
      errorList: [],
      success: false,
      loading: false,
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  computed: {
    /**
     * Do all of the required fields have something in them?
     *
     * @returns {boolean}
     */
    allRequiredFieldsHaveData() {
      let {name, email, password, password_confirmation} = this.formData

      return !!(name && email && password && password_confirmation)
    }
  },

  route: {
    deactivate (transition) {
      this.success = false
      transition.next()
    }
  },

  validators: {
    /**
     * Custom validation rule for the password confirmation field.
     *
     * @param value
     *
     * @returns {boolean}
     */
    passwordsMatch(value) {
      return this.vm.formData.password === value
    }
  },

  methods: {
    /**
     * Submit the form.
     */
    submit () {
      this.registerUser(this.formData)
    },

    /**
     * Reset all the form fields.
     */
    resetForm () {
      forEach(this.formData, (value, key) => {
        this.formData[key] = ''
      })
    },

    /**
     * Register a user with the given data.
     */
    registerUser () {
      this.errorMessage = ''
      this.errorList = []
      this.loading = true

      new UserApi()
        .register(this.formData)
        .then(() => {
          this.loading = false
          this.success = true
          this.resetForm()
        })
        .catch(errorInfo => {
          this.loading = false

          let errorParser = ServerErrorParser.parse(errorInfo)
            .defaultErrorMessage('There was an error performing your registration.')

          this.errorMessage = errorParser.errorMessage
          this.errorList = errorParser.errorList
        })
    }
  }
}
