import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import auctions from './modules/auctions'
import auctionRooms from './modules/auctionRooms'
import authentication from './modules/authentication'
import adminProducts from './modules/admin/products'
import {debug} from '../config'

Vue.use(Vuex)

Vue.config.debug = debug

const state = {}
const mutations = {}

export default new Vuex.Store({
  strict: debug,
  state,
  mutations,
  modules: {
    global,
    auctions,
    auctionRooms,
    authentication,
    adminProducts
  }
})
