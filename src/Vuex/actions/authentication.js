import {UserApi} from '../../Library/Api/UserApi'
import * as types from '../mutation-types'

/**
 * Pulls down session info; used to boot the app on the client.
 *
 * @param dispatch
 */
export const pullSessionInfo = ({dispatch}) => {
  dispatch(types.PULL_SESSION_INFO_REQUEST)

  new UserApi()
    .sessionInfo()
    .then(result => {
      (result)
        ? dispatch(types.SESSION_INFO_PULLED, result)
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
 */
export const login = ({dispatch}, email, password) => {
  dispatch(types.LOGIN_REQUEST)

  new UserApi()
    .login(email, password)
    .then(({token, user}) => dispatch(types.LOGIN_SUCCESS, token, user))
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
