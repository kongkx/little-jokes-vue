import Vue from 'vue'
import PortalVue from 'portal-vue'
import Toasted from 'vue-toasted'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(PortalVue)
Vue.use(Toasted)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    goBack() {
      const hasHistory = window.history.length > 2
      if (hasHistory) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: 'home',
        })
      }
    },
  },
}).$mount('#app')
