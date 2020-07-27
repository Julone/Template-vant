import RouterView from './../router-view.vue'
export default {
    path: '/',
    name: 'Home',
    component: () => import('../../views/Home.vue'),
    children: []
}