<template>
  <div class="breadcrumbs-container">
    <ul class="breadcrumbs-list">
      <li
        class="breadcrumbs-item"
        v-for="(crumb, idx) in $route.meta.crumbs"
        :key="idx"
      >
        <router-link active-class="active" :to="crumb.link">
          {{ crumb.name }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "the-breadcrumbs",
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
