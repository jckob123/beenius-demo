<template>
  <div class="photo-card-container">
    <img
      :src="thumbnailUrl"
      alt="thumbnailUrl"
      @click="this.showPopup = true"
    />
    <span class="photo-title">{{ photoTitle }}</span>
    <Teleport to="#popup-target">
      <transition name="fade">
        <div v-if="this.showPopup" class="fullscreen">
          <button class="close" @click="this.showPopup = false">
            <font-awesome-icon class="fa-primary" icon="times" size="3x" />
          </button>
          <div class="fullscreen-container">
            <img
              @click="showDetailView = !showDetailView"
              :src="fullPhotoUrl"
            />
            <div v-if="showDetailView" class="detail-view">
              <p>Title: {{ photoTitle }}</p>
              <p>Album: {{ albumTitle }}</p>
              <p>Author: {{ authorName }}</p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faTimes);

export default defineComponent({
  name: "photo-card",
  data: function () {
    return {
      showPopup: false as Boolean,
      showDetailView: false as Boolean,
    };
  },
  components: {},
  props: {
    thumbnailUrl: String,
    photoTitle: String,
    fullPhotoUrl: String,
    albumTitle: String,
    authorName: String,
  },
});
</script>

<style>
.photo-card-container {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 5px;
  width: 20rem;
  height: 20rem;
  gap: 3rem;
  /*margin: 6rem 1rem 1rem 1rem;*/
  align-items: center;
  transition: all 200ms ease;
  text-decoration: none;
  color: inherit;
}

.photo-card-container img {
  cursor: pointer;
}

.photo-title {
  position: absolute;
  overflow: hidden;
  width: 150px;
  color: white;
  background: rgba(255, 255, 255, 0.623);
  color: black;
  bottom: 27%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(51, 51, 51, 0.644);
  width: 100%;
  height: 100%;
  text-align: center;
}

.fullscreen img {
  display: block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.close {
  position: fixed;
  border: 0px;
  background-color: rgba(0, 0, 0, 0);
  top: 0;
  right: 0;
  width: 4rem;
  color: white;
  border: 0;
  height: 2rem;
  cursor: pointer;
}

.fullscreen-container {
  height: 100%;
}

.detail-view {
  position: relative;
  padding: 2px;
  top: 15%;
  color: black;
  background: rgba(255, 255, 255, 0.733);
}

.close svg {
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.68, -0.65, 0.265, 1.3);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media only screen and (min-width: 600px) {
  .detail-view {
    width: max-content;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media only screen and (max-width: 600px) {
  .fullscreen img {
    width: 80%;
  }
  .detail-view {
    width: 60%;
    left: 20%;
    top: 10%;
  }
}

@media only screen and (max-height: 1000px) {
  .detail-view {
    top: 0%;
  }
}
</style>
