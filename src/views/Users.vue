<template>
  <div class="users-container">
    <div v-for="user in this.users" :key="user.id">
      <router-link class="user-card-container" to="/albums">
        <div class="avatar"><img src="@/assets/img/avatar.png" /></div>
        <div class="user-data">
          <p class="user-name">{{ user.name }}</p>
          <p class="username">{{ user.username }}</p>
          <div class="photo-container">
            <img :src="user.randomPhotoUrl" />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
  company: {
    [key: string]: Company;
  };
}

export default defineComponent({
  name: "Users",
  components: {},
  data() {
    return new (class {
      users: User[] = [];
    })();
  },
  methods: {
    getUsers(): void {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((response) => {
          response.forEach(async (user) => {
            this.getRandomPhotoFromAlbum(user.id).then((result) => {
              user.randomPhotoUrl = result;
              this.users.push(user);
            });
          });
        });
    },
    async getRandomPhotoFromAlbum(userId: number) {
      var result;
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
      result = await promise;
      return result;
    },
    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    },
  },
  mounted() {
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

.user-card-container {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 15rem;
  margin: 6rem 1rem 1rem 1rem;
  align-items: center;
  padding: 8px;
  -webkit-box-shadow: 0px 0px 21px -2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 21px -2px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
  text-decoration: none;
}

.user-card-container:visited {
  color: inherit;
}

.user-card-container:hover {
  width: 15.5rem;
  cursor: pointer;
  font-size: 1.1rem;
}

.avatar {
  width: 6rem;
  height: 6rem;
  position: absolute;
  align-self: center;
  top: -15%;
  border-radius: 50%;
  display: inline-block;
}

.avatar img {
  width: 100%;
}

.user-data {
  width: 100%;
  margin-top: 2.5rem;
}

.photo-container img {
  width: 100%;
  height: 100%;
}

.user-data .user-name {
  font-weight: bold;
}
@media only screen and (max-width: 600px) {
  .users-container {
    justify-content: center;
  }
}
</style>
