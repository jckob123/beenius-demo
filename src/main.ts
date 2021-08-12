import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App).use(router);

app.use(VueAxios, axios);

//font awesome install
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);

app.component("font-awesome-icon", FontAwesomeIcon);

//css
require("./assets/global.css");

//main mount

app.mount("#app");
