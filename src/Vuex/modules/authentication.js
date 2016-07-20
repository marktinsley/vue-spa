import objectHas from 'lodash.has'
import {ServerErrorParser} from '../../Library/Api/ServerErrorParser'

import {
  PULL_SESSION_INFO_REQUEST,
  SESSION_INFO_PULLED,
  SESSION_INFO_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../mutation-types'

// initial state
const state = {
  pullingSessionInfo: true,

  userIsLoggedIn: false,
  token: null,
  user: null,

  processingLogin: false,
  loginErrorMessage: '',
  loginErrorList: [],

  processingLogout: false,
  logoutErrorMessage: ''
}

const mutations = {
  // Starting to pull down the session information we'll need to run the app.
  [PULL_SESSION_INFO_REQUEST] () {
    state.pullingSessionInfo = true
    state.userIsLoggedIn = false
    state.token = null
    state.user = null
  },

  // User is currently logged in.
  [SESSION_INFO_PULLED] (state, {user, token}) {
    state.pullingSessionInfo = false
    state.userIsLoggedIn = !!user
    state.token = token
    state.user = user
  },

  // User is not currently logged in
  [SESSION_INFO_FAILURE] (state, errorInfo) {
    state.pullingSessionInfo = false
    state.userIsLoggedIn = false
    state.token = null
    state.user = null

    // state.logoutErrorMessage = ServerErrorParser.parse(errorInfo).errorMessage
  },

  // Login attempt beginning
  [LOGIN_REQUEST] (state) {
    state.loginErrorMessage = ''
    state.loginErrorList = []
    state.processingLogin = true
    state.userIsLoggedIn = false
    state.token = null
    state.user = null
  },

  // Login was successful
  [LOGIN_SUCCESS] (state, token, user) {
    state.processingLogin = false
    state.userIsLoggedIn = true
    state.token = token
    state.user = user

    window.localStorage.setItem('token', token)
  },

  // Login failed
  [LOGIN_FAILURE] (state, errorInfo) {
    state.processingLogin = false

    if (objectHas(errorInfo, 'body.error') && errorInfo.body.error === 'invalid_credentials') {
      state.loginErrorMessage = 'Could not find an account with username and password provided. Please try again.'
    } else {
      let errorParser = ServerErrorParser.parse(errorInfo)
        .defaultErrorMessage('There was an error while attempting to log you in.')
      state.loginErrorMessage = errorParser.errorMessage
      state.loginErrorList = errorParser.errorList
    }
  },

  // Logout attempt has begun.
  [LOGOUT_REQUEST] (state) {
    state.processingLogout = true
    state.logoutErrorMessage = ''
  },

  // Logged out successfully.
  [LOGOUT_SUCCESS] (state) {
    state.processingLogout = false
    state.userIsLoggedIn = false
    state.token = null
    state.user = null

    window.localStorage.setItem('token', '')
  },

  // Failed to logout.
  [LOGOUT_FAILURE] (state, errorInfo) {
    state.processingLogout = false
    state.logoutErrorMessage = 'An error occurred when attempting to login.'

    if (objectHas(errorInfo, 'invalid_credentials')) {
      state.logoutErrorMessage = 'The username or password you gave did not match any user accounts in our database. Please try again.'
    } else {
      let serverErrorParser = ServerErrorParser.parse(errorInfo)

      if (serverErrorParser.errorMessage) {
        state.logoutErrorMessage = ServerErrorParser.parse(errorInfo).errorMessage
      }
    }
  }
}

export default {
  state,
  mutations
}
