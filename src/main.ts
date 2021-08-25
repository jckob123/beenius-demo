import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TheErrorMessage from "./components/TheErrorMessage.vue";
import TheLoader from "./components/TheLoader.vue";

const app = createApp(App);
app.use(router);

//font awesome install
app.component("font-awesome-icon", FontAwesomeIcon);

//global register of components
app.component("the-error-message", TheErrorMessage);
app.component("the-loader", TheLoader);

//css
require("./assets/global.css");
//main mount
app.mount("#app");
