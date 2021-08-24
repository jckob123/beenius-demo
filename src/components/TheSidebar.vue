<template>
  <nav id="navbar">
    <ul class="navbar-container">
      <li class="nav-item">
        <router-link :to="{ name: 'Users' }" class="nav-link">
          <font-awesome-icon class="fa-primary" icon="user" size="1x" />
          <span class="link-text">Users</span></router-link
        >
      </li>
      <li v-if="this.store.selectedUser !== ''" class="nav-item">
        <router-link
          :to="{ name: 'Albums', params: { userId: this.store.selectedUser } }"
          class="nav-link"
        >
          <font-awesome-icon class="fa-primary" icon="images" size="1x" />
          <span class="link-text">Albums</span></router-link
        >
      </li>
      <li v-if="this.store.selectedAlbum !== ''" class="nav-item">
        <router-link
          :to="{
            name: 'Photos',
            params: { albumId: this.store.selectedAlbum },
          }"
          class="nav-link"
        >
          <font-awesome-icon class="fa-primary" icon="image" size="1x" />
          <span class="link-text">Photos</span></router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faImages, faImage } from "@fortawesome/free-solid-svg-icons";
import { store } from "@/store";

library.add(faUser, faImages, faImage);

export default {
  name: "the-sidebar",
  data: function () {
    return {
      store: store,
    };
  },
};
</script>

<style>
#navbar {
  position: fixed;
  background-color: var(--bg-primary);
  transition: width 200ms ease;
  z-index: 1000;
}

.navbar-container {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.nav-link {
  display: flex;
  align-items: center;
  height: 5rem;
  text-decoration: none;
  filter: grayscale(100%) opacity(0.7);
  transition: filter 100ms ease;
  color: white;
}

.router-link-active {
  filter: grayscale(0%) opacity(1);
  background-color: var(--bg-secondary);
  color: var(--nav-text-active);
}

.nav-link svg {
  min-width: 2rem;
  margin: 0 1.5rem;
}

.nav-item {
  width: 100%;
}

.link-text {
  display: none;
  margin-left: 1rem;
}
.fa-primary {
  color: var(--nav-text-hover);
}

.fa-primary,
.fa-secondary {
  transition: var(--transition-speed);
}

@media only screen and (min-width: 600px) {
  #navbar {
    top: 0;
    width: 5rem;
    height: 100vh;
  }
  #navbar:hover {
    width: 16rem;
  }

  #navbar:hover .link-text {
    display: inline;
    transition: opacity var(--transition-speed);
  }
}
@media only screen and (max-width: 600px) {
  #navbar {
    bottom: 0;
    width: 100vw;
    height: 5rem;
  }

  .navbar-container {
    flex-direction: row;
  }

  .nav-link {
    justify-content: center;
  }
}
</style>
