import { createApp } from "vue";

import App from "./App.vue";

window.APP = createApp(App);

import OffcanvasComponent from "../index";

window.APP.use(OffcanvasComponent);

window.APP.mount("#app");
