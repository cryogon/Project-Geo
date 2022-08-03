<template>
  <div class="home">
    <map-option-component v-show="showPaths" />
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
.home {
  display: grid;
  grid-template-columns: 15vw 85vw;
  height: 100vh;
  width: 100vw;
  padding-inline-end: 1rem;
}
</style>
