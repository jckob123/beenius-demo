<template>
  <div>
    <div v-if="this.isError == false" class="content-container">
      <user-card
        v-for="user in this.users"
        :key="user.id"
        :usersId="user.id"
        :userName="user.username"
        :userFullName="user.name"
        :randomPhotoUrl="user.randomPhotoUrl"
        :companyName="user.company.name"
      ></user-card>
    </div>
  </div>
  <the-error-message :showError="this.isError"></the-error-message>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserCard from "@/components/UserCard.vue";

interface Geo {
  lat: string;
  lng: string;
}

interface Addres {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    [key: string]: Geo;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  addres: {
    [key: string]: Addres;
  };
  phone: string;
  website: string;
  randomPhotoUrl: string;
  company: {
    [key: string]: Company;
  };
}

export default defineComponent({
  name: "Users",
  components: {
    UserCard,
  },
  data() {
    return {
      users: [] as User[],
      isError: false as Boolean,
    };
  },
  methods: {
    getUsers(): void {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((response) => {
          /*api returns array, loop needed.
          Insert into json random photo url
          */
          response.forEach((user: User) => {
            this.getRandomPhotoFromAlbum(user.id).then((result) => {
              var img = new Image();
              img.src = result;
              img.onload = () => {
                user.randomPhotoUrl = img.src;
                this.users.push(user);
              };
            });
          });
        });
    },
    getRandomPhotoFromAlbum(userId: number) {
      var promise = fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      )
        .then((res) => res.json())
        .then((data) => {
          let random = this.getRandomInt(data.length);
          return fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${data[random].id}`
          );
        })
        .then((res) => res.json())
        .then((data) => {
          let random = this.getRandomInt(data.length);
          return data[random].url;
        });
      return promise;
    },
    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    },
  },
  created() {
    this.getUsers();
  },
});
</script>

<style></style>
