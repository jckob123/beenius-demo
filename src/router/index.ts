import { createRouter, createWebHistory } from "vue-router";
import Users from "@/views/Users.vue";
import Albums from "@/views/Albums.vue";
import Photos from "@/views/Photos.vue";
import { store } from "@/store";

function isEmptyObject(obj: {}) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function setBreadCrumbs(to: any) {
  to.meta.crumbs.forEach((element: any) => {
    if (element.name == "Albums") {
      if (store.selectedUser == "" && to.params.albumId !== undefined) {
        fetch(
          "https://jsonplaceholder.typicode.com/albums/" + to.params.albumId
        )
          .then((response) => response.json())
          .then((data: any) => {
            store.selectedUser = data.userId;
            console.log(data.userId);
          });
      }
      element.link =
        /albums/ +
        (store.selectedUser !== "" ? store.selectedUser : to.params.userId);
    } else if (element.name == "Photos") {
      element.link =
        /photos/ +
        (store.selectedAlbum !== "" ? store.selectedAlbum : to.params.albumId);
    }
  });
}

function handleRoute(to: any, from: any, next: any) {
  //user refreshed, or on entry
  if (from.name === undefined) {
    //params are not empty
    if (isEmptyObject(to.params) === false) {
      //if on album set selected user to param
      if (to.name === "Albums") {
        store.selectedUser = to.params.userId[0];
      }
      //if on photos, set selected album to param and fetch underlying user
      if (to.name == "Photos") {
        if (store.selectedUser === "") {
          fetch(
            "https://jsonplaceholder.typicode.com/albums/" + to.params.albumId
          )
            .then((response) => response.json())
            .then((data: any) => {
              store.selectedUser = data.userId;
            });
        }
        store.selectedAlbum = to.params.albumId;
      }
      //if params are empty and entry route is not users
    } else if (isEmptyObject(to.params) === true && to.name !== "Users") {
      //redirect to /users
      next("/users");
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
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      crumbs: [{ name: "Users", link: "/users" }],
    },
  },
  {
    path: "/albums/:userId",
    name: "Albums",
    component: Albums,
    meta: {
      crumbs: [
        { name: "Users", link: "/users" },
        { name: "Albums", link: "/albums/" },
      ],
    },
  },
  {
    path: "/photos/:albumId",
    name: "Photos",
    component: Photos,
    meta: {
      crumbs: [
        { name: "Users", link: "/users" },
        { name: "Albums", link: "/albums/" },
        { name: "Photos", link: "/photos/" },
      ],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: any, from: any, next) => {
  setBreadCrumbs(to);
  handleRoute(to, from, next);
});

export default router;
