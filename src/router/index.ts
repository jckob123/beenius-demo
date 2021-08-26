import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import Users from "@/views/Users.vue";
import Albums from "@/views/Albums.vue";
import Photos from "@/views/Photos.vue";
import { store } from "@/store";

function isEmptyObject(obj: {}) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function handleEmptyParams(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (isEmptyObject(to.params) === true && to.name != "Users") {
    //redirect to /users
    next("/#");
  }
}

function setSidebarValues(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  //user refreshed, or on entry
  if (from.name == undefined) {
    //if on album set selected user to param
    if (to.name === "Albums") {
      store.selectedUser = to.params.userId[0];
    }
    //if on photos, set selected album to param and fetch underlying user
    if (to.name == "Photos") {
      fetch(`https://jsonplaceholder.typicode.com/albums/${to.params.albumId}`)
        .then((response) => response.json())
        .then((data: any) => {
          store.selectedUser = data.userId;
          store.selectedAlbum = to.params.albumId;
        });
    }
    //render
    next();
  } else {
    next();
  }
}

const routes = [
  {
    path: "/",
    redirect: "/users",
  },
  {
    path: "",
    name: "Users",
    component: Users,
    meta: {
      crumbs: [{ name: "Users" }],
    },
  },
  {
    path: "/albums/:userId",
    name: "Albums",
    component: Albums,
    meta: {
      crumbs: [{ name: "Users" }, { name: "Albums" }],
    },
  },
  {
    path: "/photos/:albumId",
    name: "Photos",
    component: Photos,
    meta: {
      crumbs: [{ name: "Users" }, { name: "Albums" }, { name: "Photos" }],
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from: any, next) => {
  handleEmptyParams(to, next);
  setSidebarValues(to, from, next);
});

export default router;
