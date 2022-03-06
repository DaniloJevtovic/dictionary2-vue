import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/main.css";
import "./assets/modal.css";

createApp(App).use(router).use(createPinia()).mount("#app");
