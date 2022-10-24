import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes/router";
import recordsState, { key } from "./store/records";

const app = createApp(App);

app.use(recordsState, key);
app.use(router);
app.mount("#app");
