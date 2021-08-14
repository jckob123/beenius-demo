<template>
  <div class="content-container">
    <album-card
      v-for="album in this.albums"
      :key="album.id"
      :albumTitle="album.title"
      :albumPhotos="album.thumbnailPhotos.map((photo) => photo)"
    ></album-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import albumCard from "@/components/AlbumCard.vue";

interface Album {
  userId: number;
  id: number;
  title: string;
  thumbnailPhotos: Array<Photo>;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default defineComponent({
  name: "Albums",
  components: {
    albumCard,
  },
  data() {
    return {
      albums: [] as Album[],
    };
  },
  methods: {
    async getAlbums() {
      let id_param = this.$route.params.id;

      fetch(
        `https://jsonplaceholder.typicode.com/albums/${
          id_param === undefined ? "" : "?userId=" + id_param
        }`
      )
        .then((response) => response.json())
        //api returns array, loop needed
        .then((response) => {
          response.forEach((album: Album) => {
            this.getFirstThreePhotos(album.id).then((response) => {
              album.thumbnailPhotos = response;
              this.albums.push(album);
            });
          });
        });
    },
    getFirstThreePhotos(albumId: number) {
      var promise = fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      )
        .then((response) => response.json())
        .then((response: Photo[]) => {
          return response.slice(0, 3);
        });

      return promise;
    },
  },
  created: function () {
    this.getAlbums();
  },
});
</script>

<style></style>
