import "./sass/app.scss";

import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";

import "./plugins/fontawesome";
import "bootstrap";
import App from "./App.vue";
import router from "./plugins/router";

const pinia = createPinia();

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).use(pinia).mount("#app");
