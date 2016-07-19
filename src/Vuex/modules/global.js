import {NotificationBuilder} from '../../Library/NotificationBuilder'
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../mutation-types'

// initial state
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

export default {
  state,
  mutations
}
