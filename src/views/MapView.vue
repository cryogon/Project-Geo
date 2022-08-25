<template>
  <div class="home">
    <transition name="map-option">
      <map-option-component v-show="showPaths" />
    </transition>
    <map-component />
  </div>
</template>
<script>
import MapComponent from "@/components/MapComponent.vue";
import MapOptionComponent from "@/components/MapOptionComponent.vue";
export default {
  name: "MapView",
  data() {
    return {
      showPaths: false,
    };
  },
  components: {
    MapComponent,
    MapOptionComponent,
  },
  created() {
    this.emitter.on("pathList", (e) => {
      this.showPaths = e;
    });
  },
};
</script>
<style lang="scss">
@import "@/assets/style.scss";
.home {
  height: 100vh;
  width: 100vw;
  padding-inline-end: 1rem;
  position: relative;
  .map-option-enter-active {
    animation: slideout linear 0.2s;
  }
  .map-option-leave-active {
    animation: slidein linear 0.2s;
  }
  .map-option-enter-from {
    @keyframes slideout {
      from {
        left: $animOffset;
      }
      to {
        left: 0rem;
      }
    }
  }
  .map-option-leave-to {
    @keyframes slidein {
      from {
        left: 0rem;
      }
      to {
        left: $animOffset;
      }
    }
  }
}
</style>
