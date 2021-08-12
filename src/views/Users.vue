<template>
  <div>
    <!--<loading-component :active="this.isLoading"></loading-component>-->
    <div class="users-container">
      <div v-for="user in this.users" :key="user.id">
        <router-link class="user-card-container" :to="'/albums/' + user.id">
          <div class="avatar">
            <img src="@/assets/img/avatar.png" />
          </div>
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
  </div>
</template>

<script lang="ts">
//import loadingComponent from "@/components/TheLoadingComponent.vue";
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
  randomPhotoUrl: string;
  company: {
    [key: string]: Company;
  };
}

export default defineComponent({
  name: "Users",
  components: {
   // loadingComponent,
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
