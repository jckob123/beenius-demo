<template>
  <div class="album-card-container">
    <div class="photos-container">
      <img
        v-for="photo in this.thumbnailPhotos()"
        :key="photo.id"
        :src="photo.thumbnailUrl"
      />
    </div>

    <div>
      {{ albumTitle }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "album-card",
  props: {
    albumTitle: String,
  },
  data: function () {
    return {};
  },
  methods: {
    thumbnailPhotos() {
      return this.$attrs.albumPhotos;
    },
  },
});
</script>

<style>
.album-card-container {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 15rem;
  height: 10rem;
  margin: 6rem 1rem 1rem 1rem;
  align-items: center;
  padding: 8px;
  -webkit-box-shadow: 0px 0px 21px -2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 21px -2px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
  text-decoration: none;
  color: inherit;
}
.album-card-container:hover {
  width: 17rem;
  cursor: pointer;
  font-size: 1.4rem;
}

.photos-container {
  position: absolute;
  top: -30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.photos-container img {
  position: relative;
  border-radius: 50%;
  width: 30%;
  border: 5px solid rgb(226, 226, 226);
}
</style>
