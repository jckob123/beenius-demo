<template>
  <div v-if="this.isError == false" class="content-container">
    <album-card
      v-for="album in this.albums"
      :key="album.id"
      :albumTitle="album.title"
      :albumsId="album.id"
      :albumPhotos="album.thumbnailPhotos.map((photo) => photo)"
    ></album-card>
  </div>
  <the-error-message :showError="this.isError"></the-error-message>
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
      isError: false as Boolean,
    };
  },
  methods: {
    async getAlbums() {
      fetch(
        `https://jsonplaceholder.typicode.com/albums/?userId=${this.$route.params.userId}`
      )
        .then((response) => response.json())
        .then(async (response: Album[]) => {
          //api returns array, loop needed
          for (var data of response) {
            const thumbnailPhotos = await this.getRandomPhotos(data.id);
            data.thumbnailPhotos = thumbnailPhotos;
            this.albums.push(data);
          }
        })
        .catch(() => {
          this.isError = true;
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
  created() {
    this.getAlbums();
  },
});
</script>

<style></style>
