import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TheErrorMessage from "./components/TheErrorMessage.vue";

const app = createApp(App);
app.use(router);

//font awesome install
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("the-error-message", TheErrorMessage);
//css
require("./assets/global.css");
//main mount
app.mount("#app");
