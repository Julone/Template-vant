import Vue from 'vue'
import VueRouter from 'vue-router';
import home from './module/home'
import about from './module/about'
Vue.use(VueRouter);

const routes = [
  home,about
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: process.env.NODE_ENV == 'development' ? 'history' : 'hash',
  routes,
})

router.beforeEach((to,from,next) => {
  // if( from.meta.savedPosition) {
  //   from.meta.savedPosition = { x: 0, y: router.app.$el.scrollTop };
  // }
  next();
})
router.afterEach((to, from) => {
  // if( !to.meta.savedPosition && !to.meta.noAutoScrollTop) {
  //   router.app.$eventBus.$emit('triggerScroll', { x: 0,y: 0 }, true)
  // }
})

export default router