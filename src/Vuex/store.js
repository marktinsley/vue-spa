import Vue from 'vue'
import Vuex from 'vuex'
import NotificationBuilder from '../Library/NotificationBuilder'
import authentication from './modules/authentication'
import {debug} from '../../config'
import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from './mutation-types'

Vue.use(Vuex)

Vue.config.debug = debug

const state = {
  notifications: []
}

const mutations = {
  // Add a new notification for the user.
  [ADD_NOTIFICATION] (state, notification) {
    if (notification instanceof NotificationBuilder) {
      notification = notification.get()
    }

    state.notifications.push(notification)
  },

  // Remove the given notification from the list of user notifications.
  [REMOVE_NOTIFICATION]: function (state, notification) {
    state.notifications.$remove(notification)
  }
}

export default new Vuex.Store({
  strict: debug,
  state,
  mutations,
  modules: {
    authentication
  }
})
