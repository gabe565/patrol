'use strict'

require('vue-svgicon/dist/polyfill')

window.$ = window.jQuery = require("jquery");
window.Popper = require('popper.js').default;;
window.Vue = require('vue')

require('jquery.easing')
require('bootstrap')
require('./svg/index.js')

const VueRouter = require('vue-router').default

Vue.use(VueRouter)
Vue.use(require('vue-svgicon'))

const routes = [
    {
        name: 'home',
        path: '/',
        component: require('./components/Home.vue'),
        meta: { title: 'Home' }
    },
    {
        name: 'about',
        path: '/about',
        component: require('./components/About.vue'),
        meta: { title: 'About' } },
    {
        name: 'roles',
        path: '/roles',
        component: require('./components/Roles.vue'),
        meta: { title: 'Roles' }, props: true }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                if (savedPosition)
                    return savedPosition
                else
                    return { x: 0, y: 0 }
            }, 200)
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
            var fromIndex = routes.findIndex(function(obj) { return obj.path == from.path })
            var toIndex = routes.findIndex(function(obj) { return obj.path == to.path })
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
