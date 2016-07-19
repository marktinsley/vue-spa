import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import Vuex from 'vuex'
import store from './Vuex/store'
import {debug} from './config'

import {ValidatorsRegistrar} from './Validators/ValidatorsRegistrar'
import {GlobalComponentsRegistrar} from './GlobalComponents/GlobalComponentsRegistrar'
import {FiltersRegistrar} from './Filters/FiltersRegistrar'

Vue.config.debug = debug

// Load plugins.
Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(Vuex)

// Register custom elements.
ValidatorsRegistrar.register(Vue)
GlobalComponentsRegistrar.register(Vue)
FiltersRegistrar.register(Vue)

// A custom transition.
Vue.transition('fade-in', {
  enterClass: 'fadeInDown', // class of animate.css
  leaveClass: 'fadeOutDown' // class of animate.css
})

// Initialize router.
let router = new VueRouter({
  linkActiveClass: 'active'
})

// Make Vue and router available.
export {Vue, router, store}
