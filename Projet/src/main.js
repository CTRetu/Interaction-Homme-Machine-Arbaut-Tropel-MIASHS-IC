import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount("#app");


import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const savedUser = localStorage.getItem("currentUser");
if (savedUser) {
  try {
    userStore.login(JSON.parse(savedUser));
  } catch {
    localStorage.removeItem("currentUser");
  }
}
