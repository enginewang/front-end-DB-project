// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import VueFriendlyIframe from 'vue-friendly-iframe'

import VModal from 'vue-js-modal'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.component('vue-friendly-iframe', VueFriendlyIframe)

//vue-js-modal
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false }, injectModalsContainer: true })

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
