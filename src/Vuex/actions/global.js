import * as types from '../mutation-types'

/**
 * Add a notification to the stack of notifications for the user.
 *
 * @param dispatch
 * @param notification
 */
export const notify = ({dispatch}, notification) => {
  dispatch(types.ADD_NOTIFICATION, notification)
}

/**
 * Remove the given notification.
 *
 * @param dispatch
 * @param notification
 */
export const removeNotification = ({dispatch}, notification) => {
  dispatch(types.REMOVE_NOTIFICATION, notification)
}
