import PreviousWinners from './PreviousWinners/Component'
import WelcomeHeader from './WelcomeHeader/Component'
import VoteForNext from './VoteForNext/Component'
import UpNext from './UpNext/Component'
import {checkForRunningAuction} from '../../Vuex/actions/auctionRooms'


export default {
  components: {PreviousWinners, WelcomeHeader, VoteForNext, UpNext},

  vuex: {
    actions: {checkForRunningAuction},
    getters: {
      userIsLoggedIn: state => state.authentication.userIsLoggedIn
    }
  },

  route: {
    activate () {
      if (this.userIsLoggedIn) {
        this.checkForRunningAuction()
      }

      window.setInterval(() => {
        if (this.userIsLoggedIn) {
          this.checkForRunningAuction()
        }
      }, 10000)
    }
  }
}
