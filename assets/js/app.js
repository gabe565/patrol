'use strict'

require('vue-svgicon/dist/polyfill').default

window.$ = window.jQuery = require("jquery").default
window.Popper = require('popper.js/dist/umd/popper.js').default
window.Vue = require('vue').default

require('jquery.easing').default
require('bootstrap').default
require('./svg/index.js').default

const VueRouter = require('vue-router').default

Vue.use(VueRouter)
Vue.use(require('vue-svgicon'))

const routes = [
    {
        name: 'home',
        path: '/',
        component: require('./components/Home.vue').default,
        meta: { title: 'Home' }
    },
    {
        name: 'about',
        path: '/about',
        component: require('./components/About.vue').default,
        meta: { title: 'About' }
    },
    {
        name: 'roles',
        path: '/roles',
        component: require('./components/Roles.vue').default,
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
    $('#app').removeClass(from.meta.title).addClass(to.meta.title)
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

;(function($) {
    // Closes responsive menu when a scroll trigger link is clicked
    $('.navbar-collapse').click(() => {
        $('.navbar-collapse').collapse('hide')
    })
})(jQuery);
