import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global/components'
// import './utils/flexible.js'
import './vant.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
