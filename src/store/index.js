import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home'
import auth from './module/auth'
import router from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appHeight: 0
  },
  mutations: {
    set_appHeight(state, appHeight){
      state.appHeight = appHeight;
    }
  },
  actions: {
    appGoback({}){
      router.go(-1);
    }
  },
  getters: {
    app_height: state => state.appHeight
  },
  modules: {
    home,auth
  }
})
