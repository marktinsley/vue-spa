import {removeNotification} from '../../Vuex/actions'

export default {
  vuex: {
    getters: {
      notifications: state => state.notifications
    },
    actions: {
      removeNotification
    }
  }
}
