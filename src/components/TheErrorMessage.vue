<template>
  <div class="error" v-if="showError == true" >
    Error occured, please try again later
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "the-error-message",
  props: {
    showError: Boolean,
  },
});
</script>

<style>
.error {
  margin: 2rem;
}
</style>