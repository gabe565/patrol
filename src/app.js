'use strict'

import './sass/app.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './plugins/fontawesome';
import 'bootstrap';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Roles from './components/Roles.vue';
import App from './App.vue';

Vue.use(VueRouter)
Vue.component('font-awesome-icon', FontAwesomeIcon);

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        name: 'about',
        path: '/about',
        component: About,
        meta: { title: 'About' }
    },
    {
        name: 'roles',
        path: '/roles',
        component: Roles,
        meta: { title: 'Roles' },
        props: true
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            setTimeout(() => (savedPosition) ? savedPosition : { x: 0, y: 0 }, 200)
        })
    }
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title + ' | Patrol' : 'Patrol'
    document.getElementById('app').classList.replace(from.meta.title, to.meta.title);
    next()
})

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");