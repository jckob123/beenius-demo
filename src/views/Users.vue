<template>
  <div>
    <div class="users-container">
      <user-card
        v-for="user in this.users"
        :key="user.id"
        :userId="user.id"
        :userName="user.username"
        :userFullName="user.name"
        :randomPhotoUrl="user.randomPhotoUrl"
      ></user-card>
    </div>
  </div>
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
    return new (class {
      users: User[] = [];
      isLoading: boolean = false;
    })();
  },
  methods: {
    getUsers(): void {
      this.isLoading = true;
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((response) => {
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
          this.isLoading = false;
        });
    },
    getRandomPhotoFromAlbum(userId: number) {
      var promise = fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      )
        .then((res) => res.json())
        .then((res) => {
          return fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${
              res[this.getRandomInt(res.length)].id
            }`
          );
        })
        .then((res) => res.json())
        .then((data) => {
          return data[this.getRandomInt(data.length)].url;
        });
      return promise;
    },
    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    },
  },
  created: function () {
    this.getUsers();
  },
});
</script>

<style>
.users-container {
  flex-direction: row;
  justify-content: flex;
  flex-grow: 2;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
}

@media only screen and (max-width: 600px) {
  .users-container {
    justify-content: center;
  }
}
</style>
