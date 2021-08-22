<template>
  <div class="content-container">
    <album-card
      v-for="album in this.albums"
      :key="album.id"
      :albumTitle="album.title"
      :albumId="album.id"
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
      let id_param = this.$route.params.userId;
      fetch(
        `https://jsonplaceholder.typicode.com/albums/${
          id_param === undefined ? "" : "?userId=" + id_param
        }`
      )
        .then((response) => response.json())
        .then((response: Album[]) => {
          //api returns array, loop needed
          response.forEach((album: Album) => {
            this.getRandomPhotos(album.id).then((response: Photo[]) => {
              album.thumbnailPhotos = response;
              this.albums.push(album);
            });
          });
        });
    },
    getRandomPhotos(albumId: number): Promise<Photo[]> {
      var promise = fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      )
        .then((response) => response.json())
        .then((response: Photo[]) => {
          const shuffled = this.shuffleArray(response);
          return shuffled.splice(0, 3);
        });

      return promise;
    },
    /*
     Durstenfeld shuffle by stackoverflow answer: 
     https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864
    */
    shuffleArray(array: Photo[]): Photo[] {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
  created () {
    this.getAlbums();
  },
});
</script>

<style></style>
