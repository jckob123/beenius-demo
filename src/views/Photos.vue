<template>
  <div v-if="this.isError == false" class="content-container">
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
  <the-error-message :showError="this.isError"></the-error-message>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PhotoCard from "@/components/PhotoCard.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";

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
    TheErrorMessage,
  },
  data: function () {
    return {
      photos: [] as Photo[],
      isError: false as Boolean,
    };
  },
  methods: {
    getPhotos() {
      let albumId = this.$route.params.albumId;
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then((response) => response.json())
        .then(async (response: Photo[]) => {
          var userId = "";
          var userName = "";
          var albumTitle = "";

          if (response.length > 0) {
            await fetch(
              `https://jsonplaceholder.typicode.com/albums/${response[0].albumId}`
            )
              .then((response) => response.json())
              .then((data) => {
                albumTitle = data.title;
                userId = data.userId;
              })
              .catch(() => {
                this.isError = true;
              });
          }
          if (userId !== "") {
            await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
              .then((response) => response.json())
              .then((data) => {
                userName = data.name;
              })
              .catch(() => {
                this.isError = true;
              });
          }

          response.forEach((photo: Photo) => {
            photo.albumTitle = albumTitle;
            photo.authorName = userName;
            this.photos.push(photo);
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
