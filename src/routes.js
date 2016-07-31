import {RouteGate} from './Library/Routing/RouteGate'
import Welcome from './RouteComponents/Welcome/Component'
import NotFound from './RouteComponents/NotFound/Component'

import Room from './RouteComponents/Room/Component'

import UserLogin from './RouteComponents/User/Login/Component'
import UserLogout from './RouteComponents/User/Logout/Component'
import UserAccount from './RouteComponents/User/Account/Component'
import UserAccountDashboard from './RouteComponents/User/Account/Dashboard/Component'
import UserAccountNabs from './RouteComponents/User/Account/Nabs/Component'
import UserAccountProfile from './RouteComponents/User/Account/Profile/Component'
import UserRegister from './RouteComponents/User/Register/Component'

import Admin from './RouteComponents/Admin/Component'
import AdminHome from './RouteComponents/Admin/Home/Component'
import AdminProducts from './RouteComponents/Admin/Products/Component'
import AdminNabs from './RouteComponents/Admin/Nabs/Component'

export const defineRoutes = router => {
  router.beforeEach(transition => new RouteGate(router, transition).runChecks())

  return router.map({
    '/': {component: Welcome},
    '/user/login': {component: UserLogin, name: 'login'},
    '/user/logout': {component: UserLogout, name: 'logout'},
    '/user/register': {component: UserRegister},
    '/room/:auction_id': {component: Room, auth: true},
    '/admin': {
      component: Admin,
      auth: true,
      admin: true,
      subRoutes: {
        '/': {component: AdminHome, auth: true, admin: true},
        '/home': {component: AdminHome, auth: true, admin: true},
        '/products': {component: AdminProducts, auth: true, admin: true},
        '/nabs': {component: AdminNabs, auth: true, admin: true}
      }
    },
    '/user/account': {
      component: UserAccount,
      name: 'account',
      auth: true,
      subRoutes: {
        '/': {component: UserAccountDashboard, auth: true},
        '/dashboard': {component: UserAccountDashboard, auth: true},
        '/profile': {component: UserAccountProfile, auth: true},
        '/nabs': {component: UserAccountNabs, auth: true}
      }
    },
    '*': {component: NotFound}
  })
}
