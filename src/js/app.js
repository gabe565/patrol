'use strict'

import 'vue-svgicon/dist/polyfill';

import Vue from 'vue';
import VueRouter from 'vue-router';
import SvgIcon from 'vue-svgicon';

import 'bootstrap';
import './svg/index';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Roles from './components/Roles.vue';

Vue.use(VueRouter)
Vue.use(SvgIcon);

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
    el: '#app',
    router,
    data() {
        return {
            transitionName: 'fade'
        }
    },
    watch: {
        '$route'(to, from) {
            let fromIndex = routes.findIndex(obj => obj.path == from.path)
            let toIndex   = routes.findIndex(obj => obj.path == to.path)
            this.transitionName = (fromIndex < toIndex) ? 'slide-left' : 'slide-right'
        }
    }
})
