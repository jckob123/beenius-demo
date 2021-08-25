<template>
  <font-awesome-icon class="fa-spin" icon="spinner" size="2x" />
</template>

<style>
</style>

<script lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner);
import { defineComponent } from "vue";

export default defineComponent({
  name: "the-loader",
  props: {
    isLoading: Boolean,
  },
});
</script>