import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App).use(router);


//font awesome install
app.component("font-awesome-icon", FontAwesomeIcon);

//css
require("./assets/global.css");
//main mount
app.mount("#app");
