import Vue from 'vue'
import Router from 'vue-router'
import AdItem from '@/components/AdItem';
import Main from './components/Main.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/AdItem/:id',
            name: 'AdItem',
            component: AdItem,
            props: true
        }
    ]
})