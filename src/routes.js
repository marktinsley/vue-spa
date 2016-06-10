import RouteGate from './Library/Routing/RouteGate'
import Welcome from './RouteComponents/Welcome/Component.vue'
import Login from './RouteComponents/Login/Component.vue'
import Logout from './RouteComponents/Logout/Component.vue'
import NotFound from './RouteComponents/NotFound/Component.vue'
import Profile from './RouteComponents/Profile/Component.vue'
import Register from './RouteComponents/Register/Component.vue'

import AdminHome from './RouteComponents/Admin/Home/Component.vue'

export const defineRoutes = router => {
  router.beforeEach(transition => new RouteGate(router, transition).runChecks())

  return router.map({
    '/': {component: Welcome},
    '/login': {component: Login, name: 'login'},
    '/logout': {component: Logout, name: 'logout'},
    '/register': {component: Register},
    '/profile': {component: Profile, name: 'profile', auth: true},
    '/admin': {component: AdminHome, auth: true, admin: true},
    '*': {component: NotFound}
  })
}
