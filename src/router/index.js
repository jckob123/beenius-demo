import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/users",
    name: "Users",
    component: () =>
      import(/* webpackChunkName: "users" */ "../views/Users.vue"),
  },
  {
    path: "/albums",
    name: "Albums",
    component: () =>
      import(/* webpackChunkName: "albums" */ "../views/Albums.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
