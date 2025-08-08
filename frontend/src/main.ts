/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Styles
import "@/styles/main.css";
import "unfonts.css";
import router from "./router";

const app = createApp(App);
app.use(router);
registerPlugins(app);

app.mount("#app");
