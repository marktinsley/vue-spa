import RouteGate from './Library/Routing/RouteGate'
import Welcome from './RouteComponents/Welcome/Component.vue'
import NotFound from './RouteComponents/NotFound/Component.vue'
import UserLogin from './RouteComponents/User/Login/Component.vue'
import UserLogout from './RouteComponents/User/Logout/Component.vue'
import UserProfile from './RouteComponents/User/Profile/Component.vue'
import UserRegister from './RouteComponents/User/Register/Component.vue'

import AdminHome from './RouteComponents/Admin/Home/Component.vue'

export const defineRoutes = router => {
  router.beforeEach(transition => new RouteGate(router, transition).runChecks())

  return router.map({
    '/': {component: Welcome},
    '/user/login': {component: UserLogin, name: 'login'},
    '/user/logout': {component: UserLogout, name: 'logout'},
    '/user/register': {component: UserRegister},
    '/user/profile': {component: UserProfile, name: 'profile', auth: true},
    '/admin': {component: AdminHome, auth: true, admin: true},
    '*': {component: NotFound}
  })
}
