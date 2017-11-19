import { has } from 'lodash'
window._ = _

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
import 'jquery.easing'

import 'popper.js/dist/umd/popper'

import 'bootstrap'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSVGIcon from 'vue-svgicon'

Vue.use(VueRouter)
Vue.use(VueSVGIcon)

import Home from './components/Home.vue'
import About from './components/About.vue'
import Roles from './components/Roles.vue'

import './svg/tp'
import './svg/users'
import './svg/info-circle'

const routes = [
    { name: 'home', path: '/', component: Home, meta: { title: 'Home' } },
    { name: 'about', path: '/about', component: About, meta: { title: 'About' } },
    { name: 'roles', path: '/roles', component: Roles, meta: { title: 'Roles' } }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                if (savedPosition)
                    return savedPosition
                else
                    return { x: 0, y: 0 }
            }, 200)
        })
    }
})

router.beforeEach(function(to, from, next) {
    document.title = to.meta.title ? to.meta.title + ' | Patrol' : 'Patrol'
    $('#app').removeClass(from.meta.title).addClass(to.meta.title)
    next()
})

new Vue({
    el: '#app',
    router,
    data: function() {
        return {
            transitionName: 'fade'
        }
    },
    watch: {
        '$route': function(to, from) {
            var fromIndex = routes.findIndex(function(obj) { return obj.path == from.path })
            var toIndex = routes.findIndex(function(obj) { return obj.path == to.path })
            this.transitionName = (fromIndex < toIndex) ? 'slide-left' : 'slide-right'
        }
    }
})

;(function($) {
  "use strict"; // Start of use strict

  // Closes responsive menu when a scroll trigger link is clicked
  $('.navbar-collapse').click(function() {
    $('.navbar-collapse').collapse('hide')
  })
})(jQuery); // End of use strict
