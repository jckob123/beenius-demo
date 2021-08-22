import {
  createRouter,
  createWebHistory,
} from "vue-router";
import Users from "@/views/Users.vue";
import Albums from "@/views/Albums.vue";
import Photos from "@/views/Photos.vue";

const routes = [
  {
    path: "/",
    redirect: "/users"
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/albums/:userId?",
    name: "Albums",
    component: Albums,
  },
  {
    path: "/photos/:albumId?",
    name: "Photos",
    component: Photos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath == "/albums" || to.fullPath == "/photos") {
    next("/users")
  }
  else {
    next()
  }
});

export default router;
