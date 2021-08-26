<template>
  <div class="breadcrumbs-container">
    <ul class="breadcrumbs-list">
      <li
        class="breadcrumbs-item"
        v-for="(crumb, idx) in $route.meta.crumbs"
        :key="idx"
      >
        <router-link active-class="active" :to="crumbLink(crumb.name)">
          {{ crumb.name }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { store } from "@/store";
export default {
  name: "the-breadcrumbs",
  data() {
    return { store };
  },
  methods: {
    crumbLink(name: String) {
      if (name === "Albums" && store.selectedUser != undefined)
        return `/albums/${store.selectedUser}`;
      if (name === "Photos" && store.selectedAlbum != undefined)
        return `/photos/${store.selectedAlbum}`;
      return "/";
    },
  },
};
</script>

<style scoped>
.breadcrumbs-list {
  list-style-type: none;
}

.breadcrumbs-item {
  display: inline;
}

.breadcrumbs-item::after {
  content: " > ";
}

.breadcrumbs-item:last-child::after {
  content: "";
}
</style>
