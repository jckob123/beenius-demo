<template>
  <main>
    <the-breadcrumbs></the-breadcrumbs>
    <router-view></router-view>
  </main>
  <the-sidebar></the-sidebar>
</template>

<script>
import TheSidebar from "./components/TheSidebar.vue";
import TheBreadcrumbs from "./components/TheBreadcrumbs.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheBreadcrumbs,
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}

@media only screen and (min-width: 600px) {
  main {
    margin-left: 5rem;
  }
}

@media only screen and (max-width: 600px) {
  main {
    margin-left: 0;
    margin-bottom: 5rem;
  }
}
</style>
