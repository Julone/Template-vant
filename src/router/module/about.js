import RouterView from './../router-view.vue'
export default {
    path: '/about',
    name: 'About',
    component: () => import('../../views/About.vue')
}