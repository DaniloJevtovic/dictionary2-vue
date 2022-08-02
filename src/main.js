import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./assets/main.css";
import "./assets/modal.css";
import "./assets/tabs.css";
import "./assets/buttons.css";
// import "./assets/sidebar.css";
import "./assets/route-transition.css";
import "./assets/tab-transition.css";
import "./assets/shake.css";
import "./assets/toast.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).mount("#app");
