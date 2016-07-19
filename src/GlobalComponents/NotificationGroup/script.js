import {removeNotification} from '../../Vuex/actions/global'

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
