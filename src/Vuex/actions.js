import UserApi from '../Library/Api/UserApi'
import * as types from './mutation-types'

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

/**
 * Pulls down session info; used to boot the app on the client.
 *
 * @param dispatch
 */
export const pullSessionInfo = ({dispatch}) => {
  dispatch(types.PULL_SESSION_INFO_REQUEST)

  new UserApi()
    .sessionInfo()
    .then(session => {
      (session)
        ? dispatch(types.SESSION_INFO_PULLED, session)
        : dispatch(types.SESSION_INFO_FAILURE)
    })
    .catch(() => dispatch(types.SESSION_INFO_FAILURE))
}

/**
 * Attempt to login the user.
 *
 * @param dispatch
 * @param email
 * @param password
 * @param remember
 */
export const login = ({dispatch}, email, password, remember) => {
  dispatch(types.LOGIN_REQUEST)

  new UserApi()
    .login(email, password, remember)
    .then(user => dispatch(types.LOGIN_SUCCESS, user))
    .catch(errorInfo => dispatch(types.LOGIN_FAILURE, errorInfo))
}

/**
 * Attempt to log the user out.
 *
 * @param dispatch
 */
export const logout = ({dispatch}) => {
  dispatch(types.LOGOUT_REQUEST)

  new UserApi()
    .logout()
    .then(() => dispatch(types.LOGOUT_SUCCESS))
    .catch(errorInfo => dispatch(types.LOGOUT_FAILURE, errorInfo))
}

