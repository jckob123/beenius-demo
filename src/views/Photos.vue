<template>
  <div v-if="this.error == false" class="content-container">
    <photo-card
      v-for="photo in this.photos"
      :key="photo.id"
      :photoTitle="photo.title"
      :thumbnailUrl="photo.thumbnailUrl"
      :fullPhotoUrl="photo.url"
      :albumTitle="photo.albumTitle"
      :authorName="photo.authorName"
    ></photo-card>
  </div>
  <div v-if="this.error == true" class="error">ERROR</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PhotoCard from "@/components/PhotoCard.vue";

interface Photo {
  id: number;
  albumId: number;
  thumbnailUrl: string;
  title: string;
  url: string;
  albumTitle: string;
  authorName: string;
}

export default defineComponent({
  name: "photos",
  components: {
    PhotoCard,
  },
  data: function () {
    return {
      photos: [] as Photo[],
      error: false as Boolean,
    };
  },
  methods: {
    getPhotos() {
      let albumId = this.$route.params.albumId;
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then((response) => response.json())
        .then((response: Photo[]) => {
          response.forEach((photo: Photo) => {
            fetch(
              `https://jsonplaceholder.typicode.com/albums/${photo.albumId}`
            )
              .then((response) => response.json())
              .then((data) => {
                photo.albumTitle = data.title;

                return fetch(
                  `https://jsonplaceholder.typicode.com/users/${data.userId}`
                );
              })
              .then((response) => response.json())
              .then((data) => {
                photo.authorName = data.name;
                this.photos.push(photo);
              })
              .catch(() => {
                this.error = true;
              });
          });
        });
    },
  },
  created() {
    this.getPhotos();
  },
});
</script>

<style></style>
