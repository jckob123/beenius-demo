import { createRouter, createWebHashHistory } from "vue-router";
import Users from "@/views/Users.vue";
import Albums from "@/views/Albums.vue";


const routes = [
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/albums/:id",
    name: "Albums",
    component: Albums
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
