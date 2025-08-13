/**
 * main.ts
 *
 * Bootstraps Vuetify, Pinia, and other plugins then mounts the App
 */

// Composables
import { createApp } from "vue";

// Components
import App from "./App.vue";

// Plugins
import { registerPlugins } from "@/plugins";

// Router
import router from "./router";

// Pinia
import { createPinia } from "pinia";

// Styles
import "@/styles/main.css";
import "unfonts.css";

const app = createApp(App);

// Criar Pinia e registrar antes do router
const pinia = createPinia();
app.use(pinia);

// Registrar router e plugins
app.use(router);
registerPlugins(app);

// Montar app
app.mount("#app");
