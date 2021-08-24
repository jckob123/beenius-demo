<template>
  <router-link
    class="user-card-container"
    @click="selectUser(usersId)"
    :to="{ name: 'Albums', params: { userId: usersId } }"
  >
    <div class="user-data">
      <p class="user-name">{{ userFullName }}</p>
      <p class="username">@{{ userName }}</p>
      <p><span> company:</span> {{ companyName }}</p>
      <div class="photo-container">
        <img id="random-photo" :src="randomPhotoUrl" />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store";

export default defineComponent({
  name: "user-card",
  props: {
    usersId: Number,
    userName: String,
    userFullName: String,
    randomPhotoUrl: String,
    companyName: String,
  },
  methods: {
    selectUser(value: string) {
      this.store.selectedUser = value;
      this.store.selectedAlbum = "";
    },
  },
  data() {
    return {
      store: store,
    };
  },
});
</script>

<style>
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
  transition: all 100ms ease;
  text-decoration: none;
  color: inherit;
  border-radius: 0.5rem;
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
.user-data span {
  font-size: 1rem;
}
.photo-container img {
  width: 100%;
  height: 100%;
}

.user-data .user-name {
  font-weight: bold;
}
</style>
