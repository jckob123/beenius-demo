<template>
  <div class="about">
    <h1>{{ $route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Albums",
  data(){
    return {
      albums: []
    }
  }
});
</script>

<style>
</style>