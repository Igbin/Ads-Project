import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('./components/Login.vue')
        },
        {
            path: '/Main',
            component: () => import('./components/Main.vue')
        },
        {
            path: '/AdItem/:id',
            name: 'AdItem',
            component: () => import('@/components/AdItem'),
            props: true
        }
    ]
})