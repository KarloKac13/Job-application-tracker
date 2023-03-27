import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "./components/NotFound.vue";
import TheHomepage from "./components/TheHomepage.vue";
import TheLogin from "./components/TheLogin.vue";
import TheRegistration from './components/TheRegistration.vue';
import LoggedInUser from "./components/LoggedInUser.vue"
import { createServer } from "miragejs";
import LoadingSpinner from './reusableComponents/LoadingSpinner.vue';
import HeaderBaseCard from "./reusableComponents/HeaderBaseCard.vue"

const server = new createServer({});

server.db.loadData({
  users: []
})

server.get("/api/users", (schema) => {
  return schema.db.users;
});

server.post("/api/users", (schema, request) => {
  let newUser = JSON.parse(request.requestBody).data;
  return schema.db.users.insert(newUser);
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/:notFound(.*)", component: NotFound },
    { path: "/", redirect: "/homepage" },
    { path: "/homepage", component: TheHomepage },
    { path: "/login", component: TheLogin },
    { path: "/registration", component: TheRegistration },
    { path: "/userloggedin", component: LoggedInUser }
  ],
});

const app = createApp(App);

app.component("loading-spinner", LoadingSpinner)
app.component("header-basecard", HeaderBaseCard)

app.use(router);
app.mount('#app');
