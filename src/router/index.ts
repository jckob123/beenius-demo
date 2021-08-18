import { createRouter, createWebHistory } from "vue-router";
import Users from "@/views/Users.vue";
import Albums from "@/views/Albums.vue";
import Photos from "@/views/Photos.vue";

const routes = [
  {
    path: "/",
    redirect: "/users",
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/albums",
    name: "Albums",
    component: Albums,
    children: [
      {
        path: ":id",
        name: "Albums",
        component: Albums,
      },
    ],
  },
  {
    path: "/photos",
    name: "Photos",
    component: Photos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
