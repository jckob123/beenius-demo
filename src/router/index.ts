import { createRouter, createWebHistory } from "vue-router";
import Users from "@/views/Users.vue";
import Albums from "@/views/Albums.vue";
import Photos from "@/views/Photos.vue";
import { store } from "@/store";

function isEmptyObject(obj: {}) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function handleEmptyParams(to: any, next: any) {
  if (isEmptyObject(to.params) === true && to.name != "Users") {
    //redirect to /users
    next("/users");
  }
}

function fetchUserData(albumId: any) {
  const promise = fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  )
    .then((response: any) => response.json())
    .then((data: any) => {
      return data;
    });
  return promise;
}

async function setBreadCrumbs(to: any) {
  for (const crumb of to.meta.crumbs) {
    if (crumb.name == "Albums") {
      if (to.params.albumId !== undefined) {
        var album = await fetchUserData(to.params.albumId);
        crumb.link = "/albums/" + album.userId;
      }
    } else if (crumb.name == "Photos") {
      crumb.link = to.params.albumId;
    }
  }
}

function handleRoute(to: any, from: any, next: any) {
  //user refreshed, or on entry
  if (from.name == undefined) {
    //params are not empty
    if (isEmptyObject(to.params) === false) {
      //if on album set selected user to param
      if (to.name === "Albums") {
        store.selectedUser = to.params.userId[0];
      }
      //if on photos, set selected album to param and fetch underlying user
      if (to.name == "Photos") {
        if (store.selectedUser == "") {
          fetch(
            "https://jsonplaceholder.typicode.com/albums/" + to.params.albumId
          )
            .then((response) => response.json())
            .then((data: any) => {
              store.selectedUser = data.userId;
              store.selectedAlbum = to.params.albumId;
            });
        }
      }
    }
    //render
    next();
  } else {
    //render
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
        { name: "Albums", link: "" },
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
        { name: "Albums", link: "" },
        { name: "Photos", link: "" },
      ],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to: any, from: any, next) => {
  handleEmptyParams(to, next);
  await setBreadCrumbs(to);
  handleRoute(to, from, next);
});

export default router;
