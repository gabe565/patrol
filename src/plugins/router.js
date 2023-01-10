import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/HomePage.vue";
import About from "../components/AboutPage.vue";
import Roles from "../components/RolesPage.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: { title: "Home" },
  },
  {
    name: "about",
    path: "/about",
    component: About,
    meta: { title: "About" },
  },
  {
    name: "roles",
    path: "/roles",
    component: Roles,
    meta: { title: "Roles" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return new Promise(() => {
      setTimeout(() => savedPosition || { x: 0, y: 0 }, 200);
    });
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Patrol` : "Patrol";
  document
    .getElementById("app")
    .classList.replace(from.meta.title, to.meta.title);
  next();
});

export default router;
