<template>
  <div class="breadcrumbs-container">
    <ul class="breadcrumbs-list">
      <li
        class="breadcrumbs-item"
        v-for="(breadcrumb, idx) in breadcrumbArray"
        :key="idx"
      >
        <router-link active-class="active" :to="breadcrumb.fullPath">
          {{ breadcrumb.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbArray: [],
    };
  },
  watch: {
    $route() {
      let route = this.$route;
      this.breadcrumbArray.push(route);
      if (route.name == "Users") {
        this.breadcrumbArray.length = 0;
        this.breadcrumbArray.push(route);
      }
      if (route.name == "Albums") {
        if (this.breadcrumbArray.length == 0) {
          this.breadcrumbArray.push(route);
        } else {
          this.breadcrumbArray.length = 2;
        }
      }
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
