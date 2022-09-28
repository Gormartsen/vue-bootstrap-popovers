import { createApp } from "vue";

import App from "./App.vue";

window.APP = createApp(App);

import PopoversViewModule from "../index";

window.APP.use(PopoversViewModule);

window.APP.mount("#app");
