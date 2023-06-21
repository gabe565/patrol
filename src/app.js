import "./sass/app.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "bootstrap";
import App from "./App.vue";
import router from "./plugins/router";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
