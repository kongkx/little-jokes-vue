import Vue from 'vue'
import Vuex from 'vuex'
import { isIos, isWeixin } from '../utils'

Vue.use(Vuex)

const AUTH_INFO_KEY = '__auth_info__'

function getInitialState() {
  let auth_info = {
    user: null,
    api_token: undefined,
  }
  try {
    if (localStorage[AUTH_INFO_KEY]) {
      auth_info = JSON.parse(localStorage[AUTH_INFO_KEY])
    }
  } catch (err) {
    console.log(err.message)
  }
  return {
    showBottomNav: true,
    auth: auth_info,
    app: {
      name: process.env.VUE_APP_NAME || '小小笑话',
    },
    device: {
      features: {
        motion: !!window.DeviceMotionEvent,
      },
      isIos: isIos(),
      isWeixin: isWeixin(),
      onceTouched: false,
    },
  }
}

const store = new Vuex.Store({
  state: getInitialState,
  getters: {
    isLoggedIn(state) {
      return !!state.auth.api_token
    },
    currentUserId(state) {
      return state.auth.user ? state.auth.user.id : undefined
    },
    apiToken(state) {
      return state.auth.api_token
    },
    onceTouched(state) {
      return state.device.onceTouched
    },
  },
  mutations: {
    hideNav(state) {
      state.showBottomNav = false
    },
    showNav(state) {
      state.showBottomNav = true
    },
    setAuthInfo(state, payload) {
      state.auth.user = payload.user
      state.auth.api_token = payload.api_token
    },
    resetAuthInfo(state) {
      state.auth.user = null
      state.auth.api_token = undefined
    },
    touched(state) {
      state.device.onceTouched = true
    },
  },
  actions: {
    setAuthInfo({ commit }, data) {
      commit('setAuthInfo', data)
      localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(data))
    },
    resetAuthInfo({ commit }) {
      commit('resetAuthInfo')
      localStorage.removeItem(AUTH_INFO_KEY)
    },
  },
  modules: {},
})

window.addEventListener(
  'touchend',
  () => {
    store.commit('touched')
  },
  { once: true }
)

export default store
